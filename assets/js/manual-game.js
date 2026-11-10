/* 新彩种（可乐手动开奖）· 纯前端占位渲染：在「香港彩」前面插入 tab 与号码块
   数据来自 data/manual-draw.json；标注「示例」直到接入 GitHub Actions 手动开奖 */
(function () {
  'use strict';
  var XC_ATTRS = {"10":{"z":"鸡","c":"蓝","w":"火","n":"贵妃","f":"葵花","d":"酉金"},"11":{"z":"猴","c":"绿","w":"火","n":"猴王","f":"松花","d":"申金"},"12":{"z":"羊","c":"红","w":"金","n":"西宫","f":"樱花","d":"未土"},"13":{"z":"马","c":"红","w":"金","n":"元帅","f":"杏花","d":"午火"},"14":{"z":"蛇","c":"蓝","w":"水","n":"才人","f":"竹花","d":"巳火"},"15":{"z":"龙","c":"蓝","w":"水","n":"状元","f":"梨花","d":"辰土"},"16":{"z":"兔","c":"绿","w":"木","n":"小姐","f":"兰花","d":"卯木"},"17":{"z":"虎","c":"绿","w":"木","n":"武士","f":"桃花","d":"寅木"},"18":{"z":"牛","c":"红","w":"火","n":"员外","f":"荷花","d":"丑土"},"19":{"z":"鼠","c":"红","w":"火","n":"叛贼","f":"梅花","d":"子水"},"20":{"z":"猪","c":"蓝","w":"土","n":"商贾","f":"桂花","d":"亥水"},"21":{"z":"狗","c":"绿","w":"土","n":"文官","f":"菊花","d":"戌土"},"22":{"z":"鸡","c":"绿","w":"水","n":"东宫","f":"葵花","d":"酉金"},"23":{"z":"猴","c":"红","w":"水","n":"太监","f":"松花","d":"申金"},"24":{"z":"羊","c":"红","w":"木","n":"夫人","f":"樱花","d":"未土"},"25":{"z":"马","c":"蓝","w":"木","n":"秀才","f":"杏花","d":"午火"},"26":{"z":"蛇","c":"蓝","w":"金","n":"美人","f":"竹花","d":"巳火"},"27":{"z":"龙","c":"绿","w":"金","n":"君主","f":"梨花","d":"辰土"},"28":{"z":"兔","c":"绿","w":"土","n":"皇后","f":"兰花","d":"卯木"},"29":{"z":"虎","c":"红","w":"土","n":"都督","f":"桃花","d":"寅木"},"30":{"z":"牛","c":"红","w":"水","n":"大将","f":"荷花","d":"丑土"},"31":{"z":"鼠","c":"蓝","w":"水","n":"神偷","f":"梅花","d":"子水"},"32":{"z":"猪","c":"绿","w":"火","n":"县令","f":"桂花","d":"亥水"},"33":{"z":"狗","c":"绿","w":"火","n":"管家","f":"菊花","d":"戌土"},"34":{"z":"鸡","c":"红","w":"金","n":"歌女","f":"葵花","d":"酉金"},"35":{"z":"猴","c":"红","w":"金","n":"游侠","f":"松花","d":"申金"},"36":{"z":"羊","c":"蓝","w":"土","n":"皇妃","f":"樱花","d":"未土"},"37":{"z":"马","c":"蓝","w":"土","n":"牛童","f":"杏花","d":"午火"},"38":{"z":"蛇","c":"绿","w":"木","n":"宫妃","f":"竹花","d":"巳火"},"39":{"z":"龙","c":"绿","w":"木","n":"国君","f":"梨花","d":"辰土"},"40":{"z":"兔","c":"红","w":"火","n":"东宫","f":"兰花","d":"卯木"},"41":{"z":"虎","c":"蓝","w":"火","n":"将军","f":"桃花","d":"寅木"},"42":{"z":"牛","c":"蓝","w":"金","n":"包公","f":"荷花","d":"丑土"},"43":{"z":"鼠","c":"绿","w":"金","n":"兵将","f":"梅花","d":"子水"},"44":{"z":"猪","c":"绿","w":"水","n":"巫女","f":"桂花","d":"亥水"},"45":{"z":"狗","c":"红","w":"水","n":"奴才","f":"菊花","d":"戌土"},"46":{"z":"鸡","c":"红","w":"木","n":"奴婢","f":"葵花","d":"酉金"},"47":{"z":"猴","c":"蓝","w":"木","n":"侠士","f":"松花","d":"申金"},"48":{"z":"羊","c":"蓝","w":"火","n":"彩蝶","f":"樱花","d":"未土"},"49":{"z":"马","c":"绿","w":"火","n":"笛声","f":"杏花","d":"午火"},"01":{"z":"马","c":"红","w":"水","n":"太子","f":"杏花","d":"午火"},"02":{"z":"蛇","c":"红","w":"火","n":"宫女","f":"竹花","d":"巳火"},"03":{"z":"龙","c":"蓝","w":"火","n":"皇帝","f":"梨花","d":"辰土"},"04":{"z":"兔","c":"蓝","w":"金","n":"玉帝","f":"兰花","d":"卯木"},"05":{"z":"虎","c":"绿","w":"金","n":"大王","f":"桃花","d":"寅木"},"06":{"z":"牛","c":"绿","w":"土","n":"元帅","f":"荷花","d":"丑土"},"07":{"z":"鼠","c":"红","w":"土","n":"国师","f":"梅花","d":"子水"},"08":{"z":"猪","c":"红","w":"木","n":"太保","f":"桂花","d":"亥水"},"09":{"z":"狗","c":"蓝","w":"木","n":"先锋","f":"菊花","d":"戌土"}};
  function colorOf(n){var r=[1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46],b=[3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48];return r.indexOf(n)>=0?'red':(b.indexOf(n)>=0?'blue':'green')};
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
        var tile = mas[i] && mas[i].parentNode;
        if (tile) {
          var at = XC_ATTRS[n.c] || {};
          var col = n.color || at.c || colorOf(parseInt(n.c, 10));
          n.wuxing = n.wuxing || at.w;
          n.label = n.label || at.n;
          tile.style.background = col === 'red' ? '#e71607' : (col === 'blue' ? '#2873e6' : '#1fb61d');
          tile.style.color = '#fff';
          if (n.wuxing) {
            var w = tile.querySelector('.xc-wx');
            if (!w) { w = document.createElement('span'); w.className = 'xc-wx'; w.style.cssText = 'display:block;font:11px/1.1 "Microsoft YaHei",Arial,sans-serif;color:#fff'; tile.appendChild(w); }
            w.textContent = n.wuxing + (n.label ? '·' + n.label : '');
          }
        }
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
        // 玩法块（单双 + 三肖），样式沿用现资料栏目
  fetch(base() + 'data/manual-play.json?t=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (p) {
      if (!p) return;
      var app = document.getElementById('app');
      var anchor = document.getElementById('widgetBox41750');
      if (!app || !anchor) return;
      var box = document.createElement('div');
      box.style.cssText = 'margin:10px auto;max-width:720px;background:#fffef5;border:1px solid #d8ccb4;border-radius:5px;overflow:hidden';
      var zs = (p.threeZodiac || []).join('');
      box.innerHTML =
        '<div style="background:linear-gradient(#f52c17,#d60000);color:#ffd75e;text-align:center;font:700 17px/2.2 \'Microsoft YaHei\',Arial,sans-serif">' + (p.name || '') + '【单双\u2462肖】</div>' +
        '<div style="padding:8px 12px;font:700 15px/1.9 \'Microsoft YaHei\',Arial,sans-serif;color:#333">' +
        '<div>' + (p.issue || '') + '期:内幕【' + (p.oddEven || '') + '数】主【' + zs + '】</div>' +
        '<div style="color:#a33;font-weight:400;font-size:13px">' + (p.note || '') + '</div>' +
        '</div>';
      anchor.parentNode.insertBefore(box, anchor.nextSibling);
    });
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
