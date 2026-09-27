/* VSG Procure page behaviour. Runs after site.js, so window.VSG exists.
   Every piece reads correctly without this file: the HTML carries the settled state.
   Loops use VSG.every (only on screen, tab visible, never under reduced motion). */
(function () {
  'use strict';
  var V = window.VSG; if (!V) return;
  var d = document;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var R = function (n) { return V.fmtR(n); };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* ---------------------------------------------- hero: the Analysis screen comes alive */
  (function hero() {
    var win = $('[data-hero-plan]'); if (!win) return;
    var shot = win.closest('.p-hshot') || d;
    var rows = $$('tbody tr', win), insp = $('[data-insp]', shot), traced = $('[data-hero-traced]', win);
    var risk = $('[data-risk-out]', win);
    var ST = { ok: 'st-ok', x: 'st-x', a: 'st-a', n: 'st-n', w: 'st-w' };
    var DATA = [
      { code: 'PMP-CF-50', title: 'The 50mm pump dips below target in October',
        text: '60 pumps are planned for November. Cover dips again in February, so the next order is due.',
        opts: [['Import A', 'Q-0418-A', 'a', R(18808)], ['Local supplier', 'Q-0415-L', 'n', R(19370)]], btn: 'Compare quotes' },
      { code: 'CVB-EP400-3P', title: 'The conveyor belt runs out in January',
        text: 'The 1 200 m on order for October is not enough. Cover falls under one month in November.',
        opts: [['On order', 'October', 'a', '1 200 m'], ['Planned', 'none yet', 'x', '0 m']], btn: 'Add to plan' },
      { code: 'FST-M12-HX', title: 'Hex bolts hold 4.8 months of stock',
        text: 'That is 2.8 months above your 2.0 target: ' + R(186200) + ' of cash tied up on the shelf. Nothing is planned until February.',
        opts: [['Above target', '2.8 mo', 'w', R(186200)], ['Planned', 'next 4 months', 'n', 'None']], btn: 'View cash unlockable' }
    ];
    var k = 0, hold = false;
    function show(i) {
      var row = rows[i], dd = DATA[i]; if (!row || !dd || !insp) return;
      rows.forEach(function (r) { r.classList.toggle('sel', r === row); });
      insp.classList.add('is-swap');
      setTimeout(function () {
        $('[data-i="code"]', insp).textContent = dd.code;
        $('[data-i="title"]', insp).textContent = dd.title;
        $('[data-i="text"]', insp).textContent = dd.text;
        $('[data-i="opts"]', insp).innerHTML = dd.opts.map(function (o) {
          return '<li><b>' + esc(o[0]) + '</b><span class="mono">' + esc(o[1]) + '</span><span class="st ' + ST[o[2]] + '"><i></i>' + esc(o[3]) + '</span></li>';
        }).join('');
        $('[data-i="btn"]', insp).textContent = dd.btn;
        insp.classList.remove('is-swap');
      }, V.reduced ? 0 : 180);
    }
    rows.forEach(function (r, i) {
      if (i > 2) return;
      r.addEventListener('pointerenter', function (e) { if (e.pointerType !== 'mouse') return; hold = true; k = i; show(i); });
      r.addEventListener('pointerleave', function () { hold = false; });
    });

    /* the month advances across the months-of-cover heat map; the stock-out lane ticks with it */
    var cells = $$('[data-hm]', win), RISK = [3, 3, 4, 5, 7], m = -1;
    function month(n) {
      m = n;
      cells.forEach(function (c) {
        var h = +c.getAttribute('data-hm');
        c.classList.toggle('is-now', h === n);
        if (c.tagName === 'TD') c.classList.toggle('is-past', h < n);
      });
      if (risk && risk.textContent !== String(RISK[n])) {
        risk.textContent = RISK[n]; risk.classList.add('is-tick');
        setTimeout(function () { risk.classList.remove('is-tick'); }, 200);
      }
    }
    var tick = 0;
    V.watch(win, function (v) { if (v) win.classList.add('is-drawn'); });
    if (!V.reduced) {
      month(0);
      V.every(win, 2600, function () {
        tick++;
        month(m >= 4 ? 0 : m + 1);
        if (tick % 2 === 0 && !hold) { k = (k + 1) % DATA.length; show(k); }
      });
    } else { win.classList.add('is-drawn'); if (risk) risk.textContent = '5'; }
    if (traced && !V.reduced) { traced.textContent = '0'; setTimeout(function () { V.countTo(traced, 14, { from: 0, dur: 1300 }); }, 700); }
  })();

  /* ---------------------------------------------- tour: the sticky sub-nav follows the panels */
  (function tour() {
    var nav = $('.p-tnav'); if (!nav || !('IntersectionObserver' in window)) return;
    var links = $$('a', nav), list = $('ol', nav);
    function set(id) {
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + id;
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        if (on && list.scrollWidth > list.clientWidth + 4) list.scrollTo({ left: Math.max(0, a.parentNode.offsetLeft - 24), behavior: V.reduced ? 'auto' : 'smooth' });
      });
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) set(e.target.id); });
    }, { rootMargin: '-38% 0px -58% 0px' });
    links.forEach(function (a) { var p = d.getElementById(a.getAttribute('href').slice(1)); if (p) io.observe(p); });
  })();

  /* ---------------------------------------------- 4a. months of cover: the month advances */
  (function grid() {
    var g = $('[data-grid]'); if (!g) return;
    var btns = $$('.p-mb', g), note = $('[data-g-note]', g), noteBox = note && note.parentNode;
    var NOTES = [
      '<b>October.</b> The conveyor belt is already under one month of cover. Your buyer plans 1 200 m.',
      '<b>November.</b> The 50mm pump drops below target. Your buyer plans 60 for November.',
      '<b>December.</b> Without new orders, the conveyor belt runs out. The belt sits at the top of the stock-out list.',
      '<b>January.</b> PVC pipe and bearings drop below target. Both are planned for December.',
      '<b>February.</b> Every item below target now has an order planned. Nothing runs out unseen.'
    ];
    var m = -1, auto = true;
    function setM(n) {
      m = n;
      $$('[data-m]', g).forEach(function (el) {
        if (el.tagName !== 'TD') return;
        var c = +el.getAttribute('data-m');
        el.classList.toggle('is-past', n > -1 && c < n);
        el.classList.toggle('is-now', c === n);
      });
      btns.forEach(function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-m') === n ? 'true' : 'false'); });
      if (n < 0 || !note) return;
      noteBox.classList.add('is-swap');
      setTimeout(function () { note.innerHTML = NOTES[n]; noteBox.classList.remove('is-swap'); }, V.reduced ? 0 : 160);
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () { auto = false; var n = +b.getAttribute('data-m'); setM(m === n ? -1 : n); if (m === -1) note.innerHTML = NOTES[2]; });
    });
    var started = false;
    V.watch(g, function (v) { if (v && !started && !V.reduced) { started = true; setM(0); } });
    V.every(g, 4000, function () { if (!auto) return; setM(m >= 4 ? 0 : m + 1); });
  })();

  /* ---------------------------------------------- 4b. RFQ Import: the supplier quote drops in, line by line */
  (function rfq() {
    var w = $('[data-rfq]'); if (!w || V.reduced) return;
    if (w.getBoundingClientRect().top < window.innerHeight) return;   /* already on screen at load: stay settled */
    var rows = $$('tbody tr', w), tot = $('[data-rq-total]', w);
    w.classList.add('is-armed');
    if (tot) { tot._vsgVal = 0; tot.textContent = R(0); }
    var done = false;
    V.watch(w, function (v) {
      if (!v || done) return;
      done = true;
      setTimeout(function () {
        w.classList.remove('is-armed');
        rows.forEach(function (r) { r.classList.add('is-armed-row'); r.querySelectorAll('.p-rq-q,.p-rq-l,.p-rq-v').forEach(function (c) { c.style.opacity = '0'; }); });
        rows.forEach(function (r, i) {
          setTimeout(function () {
            r.querySelectorAll('.p-rq-q,.p-rq-l,.p-rq-v').forEach(function (c) { c.style.opacity = ''; });
            r.classList.add('is-in');
            setTimeout(function () { r.classList.remove('is-in'); }, 700);
          }, 420 + i * 260);
        });
        if (tot) setTimeout(function () { V.countTo(tot, 2285360, { from: 0, dur: 1100 }); }, 420);
      }, 300);
    });
  })();

  /* ---------------------------------------------- 4c. landed cost: the rate recalculates */
  (function landed() {
    var w = $('[data-landed]'); if (!w) return;
    var segB = $$('[data-rate]', w), note = $('[data-l="note"]', w);
    var USD_A = 812, USD_B = (18506 - 1850) / 1.135 / 18.40, FREIGHT = 1850, LOCAL = 19370;
    var el = {}; ['landed', 'landed2', 'sup', 'duty', 'clr', 'b', 'rate'].forEach(function (k) { el[k] = $('[data-l="' + k + '"]', w); });
    var cur = 18.40;
    function calc(rate) {
      var sup = Math.round(USD_A * rate), duty = Math.round(sup * 0.10), clr = Math.round(sup * 0.035);
      var sb = USD_B * rate;
      return { sup: sup, duty: duty, clr: clr, landed: sup + duty + clr + FREIGHT, b: Math.round(sb * 1.135 + FREIGHT) };
    }
    function roll(e, to) { if (e) V.countTo(e, to, { dur: 240 }); }
    function setRate(rate) {
      if (rate === cur) return;
      cur = rate;
      var c = calc(rate);
      segB.forEach(function (b) { var on = +b.getAttribute('data-rate') === rate; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      roll(el.landed, c.landed); roll(el.landed2, c.landed); roll(el.sup, c.sup); roll(el.duty, c.duty); roll(el.clr, c.clr); roll(el.b, c.b);
      if (el.rate) el.rate.textContent = rate.toFixed(2);
      if (note) note.innerHTML = 'At ' + rate.toFixed(2) + ', Import A covers the full order and beats the local supplier by <b class="w-num">' + R(LOCAL - c.landed) + '</b> a pump.';
    }
    ['landed2', 'sup', 'duty', 'clr', 'b'].forEach(function (k) { var c = calc(18.40); if (el[k]) el[k]._vsgVal = k === 'landed2' ? c.landed : c[k]; });
    segB.forEach(function (b) { b.addEventListener('click', function () { setRate(+b.getAttribute('data-rate')); }); });
    /* no auto-cycle: 18.40 is the settled state everywhere on the page; the rate switches only on a click.
       The Import A figure counts up once from the supplier price as it enters view (data-count in the HTML). */
  })();

  /* ---------------------------------------------- 4d. container: fills once, the suggestion previews */
  (function container() {
    var c = $('[data-container]'); if (!c) return;
    var pct = $('[data-c="pct"]', c), t = $('[data-c="t"]', c), sug = $('[data-sug]', c), add = $('[data-add]', c), done = $('[data-added]', c);
    if (t) { t.setAttribute('data-format', 'int'); }
    var added = false, armed = false;
    if (!V.reduced && c.getBoundingClientRect().top > window.innerHeight) {
      armed = true; c.classList.add('is-armed');
      pct.textContent = '0.0%'; t.textContent = '0';
    }
    var loaded = !armed;
    V.watch(c, function (v) {
      if (!v || loaded) return;
      loaded = true;
      setTimeout(function () {
        c.classList.remove('is-armed'); c.classList.add('is-loaded');
        V.countTo(pct, 86.0, { from: 0, dur: 1200 }); V.countTo(t, 17200, { from: 0, dur: 1200 });
      }, 200);
    });
    function preview(on) { c.classList.toggle('is-preview', on && !added); }
    sug.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') preview(true); });
    sug.addEventListener('pointerleave', function () { preview(false); });
    sug.addEventListener('focusin', function () { preview(true); });
    sug.addEventListener('focusout', function () { preview(false); });
    add.addEventListener('click', function () {
      added = !added;
      c.classList.toggle('is-added', added); c.classList.remove('is-preview');
      add.setAttribute('aria-pressed', added ? 'true' : 'false');
      add.textContent = added ? 'Take it out' : 'Add to this order';
      add.classList.toggle('btn-p', !added); add.classList.toggle('btn-s', added);
      done.hidden = !added;
      V.countTo(pct, added ? 99.8 : 86.0, { dur: 280 }); V.countTo(t, added ? 19950 : 17200, { dur: 280 });
    });
  })();

  /* ---------------------------------------------- 4e. review and order file: explodes on scroll, lines trace to quotes */
  (function orderfile() {
    var f = $('[data-orderfile]'); if (!f) return;
    var of = $('.p-of', f), rig = $('.p-of-rig', f), btns = $$('.p-trace button', f);
    var tiles = $$('.p-of-r[data-q]', f), rs = $$('.p-of-rs', f), qs = $$('.p-of-q[data-q]', f);
    var G0 = 18, G1 = 300, user = false, SETTLED = 4, ci = SETTLED;
    /* one line at a time: card row i, file row i, riser i and the quote it came from (the HTML carries line 5 lit) */
    function hot(i) {
      var q = i >= 0 && btns[i] ? btns[i].getAttribute('data-q') : '';
      of.classList.toggle('is-hot', i >= 0);
      btns.forEach(function (b, k) { b.classList.toggle('is-hot', k === i); });
      tiles.forEach(function (t, k) { t.classList.toggle('is-hot', k === i); });
      rs.forEach(function (r, k) { r.classList.toggle('is-hot', k === i); });
      qs.forEach(function (x) { x.classList.toggle('is-hot', !!q && x.getAttribute('data-q') === q); });
    }
    function take(i) { user = true; ci = i; hot(i); }
    btns.forEach(function (b, i) {
      b.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') take(i); });
      b.addEventListener('focus', function () { take(i); });
      b.addEventListener('click', function () { take(i); });
    });
    tiles.forEach(function (t, i) { t.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') take(i); }); });
    V.watch(f, function (v) { f.classList.toggle('is-run', v); });
    V.every(f, 4200, function () { if (user) return; ci = (ci + 1) % btns.length; hot(ci); });
    if (V.reduced) return;
    var last = -1;
    V.onScroll(function () {
      var r = f.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      var p = clamp((vh * 0.95 - r.top) / Math.max(1, vh * 0.6), 0, 1); p = p * p * (3 - 2 * p);
      var g = Math.round((G0 + (G1 - G0) * p) * 10) / 10;
      if (g !== last) { last = g; rig.style.setProperty('--g', g + 'px'); }
    });
  })();

  /* ---------------------------------------------- 5. the trend: actual sales grow, then the forecast */
  (function trend() {
    var t = $('[data-trend]'); if (!t) return;
    if (V.reduced) { t.classList.add('is-drawn'); return; }
    V.watch(t, function (v) { if (v) t.classList.add('is-drawn'); });
  })();
})();
