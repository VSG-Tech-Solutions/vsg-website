/* VSG Endorse page behaviour. Loads after site.js, so window.VSG exists.
   1. The approval inbox: plays a calm morning (approve, clear, new jobs arrive) while on
      screen; a click on Approve, Reject or Sources hands control to the visitor.
   2. Automations we build: one item always open, a slow self-tour on wide screens until touched.
   3. Anatomy callouts: a tap pins the highlight (hover and focus work in CSS alone).
   4. Accuracy squares fill once in view.
   5. Built around your business: the Distributor / Manufacturer / Retailer switch steps on its own
      while in view, until the visitor picks one. The switch itself is native radios and CSS.
   Without JS every piece shows its settled state; under reduced motion nothing loops. */
(function () {
  'use strict';
  var V = window.VSG, d = document;
  if (!V) return;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };

  /* ------------------------------------------------------ 1. inbox */
  (function () {
    var box = $('[data-inbox]'); if (!box) return;
    var props = $$('.e-prop', box), totalEl = $('[data-total]', box), waitEl = $('[data-wait]', box),
        waitNav = $('[data-wait-nav]', box), empty = $('[data-empty]', box), live = $('[data-live]'),
        dets = $$('.e-det-p', box);
    var total = 0, phase = 'approve', user = false, clearT = 0, stop = null;

    props.forEach(function (li) {
      li._state = 'wait';
      var st = $('[data-done] .st', li);
      li._doneHTML = st.innerHTML; li._doneCls = st.className;
    });

    function shown() { return props.filter(function (li) { return !li.hidden; }); }
    function waiting() { return shown().filter(function (li) { return li._state === 'wait'; }); }
    function sync() {
      var n = waiting().length;
      waitEl.textContent = n; if (waitNav) waitNav.textContent = n;
    }
    function setTotal(v, animate) {
      total = v;
      if (animate) V.countTo(totalEl, v, { dur: 900 });
      else { totalEl._vsgVal = v; totalEl.textContent = V.fmtR(v); }
    }
    function select(li) {
      props.forEach(function (p) { p.classList.toggle('is-sel', p === li); });
      dets.forEach(function (s) { s.hidden = s.getAttribute('data-for') !== li.getAttribute('data-id'); });
    }
    function btns(li, on) { $$('[data-act="approve"],[data-act="reject"]', li).forEach(function (b) { b.hidden = !on; }); }
    function resolve(li, ok, byUser) {
      if (li._state !== 'wait') return;
      li._state = ok ? 'ok' : 'no';
      li.classList.add(ok ? 'is-ok' : 'is-no');
      var focused = li.contains(d.activeElement);
      btns(li, false);
      var done = $('[data-done]', li), st = $('.st', done);
      if (!ok) { st.className = 'st st-n'; st.textContent = 'Rejected, noted in the log'; }
      done.hidden = false;
      if (focused) { var src = $('[data-act="src"]', li); if (src) src.focus({ preventScroll: true }); }
      if (ok) setTotal(total + (+li.getAttribute('data-amount')), true);
      sync();
      if (byUser && live) live.textContent = (ok ? 'Approved ' : 'Rejected ') + li.getAttribute('data-name') + '. Approved today ' + V.fmtR(total) + '.';
      if (byUser && !waiting().length) { clearTimeout(clearT); clearT = setTimeout(clear, 2200); }
    }
    function press(li) {
      var b = $('[data-act="approve"]', li);
      if (!b) return resolve(li, true);
      b.classList.add('is-press');
      setTimeout(function () { b.classList.remove('is-press'); resolve(li, true); }, 160);
    }
    function reset(li) {
      li._state = 'wait';
      li.classList.remove('is-ok', 'is-no', 'is-out', 'is-new');
      btns(li, true);
      var done = $('[data-done]', li), st = $('.st', done);
      st.className = li._doneCls; st.innerHTML = li._doneHTML; done.hidden = true;
    }
    function clear() {
      var s = shown(); if (!s.length) return;
      s.forEach(function (li) { li.classList.add('is-out'); });
      setTimeout(function () {
        s.forEach(function (li) { li.hidden = true; });
        empty.hidden = false; sync();
      }, V.reduced ? 0 : 240);
    }
    function slideIn(li) {
      reset(li); empty.hidden = true; li.hidden = false;
      if (!V.reduced) {
        li.classList.add('is-new');
        li.addEventListener('animationend', function f() { li.classList.remove('is-new'); li.removeEventListener('animationend', f); });
      }
      sync();
    }
    function newDay() { setTotal(0, false); }

    function tick() {
      if (user) return;
      if (phase === 'fill') {
        var hidden = props.filter(function (li) { return li.hidden; });
        if (hidden.length) {
          if (hidden.length === props.length) newDay();
          slideIn(hidden[0]);
          if (hidden.length === props.length) select(hidden[0]);
          if (hidden.length === 1) phase = 'approve';
          return;
        }
        phase = 'approve';
      }
      var w = waiting();
      if (w.length) { select(w[0]); press(w[0]); return; }
      clear(); phase = 'fill';
    }
    stop = V.every(box, 5000, tick);

    function takeOver() { if (!user) { user = true; if (stop) stop(); } }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act],[data-replay]'); if (!b) return;
      takeOver();
      if (b.hasAttribute('data-replay')) {
        clearTimeout(clearT); newDay();
        props.forEach(function (li, i) { li.hidden = true; setTimeout(function () { slideIn(li); if (!i) select(li); }, V.reduced ? 0 : i * 120); });
        var first = props[0]; setTimeout(function () { var a = $('[data-act="approve"]', first); if (a) a.focus({ preventScroll: true }); }, V.reduced ? 0 : 60);
        if (live) live.textContent = 'Three jobs are waiting again.';
        return;
      }
      var li = b.closest('.e-prop'); if (!li) return;
      var act = b.getAttribute('data-act');
      select(li);
      if (act === 'approve') resolve(li, true, true);
      else if (act === 'reject') resolve(li, false, true);
    });
  })();

  /* --------------------------------------------- 2. automations we build */
  (function () {
    var auto = $('[data-auto]'); if (!auto) return;
    var items = $$('.e-acc-i', auto), touched = false;
    items.forEach(function (it) {
      it.addEventListener('toggle', function () {
        if (it.open) items.forEach(function (o) { if (o !== it && o.open) o.open = false; });
      });
      var sum = $('summary', it);
      sum.addEventListener('click', function (e) {
        if (e.isTrusted) stopTour();
        if (it.open) e.preventDefault();          /* one item always stays open */
      });
      sum.addEventListener('keydown', stopTour);
      var bar = $('.e-prog i', it);
      if (bar) bar.addEventListener('animationend', function () {
        if (touched || !it.open) return;
        var next = items[(items.indexOf(it) + 1) % items.length];
        next.open = true;
      });
    });
    function stopTour() { touched = true; auto.classList.remove('is-tour'); }
    var wide = window.matchMedia('(min-width: 961px)');
    function arm() { if (!touched && !V.reduced && wide.matches) auto.classList.add('is-tour'); else auto.classList.remove('is-tour'); }
    V.watch(auto, function (v) { if (v) arm(); });
    wide.addEventListener('change', arm);
  })();

  /* ------------------------------------------------ 3. anatomy callouts */
  (function () {
    var calls = $$('[data-anat] .e-call');
    calls.forEach(function (c) {
      c.addEventListener('click', function () {
        var on = c.getAttribute('aria-pressed') !== 'true';
        calls.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    });
  })();

  /* ------------------------------------------------- 4. accuracy squares */
  (function () {
    var acc = $('[data-accu]'); if (!acc) return;
    $$('.e-sq li', acc).forEach(function (li, i) { li.style.setProperty('--i', i); });
    if (V.reduced) { acc.classList.add('is-on'); return; }
    var done = false;
    V.watch(acc, function (v) { if (v && !done) { done = true; setTimeout(function () { acc.classList.add('is-on'); }, 200); } });
  })();

  /* ------------------------------------ 5. built around your business */
  (function () {
    var fit = $('[data-fit]'); if (!fit) return;
    var radios = $$('.e-seg-r', fit), stop = null;
    function halt() { if (stop) { stop(); stop = null; } }
    radios.forEach(function (r) {
      r.addEventListener('change', halt);   /* only a visitor's pick fires change */
      r.nextElementSibling.addEventListener('pointerdown', halt);
    });
    fit.addEventListener('focusin', halt);
    stop = V.every(fit, 3600, function () {
      var i = radios.findIndex(function (r) { return r.checked; });
      var n = radios[(i + 1) % radios.length];
      n.checked = true;
    });
  })();
})();
