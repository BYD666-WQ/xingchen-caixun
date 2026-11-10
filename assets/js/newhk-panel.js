/* 新港面板：独立无依赖地插入「新港」tab 与新香港开奖块，并统一倒计时 */
(function () {
  'use strict';
  function $(s, r) { return (r || document).querySelector(s); }
  function $a(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function api(path) {
    var urls = ['https://cdn.jsdelivr.net/gh/BYD666-WQ/xingchen-caixun@main/' + path,
                'https://raw.githubusercontent.com/BYD666-WQ/xingchen-caixun/main/' + path,
                path];
    function tryAt(i) {
      if (i >= urls.length) return Promise.reject(new Error('all sources failed'));
      return fetch(urls[i] + '?v=' + Math.floor(Date.now() / 60000), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : tryAt(i + 1); })
        .catch(function () { return tryAt(i + 1); });
    }
    return tryAt(0);
  }
  function blockOf(el) {
    var b = el;
    while (b && b !== document.body) { if (b.querySelector && b.querySelectorAll('.baomalaodaMa').length >= 7) return b; b = b.parentNode; }
    return null;
  }
  function dedupeCd() {
    $a('.baomalaodaName').forEach(function (n) {
      var b = blockOf(n); if (!b) return;
      var host = b.parentNode;
      var cds = $a('.xc-cd-all', host);
      for (var i = 1; i < cds.length; i++) cds[i].remove();
      $a('span,div,i,em,b', host).forEach(function (el) {
        if (el.children.length) return;
        if (el.closest && el.closest('.xc-cd-all')) return;
        var t = (el.textContent || '').trim();
        if (t.indexOf('\u8ddd\u5f00\u5956') === 0 || t.indexOf('\u539f\u5f00\u5956') === 0) { el.style.display = 'none'; return; }
        if (t.indexOf('\u8ddd\u5f00\u5956') >= 0) el.textContent = t.replace(/\u8ddd\u5f00\u5956[\s:：]*\d{1,3}:\d{2}:\d{2}/g, '').trim();
      });
    });
  }
  api('data/manual-draw.json').then(function (d) {
    var tie = $('.tie') || $('.tencent-banner .tie');
    var names = $a('.baomalaodaName');
    if (!tie || !names.length) return;
    // 1) tab：新港放最前
    if (!/\u65b0\u6e2f/.test(tie.textContent)) {
      var t = document.createElement('div');
      t.textContent = '\u65b0\u6e2f';
      t.style.cursor = 'pointer';
      tie.insertBefore(t, tie.firstChild);
      t.addEventListener('click', function () {
        $a('.baomalaodaName').forEach(function (n) {
          var b = blockOf(n); if (!b) return;
          b.style.display = ((n.textContent || '').indexOf('\u65b0\u9999\u6e2f') >= 0) ? '' : 'none';
        });
      });
    }
    // 2) 新香港块：克隆新澳彩块
    var src = null;
    names.forEach(function (n) { if ((n.textContent || '').indexOf('\u65b0\u6fb3') >= 0) src = blockOf(n); });
    if (!src) return;
    if ($a('.baomalaodaName').some(function (n) { return (n.textContent || '').indexOf('\u65b0\u9999\u6e2f') >= 0; })) { dedupeCd(); return; }
    var blk = src.cloneNode(true);
    blk.querySelectorAll('*').forEach(function (e) { e.removeAttribute('id'); });
    var nm = blk.querySelector('.baomalaodaName'); if (nm) nm.textContent = '\u65b0\u9999\u6e2f';
    var qi = blk.querySelector('.baomalaodaQi'); if (qi && d.issue) qi.textContent = String(d.issue);
    var tiles = blk.querySelectorAll('.baomalaodaMa');
    (d.nums || []).forEach(function (n, i) {
      if (!tiles[i]) return;
      tiles[i].textContent = n.c;
      var ttl = tiles[i].parentNode;
      if (ttl) {
        var z = ttl.querySelector('.baomalaodaXiao');
        if (z) z.textContent = n.z || '';
        var R = [1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46], B = [3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48];
        var v = parseInt(n.c, 10);
        ttl.style.background = R.indexOf(v) >= 0 ? '#e71607' : (B.indexOf(v) >= 0 ? '#2873e6' : '#1fb61d');
      }
    });
    src.parentNode.insertBefore(blk, src);
    dedupeCd();
    setTimeout(dedupeCd, 800); setTimeout(dedupeCd, 2000);
  }).catch(function (e) { console.log('[newhk] load failed', e && e.message); });
})();
