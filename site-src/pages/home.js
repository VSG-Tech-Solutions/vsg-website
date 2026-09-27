/* Home page behaviour. Every loop runs through VSG.every, so it only runs on screen,
   with the tab visible, and never under reduced motion. Without JS every illustration
   shows its settled state. */
(function () {
  'use strict';
  var V = window.VSG; if (!V) return;
  var d = document, w = window;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };
  function below(el) { return el.getBoundingClientRect().top > w.innerHeight * 0.9; }
  /* run fn once when enough of el is on screen */
  function onView(el, ratio, fn) {
    if (!('IntersectionObserver' in w)) { fn(); return; }
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { io.disconnect(); fn(); }
    }, { threshold: ratio });
    io.observe(el);
  }

  /* ------------------------------ 1. Endorse card: the approvals inbox */
  (function () {
    var inbox = $('[data-inbox]'); if (!inbox) return;
    var props = $$('.h-prop', inbox), waits = $$('[data-wait]', inbox);
    var totalEl = $('.h-total-v', inbox), status = $('[data-inbox-status]', inbox);
    var total = 0, hold = false;

    function isPending(p) { return !p.classList.contains('is-hidden') && !p.classList.contains('is-ok'); }
    function setWait() { var n = props.filter(isPending).length; waits.forEach(function (e) { e.textContent = n; }); }
    function setActs(p, done) {
      $$('.h-acts .btn', p).forEach(function (b) { b.hidden = done; });
      $('.h-done', p).hidden = !done;
    }
    function approve(p, byUser) {
      if (!isPending(p)) return;
      var hadFocus = p.contains(d.activeElement);
      p.classList.add('is-ok'); setActs(p, true);
      total += +p.getAttribute('data-amt');
      V.countTo(totalEl, total, { dur: 900 });
      setWait();
      if (byUser && status) status.textContent = p.getAttribute('data-name') + ' approved. ' + V.fmtR(total) + ' approved today.';
      if (hadFocus) $('.h-done', p).focus({ preventScroll: true });
      setTimeout(function () {
        p.classList.add('is-gone');
        if (p.contains(d.activeElement)) {
          var next = props.filter(isPending)[0];
          if (next) $('.h-ok', next).focus({ preventScroll: true }); else totalEl.setAttribute('tabindex', '-1'), totalEl.focus({ preventScroll: true });
        }
        /* the column never sits empty: show "All caught up", then the next check brings a new job */
        var shown = props.filter(function (x) { return !x.classList.contains('is-gone') && !x.classList.contains('is-hidden'); });
        var queued = props.filter(function (x) { return x.classList.contains('is-hidden'); });
        if (!shown.length && queued.length) reveal(queued[0]);
        else if (!shown.length) {
          inbox.classList.add('is-empty');
          if (!V.reduced) setTimeout(function () { reset(true); }, 2600);
        }
      }, V.reduced ? 1200 : 1600);
    }
    function reveal(p) {
      p.classList.remove('is-hidden', 'is-new'); void p.offsetWidth; p.classList.add('is-new'); setWait();
    }
    function reset(animate) {
      total = 0; totalEl._vsgVal = 0; totalEl.textContent = V.fmtR(0);
      inbox.classList.remove('is-empty');
      props.forEach(function (p, i) {
        p.classList.remove('is-ok', 'is-gone', 'is-new');
        p.classList.toggle('is-hidden', i > 0);
        setActs(p, false);
      });
      if (animate) { void props[0].offsetWidth; props[0].classList.add('is-new'); }
      setWait();
    }

    props.forEach(function (p) {
      $('.h-ok', p).addEventListener('click', function () { approve(p, true); });
      var sb = $('.h-srcb', p), src = $('.h-src', p);
      sb.addEventListener('click', function () {
        var open = src.hidden; src.hidden = !open; sb.setAttribute('aria-expanded', open ? 'true' : 'false');
        sb.textContent = open ? 'Hide' : 'Why?';
      });
    });
    inbox.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') hold = true; });
    inbox.addEventListener('pointerleave', function () { hold = false; });
    inbox.addEventListener('focusin', function () { hold = true; });
    inbox.addEventListener('focusout', function (e) { if (!inbox.contains(e.relatedTarget)) hold = false; });

    if (V.reduced) return;
    reset();
    V.every(inbox, 4800, function () {
      if (hold || inbox.classList.contains('is-empty')) return;
      var hidden = props.filter(function (p) { return p.classList.contains('is-hidden'); });
      var pend = props.filter(isPending);
      if (pend.length) {
        var b = $('.h-ok', pend[0]);
        b.classList.add('is-press');
        setTimeout(function () { b.classList.remove('is-press'); approve(pend[0], false); }, 220);
      } else if (hidden.length) reveal(hidden[0]);
    });
  })();

  /* --------------------- 2. Procure card: the Analysis grid comes alive */
  (function () {
    var box = $('[data-pgrid]'); if (!box) return;
    var MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
    var ths = $$('[data-m]', box), rows = $$('tbody tr', box), grid = $('.h-pg-grid', box), risk = $('[data-risk]', box);
    var cov = rows.map(function (r) { return r.getAttribute('data-cov').split(' ').map(Number); });
    var off = 0;
    function lv(v) { return v >= 1.5 ? 'lv-ok' : v >= 0.5 ? 'lv-w' : 'lv-x'; }
    function paint() {
      ths.forEach(function (t, j) { t.textContent = MONTHS[off + j]; });
      var n = 0;
      rows.forEach(function (r, i) {
        var tds = $$('td.r[class*="lv-"]', r), low = false;
        tds.forEach(function (td, j) {
          var v = cov[i][off + j];
          td.textContent = v.toFixed(1);
          td.className = 'r ' + lv(v);
          if (v < 0.5) low = true;
        });
        if (low) n++;
      });
      /* the risk lane counts the whole catalogue: these rows plus the ones off screen */
      var next = 2 + n;
      if (risk && +risk.textContent !== next) {
        risk.textContent = next;
        risk.classList.remove('is-tick'); void risk.offsetWidth; risk.classList.add('is-tick');
      }
    }
    if (V.reduced) return;
    if (below(box)) {
      box.classList.add('is-armed');
      onView(box, 0.4, function () { box.classList.add('is-drawn'); });
    }
    V.every(box, 3800, function () {
      off = (off + 1) % 4;
      grid.classList.remove('is-shift'); void grid.offsetWidth; grid.classList.add('is-shift');
      paint();
    });
  })();

  /* ------------------------ 3. Bootcamp card: the leaks add up by day five */
  (function () {
    var box = $('[data-leaks]'); if (!box || V.reduced) return;
    var rows = $$('.h-lk-rows li', box), tot = $('.h-lk-v', box);
    var amts = rows.map(function (r) { return +$('b', r).textContent.replace(/\D/g, ''); });
    function run() {
      box.classList.add('is-armed'); box.classList.remove('is-done');
      rows.forEach(function (r) { r.classList.remove('is-on'); });
      tot._vsgVal = 0; tot.textContent = V.fmtR(0);
      var sum = 0;
      rows.forEach(function (r, i) {
        setTimeout(function () {
          r.classList.add('is-on'); sum += amts[i];
          V.countTo(tot, sum, { dur: 500 });
          if (i === rows.length - 1) setTimeout(function () { box.classList.add('is-done'); }, 600);
        }, 300 + i * 650);
      });
    }
    var started = false;
    V.watch(box, function (v) { if (v && !started) { started = true; run(); } });
    V.every(box, 9000, function () { if (started) run(); });
  })();

  /* ---------------------------------------- 4. ledger lines lift out */
  (function () {
    var led = $('[data-ledger]'); if (!led || V.reduced || !below(led)) return;
    led.classList.add('is-armed');
    onView(led, 0.45, function () {
      $$('.h-row[data-lift]', led).forEach(function (r, i) { setTimeout(function () { r.classList.add('is-lit'); }, 350 + i * 700); });
    });
  })();

  /* ------------------------------------ 5. the AI assistants cycle */
  (function () {
    var box = $('[data-auto]'); if (!box) return;
    var items = $$('.h-au', box), cards = $$('.h-pc', box), idx = Math.max(0, items.indexOf($('.h-au.on', box))), hold = false;
    function sel(i) {
      idx = i;
      items.forEach(function (x, j) { x.classList.toggle('on', j === i); });
      cards.forEach(function (c, j) { c.classList.toggle('is-on', j === i); });
    }
    items.forEach(function (x, i) {
      x.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hold = true; sel(i); } });
    });
    box.addEventListener('pointerleave', function () { hold = false; });
    V.every(box, 4800, function () { if (!hold) sel((idx + 1) % items.length); });
  })();

  /* --------------------- 6. Core: a figure traces down to its ERP line */
  (function () {
    var box = $('[data-trace]'); if (!box || V.reduced) return;
    var steps = [], cards = $$('.h-tr', box), lines = $$('.h-tr-ln', box), hot = -1;
    cards.forEach(function (c, i) { steps.push(c); if (lines[i]) steps.push(lines[i]); });
    if (below(box)) {
      box.classList.add('is-armed');
      onView(box, 0.5, function () {
        steps.forEach(function (el, i) { setTimeout(function () { el.classList.add('is-on'); }, 200 + i * 260); });
      });
    }
    V.every(box, 3200, function () {
      hot = (hot + 1) % (cards.length + 1);
      cards.forEach(function (c, i) { c.classList.toggle('is-hot', i === hot); });
    });
  })();

  /* ------------------------------ 7. Custom: modules drop into place */
  (function () {
    var box = $('[data-slots]'); if (!box || V.reduced) return;
    var mods = $$('.h-mod', box), k = mods.length, rest = 0;
    if (below(box)) {
      mods.forEach(function (m) { m.classList.add('is-off'); }); k = 0;
      onView(box, 0.35, function () { mods.forEach(function (m, i) { setTimeout(function () { m.classList.remove('is-off'); k = Math.max(k, i + 1); }, 250 + i * 450); }); });
    }
    V.every(box, 2600, function () {
      if (k < mods.length) { mods[k++].classList.remove('is-off'); return; }
      if (++rest >= 3) { rest = 0; k = 0; mods.forEach(function (m) { m.classList.add('is-off'); }); }
    });
  })();

  /* ------------------ 8. How it works: the credit controller signs off */
  (function () {
    var box = $('[data-sign]'); if (!box || V.reduced) return;
    var log = $('.h-log', box), on = true;
    V.every(box, 3400, function () {
      on = !on;
      box.classList.toggle('is-wait', !on);
      if (on && log) { log.classList.remove('is-flash'); void log.offsetWidth; log.classList.add('is-flash'); }
    });
  })();

  /* ------------------------------------- 9. Bootcamp: the days fill */
  (function () {
    var art = $('[data-days]'); if (!art || V.reduced || !below(art)) return;
    var days = $$('.h-day', art), legend = $$('.h-dl li', art);
    art.classList.add('is-armed');
    onView(art, 0.4, function () {
      days.forEach(function (day, i) {
        setTimeout(function () {
          day.classList.add('is-on'); if (legend[i]) legend[i].classList.add('is-on');
          if (i === days.length - 1) setTimeout(function () { art.classList.add('is-done'); }, 420);
        }, 300 + i * 700);
      });
    });
  })();

  /* ------------------------- 10. landed cost: the buyer's rate recalculates */
  (function () {
    var fx = $('[data-fx]'); if (!fx) return;
    var LOCAL = 19370, USD = 812, FREIGHT = 1850;
    var btns = $$('[data-rate]', fx), vs = $('[data-fx-vs]', fx);
    function calc(rate) {
      var base = Math.round(USD * rate), duty = Math.round(base * 0.10), clr = Math.round(base * 0.035);
      return { base: base, duty: duty, clr: clr, tot: base + duty + clr + FREIGHT };
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var rate = +b.getAttribute('data-rate'), r = calc(rate);
        btns.forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        $$('[data-fx-v]', fx).forEach(function (el) { V.countTo(el, r[el.getAttribute('data-fx-v')], { dur: 260 }); });
        $$('[data-fx-rate]', fx).forEach(function (el) { el.textContent = rate.toFixed(2); });
        var gap = V.fmtR(LOCAL - r.tot);
        vs.innerHTML = rate === 18.4 ? 'Beats the local supplier by <b>' + gap + '</b> a pump.' : 'Still <b>' + gap + '</b> a pump under the local supplier.';
      });
    });
  })();

  /* ---------------------------------------- 11. the questions window */
  (function () {
    var box = $('[data-ask]'); if (!box) return;
    var inp = $('.h-ask-in', box), qs = $$('.h-q', box), ans = $$('.h-ans', box), none = $('.h-ask-none', box);
    var shown = qs.slice(), sel = 0, touched = false, typing = null, auto = 0;
    function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function show(key) { ans.forEach(function (a) { a.classList.toggle('is-on', a.getAttribute('data-a') === key); }); }
    function mark() {
      qs.forEach(function (q) { q.setAttribute('aria-selected', 'false'); });
      var q = shown[sel];
      if (q) { q.setAttribute('aria-selected', 'true'); inp.setAttribute('aria-activedescendant', q.id); show(q.getAttribute('data-a')); }
      else { inp.removeAttribute('aria-activedescendant'); show('none'); }
    }
    function filter(text) {
      var words = text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(function (x) { return x.length > 1; });
      var lower = text.trim().toLowerCase(), best = -1, bestScore = 0;
      shown = [];
      qs.forEach(function (q) {
        var label = $('span', q), t = label.getAttribute('data-t') || label.textContent;
        label.setAttribute('data-t', t);
        var hay = (t + ' ' + q.getAttribute('data-k')).toLowerCase(), score = 0;
        words.forEach(function (x) { if (hay.indexOf(x) > -1) score++; });
        if (lower && t.toLowerCase().indexOf(lower) === 0) score += 50;
        var hit = !words.length || score > 0;
        q.classList.toggle('is-out', !hit);
        var at = lower.length > 1 ? t.toLowerCase().indexOf(lower) : -1, len = lower.length;
        label.innerHTML = at > -1 ? esc(t.slice(0, at)) + '<mark>' + esc(t.slice(at, at + len)) + '</mark>' + esc(t.slice(at + len)) : esc(t);
        if (hit) { if (score > bestScore) { bestScore = score; best = shown.length; } shown.push(q); }
      });
      none.hidden = shown.length > 0;
      sel = best > -1 ? best : 0; mark();
    }
    function stopAuto() { touched = true; if (typing) { clearTimeout(typing); typing = null; } }
    function typeInto(text, done) {
      var i = 0;
      (function next() {
        inp.value = text.slice(0, i); filter(inp.value);
        if (i++ < text.length) typing = setTimeout(next, 42); else { typing = null; if (done) done(); }
      })();
    }

    qs.forEach(function (q) {
      q.addEventListener('click', function () {
        stopAuto(); var i = shown.indexOf(q); if (i < 0) return; sel = i; mark();
        inp.focus({ preventScroll: true });
      });
    });
    inp.addEventListener('pointerdown', function () { if (!touched) { stopAuto(); inp.value = ''; filter(''); } });
    inp.addEventListener('focus', function () { if (!touched) { stopAuto(); inp.value = ''; filter(''); } });
    inp.addEventListener('input', function () { stopAuto(); filter(inp.value); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); if (!shown.length) return;
        sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length; mark();
      } else if (e.key === 'Enter') { e.preventDefault(); mark(); }
      else if (e.key === 'Escape') { if (inp.value) { inp.value = ''; filter(''); } else inp.blur(); }
    });
    /* "/" jumps to the question box from anywhere on the page */
    d.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      var t = e.target, tag = t && t.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
      e.preventDefault(); stopAuto();
      box.scrollIntoView({ behavior: V.reduced ? 'auto' : 'smooth', block: 'center' });
      inp.focus({ preventScroll: true });
    });

    filter('');
    if (V.reduced) return;
    onView(box, 0.5, function () {
      if (touched) return;
      var order = qs.map(function (q) { return $('span', q).getAttribute('data-t'); });
      typeInto(order[0]);
      V.every(box, 7600, function () {
        if (touched || typing) return;
        auto = (auto + 1) % order.length;
        typeInto(order[auto]);
      });
    });
  })();
})();

