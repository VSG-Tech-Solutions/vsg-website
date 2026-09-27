/* About page behaviour. The HTML shows the settled state; this only adds motion and small toys.
   Karoo Industrial Supply sample data (site-src/copy/_demo-data.md). */
(function () {
  'use strict';
  var VSG = window.VSG || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };

  /* ---- Sign-off model: a proposal waits, the cobalt disc lands on it, then the next one ---- */
  var sign = $('[data-sign]');
  if (sign && VSG.every && !VSG.reduced) {
    var cards = [
      { s: 'Stock', t: 'Reorder conveyor belt EP400 today', a: 'R 412 800', w: 'Runs out in 3 weeks. The next delivery is 5 weeks away.', r: 'Stock on hand, open orders, sales history', n: 'Reorder drafted', p: 'L. Botha' },
      { s: 'Suppliers', t: 'Query the Highveld Cable invoice', a: 'R 12 480', w: 'Billed for 120 units. 96 received.', r: 'PO-20518, delivery note DN-7731, INV-20874', n: 'Supplier query drafted', p: 'M. van Wyk' },
      { s: 'Customers', t: 'Call Breede Irrigation today', a: 'R 312 400', w: '67 days overdue. Promised payment last Friday.', r: 'Customer account, INV-20911, INV-20935', n: 'Email drafted', p: 'T. Naidoo' }
    ];
    var elT = $('[data-sign-t]', sign), elA = $('[data-sign-amt]', sign), elW = $('[data-sign-why]', sign), elS = $('[data-sign-st]', sign), elR = $('[data-sign-refs]', sign), elN = $('[data-sign-next]', sign), elSrc = $('[data-sign-src]', sign);
    var stage = $('.a-sign-stage', sign), i = 0, landT = 0;
    function land() {
      clearTimeout(landT);
      if (!sign.classList.contains('is-away')) return;
      sign.classList.remove('is-away');
      elS.textContent = 'Signed off, ' + cards[i].p;
    }
    function next() {
      /* the disc lifts away, the next proposal arrives, then a person signs it off */
      sign.classList.add('is-away');
      elS.textContent = 'Waiting for a person';
      setTimeout(function () {
        sign.classList.add('is-swap');
        setTimeout(function () {
          i = (i + 1) % cards.length;
          elT.textContent = cards[i].t; elA.textContent = cards[i].a; elW.textContent = cards[i].w; elR.textContent = cards[i].r; if (elN) elN.textContent = cards[i].n; if (elSrc) elSrc.textContent = cards[i].s;
          sign.classList.remove('is-swap');
        }, 240);
      }, 700);
      landT = setTimeout(land, 3000);
    }
    VSG.every(sign, 7200, next);
    stage.addEventListener('click', land);
  }

  /* ---- Rule 2: approve the sample proposal ---- */
  var ap = $('[data-approve]');
  if (ap) {
    var btn = $('[data-approve-btn]', ap), done = $('[data-approve-done]', ap), resetT = 0;
    btn.addEventListener('click', function () {
      btn.hidden = true; done.hidden = false;
      var st = $('.st', done); if (st) { st.setAttribute('tabindex', '-1'); st.focus({ preventScroll: true }); }
      clearTimeout(resetT);
      resetT = setTimeout(function () {
        var had = ap.contains(document.activeElement);
        btn.hidden = false; done.hidden = true;
        if (had) btn.focus({ preventScroll: true });
      }, 6000);
    });
    done.setAttribute('role', 'status');
  }

  /* ---- Rule 1: rows read ticks up now and then, rows written stays at zero ---- */
  var read = $('[data-ro-read]');
  if (read && VSG.every) {
    var n = 48210;
    read._vsgVal = n; read.setAttribute('data-format', 'int');
    VSG.every(read, 4800, function () { var to = n + 40 + Math.round(Math.random() * 160); VSG.countTo(read, to, { from: n, dur: 600 }); n = to; });
  }

  /* ---- Story: type the question, then walk the months of cover ---- */
  var cover = $('[data-cover]');
  if (cover && VSG.watch) {
    var ask = $('.a-ask'), q = ask && $('.a-ask-q', ask);
    var note = $('[data-cover-note]', cover), noteBox = note && note.parentNode;
    var notes = [
      'October. The conveyor belt is already under a month of cover. It goes on the plan.',
      'November. The belt is down to 0.2 months. The planned order covers it.',
      'December. Without the planned order, the conveyor belt runs out.',
      'January. PVC pipe drops below the 2.0 target. It goes on the December plan.',
      'February. PVC pipe is at 1.1 months. The December order covers it.'
    ];
    var m = -1, started = false;
    function show(k) {
      m = k;
      [].forEach.call(cover.querySelectorAll('[data-m]'), function (c) { c.classList.toggle('is-now', +c.getAttribute('data-m') === k); });
      if (!note) return;
      noteBox.classList.add('is-swap');
      setTimeout(function () { note.textContent = notes[k]; noteBox.classList.remove('is-swap'); }, 200);
    }
    if (!VSG.reduced) {
      VSG.watch(cover, function (v) {
        if (!v || started) return;
        started = true;
        if (q && VSG.type) {
          var text = q.textContent;
          ask.classList.add('is-typing');
          VSG.type(q, text, { speed: 42, done: function () { ask.classList.remove('is-typing'); show(0); } });
        } else show(0);
      });
      VSG.every(cover, 4400, function () { if (started) show((m + 1) % 5); });
    }
  }
})();
