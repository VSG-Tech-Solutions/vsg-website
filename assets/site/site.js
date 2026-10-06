/* vsgtech.co.za behaviour. No dependencies. Every page reads correctly without it.
   Exposes window.VSG with small helpers for page scripts (site-src/README.md):
     VSG.reduced, VSG.fine            media query state
     VSG.watch(el, fn)                fn(true|false) as el enters or leaves the viewport
     VSG.every(el, ms, fn)            run fn every ms while el is on screen and the tab is visible
     VSG.countTo(el, to, opts)        tick a number to a value (rand, int or decimals)
     VSG.fmtR(n) / VSG.fmtN(n, dp)    "R 18 808" / "18 808" with SA spacing
     VSG.type(el, text, opts)         type text into el, returns a cancel function
     VSG.onScroll(fn)                 fn() on scroll and resize, batched per frame
   Loops pause off-screen and when the tab is hidden; reduced motion shows settled states. */
(function () {
  'use strict';
  var d = document, w = window, root = d.documentElement;
  var mqReduce = w.matchMedia('(prefers-reduced-motion: reduce)');
  var mqFine = w.matchMedia('(hover: hover) and (pointer: fine)');
  var VSG = w.VSG = w.VSG || {};
  Object.defineProperty(VSG, 'reduced', { get: function () { return mqReduce.matches; } });
  Object.defineProperty(VSG, 'fine', { get: function () { return mqFine.matches; } });
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var smooth = function (p) { return p * p * (3 - 2 * p); };

  /* ---------------------------------------------------------- viewport */
  var watchers = new Map();
  var io = 'IntersectionObserver' in w ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { var fns = watchers.get(e.target); if (fns) fns.forEach(function (fn) { fn(e.isIntersecting, e); }); });
  }, { rootMargin: '120px 0px' }) : null;
  VSG.watch = function (el, fn) {
    if (!el) return;
    if (!io) { fn(true); return; }
    if (!watchers.has(el)) { watchers.set(el, []); io.observe(el); }
    watchers.get(el).push(fn);
  };
  VSG.every = function (el, ms, fn) {
    var t = 0, on = false, stopped = false;
    function tick() { if (!stopped && on && !d.hidden) fn(); }
    function sync() { clearInterval(t); t = 0; if (!stopped && on && !d.hidden && !VSG.reduced) t = setInterval(tick, ms); }
    VSG.watch(el, function (v) { on = v; sync(); });
    d.addEventListener('visibilitychange', sync);
    return function stop() { stopped = true; clearInterval(t); };
  };

  var scrollFns = [], scrollRaf = 0;
  function runScroll() { scrollRaf = 0; scrollFns.forEach(function (fn) { fn(); }); }
  function kickScroll() { if (!scrollRaf) scrollRaf = requestAnimationFrame(runScroll); }
  VSG.onScroll = function (fn) { scrollFns.push(fn); kickScroll(); };
  w.addEventListener('scroll', kickScroll, { passive: true });
  w.addEventListener('resize', kickScroll, { passive: true });

  /* ------------------------------------------------------------ numbers */
  var NB = ' ';
  VSG.fmtN = function (n, dp) {
    dp = dp || 0;
    var neg = n < 0, s = Math.abs(n).toFixed(dp), p = s.split('.');
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, NB);
    return (neg ? '-' : '') + p.join('.');
  };
  VSG.fmtR = function (n) { return 'R' + NB + VSG.fmtN(Math.round(n)); };
  function fmt(el, v) {
    var f = el.getAttribute('data-format') || 'int', dp = +(el.getAttribute('data-dp') || 0);
    var s = f === 'rand' ? VSG.fmtR(v) : VSG.fmtN(v, f === 'dec' ? (dp || 1) : 0);
    return (el.getAttribute('data-prefix') || '') + s + (el.getAttribute('data-suffix') || '');
  }
  VSG.countTo = function (el, to, opts) {
    opts = opts || {};
    var from = opts.from != null ? opts.from : (el._vsgVal != null ? el._vsgVal : +(el.getAttribute('data-count') || 0));
    var dur = opts.dur || +(el.getAttribute('data-dur') || 900);
    cancelAnimationFrame(el._vsgRaf || 0);
    if (VSG.reduced || dur <= 0) { el._vsgVal = to; el.textContent = fmt(el, to); return; }
    var t0 = performance.now();
    (function step(now) {
      var p = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - p, 3);
      var v = from + (to - from) * e; el._vsgVal = v; el.textContent = fmt(el, v);
      if (p < 1) el._vsgRaf = requestAnimationFrame(step); else { el._vsgVal = to; el.textContent = fmt(el, to); }
    })(t0);
  };
  function initCounts() {
    $$('[data-count]').forEach(function (el) {
      var to = +el.getAttribute('data-count');
      el._vsgVal = to;
      if (VSG.reduced || el.getBoundingClientRect().top < w.innerHeight) return;
      var from = +(el.getAttribute('data-from') || 0);
      el._vsgVal = from; el.textContent = fmt(el, from);
      var done = false;
      VSG.watch(el, function (v, e) { if (v && !done && e && e.intersectionRatio >= 0) { done = true; setTimeout(function () { VSG.countTo(el, to, { from: from }); }, 150); } });
    });
  }

  VSG.type = function (el, text, opts) {
    opts = opts || {};
    var i = 0, t = 0, speed = opts.speed || 45;
    if (VSG.reduced) { el.textContent = text; if (opts.done) opts.done(); return function () {}; }
    el.textContent = '';
    (function next() {
      if (i > text.length) { if (opts.done) opts.done(); return; }
      el.textContent = text.slice(0, i++); t = setTimeout(next, speed);
    })();
    return function () { clearTimeout(t); };
  };

  /* ---------------------------------------------------------------- nav */
  function initNav() {
    var hdr = $('[data-nav]'); if (!hdr) return;
    var nav = $('.w-nav', hdr), bg = $('.w-mm-bg', hdr), items = $$('.w-nav-item', hdr);
    var cur = null, closeT = 0, hoverAt = 0;

    /* stuck shadow: a sentinel at the top of the page, no scroll listener */
    if (io) {
      var s = d.createElement('div'); s.setAttribute('aria-hidden', 'true');
      s.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none';
      d.body.prepend(s);
      new IntersectionObserver(function (es) { hdr.classList.toggle('is-stuck', !es[0].isIntersecting); }, { rootMargin: '48px 0px 0px 0px' }).observe(s);
    }

    function place(item) {
      var panel = $('.w-mm', item), trig = $('.w-nav-trig', item);
      var nr = nav.getBoundingClientRect(), tr = trig.getBoundingClientRect();
      var pw = panel.offsetWidth;
      var left = clamp(tr.left - nr.left - 14, -1, nr.width - pw + 1);
      panel.style.left = left + 'px';
      return { left: left, top: panel.offsetTop, w: pw, h: panel.offsetHeight };
    }
    function open(item, focusFirst) {
      clearTimeout(closeT);
      if (cur === item) { if (focusFirst) { var a0 = $('.w-mm a', item); if (a0) a0.focus(); } return; }
      var g = place(item);
      bg.classList.toggle('is-snap', !cur);
      bg.style.width = g.w + 'px'; bg.style.height = g.h + 'px';
      bg.style.transform = 'translate(' + g.left + 'px,' + g.top + 'px)';
      if (!cur) void bg.offsetWidth;
      bg.classList.add('is-open');
      if (cur) { $('.w-mm', cur).classList.remove('is-open'); $('.w-nav-trig', cur).setAttribute('aria-expanded', 'false'); }
      cur = item;
      $('.w-mm', item).classList.add('is-open');
      $('.w-nav-trig', item).setAttribute('aria-expanded', 'true');
      if (focusFirst) { var a = $('.w-mm a', item); if (a) a.focus(); }
    }
    function close(focusTrig) {
      clearTimeout(closeT);
      if (!cur) return;
      var item = cur; cur = null;
      $('.w-mm', item).classList.remove('is-open');
      var t = $('.w-nav-trig', item); t.setAttribute('aria-expanded', 'false');
      bg.classList.remove('is-open');
      if (focusTrig) t.focus();
    }
    items.forEach(function (item) {
      var trig = $('.w-nav-trig', item);
      trig.addEventListener('click', function () {
        if (cur === item && performance.now() - hoverAt > 450) close(false); else open(item, false);
      });
      trig.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); open(item, true); }
      });
      trig.addEventListener('pointerenter', function (e) {
        if (e.pointerType !== 'mouse') return;
        clearTimeout(closeT);
        if (cur !== item) hoverAt = performance.now();
        open(item, false);
      });
      $('.w-mm', item).addEventListener('keydown', function (e) {
        var links = $$('.w-mm a', item), i = links.indexOf(d.activeElement);
        if (e.key === 'ArrowDown' && i > -1) { e.preventDefault(); links[(i + 1) % links.length].focus(); }
        if (e.key === 'ArrowUp' && i > -1) { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
      });
    });
    nav.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { clearTimeout(closeT); closeT = setTimeout(function () { close(false); }, 180); } });
    nav.addEventListener('pointerenter', function () { clearTimeout(closeT); });
    $$('.w-nav-link, .w-nav-cta, .w-logo', nav).forEach(function (a) { a.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') close(false); }); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cur) { var t = cur; close(false); $('.w-nav-trig', t).focus(); } });
    d.addEventListener('pointerdown', function (e) { if (cur && !nav.contains(e.target)) close(false); });
    nav.addEventListener('focusout', function (e) { if (cur && e.relatedTarget && !nav.contains(e.relatedTarget)) close(false); });
    w.addEventListener('resize', function () { if (cur) close(false); });

    /* mobile sheet */
    var sheet = $('#w-sheet'), burger = $('.w-burger', nav);
    if (!sheet || !burger) return;
    function focusables() { return $$('a[href],button:not([disabled])', sheet).filter(function (x) { return x.offsetParent !== null; }); }
    function openSheet() {
      sheet.hidden = false; sheet.classList.add('is-open'); burger.setAttribute('aria-expanded', 'true');
      d.body.style.overflow = 'hidden';
      var c = $('[data-close]', sheet); if (c) c.focus();
    }
    function closeSheet(restore) {
      sheet.classList.remove('is-open'); sheet.hidden = true; burger.setAttribute('aria-expanded', 'false');
      d.body.style.overflow = '';
      if (restore) burger.focus();
    }
    burger.addEventListener('click', openSheet);
    sheet.addEventListener('click', function (e) {
      if (e.target === sheet || e.target.closest('[data-close]')) closeSheet(true);
      else if (e.target.closest('a')) closeSheet(false);
    });
    sheet.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeSheet(true); return; }
      if (e.key !== 'Tab') return;
      var f = focusables(); if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
    });
    w.matchMedia('(min-width: 1061px)').addEventListener('change', function (m) { if (m.matches && !sheet.hidden) closeSheet(false); });
  }

  /* ------------------------------------------------------------- reveal */
  function initReveal() {
    if (!io || VSG.reduced) return;
    var vh = w.innerHeight;
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    function arm(el, i) {
      if (el.getBoundingClientRect().top < vh * 0.94) return;
      if (i) el.style.setProperty('--rv-i', Math.min(i, 4));
      el.classList.add('w-rv'); rio.observe(el);
    }
    $$('[data-reveal]').forEach(function (el) { arm(el, 0); });
    $$('[data-reveal-group]').forEach(function (g) { [].slice.call(g.children).forEach(function (c, i) { arm(c, i); }); });
  }

  /* --------------------------------------------- pause CSS loops off-screen */
  function initPause() {
    $$('.w-glow, [data-pause-offscreen]').forEach(function (el) {
      function set(v) { el.classList.toggle('is-paused', !v || d.hidden); }
      VSG.watch(el, function (v) { el._vis = v; set(v); });
      d.addEventListener('visibilitychange', function () { set(el._vis !== false); });
    });
  }

  /* ------------------------------------------------------------ fit */
  function initFit() {
    var els = $$('.w-fit[data-w]'); if (!els.length || !('ResizeObserver' in w)) return;
    var ro = new ResizeObserver(function (es) { es.forEach(function (e) { fit(e.target); }); });
    els.forEach(function (el) {
      el.style.setProperty('--fit-w', el.getAttribute('data-w') + 'px');
      el.classList.add('is-fit'); ro.observe(el); fit(el);
      var inner = $('.w-fit-in', el); if (inner) ro.observe(inner);
    });
    function fit(el) {
      if (!el.classList.contains('w-fit')) el = el.parentElement;
      var inner = $('.w-fit-in', el); if (!inner) return;
      var dw = +el.getAttribute('data-w'), s = Math.min(1, el.clientWidth / dw);
      inner.style.transform = s < 1 ? 'scale(' + s.toFixed(4) + ')' : '';
      el.style.height = Math.ceil(inner.offsetHeight * s) + 'px';
    }
  }

  /* --------------------------------------- tilt that settles flat on scroll */
  function initTilt() {
    $$('[data-tilt]').forEach(function (fig) {
      var obj = $('.w-tilt-obj', fig) || fig.firstElementChild; if (!obj) return;
      var layers = $$('[data-depth]', obj).map(function (l) { return [l, +l.getAttribute('data-depth')]; });
      var narrow = w.matchMedia('(max-width: 900px)');
      var RX = +(fig.getAttribute('data-rx') || 18), RZ = +(fig.getAttribute('data-rz') || -6), SC = +(fig.getAttribute('data-scale') || 0.92);
      var cur = { t: 0, yaw: 0, pitch: 0 }, par = { yaw: 0, pitch: 0 }, inView = true, raf = 0;
      function target() {
        if (VSG.reduced) return { t: 0, yaw: 0, pitch: 0 };
        var r = fig.getBoundingClientRect(), vh = w.innerHeight;
        var start = vh * (narrow.matches ? 0.98 : 1.02), end = Math.max(72, (vh - r.height) / 2);
        if (narrow.matches) end = Math.max(end, vh * 0.42);
        var t = 1 - smooth(clamp((start - r.top) / (start - end), 0, 1));
        var amp = 1 + 2.5 * t;
        return { t: t, yaw: par.yaw * amp, pitch: par.pitch * amp };
      }
      function apply() {
        var ph = narrow.matches, t = cur.t;
        var rx = (ph ? RX * 0.55 : RX) * t + cur.pitch, rz = (ph ? RZ * 0.5 : RZ) * t, s = 1 - (ph ? (1 - SC) * 0.5 : 1 - SC) * t, zk = ph ? 0.45 : 1;
        var still = t < 0.001 && Math.abs(cur.yaw) < 0.02 && Math.abs(cur.pitch) < 0.02;
        obj.style.transform = still ? '' : 'rotateX(' + rx.toFixed(3) + 'deg) rotateY(' + cur.yaw.toFixed(3) + 'deg) rotateZ(' + rz.toFixed(3) + 'deg) scale(' + s.toFixed(4) + ')';
        layers.forEach(function (l) { var z = l[1] * zk * t; l[0].style.transform = z < 0.05 ? '' : 'translateZ(' + z.toFixed(2) + 'px)'; });
      }
      function frame() {
        raf = 0;
        var g = target(), moving = false;
        ['t', 'yaw', 'pitch'].forEach(function (k) {
          var dv = g[k] - cur[k];
          if (Math.abs(dv) > (k === 't' ? 0.0005 : 0.01)) { cur[k] += dv * 0.14; moving = true; } else cur[k] = g[k];
        });
        apply();
        if (moving) kick();
      }
      function kick() { if (!raf && inView && !d.hidden) raf = requestAnimationFrame(frame); }
      var g0 = target(); cur.t = g0.t; apply();
      VSG.watch(fig, function (v) { inView = v; if (v) kick(); });
      VSG.onScroll(kick);
      fig.addEventListener('pointermove', function (e) {
        if (VSG.reduced || e.pointerType !== 'mouse' || !VSG.fine) return;
        var r = obj.getBoundingClientRect();
        par.yaw = clamp((e.clientX - r.left) / r.width - 0.5, -0.5, 0.5) * 2;
        par.pitch = -clamp((e.clientY - r.top) / r.height - 0.5, -0.5, 0.5) * 1.6;
        kick();
      });
      fig.addEventListener('pointerleave', function () { par.yaw = 0; par.pitch = 0; kick(); });
    });
  }

  /* ------------------------------------------ hover lift and tilt (fine pointers) */
  function initHoverTilt() {
    $$('[data-hover-tilt]').forEach(function (el) {
      var max = +(el.getAttribute('data-hover-tilt') || 4);
      el.addEventListener('pointermove', function (e) {
        if (VSG.reduced || e.pointerType !== 'mouse' || !VSG.fine) return;
        var r = el.getBoundingClientRect();
        var x = clamp((e.clientX - r.left) / r.width - 0.5, -0.5, 0.5), y = clamp((e.clientY - r.top) / r.height - 0.5, -0.5, 0.5);
        el.style.transform = 'perspective(1200px) translateY(-2px) rotateX(' + (-y * max).toFixed(2) + 'deg) rotateY(' + (x * max).toFixed(2) + 'deg)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* --------------------------------------------------------------- flip */
  function initFlip() {
    $$('.w-flip').forEach(function (f) {
      var front = $('.w-flip-front', f), back = $('.w-flip-back', f);
      function set(on, kb) {
        f.classList.toggle('is-flipped', on);
        if (front) { front.inert = on; front.setAttribute('aria-hidden', on ? 'true' : 'false'); }
        if (back) { back.inert = !on; back.setAttribute('aria-hidden', on ? 'false' : 'true'); }
        $$('[data-flip]', f).forEach(function (b) { b.setAttribute('aria-expanded', on ? 'true' : 'false'); });
        if (kb) { var face = on ? back : front, b = face && $('[data-flip]', face); if (b) setTimeout(function () { b.focus({ preventScroll: true }); }, VSG.reduced ? 0 : 260); }
      }
      set(false, false);
      $$('[data-flip]', f).forEach(function (b) { b.addEventListener('click', function (e) { set(!f.classList.contains('is-flipped'), true); }); });
    });
  }

  /* ---------------------------------------------------------- lead forms */
  function initForms() {
    $$('form[data-lead]').forEach(function (form) {
      var status = $('[data-lead-status]', form);
      function err(el, msg) {
        var fld = el.closest('.field'), m = fld && $('.emsg', fld);
        el.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (m) {
          m.textContent = msg || ''; m.hidden = !msg;
          if (msg) { m.id = m.id || (el.id || el.name) + '-err'; el.setAttribute('aria-describedby', m.id); }
          else if (el.getAttribute('aria-describedby') === m.id) el.removeAttribute('aria-describedby');
        }
      }
      $$('input,textarea,select', form).forEach(function (el) { el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true' && el.checkValidity()) err(el, ''); }); });
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var bad = null;
        $$('input,textarea,select', form).forEach(function (el) {
          if (!el.name) return;
          if (!el.checkValidity()) { err(el, el.getAttribute('data-err') || el.validationMessage); if (!bad) bad = el; } else err(el, '');
        });
        if (bad) { bad.focus(); return; }
        var data = { source: form.getAttribute('data-lead') || 'website' }, extra = [];
        new FormData(form).forEach(function (v, k) { if (k === 'company_site') return; if (data[k]) data[k] += ', ' + v; else data[k] = String(v); });
        if (form.company_site && form.company_site.value) return; /* honeypot */
        if (!data.message) {
          Object.keys(data).forEach(function (k) { if (['name', 'email', 'source'].indexOf(k) < 0) extra.push(k + ': ' + data[k]); });
          data.message = (form.getAttribute('data-lead-message') || 'Request from vsgtech.co.za') + (extra.length ? '\n' + extra.join('\n') : '');
        }
        var btn = $('[type="submit"]', form);
        form.setAttribute('aria-busy', 'true'); if (btn) btn.disabled = true;
        if (status) { status.className = 'w-form-status'; status.textContent = 'Sending...'; }
        fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
          .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
          .then(function (res) {
            if (!res || !res.ok) throw new Error(res && res.error || 'failed');
            /* saved but not emailed: keep the form and its text, and say so plainly */
            if (res.delivered === false) { if (status) { status.className = 'w-form-status is-err'; status.textContent = 'Your message is saved. Delivery to our team is delayed. To make sure it reaches us, please also email stephan@vsgtech.co.za.'; } return; }
            if (status) { status.className = 'w-form-status is-ok'; status.textContent = form.getAttribute('data-lead-ok') || 'Thank you. We will reply within one working day.'; }
            form.reset();
          })
          .catch(function (x) {
            if (status) { status.className = 'w-form-status is-err'; status.textContent = (x && x.message && x.message !== 'failed' && x.message.indexOf('fetch') < 0 ? x.message + ' ' : 'That did not send. ') + 'You can also email stephan@vsgtech.co.za.'; }
          })
          .then(function () { form.removeAttribute('aria-busy'); if (btn) btn.disabled = false; });
      });
    });
  }

  /* =================================================================
     3D COMPONENTS
     ================================================================= */

  /* ---- (a) the exploded engine stack ------------------------------------ */
  function initEngines() {
    $$('[data-engine]').forEach(function (P) {
      var stage = $('.w-engine-fig', P);
      var picks = $$('.w-pick', P), apps = $$('.w-tl--app', P), ents = $$('.w-tl--ent', P), people = $$('.w-tl--person', P), risers = $$('.w-rs[data-p]', P);
      var pinned = null, drag = null, dragged = false;
      var ENTS = { procure: 'suppliers stock orders', endorse: 'customers invoices suppliers stock', custom: 'suppliers stock orders customers invoices' };
      picks.forEach(function (b) { if (b.getAttribute('data-ents')) ENTS[b.getAttribute('data-p')] = b.getAttribute('data-ents'); });
      function light(k) {
        P.classList.toggle('is-focus', !!k);
        P.classList.toggle('is-ai', k === 'endorse');
        var es = k ? ENTS[k].split(' ') : [];
        picks.forEach(function (x) { x.classList.toggle('is-hot', x.getAttribute('data-p') === k); });
        apps.forEach(function (x) { x.classList.toggle('is-hot', x.getAttribute('data-p') === k); });
        risers.forEach(function (x) { x.classList.toggle('is-hot', x.getAttribute('data-p') === k); });
        ents.forEach(function (x) { x.classList.toggle('is-hot', es.indexOf(x.getAttribute('data-e')) > -1); });
        people.forEach(function (x) { x.classList.toggle('is-hot', !!k && x.getAttribute('data-for').split(' ').indexOf(k) > -1); });
      }
      function pin(k) { pinned = pinned === k ? null : k; picks.forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-p') === pinned ? 'true' : 'false'); }); }
      picks.forEach(function (t) {
        var k = t.getAttribute('data-p');
        t.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') light(k); });
        t.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') light(pinned); });
        t.addEventListener('focus', function () { light(k); });
        t.addEventListener('blur', function () { light(pinned); });
        t.addEventListener('click', function () { pin(k); light(pinned || (d.activeElement === t ? k : null)); });
      });
      apps.forEach(function (t) {
        var k = t.getAttribute('data-p');
        t.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse' && !drag) light(k); });
        t.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && !drag) light(pinned); });
        t.addEventListener('click', function () { if (dragged) return; pin(k); light(pinned); });
      });

      var ex = 1, rz = 0, rx = 0, vz = 0, vx = 0, running = false, raf = 0, last = '';
      function target() {
        if (VSG.reduced) return 1;
        var r = stage.getBoundingClientRect(), vh = w.innerHeight;
        var p = (vh * 0.95 - r.top) / Math.max(1, vh * 0.75);
        return smooth(clamp(p, 0, 1));
      }
      function apply() {
        var s = ex.toFixed(4) + '|' + rz.toFixed(2) + '|' + rx.toFixed(2);
        if (s === last) return; last = s;
        stage.style.setProperty('--e', ex.toFixed(4));
        stage.style.setProperty('--rz', rz.toFixed(2) + 'deg');
        stage.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      }
      function frame() {
        var tE = target(); ex += (tE - ex) * 0.12; if (Math.abs(tE - ex) < 0.0005) ex = tE;
        if (!drag) {
          if (VSG.reduced) { rz = 0; rx = 0; vz = vx = 0; }
          else {
            vz = (vz + (0 - rz) * 0.06) * 0.74; rz += vz; vx = (vx + (0 - rx) * 0.06) * 0.74; rx += vx;
            if (Math.abs(rz) < 0.01 && Math.abs(vz) < 0.01) { rz = 0; vz = 0; }
            if (Math.abs(rx) < 0.01 && Math.abs(vx) < 0.01) { rx = 0; vx = 0; }
          }
        }
        apply();
        raf = running ? requestAnimationFrame(frame) : 0;
      }
      function start() { if (running) return; running = true; stage.classList.add('is-run'); raf = requestAnimationFrame(frame); }
      function stop() { running = false; stage.classList.remove('is-run'); if (raf) cancelAnimationFrame(raf); raf = 0; }
      ex = target(); apply();
      var inView = false;
      VSG.watch(stage, function (v) { inView = v; v && !d.hidden ? start() : stop(); });
      d.addEventListener('visibilitychange', function () { d.hidden ? stop() : (inView && start()); });

      /* drag to turn: mouse only, clamped, springs back; touch scrolls the page as normal */
      stage.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0 || !VSG.fine || VSG.reduced) return;
        drag = { x: e.clientX, y: e.clientY, z: rz, r: rx, id: e.pointerId, moved: false }; dragged = false;
      });
      w.addEventListener('pointermove', function (e) {
        if (!drag || e.pointerId !== drag.id) return;
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 4) { drag.moved = true; dragged = true; stage.classList.add('is-grab'); try { stage.setPointerCapture(drag.id); } catch (_) {} }
        if (!drag.moved) return;
        rz = clamp(drag.z + dx * 0.1, -22, 22); rx = clamp(drag.r - dy * 0.05, -9, 9); vz = vx = 0;
        if (!running) apply();
      });
      function endDrag() { if (!drag) return; drag = null; stage.classList.remove('is-grab'); setTimeout(function () { dragged = false; }, 0); }
      w.addEventListener('pointerup', endDrag); w.addEventListener('pointercancel', endDrag);
    });
  }

  /* ---- (b) the import lane globe ---------------------------------------- */
  /* Coarse coastlines (lat, lon) for the dotted land; only the Indian Ocean side is ever in view. */
  var LAND = [
    [[35.8,-5.9],[37,10.2],[32.9,13.2],[30.5,19.5],[32.7,23],[31.5,29.9],[31.3,32.3],[27.5,33.8],[22,36.8],[18,38.5],[15.5,39.5],[12.6,43.3],[11.6,43.1],[11.9,51.2],[10,50.8],[5,48.2],[2,45.5],[-1.7,41.5],[-4.7,39.3],[-10.3,40.4],[-15,40.7],[-20,35],[-24.5,35.4],[-25.9,32.6],[-29.9,31],[-33,27.9],[-34.1,25],[-34.8,20],[-34.4,18.4],[-32,18.3],[-28.6,16.5],[-22.5,14.5],[-17.2,11.8],[-12,13.7],[-8.8,13.2],[-6,12.2],[-1,9],[3.9,9.6],[4.5,7],[6.3,3],[5,-2],[4.5,-7.5],[7.5,-12.5],[10.5,-15],[14.7,-17.4],[21,-17],[27.5,-13.2],[31,-9.8]],
    [[-12,49.3],[-15.5,50.2],[-20,48.9],[-25.5,45.2],[-24.8,43.7],[-21.5,43.3],[-16.2,44.4]],
    [[36,-5.6],[36.7,-4.4],[38.5,-0.3],[41.5,2.2],[43.3,5],[44,8.5],[41,13.5],[38,15.7],[40,18.5],[44,12.4],[45.6,13.7],[42,19],[39.5,20],[36.5,22.5],[38,24],[40.8,26],[41,29],[36.8,28],[36.2,30.5],[36.5,35.8],[33,35.3],[31.3,32.3],[29.5,34.9],[27,35.6],[21.5,39],[16.5,42.8],[12.7,43.5],[13,45],[15,49.5],[17,52.5],[18.5,56.5],[22.5,59.8],[25.3,57.3],[25.5,61.5],[25.2,66.5],[23.5,68.3],[22.3,70],[20.8,72.9],[16,73.5],[12,74.8],[8.1,77.5],[10,79.4],[13.1,80.3],[16.3,81.3],[18.5,84.3],[21.5,87],[22,91.8],[16.5,94.3],[16,97.6],[13,98.6],[9,98.3],[6.5,100.2],[2.5,101.5],[1.3,103.8],[2.5,104],[6,102.3],[10,99.2],[13.5,100.3],[12.5,102.2],[10.5,104.5],[8.6,104.8],[10.4,106.8],[12.5,109.3],[16,108.2],[19,105.7],[21.5,108],[21.8,111],[22.5,114.2],[24.5,118.2],[27,120.3],[30,122],[31.2,121.9],[35,119.5],[37.5,122.4],[38,118.9],[40,119.6],[41,121.8],[39.8,124.3],[37.5,126.5],[34.8,126.4],[35.1,129.1],[38.5,128.3],[42.5,130.6],[46.5,138],[53,141],[59,143],[60,155],[62,164],[66,178],[70,170],[72,140],[76,110],[73,80],[69,60],[68,40],[69.5,30],[70.5,25],[68,15],[63,8.5],[58.5,6],[59,10.5],[57.5,10.5],[56,8.3],[53.5,8],[53,5],[51,2.5],[49.5,0],[48.6,-4.5],[46.5,-1.5],[43.5,-1.5],[43.5,-8],[42,-8.9],[37,-8.9]],
    [[9.8,80],[8.5,81.3],[6.2,81.7],[6,80.2],[8,79.8]],
    [[5.6,95.3],[3,98.5],[1,101],[-2,104.8],[-5.9,105.8],[-5.5,104.5],[-2.5,101.3],[0.5,99.2],[3.5,96.2]],
    [[-6,106],[-6.8,110.5],[-7,112.7],[-8.3,114.4],[-8.7,111],[-7.8,106.3]],
    [[7,116.8],[5,115.3],[2,111.5],[1.5,109],[-1.5,110],[-3.4,114.5],[-4,116],[-1,117.5],[1.2,118.9],[4.3,118.3]],
    [[-0.9,131.2],[-2.6,134],[-2.3,137.5],[-2.6,141],[-3.9,144.5],[-6.7,147.8],[-10.3,150.5],[-8.8,146.3],[-9.1,143.2],[-8,138.9],[-4.8,136],[-3.9,132.7]],
    [[-10.7,142.5],[-14.5,143.7],[-19.3,146.8],[-23.4,150.8],[-28.2,153.6],[-32.9,151.8],[-37.5,149.9],[-38.4,145],[-38.1,140.6],[-35,136.5],[-32.5,133.6],[-31.6,131],[-31.7,128.9],[-33.9,123.6],[-35,117.9],[-34.3,115.1],[-31.5,115.7],[-26.5,113.5],[-22.5,113.8],[-20.3,118.8],[-17.9,122.2],[-14.5,125.8],[-14.9,129.6],[-12.3,131],[-11.2,132.6],[-12.2,136.6],[-15,135.5],[-17.6,140.8]],
    [[41.5,141.2],[38.3,141.5],[35.7,140.8],[34.6,138.2],[33.5,135.8],[34,132],[31.2,130.3],[33.6,129.8],[35.5,133],[37,137],[40,139.8]],
    [[25.3,121.5],[23,121.4],[22,120.8],[23.5,120.1]],
    [[18.5,120.9],[16,122.2],[13.5,124],[12.8,120.9],[15.8,119.8]],
    [[9.8,125.5],[7,126.5],[6,125.3],[7,122],[8.5,123.8]]
  ];
  var LAND_DOTS = null;
  function landDots() {
    if (LAND_DOTS) return LAND_DOTS;
    function inside(poly, la, lo) {
      var c = false;
      for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        var a = poly[i], b = poly[j];
        if ((a[0] > la) !== (b[0] > la) && lo < (b[1] - a[1]) * (la - a[0]) / (b[0] - a[0]) + a[1]) c = !c;
      }
      return c;
    }
    var out = [], step = 1.7;
    for (var la = -45; la <= 76; la += step) {
      var ls = step / Math.max(0.25, Math.cos(la * Math.PI / 180));
      for (var lo = -20; lo <= 180; lo += ls) {
        for (var k = 0; k < LAND.length; k++) if (inside(LAND[k], la, lo)) { out.push([la, lo]); break; }
      }
    }
    return (LAND_DOTS = out);
  }

  function initGlobes() {
    $$('[data-globe]').forEach(function (G) {
      var stage = $('.w-globe-stage', G), cv = $('.w-globe-cv', G);
      if (!cv || !cv.getContext) return;
      var ctx = cv.getContext('2d'), D = Math.PI / 180;
      var WP = [[31.2, 121.5], [24, 119], [12, 112], [1.3, 103.8], [-5, 80], [-20, 55], [-29.9, 31.0]];
      var ETA_A = 48, ETA_B = 74, COVER = 61, LOCAL = 7, MAXD = 80, SET = { lon: 76, lat: 4 };
      function vec(la, lo) { la *= D; lo *= D; return [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)]; }
      function ll(v) { var n = Math.hypot(v[0], v[1], v[2]); return [Math.asin(v[2] / n) / D, Math.atan2(v[1], v[0]) / D]; }
      var P = [], F = [0], i;
      for (i = 0; i < WP.length - 1; i++) {
        var a = vec(WP[i][0], WP[i][1]), b = vec(WP[i + 1][0], WP[i + 1][1]);
        var om = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), n = Math.max(2, Math.ceil(om / D));
        for (var k = 0; k < n; k++) { var t = k / n, s1 = Math.sin((1 - t) * om) / Math.sin(om), s2 = Math.sin(t * om) / Math.sin(om); P.push(ll([a[0] * s1 + b[0] * s2, a[1] * s1 + b[1] * s2, a[2] * s1 + b[2] * s2])); }
      }
      P.push(WP[WP.length - 1]);
      for (i = 1; i < P.length; i++) { var u = vec(P[i - 1][0], P[i - 1][1]), v2 = vec(P[i][0], P[i][1]); F.push(F[i - 1] + Math.acos(Math.min(1, u[0] * v2[0] + u[1] * v2[1] + u[2] * v2[2]))); }
      var TOT = F[F.length - 1]; for (i = 0; i < F.length; i++) F[i] /= TOT;
      function at(f) { f = clamp(f, 0, 1); var j = 1; while (j < F.length - 1 && F[j] < f) j++; var t = (f - F[j - 1]) / ((F[j] - F[j - 1]) || 1); return [P[j - 1][0] + (P[j][0] - P[j - 1][0]) * t, P[j - 1][1] + (P[j][1] - P[j - 1][1]) * t]; }
      var GR = [], la, lo;
      for (lo = -180; lo < 180; lo += 15) { var m = []; for (la = -90; la <= 90; la += 3) m.push([la, lo]); GR.push(m); }
      for (la = -75; la <= 75; la += 15) { var q = []; for (lo = -180; lo <= 180; lo += 3) q.push([la, lo]); GR.push(q); }
      var dots = landDots();

      var C = {};
      function readCols() { var s = getComputedStyle(G); ['s1', 's2', 'grat', 'grat-f', 'land', 'rim', 'ink', 'mute', 'a', 'b', 'late', 'bg'].forEach(function (k) { C[k] = s.getPropertyValue('--g-' + k).trim(); }); }
      var W = 0, H = 0, DPR = 1, R = 0, CX = 0, CY = 0, sP0 = 0, cP0 = 1, L0 = 0;
      function size() {
        var r = stage.getBoundingClientRect(); W = r.width; H = r.height; DPR = Math.min(2, w.devicePixelRatio || 1);
        cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR);
        R = Math.min(W * 0.42, H * 0.44) - 4; CX = W / 2; CY = H / 2;
      }
      function pr(la, lo) { var p = la * D, l = (lo - L0) * D, cp = Math.cos(p), cl = Math.cos(l); return { x: CX + R * cp * Math.sin(l), y: CY - R * (cP0 * Math.sin(p) - sP0 * cp * cl), z: sP0 * Math.sin(p) + cP0 * cp * cl }; }
      function poly(pts, front) { ctx.beginPath(); var pen = false; for (var i = 0; i < pts.length; i++) { var q = pr(pts[i][0], pts[i][1]); if ((q.z >= 0) === front) { pen ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y); pen = true; } else pen = false; } ctx.stroke(); }
      var MONO = '"IBM Plex Mono", ui-monospace, monospace';
      function label(x, y, lines, side) {
        var fs = W < 520 ? 10.5 : 12, lh = fs + 5, tw = 0, i;
        ctx.font = '500 ' + fs + 'px ' + MONO;
        for (i = 0; i < lines.length; i++) tw = Math.max(tw, ctx.measureText(lines[i][0]).width);
        if (side > 0 && x + 22 + tw > W - 6) side = -1; else if (side < 0 && x - 22 - tw < 6) side = 1;
        var lx = x + side * 16;
        ctx.strokeStyle = C.rim; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + side * 6, y); ctx.lineTo(lx, y); ctx.stroke();
        ctx.textAlign = side > 0 ? 'left' : 'right'; ctx.textBaseline = 'middle';
        for (i = 0; i < lines.length; i++) { ctx.fillStyle = lines[i][1]; ctx.fillText(lines[i][0], lx + side * 4, y + i * lh); }
      }
      function ship(f, filled, name, sideSign) {
        if (f >= 1 || f <= 0) return;
        var p = at(f), a = at(f - 0.004), b = at(f + 0.004), q = pr(p[0], p[1]); if (q.z < 0.02) return;
        var qa = pr(a[0], a[1]), qb = pr(b[0], b[1]), ang = Math.atan2(qb.y - qa.y, qb.x - qa.x);
        ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(ang);
        ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-5, 4.6); ctx.lineTo(-5, -4.6); ctx.closePath();
        ctx.fillStyle = filled ? C.a : C.bg; ctx.fill(); ctx.strokeStyle = filled ? C.a : C.b; ctx.lineWidth = 1.4; ctx.stroke(); ctx.restore();
        /* the ship letter would sit on the Durban label: the pin speaks for it once the ship is that close */
        var du = pr(-29.9, 31.0); if (du.z > 0.05 && Math.hypot(q.x - du.x, q.y - du.y) < 20) return;
        var nx = -Math.sin(ang) * sideSign, ny = Math.cos(ang) * sideSign;
        ctx.font = '600 ' + (W < 520 ? 11 : 12.5) + 'px ' + MONO; ctx.fillStyle = filled ? C.a : C.ink; ctx.textBaseline = 'middle';
        ctx.textAlign = nx > 0.2 ? 'left' : (nx < -0.2 ? 'right' : 'center');
        ctx.fillText(name, q.x + nx * 16, q.y + ny * 16);
      }
      var cur = { yaw: 0, pitch: 0, day: VSG.reduced ? COVER : 0 };
      function draw() {
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, W, H);
        L0 = SET.lon + cur.yaw; var lat0 = (SET.lat + cur.pitch) * D; sP0 = Math.sin(lat0); cP0 = Math.cos(lat0);
        /* halo ring and dial */
        ctx.lineWidth = 1; ctx.strokeStyle = C['grat-f']; ctx.beginPath(); ctx.arc(CX, CY, R + 14, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = C.grat; ctx.beginPath();
        for (var i = 0; i < 72; i++) { var an = (i * 5 - L0) * D, len = i % 6 === 0 ? 6 : 2.5, c = Math.cos(an), s = Math.sin(an); ctx.moveTo(CX + c * (R + 14), CY + s * (R + 14)); ctx.lineTo(CX + c * (R + 14 + len), CY + s * (R + 14 + len)); }
        ctx.stroke();
        var g = ctx.createRadialGradient(CX - R * 0.35, CY - R * 0.45, R * 0.1, CX, CY, R); g.addColorStop(0, C.s1); g.addColorStop(1, C.s2);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = C['grat-f']; GR.forEach(function (l) { poly(l, false); });
        ctx.strokeStyle = C.grat; GR.forEach(function (l) { poly(l, true); });
        /* land dots */
        ctx.fillStyle = C.land;
        var ds = Math.max(1.2, R / 180);
        for (i = 0; i < dots.length; i++) { var q = pr(dots[i][0], dots[i][1]); if (q.z > 0.02) { var sz = ds * (0.55 + 0.45 * q.z); ctx.fillRect(q.x - sz / 2, q.y - sz / 2, sz, sz); } }
        ctx.strokeStyle = C.rim; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke();
        /* lane: sailed part solid to the lead ship, the rest dotted */
        var fA = Math.min(1, cur.day / ETA_A), fB = Math.min(1, cur.day / ETA_B), cut = at(fA), done = [], rest = [cut];
        for (i = 0; i < P.length; i++) { if (F[i] < fA) done.push(P[i]); else rest.push(P[i]); }
        done.push(cut);
        ctx.lineCap = 'round'; ctx.strokeStyle = C.mute; ctx.lineWidth = 1.8; ctx.setLineDash([0.01, 5]); poly(rest, true);
        ctx.setLineDash([]); ctx.strokeStyle = C.a; ctx.lineWidth = 1.8; if (done.length > 1) poly(done, true); ctx.lineCap = 'butt';
        ctx.fillStyle = C.mute;
        for (i = 1; i < WP.length - 1; i++) { var wp = pr(WP[i][0], WP[i][1]); if (wp.z > 0) { ctx.beginPath(); ctx.arc(wp.x, wp.y, 1.8, 0, Math.PI * 2); ctx.fill(); } }
        var sg = pr(1.3, 103.8); if (sg.z > 0.15) { ctx.font = '500 ' + (W < 520 ? 10 : 11) + 'px ' + MONO; ctx.fillStyle = C.mute; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('Singapore', sg.x + 8, sg.y + 1); }
        /* ports */
        var out = cur.day >= COVER - 0.01, sh = pr(31.2, 121.5), du = pr(-29.9, 31.0);
        [sh, du].forEach(function (p, ix) {
          if (p.z < 0.05) return;
          if (ix === 1 && out) { ctx.strokeStyle = C.late; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, Math.PI * 2); ctx.stroke(); }
          ctx.fillStyle = C.bg; ctx.strokeStyle = C.ink; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(p.x, p.y, 3.6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        });
        if (sh.z > 0.08) label(sh.x, sh.y, [['Shanghai', C.ink], ['Quotes A and B', C.mute]], 1);
        if (du.z > 0.08) { var dl = [['Durban', C.ink]]; if (out) dl.push(['Cover out D61', C.late]); if (fA >= 1) dl.push(['A in port D48', C.a]); if (fB >= 1) dl.push(['B in port D74', C.mute]); label(du.x, du.y, dl, -1); }
        ship(fB, false, 'B', -1); ship(fA, true, 'A', 1);
      }
      var outEl = $('.w-globe-out', G), cov = $('.w-globe-cov', G), rng = $('.w-globe-in', G), playB = $('[data-globe-play]', G);
      var sEls = { local: $('[data-s="local"]', G), a: $('[data-s="a"]', G), b: $('[data-s="b"]', G) };
      var bars = $$('.w-globe-bar i', G), lastD = -1;
      function readout(force) {
        var dd = Math.round(cur.day); if (dd === lastD && !force) return; lastD = dd;
        if (outEl) outEl.textContent = 'D' + dd;
        if (rng && d.activeElement !== rng) rng.value = dd;
        var left = COVER - dd;
        if (cov) { cov.textContent = left > 0 ? left + ' days of cover left' : (left === 0 ? 'Cover runs out on D61' : 'Cover ran out on D61'); cov.classList.toggle('is-out', left <= 0); }
        var tm = dd >= LOCAL ? 'Delivered on D7' : 'On the road, D7';
        var ta = dd >= ETA_A ? 'In Durban since D48' : (dd === 0 ? 'Leaves Shanghai, ETA D48' : 'At sea, ' + (ETA_A - dd) + ' days out, ETA D48');
        var tb = dd >= ETA_B ? 'In Durban on D74, 13 days after cover ran out' : (dd === 0 ? 'Leaves Shanghai, ETA D74' : 'At sea, ' + (ETA_B - dd) + ' days out, ETA D74');
        if (sEls.local) sEls.local.textContent = tm; if (sEls.a) sEls.a.textContent = ta; if (sEls.b) sEls.b.textContent = tb;
        if (bars[0]) bars[0].style.setProperty('--p', Math.min(100, dd / LOCAL * 100).toFixed(1) + '%');
        if (bars[1]) bars[1].style.setProperty('--p', Math.min(100, dd / ETA_A * 100).toFixed(1) + '%');
        if (bars[2]) bars[2].style.setProperty('--p', Math.min(100, dd / ETA_B * 100).toFixed(1) + '%');
        if (rng) rng.setAttribute('aria-valuetext', 'Day ' + dd + '. Local supplier: ' + tm + '. Import A: ' + ta + '. Import B: ' + tb + '. Cover runs out on day 61.');
      }
      /* autoplay: day 0 to 80 at two days a second, a pause at day 61, a pause at the end, a quick rewind */
      var playing = !VSG.reduced, phase = 'run', holdUntil = 0, held61 = false, vis = false, raf = 0, lastT = 0, lastDraw = 0;
      var drag = null, dYaw = 0, dPitch = 0;
      function setPlay(on) {
        playing = on && !VSG.reduced;
        if (playB) playB.setAttribute('aria-pressed', playing ? 'true' : 'false');
        kick();
      }
      function tick(now) {
        raf = 0;
        var dt = lastT ? Math.min(0.1, (now - lastT) / 1000) : 0; lastT = now;
        if (playing) {
          if (phase === 'run') {
            if (!held61 && cur.day < COVER && cur.day + dt * 2 >= COVER) { cur.day = COVER; held61 = true; phase = 'hold'; holdUntil = now + 3500; }
            else { cur.day = Math.min(MAXD, cur.day + dt * 2); if (cur.day >= MAXD) { phase = 'hold'; holdUntil = now + 4000; } }
          } else if (phase === 'hold') { if (now >= holdUntil) phase = cur.day >= MAXD ? 'rewind' : 'run'; }
          else if (phase === 'rewind') { cur.day = Math.max(0, cur.day - dt * 40); if (cur.day <= 0) { phase = 'hold'; holdUntil = now + 1200; held61 = false; } }
        }
        if (!drag) { dYaw *= 0.88; dPitch *= 0.88; if (Math.abs(dYaw) < 0.02) dYaw = 0; if (Math.abs(dPitch) < 0.02) dPitch = 0; }
        var sway = (playing && !VSG.reduced) ? Math.sin(now / 9000) * 4 : 0;
        cur.yaw = sway + dYaw; cur.pitch = dPitch;
        if (now - lastDraw > 32) { draw(); readout(); lastDraw = now; }
        if (vis && !d.hidden && (playing || drag || dYaw || dPitch)) raf = requestAnimationFrame(tick); else lastT = 0;
      }
      function kick() { if (!raf && vis && !d.hidden) raf = requestAnimationFrame(tick); }
      readCols(); size(); draw(); readout(true);
      VSG.watch(stage, function (v) { vis = v; if (v) { size(); draw(); kick(); } });
      d.addEventListener('visibilitychange', function () { lastT = 0; kick(); });
      if ('ResizeObserver' in w) new ResizeObserver(function () { size(); draw(); }).observe(stage);
      if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { draw(); });
      if (rng) rng.addEventListener('input', function () { setPlay(false); cur.day = +rng.value; draw(); readout(true); });
      if (playB) playB.addEventListener('click', function () { if (!playing && cur.day >= MAXD) { cur.day = 0; phase = 'run'; held61 = false; } else if (!playing) phase = 'run'; setPlay(!playing); });
      if (VSG.reduced) setPlay(false);
      cv.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' || !VSG.fine || e.button !== 0) return; drag = { x: e.clientX, y: e.clientY, yaw: dYaw, pitch: dPitch }; cv.setPointerCapture(e.pointerId); kick(); });
      cv.addEventListener('pointermove', function (e) { if (!drag) return; dYaw = clamp(drag.yaw - (e.clientX - drag.x) * 0.25, -40, 40); dPitch = clamp(drag.pitch + (e.clientY - drag.y) * 0.15, -20, 20); if (!raf) { cur.yaw = dYaw; cur.pitch = dPitch; draw(); } });
      function endDrag() { if (!drag) return; drag = null; kick(); }
      cv.addEventListener('pointerup', endDrag); cv.addEventListener('pointercancel', endDrag);
    });
  }

  /* ---- (d) the VSG Core node canvas ----------------------------------- */
  function initModels() {
    $$('[data-model]').forEach(function (M) {
      var cv = $('.w-model-cv', M); if (!cv || !cv.getContext) return;
      var ctx = cv.getContext('2d');
      var light = M.classList.contains('w-model--light');
      var ENTS = { suppliers: [0.12, -0.82, 'Suppliers'], stock: [0.66, 0.36, 'Stock'], orders: [-0.06, -0.02, 'Orders'], customers: [-0.74, -0.34, 'Customers'], invoices: [-0.46, 0.66, 'Invoices'] };
      var EDGES = [['suppliers', 'orders'], ['suppliers', 'stock'], ['orders', 'stock'], ['customers', 'orders'], ['customers', 'invoices'], ['orders', 'invoices'], ['suppliers', 'invoices']];
      var PRODS = [
        { label: 'VSG Procure', st: 'What to buy', p: [0.82, -0.5], e: ['suppliers', 'stock', 'orders'] },
        { label: 'VSG Endorse', st: 'AI automations', ai: true, p: [-0.84, -0.52], e: ['customers', 'invoices', 'suppliers', 'stock'] },
        { label: 'Custom builds', st: 'Made for you', p: [0.08, 0.86], e: ['suppliers', 'stock', 'orders', 'customers', 'invoices'] }
      ];
      var col = light ? { ink: '20,22,37', acc: '11,92,255', ai: '124,77,255', mute: '#55545A' } : { ink: '255,255,255', acc: '110,155,255', ai: '182,156,255', mute: '#A6A5A0' };
      var bg = '#0B0B0D';
      function findBg() { var el = M; while (el && el !== d.documentElement) { var c = getComputedStyle(el).backgroundColor; if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c; el = el.parentElement; } return light ? '#F6F7FB' : '#0B0B0D'; }
      var W = 0, H = 0, dpr = 1, running = false, t0 = performance.now(), pulses = [], lastSpawn = 0, active = 0, lastSwitch = 0, lastDraw = 0;
      function rgba(c, a) { return 'rgba(' + c + ',' + a + ')'; }
      function size() { var r = cv.getBoundingClientRect(); dpr = Math.min(2, w.devicePixelRatio || 1); W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); bg = findBg(); }
      var align = M.getAttribute('data-align') || 'center';
      function proj(x, y, z, yaw) {
        var cy = Math.cos(yaw), sy = Math.sin(yaw), x1 = x * cy - z * sy, z1 = x * sy + z * cy, pitch = 0.5;
        var cp = Math.cos(pitch), sp = Math.sin(pitch), y2 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, Dd = 4.2, f = Dd / (Dd + z2);
        var wide = W > 700, S = wide ? Math.min(W * 0.28, H * 0.36) : Math.min(W * 0.33, H * 0.34);
        var cx = W * (wide && align === 'right' ? 0.7 : 0.5), cyy = H * (wide ? 0.6 : 0.58);
        return [cx + x1 * S * f, cyy - y2 * S * f];
      }
      function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }
      var PH = 1.1;
      function draw(now) {
        var t = (now - t0) / 1000, still = VSG.reduced, yaw = -0.5 + (still ? 0 : Math.sin(t / 14) * 0.07);
        ctx.clearRect(0, 0, W, H); ctx.lineWidth = 1;
        var c = [[-1.1, -1.1], [1.1, -1.1], [1.1, 1.1], [-1.1, 1.1]].map(function (q) { return proj(q[0], 0, q[1], yaw); });
        ctx.strokeStyle = rgba(col.ink, 0.16); ctx.beginPath(); c.forEach(function (p, i) { i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }); ctx.closePath(); ctx.stroke();
        ctx.strokeStyle = rgba(col.ink, 0.05);
        for (var g = -1.1 + 0.22; g < 1.09; g += 0.22) { var a = proj(g, 0, -1.1, yaw), b = proj(g, 0, 1.1, yaw); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); a = proj(-1.1, 0, g, yaw); b = proj(1.1, 0, g, yaw); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
        var P = {}; for (var k in ENTS) P[k] = proj(ENTS[k][0], 0, ENTS[k][1], yaw);
        var ap = PRODS[active], hc = ap.ai ? col.ai : col.acc;
        EDGES.forEach(function (e) { var a = P[e[0]], b = P[e[1]], hot = ap.e.indexOf(e[0]) > -1 && ap.e.indexOf(e[1]) > -1; ctx.strokeStyle = rgba(col.ink, hot ? 0.34 : 0.14); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); });
        PRODS.forEach(function (p, i) { var top = proj(p.p[0], PH, p.p[1], yaw); p._s = top; p.e.forEach(function (k) { var b = P[k]; ctx.strokeStyle = i === active ? rgba(p.ai ? col.ai : col.acc, 0.7) : rgba(col.ink, 0.09); ctx.setLineDash(i === active ? [] : [2, 4]); ctx.beginPath(); ctx.moveTo(top[0], top[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }); ctx.setLineDash([]); });
        if (!still) {
          if (now - lastSpawn > 1300) { lastSpawn = now; var e = EDGES[(Math.random() * EDGES.length) | 0]; pulses.push({ a: e[0], b: e[1], t: 0, rev: Math.random() < 0.5 }); var dk = ap.e[(Math.random() * ap.e.length) | 0]; pulses.push({ a: dk, b: null, t: 0, drop: true }); }
          pulses = pulses.filter(function (q) { return q.t <= 1; });
          pulses.forEach(function (q) {
            var A = P[q.a], B = q.drop ? ap._s : P[q.b]; if (q.rev) { var tmp = A; A = B; B = tmp; }
            var len = Math.hypot(B[0] - A[0], B[1] - A[1]) || 1; q.t += (40 / len) / 30;
            var pt = lerp(A, B, Math.min(1, q.t)), tail = lerp(A, B, Math.max(0, q.t - 18 / len));
            var gr = ctx.createLinearGradient(tail[0], tail[1], pt[0], pt[1]); gr.addColorStop(0, rgba(hc, 0)); gr.addColorStop(1, rgba(hc, 0.95));
            ctx.strokeStyle = gr; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(tail[0], tail[1]); ctx.lineTo(pt[0], pt[1]); ctx.stroke(); ctx.lineWidth = 1;
            ctx.fillStyle = rgba(hc, 1); ctx.beginPath(); ctx.arc(pt[0], pt[1], 1.7, 0, 6.3); ctx.fill();
          });
          if (now - lastSwitch > 4200) { lastSwitch = now; active = (active + 1) % PRODS.length; }
        }
        ctx.font = '500 11.5px "IBM Plex Mono", ui-monospace, monospace'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
        for (var k2 in P) {
          var p = P[k2], hot = ap.e.indexOf(k2) > -1, s = 4.5;
          ctx.fillStyle = bg; ctx.fillRect(p[0] - s - 2, p[1] - s - 2, 2 * s + 4, 2 * s + 4);
          ctx.strokeStyle = hot ? rgba(hc, 0.95) : rgba(col.ink, 0.55); ctx.strokeRect(p[0] - s + 0.5, p[1] - s + 0.5, 2 * s - 1, 2 * s - 1);
          if (hot) { ctx.fillStyle = rgba(hc, 0.95); ctx.fillRect(p[0] - 1.5, p[1] - 1.5, 3, 3); }
          var lbl = ENTS[k2][2]; ctx.fillStyle = bg; ctx.fillRect(p[0] + 8, p[1] - 8, ctx.measureText(lbl).width + 6, 16);
          ctx.fillStyle = rgba(col.ink, hot ? 0.95 : 0.6); ctx.fillText(lbl, p[0] + 11, p[1] + 1);
        }
        var FS = '"Switzer", system-ui, sans-serif';
        PRODS.forEach(function (p, i) {
          var s = p._s, on = i === active, pc = p.ai ? col.ai : col.acc;
          var txt = p.label, st = W > 560 ? p.st : '';
          ctx.font = '600 13px ' + FS; var w1 = ctx.measureText(txt).width;
          ctx.font = '400 12px ' + FS; var w2 = st ? ctx.measureText(st).width : 0;
          var ww = w1 + w2 + (st ? 44 : 34), hh = 28, x = clamp(s[0] - ww / 2, 4, W - ww - 4), y = s[1] - hh - 8;
          ctx.fillStyle = bg; ctx.strokeStyle = on ? rgba(pc, 0.9) : rgba(col.ink, 0.22);
          ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, ww, hh, 14); else ctx.rect(x, y, ww, hh); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.arc(x + 14, y + hh / 2, 3, 0, 6.3); ctx.fillStyle = on ? rgba(pc, 1) : rgba(col.ink, 0.5); ctx.fill();
          ctx.font = '600 13px ' + FS; ctx.fillStyle = rgba(col.ink, on ? 1 : 0.82); ctx.fillText(txt, x + 24, y + hh / 2 + 1);
          if (st) { ctx.font = '400 12px ' + FS; ctx.fillStyle = col.mute; ctx.fillText(st, x + 24 + w1 + 8, y + hh / 2 + 1); }
          ctx.strokeStyle = on ? rgba(pc, 0.7) : rgba(col.ink, 0.22); ctx.beginPath(); ctx.moveTo(s[0], y + hh); ctx.lineTo(s[0], s[1]); ctx.stroke();
          ctx.fillStyle = on ? rgba(pc, 1) : rgba(col.ink, 0.55); ctx.beginPath(); ctx.arc(s[0], s[1], 2, 0, 6.3); ctx.fill();
        });
      }
      function loop(now) { if (!running) return; if (now - lastDraw > 32) { draw(now); lastDraw = now; } requestAnimationFrame(loop); }
      function start() { if (running) return; if (VSG.reduced) { draw(performance.now()); return; } running = true; requestAnimationFrame(loop); }
      function stop() { running = false; }
      size(); draw(performance.now());
      if ('ResizeObserver' in w) new ResizeObserver(function () { size(); draw(performance.now()); }).observe(cv);
      var vis = false;
      VSG.watch(M, function (v) { vis = v; v && !d.hidden ? start() : stop(); });
      d.addEventListener('visibilitychange', function () { d.hidden ? stop() : (vis && start()); });
      if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { draw(performance.now()); });
    });
  }

  /* ------------------------------------------------------------- boot */
  function boot() {
    initNav(); initFit(); initCounts(); initReveal(); initPause(); initTilt(); initHoverTilt(); initFlip(); initForms();
    initEngines(); initGlobes(); initModels();
    mqReduce.addEventListener && mqReduce.addEventListener('change', function () { kickScroll(); });
    root.classList.add('js-ready');
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot); else boot();
})();

/* the ACE Command Centre (partials/cc.html): roles decide which icons show; icons swap the product screens; approve clears the badge */
(function () {
  var cc = document.querySelector('[data-cc]'); if (!cc) return;
  var roleBtns = cc.querySelectorAll('[data-cc-role]'), icons = cc.querySelectorAll('[data-cc-app]');
  var panes = cc.querySelectorAll('[data-cc-p]'), crumb = cc.querySelector('[data-cc-crumb]'), av = cc.querySelector('[data-cc-av]');
  var badge = cc.querySelector('[data-cc-badge]'), waitKpi = cc.querySelector('[data-cc-wait]');
  var NAMES = { home: 'ACE Command Centre', core: 'VSG Core', procure: 'VSG Procure', endorse: 'VSG Endorse', settings: 'Settings' };
  var AV = { md: 'SE', cc: 'TN', buyer: 'LB' };
  var done = {}, current = 'md';
  function show(app) {
    icons.forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-cc-app') === app); });
    panes.forEach(function (p) { p.hidden = p.getAttribute('data-cc-p') !== app; });
    if (crumb) crumb.textContent = NAMES[app] || '';
  }
  function role(r) {
    roleBtns.forEach(function (b) { b.setAttribute('aria-checked', String(b.getAttribute('data-cc-role') === r)); });
    icons.forEach(function (b) { b.hidden = (b.getAttribute('data-roles') || '').split(' ').indexOf(r) < 0; });
    cc.querySelectorAll('.h-cc-c [data-roles]').forEach(function (el) { el.hidden = el.getAttribute('data-roles').split(' ').indexOf(r) < 0; });
    if (av) av.textContent = AV[r];
    current = r; count();
    show('home');
  }
  /* the items a role can approve: on its home screen, or on a product screen it can open */
  function reach(r) {
    var ids = {};
    cc.querySelectorAll('[data-cc-ok]').forEach(function (b) {
      var pane = b.closest('[data-cc-p]'), icon = pane && cc.querySelector('[data-cc-app="' + pane.getAttribute('data-cc-p') + '"]');
      if (icon && (icon.getAttribute('data-roles') || '').split(' ').indexOf(r) < 0) return;
      var row = b.closest('[data-roles]');
      if (row && row.getAttribute('data-roles').split(' ').indexOf(r) < 0) return;
      ids[b.getAttribute('data-cc-ok')] = true;
    });
    return Object.keys(ids);
  }
  function count() {
    var left = reach(current).filter(function (id) { return !done[id]; }).length;
    if (badge) { badge.textContent = String(left); badge.classList.toggle('is-zero', left === 0); }
    if (waitKpi) waitKpi.textContent = String(left);
  }
  roleBtns.forEach(function (b) { b.addEventListener('click', function () { role(b.getAttribute('data-cc-role')); }); });
  icons.forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-cc-app')); }); });
  cc.querySelectorAll('[data-cc-ok]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-cc-ok'); if (done[id]) return;
      done[id] = true;
      cc.querySelectorAll('[data-cc-ok="' + id + '"]').forEach(function (x) {
        var li = x.closest('li'); if (li) li.classList.add('is-done');
        x.textContent = 'Approved';
      });
      count();
    });
  });
  role('md');
})();
