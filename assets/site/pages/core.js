/* VSG Core page: the ERP-to-business map and the layered trace.
   Without JS: every map line is neutral, every trace connector is drawn and all sources show. */
(function () {
  'use strict';
  var V = window.VSG, d = document;
  if (!V) return;
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };

  /* ---- the map: one pair lights every 4.2s; hover a row to hold it ---- */
  var map = d.querySelector('[data-c-map]');
  if (map) {
    var groups = $$('.c-mp-g', map), gi = 0, hold = false;
    var setG = function (k) { groups.forEach(function (g, j) { g.classList.toggle('is-on', j === k); }); };
    setG(0);
    V.every(map, 4200, function () { if (!hold) { gi = (gi + 1) % groups.length; setG(gi); } });
    groups.forEach(function (g, j) {
      g.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'mouse') return; hold = true; gi = j; setG(j); });
      g.addEventListener('pointerleave', function () { hold = false; });
    });
  }

  /* ---- the trace: figure, how it is built, where it came from ---------- */
  var tr = d.querySelector('[data-c-trace]');
  if (!tr) return;
  var go = tr.querySelector('[data-c-go]'), say = tr.querySelector('[data-c-say]');
  var lines = $$('.c-bl', tr), srcs = $$('.c-src', tr), steps = $$('[data-c-step]');
  var timers = [], touched = false, demoI = -1;
  var STEP_MS = 260;

  tr.classList.add('is-armed');
  if (V.reduced) level(3);
  function level(n) {
    tr.classList.toggle('is-l1', n >= 1); tr.classList.toggle('is-l2', n >= 2); tr.classList.toggle('is-l3', n >= 3);
    steps.forEach(function (s) { s.classList.toggle('is-on', +s.getAttribute('data-c-step') <= n); });
  }
  function select(b) {
    lines.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    var keys = b ? b.getAttribute('data-src').split(' ') : [];
    tr.classList.toggle('has-sel', !!b);
    srcs.forEach(function (s) { s.classList.toggle('is-hit', keys.indexOf(s.getAttribute('data-k')) > -1); });
  }
  function clear() { timers.forEach(clearTimeout); timers = []; }
  function trace(announce) {
    clear(); select(null);
    if (V.reduced) { level(3); }
    else {
      level(1);
      timers.push(setTimeout(function () { level(2); }, STEP_MS));
      timers.push(setTimeout(function () { level(3); }, STEP_MS * 2));
    }
    if (announce && say) say.textContent = 'R 18 808 adds up from four parts: supplier price, duty, clearing and freight. They come from quote Q-0418-A, the rates your buyer set, and item PMP-CF-50 in your ERP.';
  }

  go.addEventListener('click', function () { touched = true; trace(true); });
  lines.forEach(function (b) {
    b.addEventListener('click', function () {
      touched = true; clear(); level(3);
      var on = b.getAttribute('aria-pressed') === 'true';
      select(on ? null : b);
      if (say) say.textContent = on ? '' : b.getAttribute('data-say');
    });
  });

  /* first time in view: trace once by itself, then walk the lines slowly until someone clicks */
  var seen = false;
  V.watch(tr, function (v) {
    if (!v || seen) return;
    seen = true;
    if (V.reduced) { level(3); return; }
    timers.push(setTimeout(function () { if (!touched) trace(false); }, 700));
  });
  V.every(tr, 4400, function () {
    if (touched || !tr.classList.contains('is-l3')) return;
    demoI = (demoI + 1) % (lines.length + 1);
    select(demoI < lines.length ? lines[demoI] : null);
  });
})();

/* 4b. see it all: open the debtors figure, pick an account, show its page */
(function () {
  var see = document.querySelector('[data-c-see]'); if (!see) return;
  var kpi = see.querySelector('[data-c-kpi]');
  var accs = see.querySelectorAll('[data-c-acc]');
  var pages = see.querySelectorAll('[data-c-page]');
  if (kpi) kpi.addEventListener('click', function () {
    var open = !see.classList.contains('is-open');
    see.classList.toggle('is-open', open);
    kpi.setAttribute('aria-expanded', String(open));
    var em = kpi.querySelector('em'); if (em) em.textContent = open ? 'Hide the accounts' : 'Show the accounts';
  });
  accs.forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-c-acc');
      accs.forEach(function (x) { x.classList.toggle('is-on', x === b); });
      pages.forEach(function (p) { p.hidden = p.getAttribute('data-c-page') !== id; });
    });
  });
})();

/* 4. a personal view per role: each tab shows its own pane */
(function () {
  var rv = document.querySelector('[data-c-rv]'); if (!rv) return;
  var tabs = rv.querySelectorAll('[data-c-rv]'), panes = rv.querySelectorAll('[data-c-rv-p]');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var id = t.getAttribute('data-c-rv');
      tabs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); });
      panes.forEach(function (p) { p.hidden = p.getAttribute('data-c-rv-p') !== id; });
    });
  });
})();
