/* 新彩种（手动开奖）· 纯前端占位渲染：在「香港彩」前面插入 tab 与号码块
   数据来自 data/manual-draw.json；标注「示例」直到接入 GitHub Actions 手动开奖 */
(function () {
  'use strict';

  // 数据直读：raw.githubusercontent 主源（提交秒级生效，无需构建）→ 本地 Pages 副本兜底
  // 三源数据直读：jsDelivr（主，purge 快）→ raw.githubusercontent（次）→ Pages 本地（兜底）
  var XC_JD = 'https://cdn.jsdelivr.net/gh/BYD666-WQ/xingchen-caixun@main/';
  var XC_RAW = 'https://raw.githubusercontent.com/BYD666-WQ/xingchen-caixun/main/';
  function xcVer() { return Math.floor(Date.now() / 60000); }
  async function fetchJSON(path) {
    var sources = [XC_JD, XC_RAW, base()];
    for (var i = 0; i < 3; i++) {
      for (var s = 0; s < sources.length; s++) {
        try {
          var r = await fetch(sources[s] + path + '?v=' + xcVer(), { cache: 'no-store' });
          if (r.ok) {
            var j = await r.json();
            if (j) return j;
          }
        } catch (e) {}
      }
      await new Promise(function (res) { setTimeout(res, 400 * (i + 1)); });
    }
    return null;
  }


  var XC_SHOW_WUXING = (localStorage.getItem('xc:showWuxing') !== '0');
  function xcSetBallLabel(xiao, zodiac, wuxing) {
    if (!xiao) return;
    xiao.setAttribute('data-xc-labeled', '1');
    var z = String(zodiac || '').trim();
    if (!z) return;
    var html = '<b style="font-size:13px;font-weight:700;line-height:1.15">' + z + '</b>';
    if (XC_SHOW_WUXING && wuxing) {
      html += '<span style="font-size:9px;font-weight:400;color:rgba(255,255,255,.72)"> · ' + String(wuxing).trim() + '</span>';
    }
    xiao.innerHTML = html;
    xiao.style.whiteSpace = 'nowrap';
  }
  function xcDecorateAllBalls() {
    var tiles = document.querySelectorAll('.baomalaodaMa');
    for (var i = 0; i < tiles.length; i++) {
      var t = tiles[i];
      var num = (t.textContent || '').replace(/\s+/g, '');
      num = (num.match(/^\d{1,2}/) || [''])[0];
      if (!num) continue;
      var xiao = t.parentNode ? t.parentNode.querySelector('.baomalaodaXiao') : null;
      if (!xiao) continue;
      var key2 = ('0' + num).slice(-2);
      var at = (typeof XC_ATTRS === 'object') ? XC_ATTRS[key2] : null;
      if (!at) continue;
      xcSetBallLabel(xiao, at.z, at.w);
    }
  }

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
      block.style.display = '';
      var nm = block.querySelector('.baomalaodaName');
      if (nm) nm.textContent = d.name || '\u65b0\u5f69\u79cd';
      var qi = block.querySelector('.baomalaodaQi');
      if (qi && d.issue) qi.textContent = String(d.issue);
      var mas = block.querySelectorAll('.baomalaodaMa');
      var xs = block.querySelectorAll('.baomalaodaXiao');
      (d.nums || []).forEach(function (n, i) {
        if (mas[i]) mas[i].textContent = n.c;
        if (xs[i]) {
          var at0 = XC_ATTRS[n.c] || {};
          xcSetBallLabel(xs[i], n.z || at0.z, n.wuxing || at0.w);
        }
        var tile = mas[i] && mas[i].parentNode;
        if (tile) {
          var at = XC_ATTRS[n.c] || {};
          var CMAP = { '\u7ea2': '#e71607', '\u84dd': '#2873e6', '\u7eff': '#1fb61d', red: '#e71607', blue: '#2873e6', green: '#1fb61d' };
          var raw = n.color || at.c || '';
          var col = CMAP[raw] || CMAP[colorOf(parseInt(n.c, 10))] || '#1fb61d';
          n.wuxing = n.wuxing || at.w;
          tile.style.background = col;
          tile.style.color = '#fff';
        }
      });
      [].slice.call(block.querySelectorAll('*')).forEach(function (el) {
        if (el.children.length === 0 && (el.textContent || '').indexOf('\u9999\u6e2f\u5f69\u7b2c') >= 0) {
          el.textContent = (d.name || '\u65b0\u9999\u6e2f') + el.textContent.replace(/^\u9999\u6e2f\u5f69/, '');
        }
      });
      hkBlock.parentNode.insertBefore(block, hkBlock);
      var nextIssue0 = (parseInt(d.issue, 10) || 1) + 1;
      var nextEl = document.createElement('div');
      nextEl.className = 'xc-next-line';
      nextEl.style.cssText = 'max-width:720px;margin:2px auto 8px;padding:0 12px;font:700 13px/1.6 "Microsoft YaHei",Arial,sans-serif;color:#333';
      nextEl.textContent = (d.name || '\u65b0\u9999\u6e2f') + '\u7b2c' + nextIssue0 + '\u671f: ' + (d.drawTime || '\u6bcf\u5929 21:34');
      block.parentNode.insertBefore(nextEl, block.nextSibling);
      
      // 2.4) 下一期行（宽松匹配，覆盖克隆来的其它彩种文案）
      (function () {
        var nextIssue = (parseInt(d.issue, 10) || 1) + 1;
        var target = (d.name || '\u65b0\u9999\u6e2f') + '\u7b2c' + nextIssue + '\u671f: ' + (d.drawTime || '\u6bcf\u5929 21:34');
        var els = block.querySelectorAll('*');
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          if (el.children.length) continue;
          var t = (el.textContent || '').trim();
          if (/\u7b2c\s*\d+\s*\u671f\s*[:\uff1a]/.test(t)) { el.textContent = target; }
          else if (/\u7b2c\s*\d+\s*\u671f/.test(t) && t.length < 40) { el.textContent = target; }
        }
        setTimeout(xcDecorateAllBalls, 900);
  setTimeout(xcDecorateAllBalls, 2400);
})();
      // 2.5) 下一期行 + 倒计时（必须覆盖克隆来的香港彩文本）
      (function () {
        var nextIssue = (parseInt(d.issue, 10) || 1) + 1;
        var nextText = (d.name || '\u65b0\u9999\u6e2f') + '\u7b2c' + nextIssue + '\u671f: ' + (d.drawTime || '\u6bcf\u5929 21:34');
        var line = null;
        [].slice.call(block.querySelectorAll('*')).forEach(function (el) {
          if (line || el.children.length) return;
          var t = (el.textContent || '');
          if (t.indexOf('\u7b2c') >= 0 && t.indexOf('\u671f') >= 0 && t.indexOf(':') >= 0 && t.indexOf('\u9999\u6e2f\u5f69') >= 0) line = el;
        });
        if (line) line.textContent = nextText;
        var hm = String(d.dailyTime || '21:34').split(':');
        var el2 = document.createElement('span');
        el2.className = 'xc-countdown';
        el2.style.cssText = 'margin-left:8px;font:700 13px/1.4 "Microsoft YaHei",Arial,sans-serif;color:#1f3b8a';
        if (line) line.parentNode.insertBefore(el2, line.nextSibling); else block.appendChild(el2);
        function tick() {
          var now = new Date();
          var t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hm[0], 10), parseInt(hm[1], 10), 0);
          if (t.getTime() <= now.getTime()) t = new Date(t.getTime() + 86400000);
          var left = Math.floor((t.getTime() - now.getTime()) / 1000);
          var h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
          var p = function (n) { return (n < 10 ? '0' : '') + n; };
          el2.textContent = '\u8ddd\u5f00\u5956 ' + p(h) + ':' + p(m) + ':' + p(s);
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

  // 顶部第二块：完整克隆「新香港」详情块（数据同源，内容完全一致）
  (function () {
    function findBlockByName(nm) {
      var names = document.querySelectorAll('.baomalaodaName');
      for (var i = 0; i < names.length; i++) {
        if ((names[i].textContent || '').replace(/\s+/g, '') === nm) {
          var b = names[i];
          while (b && b !== document.body) {
            if (b.querySelector && b.querySelectorAll('.baomalaodaMa').length >= 7) return b;
            b = b.parentNode;
          }
        }
      }
      return null;
    }
    function run() {
      var anchor = document.getElementById('widgetBox41750');
      var src = findBlockByName('\u65b0\u9999\u6e2f');
      if (!anchor || !src || document.getElementById('xc-top-block')) return;
      var top = document.createElement('div');
      top.id = 'xc-top-block';
      top.style.cssText = 'max-width:720px;margin:10px auto 6px';
      top.appendChild(src.cloneNode(true));
      var sib = src.nextElementSibling;
      if (sib && sib.className && sib.className.indexOf('xc-next-line') >= 0) top.appendChild(sib.cloneNode(true));
      var hists = top.querySelectorAll('.baomalaodaHistory');
      for (var j = 0; j < hists.length; j++) {
        hists[j].style.cursor = 'pointer';
        hists[j].addEventListener('click', function (e) {
          e.preventDefault();
          
        });
      }
      anchor.parentNode.insertBefore(top, anchor);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
    setTimeout(run, 1200);
  })();

  // 全局清扫（不隐藏，只替换文案 + 独立倒计时）
  (function () {
    function tick(el) {
      function t() {
        var now = new Date();
        var d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 34, 0);
        if (d.getTime() <= now.getTime()) d = new Date(d.getTime() + 86400000);
        var left = Math.floor((d.getTime() - now.getTime()) / 1000);
        function p(n) { return (n < 10 ? '0' : '') + n; }
        el.textContent = '\u8ddd\u5f00\u5956 ' + p(Math.floor(left / 3600)) + ':' + p(Math.floor(left % 3600 / 60)) + ':' + p(left % 60);
      }
      t(); setInterval(t, 1000);
    }
    function isInNewHk(el) {
      var b = el;
      while (b && b !== document.body) {
        if (b.querySelector && b.querySelectorAll && b.querySelectorAll('.baomalaodaMa').length >= 7) {
          var nm = b.querySelector('.baomalaodaName');
          return !!(nm && (nm.textContent || '').indexOf('\u65b0\u9999\u6e2f') >= 0);
        }
        b = b.parentNode;
      }
      return false;
    }
    function scrub() {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i], t = (el.textContent || '');
        if (isInNewHk(el) && !el.querySelector('.baomalaodaName') && el.children.length <= 5 && t.length < 140 && /\u9999\u6e2f\u5f69\u7b2c\s*\d+/.test(t)) {
          if (el.getAttribute('data-xc-fixed') === '1') continue;
          el.setAttribute('data-xc-fixed', '1');
          el.textContent = '\u65b0\u9999\u6e2f\u7b2c' + ((window.__XC_ISSUE || 313) + 1) + '\u671f: \u6bcf\u5929 21:34  ';
          var sp = document.createElement('span');
          sp.style.cssText = 'margin-left:6px;color:#1f3b8a;font-weight:700';
          el.appendChild(sp);
          tick(sp);
        }
      }
    }
    scrub(); setInterval(scrub, 500);
  })();

  // 新香港历史开奖面板
  (function () {
    function show(list) {
      var old = document.getElementById('xc-mhist');
      if (old) old.remove();
      var box = document.createElement('div');
      box.id = 'xc-mhist';
      box.style.cssText = 'position:fixed;inset:0;z-index:10005;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:12px';
      var inner = '<div style="background:#fff;border-radius:8px;max-width:92vw;max-height:78vh;overflow:auto;padding:10px 12px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;font:700 15px/2 \'Microsoft YaHei\',Arial,sans-serif;color:#1f3b8a">' +
        '<span>新香港 · 历史开奖</span><button id="xc-mhist-x" style="width:40px;height:40px;border:0;background:none;font-size:20px">\u00d7</button></div>' +
        '<table style="border-collapse:collapse;font:13px/1.6 \'Microsoft YaHei\',Arial,sans-serif">' +
        '<tr style="color:#666"><th style="padding:4px 8px;text-align:left">\u671f\u53f7</th><th style="padding:4px 8px;text-align:left">\u5f00\u5956\u53f7\u7801</th></tr>';
      list.forEach(function (h) {
        var balls = (h.nums || []).map(function (n) {
          var col = n.color === '\u7ea2' ? '#e71607' : (n.color === '\u84dd' ? '#2873e6' : '#1fb61d');
          return '<span style="display:inline-block;min-width:26px;text-align:center;margin:2px;padding:2px 4px;border-radius:4px;background:' + col + ';color:#fff;font-weight:700">' + n.c + '<i style="display:block;font-style:normal;font-size:10px;font-weight:400">' + (n.wuxing || '') + '/' + (n.z || '') + '</i></span>';
        }).join('');
        inner += '<tr><td style="padding:6px 8px;border-top:1px solid #eee">' + h.issue + ' \u671f</td><td style="padding:6px 8px;border-top:1px solid #eee">' + balls + '</td></tr>';
      });
      inner += '</table></div>';
      box.innerHTML = inner;
      document.body.appendChild(box);
      box.addEventListener('click', function (e) { if (e.target === box) box.remove(); });
      document.getElementById('xc-mhist-x').addEventListener('click', function () { box.remove(); });
    }
    window.XC_NEWHK_HISTORY = show;
  })();

  // 历史面板（事件委托 + 自己拉数据，避免绑定时机问题）xc-mhist-delegated
  (function () {
    function findBlock(el) {
      var b = el;
      while (b && b !== document.body) {
        if (b.querySelector && b.querySelectorAll && b.querySelectorAll('.baomalaodaMa').length >= 7) return b;
        b = b.parentNode;
      }
      return null;
    }
    function render(list) {
      var old = document.getElementById('xc-mhist');
      if (old) old.remove();
      var box = document.createElement('div');
      box.id = 'xc-mhist';
      box.style.cssText = 'position:fixed;inset:0;z-index:10006;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:12px';
      var html = '<div style="background:#fff;border-radius:8px;max-width:92vw;max-height:78vh;overflow:auto;padding:10px 12px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;font:700 15px/2 \'Microsoft YaHei\',Arial,sans-serif;color:#1f3b8a">' +
        '<span>\u65b0\u9999\u6e2f \u00b7 \u5386\u53f2\u5f00\u5956\uff08' + list.length + '\u671f\uff09</span>' +
        '<button id="xc-mhist-x" style="width:40px;height:40px;border:0;background:none;font-size:20px">\u00d7</button></div>' +
        '<table style="border-collapse:collapse;font:13px/1.6 \'Microsoft YaHei\',Arial,sans-serif">';
      list.forEach(function (h) {
        var balls = (h.nums || []).map(function (n) {
          var col = n.color === '\u7ea2' ? '#e71607' : (n.color === '\u84dd' ? '#2873e6' : '#1fb61d');
          return '<span style="display:inline-block;min-width:26px;text-align:center;margin:2px;padding:2px 4px;border-radius:4px;background:' + col + ';color:#fff;font-weight:700">' + n.c +
            '<i style="display:block;font-style:normal;font-size:10px;font-weight:400">' + (n.wuxing || '') + '/' + (n.z || '') + '</i></span>';
        }).join('');
        html += '<tr><td style="padding:6px 8px;border-top:1px solid #eee;white-space:nowrap">' + h.issue + ' \u671f</td><td style="padding:6px 8px;border-top:1px solid #eee">' + balls + '</td></tr>';
      });
      html += '</table></div>';
      box.innerHTML = html;
      document.body.appendChild(box);
      box.addEventListener('click', function (e) { if (e.target === box) box.remove(); });
      document.getElementById('xc-mhist-x').addEventListener('click', function () { box.remove(); });
    }
    function open() {
      fetch(base() + 'data/manual-draw.json?t=' + Date.now(), { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) { render((d && d.history) || []); })
        .catch(function () { render([]); });
    }
    document.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== document.body && !(t.className && String(t.className).indexOf('baomalaodaHistory') >= 0)) t = t.parentNode;
      if (!t || t === document.body) return;
      var b = findBlock(t);
      if (!b) return;
      var nm = b.querySelector('.baomalaodaName');
      if (!nm || (nm.textContent || '').indexOf('\u65b0\u9999\u6e2f') < 0) return;
      e.preventDefault(); e.stopPropagation();
      open();
    }, true);
  })();

  // 系统文案（站名/标语/公告/免责）· 读 data/site-copy.json，缺省保持现状
  (function () {
    fetchJSON('data/site-copy.json')
      .then(function (j) { return j; })
      .then(function (c) {
        if (!c) return;
        if (c.brand) {
          var num = String(c.brandNumber || c.bannerNumber || '').trim().slice(0, 8);
          var html = c.brand + (num ? '<b style="font-size:1.18em;font-weight:900;color:#d60000;margin-left:4px;vertical-align:-1px">' + num + '</b>' : '');
          var logo = document.querySelector('.xc-logo');
          if (logo) logo.innerHTML = html;
          var fb = document.querySelector('.xc-footer-brand');
          if (fb) fb.innerHTML = html;
          document.title = c.brand + (num || '');
        }
        if (c.disclaimer) {
          var notes = document.querySelectorAll('.xc-footer-note');
          if (notes.length) notes[0].textContent = c.disclaimer;
        }
        if (c.notice) {
          var bar = document.createElement('div');
          bar.style.cssText = 'background:#fff3cd;color:#8a6d3b;text-align:center;font:12px/2 \'Microsoft YaHei\',Arial,sans-serif;padding:0 8px';
          bar.textContent = c.notice;
          var top = document.querySelector('.topbar') || document.querySelector('header');
          if (top && top.parentNode) top.parentNode.insertBefore(bar, top.nextSibling);
        }
      }).catch(function () {});
  })();

  // 资料区（单双③肖）改为新香港数据，保持原结构样式；移除原站外链行
  (function () {
    var numsHK = [];
    fetch(base() + 'data/manual-draw.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).then(function (d) { numsHK = (d.nums || []).map(function (n) { return n.c; }); }).catch(function () {});
    fetch(base() + 'data/manual-ziliao.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.rows || !d.rows.length) return;
        var box = document.getElementById('widgetBox43159');
        if (!box) return;
        var inner = box.querySelector('.nmsx-festive-content');
        if (!inner) return;
        var title = box.querySelector('.nmsx-festive-title');
        if (title) title.textContent = '\u9999\u6e2f\u6447\u94b1\u6811\u3010\u5355\u53cc\u2462\u8096\u3011';
        inner.innerHTML = d.rows.map(function (it) {
          if (it.status === 'upcoming') {
            return '<div class="nmsx-festive-row"><span class="nmsx-festive-issue">\u65b0\u9999\u6e2f' + it.issue + '\u671f:\u5185\u5e55</span>' +
              '<span class="nmsx-festive-type">\u3010\u63d0\u524d\u516c\u5f00\u3011</span><span class="ziliaokl">\u70b9\u51fb\u67e5\u770b</span></div>';
          }
          var oe = it.oddEven === '\u5355' ? '\u5355\u6570' : '\u53cc\u6570';
          var zs = (it.threeZodiac || []).join('');
          var res = it.result ? (it.result.z + it.result.c) : '';
          return '<div class="nmsx-festive-row">' +
            '<span class="nmsx-festive-issue">\u65b0\u9999\u6e2f' + it.issue + '\u671f:\u5185\u5e55</span>' +
            '<span class="nmsx-festive-type">\u3010' + oe + '\u3011</span>' +
            '<span class="nmsx-festive-main">\u4e3b</span>' +
            '<span class="nmsx-festive-zodiac">\u3010' + zs + '\u3011</span>' +
            '<span>\u5f00</span>' +
            '<span class="nmsx-festive-result">' + res + '</span>' +
            '<span class="nmsx-festive-accurate">\u51c6</span>' +
            '</div>';
        }).join('');
      }).catch(function () {});
  })();
  // 全彩种倒计时：每块按自己的下一期时间算，统一「距开奖 HH:MM:SS」
  (function () {
    function pad(n) { return (n < 10 ? '0' : '') + n; }
    function targetOf(block) {
      var nodes = block.querySelectorAll('*');
      var hhmm = null;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].children.length) continue;
        var t = (nodes[i].textContent || '').replace(/\s+/g, '');
        var m = t.match(/(\d{1,2})\u6708(\d{1,2})\u65e5[^0-9]{0,6}(\d{1,2})[:：](\d{2})/);
        if (m) {
          var now = new Date();
          var d = new Date(now.getFullYear(), parseInt(m[1], 10) - 1, parseInt(m[2], 10), parseInt(m[3], 10), parseInt(m[4], 10), 0);
          while (d.getTime() <= now.getTime()) d = new Date(d.getTime() + 86400000);
          return d;
        }
        if (!hhmm) {
          var m2 = t.match(/(\d{1,2})[:：](\d{2})/);
          if (m2) hhmm = [parseInt(m2[1], 10), parseInt(m2[2], 10)];
        }
      }
      if (hhmm) {
        var n2 = new Date();
        var t2 = new Date(n2.getFullYear(), n2.getMonth(), n2.getDate(), hhmm[0], hhmm[1], 0);
        while (t2.getTime() <= n2.getTime()) t2 = new Date(t2.getTime() + 86400000);
        return t2;
      }
      return null;
    }
    function tickAll() {
      var names = document.querySelectorAll('.baomalaodaName');
      for (var i = 0; i < names.length; i++) {
        var b = names[i];
        while (b && b !== document.body) {
          if (b.querySelector && b.querySelectorAll('.baomalaodaMa').length >= 7) break;
          b = b.parentNode;
        }
        if (!b) continue;
        if (!window.__xcCdCleaned) {
          var olds = document.querySelectorAll('.xc-cd-all');
          for (var oi = 0; oi < olds.length; oi++) { if (olds[oi].parentNode) olds[oi].parentNode.removeChild(olds[oi]); }
          window.__xcCdCleaned = 1;
        }
        var box = b.__xcCdBox;
        if (!box || !box.parentNode) {
          box = document.createElement('span');
          box.className = 'xc-cd-all';
          box.style.cssText = 'display:block;max-width:720px;margin:2px auto 6px;padding:0 12px;font:700 13px/1.7 "Microsoft YaHei",Arial,sans-serif;color:#c0392b';
          b.parentNode.insertBefore(box, b.nextSibling);
          b.__xcCdBox = box;
        }
        var target = targetOf(b);
        if (!target) { box.textContent = ''; continue; }
        var left = Math.floor((target.getTime() - Date.now()) / 1000);
        if (left < 0) left = 0;
        var days = Math.floor(left / 86400);
        var hh = Math.floor((left % 86400) / 3600), mm = Math.floor((left % 3600) / 60), ss = left % 60;
        box.textContent = '\u8ddd\u5f00\u5956 ' + (days > 0 ? (days + '\u5929') : '') + pad(hh) + ':' + pad(mm) + ':' + pad(ss);
      }
    }
    function hideArchiveCd() {
      var nodes = document.querySelectorAll('span,div,i,em');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (el.children.length) continue;
        var t = (el.textContent || '').trim();
        if (el.closest && el.closest('.xc-cd-all')) continue;
        if (t.indexOf('\u8ddd\u5f00\u5956') === 0 || t.indexOf('\u539f\u5f00\u5956') === 0) { el.style.display = 'none'; continue; }
        if (t.indexOf('\u8ddd\u5f00\u5956') >= 0) {
          el.textContent = t.replace(/\u8ddd\u5f00\u5956[\s:：]*\d{1,3}:\d{2}:\d{2}/g, '').replace(/\u539f\u5f00\u5956[\s:：]*\d{1,3}:\d{2}:\d{2}/g, '').trim();
        }
      }
    }
    setTimeout(hideArchiveCd, 900); setTimeout(hideArchiveCd, 2000); setInterval(hideArchiveCd, 2000);
    setTimeout(tickAll, 700); setTimeout(tickAll, 1800); setInterval(tickAll, 1000);
    document.addEventListener('click', function () { setTimeout(tickAll, 120); });
  })();

  // 资料区排版修正：单行不换行 + 三肖居中 + 行内容整体居中
  (function () {
    var st = document.createElement('style');
    st.id = 'xc-ziliao-align';
    st.textContent = [
      '.nmsx-festive-row{display:flex;align-items:center;justify-content:center;flex-wrap:nowrap;white-space:nowrap;font-size:13px;gap:2px}',
      '.nmsx-festive-row>span{text-align:center;letter-spacing:0}',
      '.nmsx-festive-zodiac{display:inline-flex;justify-content:center;align-items:center;text-align:center;letter-spacing:0;margin:0 2px}',
      '.nmsx-festive-issue{font-size:12.5px}',
      '.nmsx-festive-result{min-width:auto}'
    ].join('');
    document.head.appendChild(st);
  })();

  // 统一球体排版（球内数字+球下生肖居中）+ 顶部横幅大数字
  (function () {
    var st = document.createElement('style');
    st.id = 'xc-ball-center';
    st.textContent = [
      '.wdrc,.wdbc,.wdgc{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;text-align:center!important;letter-spacing:0!important;padding:0!important;box-sizing:content-box!important}',
      '.wdrc span,.wdbc span,.wdgc span,.wdrc b,.wdbc b,.wdgc b{display:block!important;width:100%!important;text-align:center!important;letter-spacing:0!important;margin:0!important;padding:0!important;line-height:1.05!important}',
      '.wdrc .baomalaodaXiao,.wdbc .baomalaodaXiao,.wdgc .baomalaodaXiao{display:flex!important;justify-content:center!important;align-items:center!important;width:100%!important;text-align:center!important;letter-spacing:0!important}',
      '.baomalaodaName,.baomalaodaQi{text-align:center}',
      '#xc-banner-num{font:900 44px/1.2 "Microsoft YaHei",Arial,sans-serif;color:#d60000;text-align:center;letter-spacing:2px;padding:6px 0}'
    ].join('');
    document.head.appendChild(st);
  })();
  // 顶部横幅：替换成可配置大数字（默认 7798）
  fetch(base() + 'data/site-copy.json?t=' + Date.now(), { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (c) {
      var num = (c && c.bannerNumber) || '7798';
      var box = document.querySelector('.amcz-domain');
      if (!box) return;
      box.innerHTML = '<div id="xc-banner-num">' + String(num).slice(0, 12) + '</div>';
    }).catch(function () {});

  // 资料区：13 张 sevenxiaosevenma 全部逐表重建为新香港数据
  (function () {
    Promise.all([fetchJSON('data/manual-ziliao.json'), fetchJSON('data/manual-draw.json')]).then(function (res) {
      var z = res[0] || {}, d = res[1] || {};
      var rows = z.rows || [];
      var nums = (d.nums || []).map(function (n) { return n.c; });
      var tables = [].slice.call(document.querySelectorAll('table.sevenxiaosevenma'));
      console.log('[ziliao] tables=', tables.length, 'rows=', rows.length, 'nums=', nums.join(','));
      if (!tables.length || !rows.length) return;
      function zs(n) { return base_.slice(0, n).map(function (x) { return '<span>' + x + '</span>'; }).join(''); }
      var base_ = [];
      rows.forEach(function (r) { (r.threeZodiac || []).forEach(function (x) { if (base_.indexOf(x) < 0) base_.push(x); }); });
      base_ = base_.concat(['\u9f20','\u725b','\u864e','\u5154','\u9f99','\u86c7','\u9a6c','\u7f8a','\u7334','\u9e21','\u72d7','\u732a']).slice(0, 7);
      try {
        tables.forEach(function (tb, idx) {
          var row = rows[idx % rows.length] || rows[0];
          var tbody = tb.querySelector('tbody') || tb;
          var issue = row.issue || d.issue;
          function line(label, n) {
            var codes = nums.slice(0, n).join('.');
            return '<tr><td class="sevenxiaosevenma-left-td">' + label + ':<span class="sevenxiaosevenma-custome-text" style="font-size:clamp(1rem,4vw,1.4rem);color:#c00">' + zs(n) + '</span>' +
              (codes ? '<span style="margin-left:6px;color:#666;font-size:12px">\u7801:' + codes + '</span>' : '') + '</td></tr>';
          }
          tbody.innerHTML = '';
          tbody.innerHTML = line('\u65b0\u9999\u6e2f' + issue + '\u671f\u4e03\u8096', 7) + line('\u4e94\u8096', 5) + line('\u4e09\u8096', 3) + line('\u4e8c\u8096', 2) + line('\u4e00\u8096', 1);
          tb.setAttribute('data-xc-hk', '1');
        });
        console.log('[ziliao] rebuilt=', document.querySelectorAll('table.sevenxiaosevenma[data-xc-hk="1"]').length);
      } catch (e) { console.log('[ziliao] error', e && e.message); }
    }).catch(function (e) { console.log('[ziliao] fetch failed', e && e.message); });
  })();
})();

  // 版式 A（清爽版）：大标题 → 一排最新开奖 → 4 彩种按钮；资料/内幕/历史默认收起
  (function () {
    var state = { open: false };
    function fmt(list) { return list.map(function (n) { return n.c || n; }); }
    function ball(c, z, color) {
      var bg = color === '\u7ea2' ? '#e71607' : (color === '\u84dd' ? '#2873e6' : '#1fb61d');
      return '<span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:' + bg + ';color:#fff;margin:3px;font:700 14px/1 \'Microsoft YaHei\',Arial,sans-serif">' + c +
        '<i style="font-style:normal;font-size:9px;opacity:.85">' + (z || '') + '</i></span>';
    }
    Promise.all([
      fetch(base() + 'data/site-copy.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
      fetch(base() + 'data/manual-draw.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; })
    ]).then(function (res) {
      var c = res[0] || {}, d = res[1] || {};
      var brand = c.brand || '\u9999\u6e2f\u6447\u94b1\u6811';
      var num = String(c.brandNumber || c.bannerNumber || '').trim();
      var nums = (d.nums || []).slice(0, 7);
      var balls = nums.map(function (n) { return ball(n.c, n.z, n.color); }).join('');
      var box = document.createElement('div');
      box.id = 'xc-layout-a';
      box.style.cssText = 'max-width:720px;margin:8px auto;padding:12px 10px;background:#fffdf6;border:1px solid #e8dcc8;border-radius:10px;text-align:center';
      box.innerHTML =
        '<div id="xc-a-title" style="font:900 26px/1.3 \'Microsoft YaHei\',Arial,sans-serif;color:#c0392b">' + brand +
        (num ? '<span style="color:#d60000;margin-left:4px">' + num + '</span>' : '') + '</div>' +
        '<div id="xc-a-draw" style="margin:10px 0 6px;font:700 13px/1.6 \'Microsoft YaHei\',Arial,sans-serif;color:#333">\u65b0\u9999\u6e2f\u7b2c' + (d.issue || '') + '\u671f</div>' +
        '<div id="xc-a-balls" style="display:flex;flex-wrap:wrap;justify-content:center">' + balls + '</div>' +
        '<div id="xc-a-tabs" style="display:flex;gap:8px;justify-content:center;margin:10px 0 4px">' +
        ['\u65b0\u6fb3\u5f69','\u8001\u6fb3\u5f69','\u65b0\u9999\u6e2f','\u9999\u6e2f\u5f69'].map(function (nm) {
          return '<button data-tab="' + nm + '" style="flex:1;min-height:42px;border:1px solid #d8ccb4;border-radius:8px;background:#fff;color:#333;font:700 14px \'Microsoft YaHei\',Arial,sans-serif">' + nm + '</button>';
        }).join('') + '</div>' +
        '<button id="xc-a-more" style="margin-top:6px;min-height:38px;border:0;border-radius:8px;background:#f3ede1;color:#7a5c1e;font:700 13px \'Microsoft YaHei\',Arial,sans-serif;padding:0 14px">\u5c55\u5f00\u8d44\u6599 / \u5185\u5e55 / \u5386\u53f2</button>';
      var navBanner = document.querySelector('#widgetBox41365 span[style*="font-size: 25px"], #widgetBox41365 span');
      var navBox = document.querySelector('#widgetBox41365');
      if (navBox) { var sp = navBox.querySelector('span'); if (sp) sp.textContent = '\u5f00\u5956\u5f69\u79cd'; }
      var app = document.getElementById('app') || document.body;
      app.insertBefore(box, app.firstChild);
      // 折叠：资料区表、内幕模块、折叠长列表
      var hidden = [];
      [document.querySelector('table.sevenxiaosevenma'), document.getElementById('widgetBox43159')].forEach(function (el) {
        if (!el) return;
        var host = el.closest ? el.closest('[id^="widgetBox"]') : el;
        host = host || el;
        host.style.display = 'none';
        hidden.push(host);
      });
      var folds = document.querySelector('.xc-fold-list') || document.querySelectorAll('.xc-fold-bar');
      if (folds && folds.length) {
        var listBox = folds[0].parentNode;
        listBox.style.display = 'none';
        hidden.push(listBox);
      }
      document.getElementById('xc-a-more').addEventListener('click', function () {
        state.open = !state.open;
        hidden.forEach(function (h) { h.style.display = state.open ? '' : 'none'; });
        this.textContent = state.open ? '\u6536\u8d77\u8d44\u6599 / \u5185\u5e55 / \u5386\u53f2' : '\u5c55\u5f00\u8d44\u6599 / \u5185\u5e55 / \u5386\u53f2';
      });
      document.querySelectorAll('#xc-a-tabs button').forEach(function (b) {
        b.addEventListener('click', function () {
          var nm = b.getAttribute('data-tab');
          var tabs = document.querySelectorAll('#widgetBox41362 .tie > div');
          if (!tabs.length) { location.href = 'more.html?tab=' + encodeURIComponent(nm); return; }
          for (var i = 0; i < tabs.length; i++) {
            if ((tabs[i].textContent || '').indexOf(nm) >= 0) { tabs[i].click(); break; }
          }
          var anchor = document.getElementById('widgetBox41750');
          if (anchor && anchor.scrollIntoView) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    });
  })();

  // draw.json 直读：刷新各彩种块的期号与号码（不用等 Pages 构建）
  (function () {
    var MAP = { '\u65b0\u6fb3\u5f69': 'Macau', '\u8001\u6fb3\u5f69': 'MacauOld', '\u9999\u6e2f\u5f69': 'HongKong', '\u5feb\u4e508': 'Happy8' };
    function colorOf(c) {
      var n = parseInt(c, 10);
      var R = [1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46], B = [3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48];
      return R.indexOf(n) >= 0 ? '#e71607' : (B.indexOf(n) >= 0 ? '#2873e6' : '#1fb61d');
    }
    async function refreshDraw() {
      var d = await fetchJSON('data/draw.json');
      if (!d || !d.games) {
        document.querySelectorAll('.baomalaodaQi').forEach(function (q) { q.textContent = '\u6570\u636e\u83b7\u53d6\u4e2d\u2026'; });
        return;
      }
      var byRule = {};
      d.games.forEach(function (g) { byRule[g.rule] = g; });
      document.querySelectorAll('.baomalaodaName').forEach(function (n) {
        var nm = (n.textContent || '').replace(/\s+/g, '');
        var rule = MAP[nm];
        if (!rule || !byRule[rule]) return;
        var b = n;
        while (b && b !== document.body) { if (b.querySelector && b.querySelectorAll('.baomalaodaMa').length >= 7) break; b = b.parentNode; }
        if (!b) return;
        var qi = b.querySelector('.baomalaodaQi');
        if (qi && byRule[rule].issue) qi.textContent = byRule[rule].issue;
        var tiles = b.querySelectorAll('.baomalaodaMa');
        var nums = byRule[rule].nums || [];
        for (var i = 0; i < tiles.length && i < nums.length; i++) {
          var t = tiles[i].parentNode;
          var c = String(nums[i].c || '').replace(/^0?(\d)$/, '0$1');
          tiles[i].textContent = (c.length === 1 ? '0' + c : c);
          if (t) t.style.background = colorOf(c);
          var zs = t ? t.querySelector('.baomalaodaXiao') : null;
          if (zs) zs.textContent = nums[i].z || zs.textContent;
        }
      });
    }
    setTimeout(refreshDraw, 1500);
    setInterval(refreshDraw, 30000);
  
  // 三彩种收口：新港 / 新澳 / 香港 —— 删老澳与快乐8，重排顺序，清重复倒计时
  (function () {
    var ORDER = ['\u65b0\u9999\u6e2f', '\u65b0\u6fb3\u5f69', '\u9999\u6e2f\u5f69'];
    var LABEL = { '\u65b0\u9999\u6e2f': '\u65b0\u6e2f', '\u65b0\u6fb3\u5f69': '\u65b0\u6fb3', '\u9999\u6e2f\u5f69': '\u9999\u6e2f' };
    function txt(el) { return (el.textContent || '').replace(/\s+/g, ''); }
    function drop(name) {
      document.querySelectorAll('.baomalaodaName').forEach(function (n) {
        var tn = txt(n);
        if (tn === name || tn.indexOf(name) >= 0) {
          var b = n;
          while (b && b !== document.body) { if (b.querySelector && b.querySelectorAll('.baomalaodaMa').length >= 7) break; b = b.parentNode; }
          if (b && b.parentNode) b.parentNode.removeChild(b);
        }
      });
    }
    function fixTabs() {
      var ties = [].slice.call(document.querySelectorAll('.tie'));
      if (!ties.length) return;
      ties.forEach(function (tie) { fixTabsIn(tie); });
    }
    function fixTabsIn(tie) {
      var tabs = [].slice.call(tie.children);
      tabs.forEach(function (t) {
        var s = txt(t);
        if (s.indexOf('\u8001\u6fb3') >= 0 || s.indexOf('\u5feb\u4e508') >= 0) { tie.removeChild(t); return; }
        if (s.indexOf('\u65b0\u9999\u6e2f') >= 0) t.textContent = '\u65b0\u6e2f';
        else if (s.indexOf('\u65b0\u6fb3') >= 0) t.textContent = '\u65b0\u6fb3';
        else if (s.indexOf('\u9999\u6e2f') >= 0) t.textContent = '\u9999\u6e2f';
      });
      var cur = [].slice.call(tie.children);
      cur.sort(function (a, b) { return ORDER.indexOf(txt(a) === '\u65b0\u6e2f' ? '\u65b0\u9999\u6e2f' : (txt(a) === '\u65b0\u6fb3' ? '\u65b0\u6fb3\u5f69' : '\u9999\u6e2f\u5f69')) - ORDER.indexOf(txt(b) === '\u65b0\u6e2f' ? '\u65b0\u9999\u6e2f' : (txt(b) === '\u65b0\u6fb3' ? '\u65b0\u6fb3\u5f69' : '\u9999\u6e2f\u5f69')); });
      cur.forEach(function (c) { tie.appendChild(c); });
    }
    function fixCd() {
      document.querySelectorAll('.baomalaodaName').forEach(function (n) {
        var b = n;
        while (b && b !== document.body) { if (b.querySelector && b.querySelectorAll('.baomalaodaMa').length >= 7) break; b = b.parentNode; }
        if (!b) return;
        var host = b.parentNode;
        var all = host.querySelectorAll('.xc-cd-all');
        for (var i = 1; i < all.length; i++) all[i].parentNode.removeChild(all[i]);
        var nodes = host.querySelectorAll('span,div,i,em');
        for (var j = 0; j < nodes.length; j++) {
          var el = nodes[j];
          if (el.children.length) continue;
          if (el.closest && el.closest('.xc-cd-all')) continue;
          var t = (el.textContent || '').trim();
          if (t.indexOf('\u8ddd\u5f00\u5956') === 0 || t.indexOf('\u539f\u5f00\u5956') === 0) { el.style.display = 'none'; continue; }
          if (t.indexOf('\u8ddd\u5f00\u5956') >= 0) el.textContent = t.replace(/\u8ddd\u5f00\u5956[\s:：]*\d{1,3}:\d{2}:\d{2}/g, '').trim();
        }
      });
    }
    function fixBanner() {
      var box = document.querySelector('#widgetBox41365');
      if (box) { var sp = box.querySelector('span'); if (sp) sp.textContent = '\u5f00\u5956\u5f69\u79cd'; }
    }
    function run() { try { drop('\u8001\u6fb3\u5f69'); drop('\u5feb\u4e508'); fixTabs(); fixCd(); fixBanner(); } catch (e) { console.log('[r3]', e && e.message); } }
    setTimeout(run, 1500); setTimeout(run, 3000); setInterval(run, 3000);
  })();
})();
