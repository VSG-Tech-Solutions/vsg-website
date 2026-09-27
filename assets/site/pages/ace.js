/* VSG ACE page. The command centre behaviour is shared (site.js). Here: the live model lights one link at a time. */
(function () {
  'use strict';
  var V = window.VSG, g = document.querySelector('[data-ace-graph]');
  if (!g) return;
  var lines = g.querySelectorAll('.ace-graph-l line'), nodes = g.querySelectorAll('.ace-node[data-n]'), k = 0, hold = false;
  function light(i) {
    lines.forEach(function (l) { l.classList.toggle('is-on', +l.getAttribute('data-l') === i); });
    nodes.forEach(function (n) { n.classList.toggle('is-on', +n.getAttribute('data-n') === i); });
  }
  light(0);
  nodes.forEach(function (n) {
    n.addEventListener('pointerenter', function () { hold = true; k = +n.getAttribute('data-n'); light(k); });
    n.addEventListener('pointerleave', function () { hold = false; });
  });
  if (V && V.every && !V.reduced) V.every(g, 2600, function () { if (hold) return; k = (k + 1) % nodes.length; light(k); });
})();
