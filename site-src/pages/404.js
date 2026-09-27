/* 404 site finder: type to filter the pages, arrow keys to move, Enter to open, "/" to focus.
   Without JS the list is plain links. */
(function () {
  'use strict';
  var root = document.querySelector('[data-find]');
  if (!root) return;
  var box = root.querySelector('[data-find-box]'), input = root.querySelector('#n-q');
  var items = [].slice.call(root.querySelectorAll('[data-find-list] li'));
  var empty = root.querySelector('[data-find-empty]'), foot = root.querySelector('[data-find-foot]');
  var count = root.querySelector('[data-find-count]'), kbd = root.querySelector('.n-kbd');
  var active = -1, countT = 0;
  box.hidden = false; foot.hidden = false; if (kbd) kbd.hidden = false;

  function visible() { return items.filter(function (li) { return !li.hidden; }); }
  function setActive(i) {
    var v = visible();
    items.forEach(function (li) { li.firstElementChild.classList.remove('is-active'); });
    if (!v.length) { active = -1; return; }
    active = (i + v.length) % v.length;
    v[active].firstElementChild.classList.add('is-active');
  }
  function filter() {
    var words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    items.forEach(function (li) {
      var a = li.firstElementChild, hay = (a.textContent + ' ' + (a.getAttribute('data-k') || '')).toLowerCase();
      li.hidden = !words.every(function (w) { return hay.indexOf(w) > -1; });
    });
    var n = visible().length;
    empty.hidden = n > 0;
    setActive(words.length ? 0 : -1);
    clearTimeout(countT);
    countT = setTimeout(function () { count.textContent = n ? n + (n === 1 ? ' page matches.' : ' pages match.') : 'No pages match.'; }, 400);
  }
  input.addEventListener('input', filter);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active < 0 ? -1 : active - 1); }
    else if (e.key === 'Enter') {
      var v = visible(), t = v[active < 0 ? 0 : active];
      if (t) { e.preventDefault(); location.href = t.firstElementChild.getAttribute('href'); }
    } else if (e.key === 'Escape') { input.value = ''; filter(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && document.activeElement !== input && !/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement || {}).tagName || '')) {
      e.preventDefault(); input.focus();
    }
  });
})();
