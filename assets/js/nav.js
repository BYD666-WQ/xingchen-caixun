/* \u661f\u8fb0\u5f69\u8baf \u00b7 \u5bfc\u822a\u6846\u67b6\uff08\u6c49\u5821\u83dc\u5355 + \u5f53\u524d\u9875\u9ad8\u4eae + \u9875\u811a\u6570\u636e\u65f6\u95f4\uff09 */
(function () {
  'use strict';
  function $(s) { return document.querySelector(s); }
  function closeMenu() {
    var m = $('#xc-menu');
    var b = $('#xc-hamburger');
    if (m) m.classList.remove('open');
    if (b) b.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('xc-menu-open');
  }
  function toggleMenu() {
    var m = $('#xc-menu');
    var b = $('#xc-hamburger');
    if (!m) return;
    var open = m.classList.toggle('open');
    if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('xc-menu-open', open);
  }
  document.addEventListener('DOMContentLoaded', function () {
    var b = $('#xc-hamburger');
    if (b) {
      b.addEventListener('click', toggleMenu);
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
      });
    }
    var links = document.querySelectorAll('#xc-menu a');
    for (var i = 0; i < links.length; i++) links[i].addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    var foot = document.getElementById('xc-footer-updated');
    var st = window.DRAW_STATUS || null;
    if (foot) foot.textContent = (st && (st.lastSuccess || st.updated)) || '\u5c1a\u672a\u66f4\u65b0';
  });
})();

