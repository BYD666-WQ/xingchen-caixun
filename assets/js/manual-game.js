/* 新彩种（手动开奖）· 纯前端占位渲染：在「香港彩」前面插入 tab 与号码块
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
          var wx = n.wuxing || at0.w || '';
          xs[i].textContent = wx ? (wx + '/' + (n.z || at0.z || '')) : (n.z || '');
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
    fetch(base() + 'data/site-copy.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (c) {
        if (!c) return;
        if (c.brand) {
          var logo = document.querySelector('.xc-logo');
          if (logo) logo.textContent = c.brand;
          var fb = document.querySelector('.xc-footer-brand');
          if (fb) fb.textContent = c.brand;
          if (document.title) document.title = c.brand + (document.title.split('\u00b7')[1] ? ' \u00b7 ' + document.title.split('\u00b7')[1] : '');
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
})();
