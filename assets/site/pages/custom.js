/* Custom software and AI (/custom). Loads after site.js, so window.VSG exists.
   Every loop runs through VSG.every: only on screen, only with the tab visible, never under
   reduced motion. Without JS the page shows each illustration in its settled state. */
(function () {
  'use strict';
  var VSG = window.VSG; if (!VSG) return;
  var d = document;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return [].slice.call((c || d).querySelectorAll(s)); };

  /* hero: the month-end pack ticks through its steps, then starts the next run */
  var flow = $('[data-c-flow]');
  if (flow) {
    var fSteps = $$('.c-steps li', flow), fTime = $('[data-c-flow-t]', flow);
    var fState = 2, fTimes = ['06:55', '06:58', '07:00', '07:00'];
    var paint = function () {
      fSteps.forEach(function (li, i) { li.classList.toggle('is-done', i < fState); li.classList.toggle('is-run', i === fState); });
      fTime.textContent = fTimes[Math.min(fState, 3)];
    };
    VSG.every(flow, 4200, function () { fState = fState >= 3 ? 0 : fState + 1; paint(); });
  }

  /* custom AI tile: fields light up when it scrolls into view; Approve resolves with a check */
  var read = $('[data-c-read]');
  if (read) {
    if (VSG.reduced) read.classList.add('is-in');
    else VSG.watch(read, function (v) { if (v) setTimeout(function () { read.classList.add('is-in'); }, 200); });
    var ap = $('[data-c-approve]', read), done = $('[data-c-approved]', read);
    if (ap && done) ap.addEventListener('click', function () {
      ap.hidden = true; done.hidden = false;
      var auth = $('.c-prop .auth', read);
      if (auth) auth.lastChild.textContent = 'Approved by credit control';
    });
  }

  /* build log: one step closes every few seconds, then the log starts again at step 5 */
  var log = $('[data-c-log]');
  if (log) {
    var items = $$('.c-log-list li', log), label = $('[data-c-log-label]', log), pct = $('[data-c-log-pct]', log), bar = $('[data-c-log-bar]', log);
    var n = items.length, at = 4;
    var draw = function () {
      items.forEach(function (li, i) { li.classList.toggle('is-done', i < at); li.classList.toggle('is-run', i === at); });
      var p = Math.round((at / n) * 100);
      label.textContent = at >= n ? 'Handed over' : 'Step ' + (at + 1) + ' of ' + n;
      pct.textContent = p + '%'; bar.style.transform = 'scaleX(' + (p / 100) + ')';
    };
    VSG.every(log, 4500, function () { at = at >= n ? 4 : at + 1; draw(); });
  }

  /* engine stack: light the custom builds on this page */
  var pick = $('.c-engine .w-pick[data-p="custom"]');
  if (pick) pick.click();

  /* product or build: the command box types the problem and answers */
  var cmd = $('[data-c-cmd]');
  if (cmd) {
    var asks = $$('[data-c-ask]'), answers = $$('[data-c-ans]', cmd), text = $('[data-c-cmd-text]', cmd);
    var cur = 0, cancel = null, userSet = false;
    var show = function (i, typed) {
      cur = i;
      asks.forEach(function (b, k) { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      answers.forEach(function (a) { a.classList.remove('is-on'); });
      if (cancel) cancel();
      var q = asks[i].textContent;
      var reveal = function () { answers[i].classList.add('is-on'); };
      if (typed && !VSG.reduced) { text.textContent = ''; cancel = VSG.type(text, q, { speed: 34, done: reveal }); }
      else { text.textContent = q; reveal(); }
    };
    asks.forEach(function (b, i) { b.addEventListener('click', function () { userSet = true; show(i, true); }); });
    VSG.every(cmd, 7000, function () { if (!userSet) show((cur + 1) % asks.length, true); });
  }
})();
