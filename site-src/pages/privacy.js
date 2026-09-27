/* Privacy page: light the contents entry for the section being read. Without JS the list is plain links. */
(function () {
  'use strict';
  var links = [].slice.call(document.querySelectorAll('.p-toc a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  var map = {}, secs = [];
  links.forEach(function (a) {
    var s = document.getElementById(a.getAttribute('href').slice(1));
    if (s) { map[s.id] = a; secs.push(s); }
  });
  var seen = {};
  function pick() {
    var cur = null;
    for (var i = 0; i < secs.length; i++) if (seen[secs[i].id]) { cur = secs[i].id; break; }
    if (!cur) return;
    links.forEach(function (a) { a.removeAttribute('aria-current'); });
    map[cur].setAttribute('aria-current', 'location');
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { seen[e.target.id] = e.isIntersecting; });
    pick();
  }, { rootMargin: '-120px 0px -55% 0px' });
  secs.forEach(function (s) { io.observe(s); });
})();
