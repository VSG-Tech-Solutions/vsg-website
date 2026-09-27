/* VSG Bootcamp page behaviour. Loads after site.js, so window.VSG exists.
   The HTML is the settled state (the finished week); this script rewinds each piece
   and plays it forward once it is on screen. Nothing runs under reduced motion. */
(function () {
  'use strict';
  var V = window.VSG, d = document;
  if (!V) return;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };
  var below = function (el) { return el.getBoundingClientRect().top > window.innerHeight * 0.9; };

  /* run fn once, the first time el is on screen */
  function once(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); fn(); }
    }, { threshold: 0.3 });
    io.observe(el);
  }

  /* ------------------------------------------------ 1. the hero week ticks */
  var win = $('[data-week]');
  if (win && !V.reduced) {
    var days = $$('.b-dcard', win), logs = $$('.b-log .w-msg', win), todo = $$('[data-due]', win);
    var num = $('.b-dnum', win), bar = $('.b-wprog i', win);
    var NAMES = { done: 'Done', now: 'Today', next: 'Next' }, ST = { done: 'st-ok', now: 'st-a', next: 'st-n' };
    var n = 3, hold = 0;
    var set = function (k, fresh) {
      days.forEach(function (el, i) {
        var s = i < k ? 'done' : i === k ? 'now' : 'next', st = $('.st', el);
        el.className = 'b-dcard is-' + s;
        if (st) { st.className = 'st ' + ST[s]; st.lastElementChild.textContent = NAMES[s]; }
      });
      logs.forEach(function (el) {
        var day = +el.getAttribute('data-day');
        el.hidden = day > k;
        el.classList.toggle('is-new', !!fresh && day === k);
      });
      todo.forEach(function (el) { el.classList.toggle('is-done', +el.getAttribute('data-due') <= k); });
      if (num) num.textContent = Math.min(k + 1, 5);
      if (bar) bar.style.transform = 'scaleX(' + (k / 5) + ')';
    };
    set(n, false);
    V.every(win, 4200, function () {
      if (n >= 5) { if (++hold < 2) return; hold = 0; n = 1; set(n, false); return; }
      n++; set(n, true);
    });
  }

  /* --------------------------------------- 2. five day blocks fill, once */
  var daysBox = $('[data-days]');
  if (daysBox && !V.reduced && below(daysBox)) {
    var blocks = $$('.b-blk', daysBox), rows = $$('.b-daylist > li', daysBox);
    blocks.concat(rows).forEach(function (el) { el.classList.remove('is-on'); });
    once($('.b-scene', daysBox), function () {
      blocks.forEach(function (b, i) {
        setTimeout(function () { b.classList.add('is-on'); if (rows[i]) rows[i].classList.add('is-on'); }, 250 + i * 700);
      });
    });
  }

  /* ------------------------------------------------- 3a. timing bars grow */
  var map = $('[data-map]');
  if (map && !V.reduced && below(map)) {
    map.classList.add('is-armed');
    once(map, function () { requestAnimationFrame(function () { map.classList.add('is-in'); }); });
  }

  /* ----------------------------------- 3b. the call list: approve a call */
  var calls = $('[data-calls]');
  if (calls) {
    var total = $('[data-total]', calls), live = $('[data-calls-live]', calls), reset = $('.b-reset', calls);
    var btns = $$('.b-appr', calls), sum = 0, touched = false, rest = 0;
    var approve = function (b, byUser) {
      var li = b.closest('li');
      if (li.classList.contains('is-ok')) return;
      li.classList.add('is-ok');
      b.setAttribute('aria-disabled', 'true');
      b.lastElementChild.textContent = 'Approved';
      sum += +b.getAttribute('data-amount');
      V.countTo(total, sum, { dur: 600 });
      var name = $('b', li).textContent;
      if (byUser && live) live.textContent = 'Approved the call to ' + name + '. ' + V.fmtR(sum) + ' approved today.';
      if (btns.every(function (x) { return x.closest('li').classList.contains('is-ok'); }) && reset) reset.hidden = false;
    };
    var clear = function () {
      btns.forEach(function (b) {
        b.closest('li').classList.remove('is-ok');
        b.removeAttribute('aria-disabled');
        b.lastElementChild.textContent = 'Approve';
      });
      sum = 0; V.countTo(total, 0, { dur: 300 });
      if (reset) reset.hidden = true;
    };
    btns.forEach(function (b) {
      b.addEventListener('click', function () { touched = true; approve(b, true); });
    });
    if (reset) reset.addEventListener('click', function () {
      clear();
      if (live) live.textContent = 'The call list is back to three calls.';
      if (btns[0]) btns[0].focus();
    });
    /* until someone clicks, it approves one call every few seconds, then starts again */
    if (!V.reduced) {
      V.every(calls, 4600, function () {
        if (touched) return;
        var next = btns.filter(function (x) { return !x.closest('li').classList.contains('is-ok'); })[0];
        if (next) { approve(next, false); rest = 0; return; }
        if (++rest >= 2) { rest = 0; clear(); }
      });
    }
  }

  /* ------------------------------------ 4. the checklist ticks, once */
  var need = $('[data-need] .b-need-card');
  if (need && !V.reduced && below(need)) {
    need.classList.add('is-armed');
    once(need, function () {
      $$('li', need).forEach(function (li, i) { setTimeout(function () { li.classList.add('is-done'); }, 300 + i * 450); });
    });
  }

  /* ---------------------------------- 5. the 30-day credit window fills */
  var track = $('.b-track-fr');
  if (track && !V.reduced && below(track)) {
    track.classList.add('is-armed');
    once(track, function () { requestAnimationFrame(function () { track.classList.add('is-in'); }); });
  }

  /* ------------------------ 7. the booking form: the error line from the copy */
  var status = $('.b-form [data-lead-status]');
  if (status && 'MutationObserver' in window) {
    var MSG = 'That did not go through. Please try again, or email stephan@vsgtech.co.za.';
    new MutationObserver(function () {
      if (status.classList.contains('is-err') && status.textContent !== MSG && /did not send/.test(status.textContent)) status.textContent = MSG;
    }).observe(status, { childList: true, characterData: true, subtree: true, attributes: true });
  }
})();
