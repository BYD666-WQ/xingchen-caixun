/* 新彩种（可乐手动开奖）· 纯前端占位渲染：在「香港彩」前面插入 tab 与号码块
   数据来自 data/manual-draw.json；标注「示例」直到接入 GitHub Actions 手动开奖 */
(function () {
  'use strict';
  function base() { return location.pathname.indexOf('/pages/') >= 0 ? '../' : ''; }
  function qsa(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function findBlock(el) {
    var n = el;
    while (n && n !== document.body) {
      if (n.querySelector && n.querySelector('.baomalaodaQi') && n.querySelectorAll('.baomalaodaMa').length >= 7) return n;
      n = n.parentNode;
    }
    return null;
  }
  function nameOf(el) { return (el.textContent || '').replace(/\s+/g, ''); }
  fetch(base() + 'data/manual-draw.json?t=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d) return;
      var tie = document.querySelector('#widgetBox41362 .tie');
      var names = qsa('.baomalaodaName');
      if (!tie || !names.length) return;
      var hkTab = null;
      qsa('div', tie).forEach(function (t) { if (nameOf(t).indexOf('\u9999\u6e2f\u5f69') >= 0) hkTab = t; });
      var hkBlock = findBlock(names[names.length - 2] || names[0]);
      var hkNameEl = hkBlock ? hkBlock.querySelector('.baomalaodaName') : null;
      if (!hkTab || !hkBlock || !hkNameEl) return;
      // 1) 新 tab（放在香港彩前）
      var tab = document.createElement('div');
      tab.innerHTML = '<span style="font-weight:700">' + (d.name || '\u65b0\u5f69\u79cd') + '</span>';
      tab.style.cursor = 'pointer';
      hkTab.parentNode.insertBefore(tab, hkTab);
      // 2) 新号码块（克隆香港彩块）
      var block = hkBlock.cloneNode(true);
      block.style.display = 'none';
      var nm = block.querySelector('.baomalaodaName');
      if (nm) nm.textContent = d.name || '\u65b0\u5f69\u79cd';
      var qi = block.querySelector('.baomalaodaQi');
      if (qi && d.issue) qi.textContent = String(d.issue);
      var mas = block.querySelectorAll('.baomalaodaMa');
      var xs = block.querySelectorAll('.baomalaodaXiao');
      (d.nums || []).forEach(function (n, i) {
        if (mas[i]) mas[i].textContent = n.c;
        if (xs[i]) xs[i].textContent = n.z;
      });
      hkBlock.parentNode.insertBefore(block, hkBlock);
      // 2.5) 倒计时（每天 21:34）
      (function () {
        var hm = String(d.dailyTime || '21:34').split(':');
        var el = document.createElement('span');
        el.style.cssText = 'margin-left:8px;font:700 13px/1.4 "Microsoft YaHei",Arial,sans-serif;color:#1f3b8a';
        var dateEl = block.querySelector('.baomalaodaQi');
        (qi && qi.parentNode ? qi.parentNode : block).appendChild(el);
        function tick() {
          var now = new Date();
          var t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hm[0], 10), parseInt(hm[1], 10), 0);
          if (t.getTime() <= now.getTime()) t = new Date(t.getTime() + 86400000);
          var left = Math.floor((t.getTime() - now.getTime()) / 1000);
          var h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
          var p = function (n) { return (n < 10 ? '0' : '') + n; };
          el.textContent = '距开奖 ' + p(h) + ':' + p(m) + ':' + p(s);
        }
        tick(); setInterval(tick, 1000);
      })();
      // 3) 点击切换
      tab.addEventListener('click', function () {
        qsa('.baomalaodaName').forEach(function (n) {
          var b = findBlock(n);
          if (b) b.style.display = (b === block) ? '' : 'none';
        });
        qsa('#widgetBox41362 .tie > div').forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var target = document.getElementById('widgetBox41750');
        if (target && target.scrollIntoView) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      // 4) 默认仍显示新澳彩
      qsa('.baomalaodaName').forEach(function (n) {
        var b = findBlock(n);
        if (b && b !== block) b.style.display = '';
      });
    });
})();
