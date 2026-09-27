/* Contact page behaviour: topic help, copy the email address, and the message form.
   The form posts JSON {name, email, company, phone, role, topic, message, source:"contact"} to /api/lead.
   Without JS the form still posts to /api/lead as a normal form. */
(function () {
  'use strict';
  var d = document;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };
  var reduced = window.VSG ? window.VSG.reduced : false;

  /* ---- topic: one plain line about each choice; ?topic= preselects it.
     A demo topic also changes the form heading, the message label and placeholder, and the button. ---- */
  var topic = $('#c-topic'), help = $('[data-topic-help]'), helpBox = help && help.parentNode;
  var formH = $('[data-form-h]'), accent = $('[data-contact-accent]'), msgL = $('[data-msg-l]'), msg = $('#c-msg');
  var DEMO_HELP = function (p) { return 'We will walk you through ' + p + ' on demo data and answer your questions.'; };
  var topics = {
    'A demo of VSG ACE': { h: 'Request a demo of VSG ACE', a: 'Request a demo.', l: 'What would you like to see?', b: 'Request a demo', help: DEMO_HELP('VSG ACE'),
      ph: 'For example: which ERP you run, the areas of the business you want on one platform, and who on your team would use it.' },
    'A demo of VSG Procure': { h: 'Request a demo of VSG Procure', a: 'Request a demo.', l: 'What would you like to see?', b: 'Request a demo', help: DEMO_HELP('VSG Procure'),
      ph: 'For example: roughly how many stock lines you carry, whether you import, and how your buyers plan orders today.' },
    'A demo of VSG Endorse': { h: 'Request a demo of VSG Endorse', a: 'Request a demo.', l: 'What would you like to see?', b: 'Request a demo', help: 'We will show you how VSG Endorse runs every AI automation on one platform, and discuss the tasks that cost your team the most time.',
      ph: 'For example: the jobs your team does by hand every week, such as following up overdue accounts, reconciling supplier statements or checking stock counts.' },
    'A demo of VSG Core': { h: 'Request a demo of VSG Core', a: 'Request a demo.', l: 'What would you like to see?', b: 'Request a demo', help: DEMO_HELP('VSG Core'),
      ph: 'For example: which ERP you run, and which reports your team finds hard to trust.' },
    'A VSG Bootcamp': { h: 'Ask about a Bootcamp', a: 'Tell us what you need.', l: 'What should the week answer?', b: 'Send message', help: 'A five-day AI assessment of your operations, at a fixed price agreed before we start.',
      ph: 'For example: where AI could save our team the most time, or what our stock and supplier issues really cost us.' },
    'Custom software and AI': { h: 'Tell us what you need', a: 'Tell us what you need.', l: 'What should it do?', b: 'Send message', help: 'Describe the bottleneck you want to solve. We will help you decide between a product and a custom build, and what it takes.',
      ph: 'For example: the process your team repeats every day, and roughly how long it takes.' },
    'Something else': { h: 'Send a message', a: 'Tell us what you need.', l: 'Your message', b: 'Send message', help: 'Tell us about your business and what you want to achieve.',
      ph: 'A few lines is plenty.' }
  };
  /* ?topic= keys, plus the older keys used by earlier links */
  var keys = {
    ace: 'A demo of VSG ACE', 'ace-demo': 'A demo of VSG ACE', 'procure-demo': 'A demo of VSG Procure', 'endorse-demo': 'A demo of VSG Endorse', 'core-demo': 'A demo of VSG Core',
    bootcamp: 'A VSG Bootcamp', custom: 'Custom software and AI', contact: 'Something else',
    procure: 'A demo of VSG Procure', endorse: 'A demo of VSG Endorse', core: 'A demo of VSG Core', demo: 'A demo of VSG Procure',
    other: 'Something else', stephan: 'Something else'
  };
  var sendLabel = 'Send message';
  function setHelp(animate) {
    if (!topic) return;
    var t = topics[topic.value] || topics['Something else'];
    if (formH) formH.textContent = t.h;
    if (accent) accent.textContent = t.a;
    if (msgL) msgL.textContent = t.l;
    if (msg) msg.placeholder = t.ph;
    sendLabel = t.b;
    if (btnL && !(form && form.classList.contains('is-sending'))) btnL.textContent = sendLabel;
    if (!help) return;
    if (!animate || reduced) { help.textContent = t.help; return; }
    helpBox.classList.add('is-swap');
    setTimeout(function () { help.textContent = t.help; helpBox.classList.remove('is-swap'); }, 160);
  }
  var form = $('[data-contact]'), btnL = form && $('[data-send-l]', form);
  if (topic) {
    try {
      var q = new URLSearchParams(location.search).get('topic');
      if (q && keys[q.toLowerCase()]) topic.value = keys[q.toLowerCase()];
    } catch (e) {}
    setHelp(false);
    topic.addEventListener('change', function () { setHelp(true); });
  }

  /* ---- copy the email address ---- */
  var copyBtn = $('[data-copy]');
  if (copyBtn && navigator.clipboard && window.isSecureContext) {
    var label = $('[data-copy-l]', copyBtn), copyT = 0;
    copyBtn.hidden = false;
    copyBtn.setAttribute('aria-label', 'Copy the email address');
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(copyBtn.getAttribute('data-copy')).then(function () {
        label.textContent = 'Copied'; copyBtn.classList.add('is-done');
        clearTimeout(copyT);
        copyT = setTimeout(function () { label.textContent = 'Copy'; copyBtn.classList.remove('is-done'); }, 2200);
      }, function () {});
    });
  }

  /* ---- the message form ---- */
  /* the form and its send label were found above, with the topic */
  if (!form) return;
  var status = $('[data-contact-status]', form), done = $('[data-contact-done]'), again = $('[data-contact-again]');
  var btn = $('[type="submit"]', form);
  var f = function (n) { return form.elements.namedItem(n); };
  var FAIL = 'That did not go through. Please try again, or email stephan@vsgtech.co.za.';
  var SOFT = 'Your message is saved. Delivery to our team is delayed. To make sure it reaches us, please also email stephan@vsgtech.co.za.';

  function err(el, msg) {
    var fld = el.closest('.field'), m = fld && $('.emsg', fld);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (m) {
      m.textContent = msg || ''; m.hidden = !msg;
      if (msg) { m.id = m.id || el.id + '-err'; el.setAttribute('aria-describedby', m.id); }
      else if (el.getAttribute('aria-describedby') === m.id) el.removeAttribute('aria-describedby');
    }
  }
  $$('input,textarea', form).forEach(function (el) {
    el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true' && el.checkValidity()) err(el, ''); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = null;
    $$('input[required],textarea[required]', form).forEach(function (el) {
      var v = el.value.trim();
      if (el.value !== v && el.type !== 'email') el.value = v;
      if (!v || !el.checkValidity()) { err(el, el.getAttribute('data-err')); if (!bad) bad = el; } else err(el, '');
    });
    if (bad) { bad.focus(); return; }
    if (f('company_site') && f('company_site').value) return; /* honeypot */

    var data = {
      name: f('name').value.trim(),
      email: f('email').value.trim(),
      company: f('company').value.trim(),
      phone: f('phone').value.trim(),
      role: f('role').value.trim(),
      topic: f('topic').value,
      message: f('message').value.trim(),
      source: 'contact'
    };

    form.setAttribute('aria-busy', 'true'); form.classList.add('is-sending');
    btn.disabled = true; btnL.textContent = 'Sending';
    status.className = 'w-form-status'; status.textContent = '';

    fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
      .then(function (res) {
        if (!res || !res.ok) throw new Error('failed');
        /* saved but not emailed: keep the form and its text visible, and say so */
        if (res.delivered === false) { status.className = 'w-form-status is-err'; status.textContent = SOFT; return; }
        form.reset(); setHelp(false);
        form.hidden = true; done.hidden = false;
        done.classList.remove('is-in'); void done.offsetWidth; done.classList.add('is-in');
        done.focus({ preventScroll: true });
        var top = done.getBoundingClientRect().top;
        if (top < 80 || top > window.innerHeight - 120) done.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' });
      })
      .catch(function () {
        status.className = 'w-form-status is-err';
        status.textContent = FAIL;
      })
      .then(function () {
        form.removeAttribute('aria-busy'); form.classList.remove('is-sending');
        btn.disabled = false; btnL.textContent = sendLabel;
      });
  });

  if (again) again.addEventListener('click', function () {
    done.hidden = true; form.hidden = false;
    status.className = 'w-form-status'; status.textContent = '';
    f('name').focus();
  });
})();
