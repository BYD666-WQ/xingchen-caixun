/* \u661f\u8fb0\u5f69\u8baf \u00b7 \u4ea4\u4e92\u5c42\uff08\u7eaf\u524d\u7aef\uff0c\u8865\u56de SPA \u4e22\u5931\u7684\u4e8b\u4ef6\uff09
   tab \u5207\u6362 / \u5012\u8ba1\u65f6 / \u5237\u65b0 / \u5386\u53f2\u8bb0\u5f55 / \u79fb\u52a8\u7aef\u70b9\u51fb\u533a */
(function () {
  'use strict';
  var CFG = window.SITE_CONFIG || {};
  function qsa(sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); }
  function basePath() { return location.pathname.indexOf('/pages/') >= 0 ? '../' : ''; }
  function data() { return window.DRAW_DATA || null; }
  function status() { return window.DRAW_STATUS || null; }

  function findBlock(nameEl) {
    var node = nameEl;
    while (node && node !== document.body) {
      if (node.querySelector && node.querySelector('.baomalaodaQi') &&
          node.querySelectorAll('.baomalaodaMa').length >= 7) return node;
      node = node.parentNode;
    }
    return null;
  }
  function allBlocks() {
    var out = [];
    qsa('.baomalaodaName').forEach(function (n) {
      var b = findBlock(n);
      if (b && out.indexOf(b) < 0) out.push(b);
    });
    return out;
  }
  function blockName(block) {
    var el = block.querySelector('.baomalaodaName');
    return el ? (el.textContent || '').replace(/\s+/g, '') : '';
  }
  function gameByName(name) {
    var d = data();
    if (!d || !d.games) return null;
    for (var i = 0; i < d.games.length; i++) {
      if ((d.games[i].name || '').replace(/\s+/g, '') === name) return d.games[i];
    }
    return null;
  }
  function fillBlock(block, game) {
    if (!game) return;
    var qi = block.querySelector('.baomalaodaQi');
    if (qi && game.shortIssue) qi.textContent = String(game.shortIssue);
    var mas = block.querySelectorAll('.baomalaodaMa');
    var xiaos = block.querySelectorAll('.baomalaodaXiao');
    var nums = game.nums || [];
    for (var k = 0; k < mas.length && k < nums.length; k++) {
      mas[k].textContent = nums[k].c;
      if (xiaos[k]) xiaos[k].textContent = nums[k].z;
    }
  }

  // ---------- tab \u5207\u6362 ----------
  var activeTab = null;
  function tabs() { return qsa('#widgetBox41362 .tie > div'); }
  function updateTopStrip(game) {
    var strip = document.getElementById('widgetBox41362');
    if (!strip || !game) return;
    var period = null, nums = [], zooms = [];
    qsa('*', strip).forEach(function (el) {
      if (el.children.length) return;
      var t = (el.textContent || '').trim();
      if (/^\d+\u671f\u5f00$/.test(t)) { period = el; return; }
      if (nums.length < 7 && /^\d{1,3}$/.test(t) && t.length <= 2) { nums.push(el); return; }
      if (zooms.length < 7 && /^[\u9f20\u725b\u864e\u5154\u9f99\u86c7\u9a6c\u7f8a\u7334\u9e21\u72d7\u732a]$/.test(t)) { zooms.push(el); }
    });
    if (period && game.shortIssue) period.textContent = String(game.shortIssue) + '\u671f\u5f00';
    var g = game.nums || [];
    for (var i = 0; i < nums.length && i < g.length; i++) nums[i].textContent = g[i].c;
    for (var k = 0; k < zooms.length && k < g.length; k++) zooms[k].textContent = g[k].z;
  }

  function setActive(tab, name) {
    tabs().forEach(function (t) {
      t.classList.remove('active');
      t.style.outline = '2px solid transparent';
    });
    if (tab) {
      tab.classList.add('active');
      tab.style.outline = '2px solid #d90000';
      activeTab = name;
    }
    allBlocks().forEach(function (b) {
      b.style.display = (blockName(b) === name) ? '' : 'none';
    });
    if (name) updateTopStrip(gameByName(name));
    var target = document.getElementById('widgetBox41750');
    if (target && target.scrollIntoView) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function initTabs() {
    var list = tabs();
    if (!list.length) return;
    list.forEach(function (tab) {
      tab.setAttribute('role', 'button');
      tab.setAttribute('tabindex', '0');
      tab.style.minHeight = '44px';
      tab.style.cursor = 'pointer';
      tab.addEventListener('click', function () { setActive(tab, (tab.textContent || '').replace(/\s+/g, '')); });
      tab.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') setActive(tab, (tab.textContent || '').replace(/\s+/g, ''));
      });
    });
    setActive(list[0], (list[0].textContent || '').replace(/\s+/g, ''));
  }

  // ---------- \u5012\u8ba1\u65f6 ----------
  var NEXTLINE = /(\d{1,2})\u6708(\d{1,2})\u65e5\s*\u661f\u671f([\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u65e5\u5929])\s*(\d{1,2}):(\d{2})/;
  function targets() {
    var out = [];
    allBlocks().forEach(function (block) {
      var node = null;
      qsa('*', block).forEach(function (el) {
        if (node) return;
        if (el.children.length === 0 && NEXTLINE.test(el.textContent || '')) node = el;
      });
      if (!node) return;
      var m = (node.textContent || '').match(NEXTLINE);
      if (!m) return;
      var now = new Date();
      var target = new Date(now.getFullYear(), parseInt(m[1], 10) - 1, parseInt(m[2], 10),
                            parseInt(m[4], 10), parseInt(m[5], 10), 0);
      while (target.getTime() < now.getTime()) target = new Date(target.getTime() + 7 * 86400000);
      out.push({ block: block, node: node, target: target });
    });
    return out;
  }
  var TARGETS = [];
  function tick() {
    var now = Date.now();
    TARGETS.forEach(function (t) {
      var left = Math.max(0, Math.floor((t.target.getTime() - now) / 1000));
      var h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
      var txt = '\u8ddd\u5f00\u5956 ' + pad(h) + ':' + pad(m) + ':' + pad(s);
      if (!t.el) {
        t.el = document.createElement('span');
        t.el.className = 'xc-countdown';
        t.node.parentNode.insertBefore(t.el, t.node.nextSibling);
      }
      t.el.textContent = txt;
      t.el.style.color = left <= 60 ? '#d90000' : '#1f3b8a';
    });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function initCountdown() { TARGETS = targets(); tick(); setInterval(tick, 1000); }

  // ---------- \u9876\u90e8\u63d0\u793a + \u5237\u65b0\u6309\u94ae ----------
  function toast(text, ms) {
    var el = document.getElementById('xc-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'xc-toast';
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.style.display = 'block';
    clearTimeout(el._timer);
    if (ms) el._timer = setTimeout(function () { el.style.display = 'none'; }, ms);
    return el;
  }
  function applyData() {
    allBlocks().forEach(function (b) { fillBlock(b, gameByName(blockName(b))); });
    var st = status();
    var badge = document.getElementById('xc-data-badge');
    if (badge && st && st.message) badge.textContent = st.message;
    if (activeTab) setActive(null, activeTab);
    TARGETS = targets();
  }
  function refresh() {
    var btn = document.getElementById('xc-refresh');
    if (!btn) return;
    btn.disabled = true;
    btn.textContent = '\u5237\u65b0\u4e2d\u2026';
    var t = Date.now();
    fetch(basePath() + 'assets/js/draw-data.js?t=' + t, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (txt) { (new Function(txt))(); return fetch(basePath() + 'assets/js/data-status.js?t=' + t, { cache: 'no-store' }); })
      .then(function (r) { return r.text(); })
      .then(function (txt) {
        (new Function(txt))();
        applyData();
        btn.textContent = '\u5df2\u66f4\u65b0';
        toast('\u6570\u636e\u5df2\u5237\u65b0', 2000);
        setTimeout(function () { btn.disabled = false; btn.textContent = '\u5237\u65b0'; }, 1500);
      })
      .catch(function (err) {
        btn.textContent = '\u5237\u65b0\u5931\u8d25';
        toast('\u5237\u65b0\u5931\u8d25\uff1a' + err.message, 3000);
        setTimeout(function () { btn.disabled = false; btn.textContent = '\u5237\u65b0'; }, 2000);
      });
  }
  function initRefresh() {
    var btn = document.createElement('button');
    btn.id = 'xc-refresh';
    btn.type = 'button';
    btn.textContent = '\u5237\u65b0';
    btn.addEventListener('click', refresh);
    document.body.appendChild(btn);
    toast('\u4e0b\u62c9\u6216\u70b9\u53f3\u4e0b\u89d2\u300c\u5237\u65b0\u300d\u66f4\u65b0\u6570\u636e', 4000);
  }

  // ---------- \u5386\u53f2\u8bb0\u5f55 ----------
  function closeModal() {
    var m = document.getElementById('xc-modal');
    if (m) m.style.display = 'none';
  }
  function openHistory(name) {
    var game = gameByName(name);
    var rows = (game && game.history) || [];
    var m = document.getElementById('xc-modal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'xc-modal';
      m.innerHTML = '<div class="xc-modal-box"><div class="xc-modal-head">' +
        '<span id="xc-modal-title">\u5386\u53f2\u8bb0\u5f55</span>' +
        '<button type="button" id="xc-modal-close">\u00d7</button></div>' +
        '<div id="xc-modal-body"></div></div>';
      document.body.appendChild(m);
      m.addEventListener('click', function (e) { if (e.target === m) closeModal(); });
      document.getElementById('xc-modal-close').addEventListener('click', closeModal);
    }
    document.getElementById('xc-modal-title').textContent = name + ' \u00b7 \u8fd1 ' + rows.length + ' \u671f';
    var html = '';
    if (!rows.length) {
      html = '<p class="xc-empty">\u6682\u65e0\u5386\u53f2\u6570\u636e\uff08\u7b49\u4e0b\u6b21\u6293\u53d6\u8865\u5386\u53f2\uff09</p>';
    } else {
      html = '<table class="xc-hist"><thead><tr><th>\u671f\u53f7</th><th>\u5f00\u5956\u53f7\u7801</th></tr></thead><tbody>';
      rows.forEach(function (r) {
        var balls = (r.nums || []).map(function (n) {
          return '<span class="xc-hist-ball">' + n.c + '<i>' + n.z + '</i></span>';
        }).join('');
        var issue = r.shortIssue ? ('\u7b2c ' + r.shortIssue + ' \u671f') : ('\u7b2c ' + (r.issue || '?') + ' \u671f');
        html += '<tr><td>' + issue + '</td><td>' + balls + '</td></tr>';
      });
      html += '</tbody></table>';
    }
    document.getElementById('xc-modal-body').innerHTML = html;
    m.style.display = 'flex';
  }
  function initHistory() {
    qsa('.baomalaodaHistory').forEach(function (el) {
      el.style.cursor = 'pointer';
      el.style.minHeight = '44px';
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var block = findBlock(el);
        openHistory(block ? blockName(block) : (activeTab || ''));
      });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    initCountdown();
    initHistory();
    initRefresh();
  });
  window.XC_INTERACTIONS = { refresh: refresh, setActive: setActive, openHistory: openHistory };
})();

/* 品牌残留清扫：原站把 49782 拆成 49 + 782 + .com 多个 span，字符串替换抓不到 */
(function () {
  function scrub() {
    try {
      var brand = '\u661f\u8fb0\u5f69\u8baf';
      var all = document.querySelectorAll('.ziliaokl, .amcz-black, [class*="yuming"], [class*="amcz"]');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var t = (el.textContent || '').trim();
        if (t.indexOf('49782') >= 0 || t === '.com' && el.parentNode && (el.parentNode.textContent || '').indexOf('49') >= 0) {
          el.textContent = (t.indexOf('【') >= 0 ? '\u3010\u63d0\u524d\u516c\u5f00\uff1a' + brand + '.com\u3011' : brand + '.com');
        }
      }
      var nodes = document.querySelectorAll('*');
      for (var k = 0; k < nodes.length; k++) {
        var e = nodes[k];
        if (e.children.length && e.children.length <= 4) {
          var txt = (e.textContent || '').replace(/\s+/g, '');
          if (txt === '49782.com' || txt === '49782com') { e.innerHTML = brand + '.com'; }
        }
      }
    } catch (err) { /* noop */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scrub);
  else scrub();
  window.XC_SCRUB = scrub;
})();

/* 首页次要模块折叠（移动端）：默认收起，状态记 localStorage */
(function () {
  var KEEP = ['widgetBox41361', 'widgetBox41362', 'widgetBox43152', 'widgetBox41750', 'widgetBox41365', 'widgetBox41360', 'widgetBox43159'];
  var TITLES = {
    'widgetBox41366': '\u5185\u5e55\u4e00\u8096',
    'widgetBox41391': '\u5355\u53cc+\u4e8c\u8096',
    'widgetBox41392': '\u7384\u673a\u89e3\u6599\u00b7\u6b63\u7248\u8bd7\u8c61',
    'widgetBox41422': '\u5927\u5c0f\u4e2d\u7279',
    'widgetBox41826': '\u6fb3\u95e8\u5929\u673a',
    'widgetBox41376': '\u4e09\u671f\u56db\u8096',
    'widgetBox41492': '\u7ecf\u5178\u7cbe\u51c6',
    'widgetBox41398': '\u5927\u5c0f\u7206\u7279',
    'widgetBox41408': '\u4e70\u5565\u5f00\u5565',
    'widgetBox41405': '\u672c\u5468\u5fc5\u5f00',
    'widgetBox41852': '\u56db\u4e0d\u50cf\u4e2d\u7279\u56fe',
    'widgetBox41413': '\u65e0\u951924\u7801',
    'widgetBox41491': '\u63a8\u8350\u5355\u6570\u53cc\u6570',
    'widgetBox41411': '\u4e09\u671f\u51fa\u56db\u5c3e',
    'widgetBox41489': '\u6b63\u7248\u731c\u7279\u8f93\u5c3d\u5149',
    'widgetBox41414': '\u5e73\u7279\u4e00\u8096',
    'widgetBox41415': '\u5e73\u7279\u4e00\u5c3e',
    'widgetBox41490': '\u7edd\u6740\u4e8c\u8096',
    'widgetBox41417': '\u7efc\u5408\u6740\u6599',
    'widgetBox35005': '\u5f00\u5956\u7ed3\u679c',
    'widgetBox32657': '\u6b63\u7248\u56fe\u5e93',
    'widgetBox30899': '\u751f\u8096\u53f7\u7801\u5bf9\u7167'
  };
  function cleanTitle(t) {
    t = String(t || '').replace(/\s+/g, ' ').trim();
    t = t.replace(/49782|49782\.com/g, '\u661f\u8fb0\u5f69\u8baf');
    t = t.replace(/[\[\u3010\u300a\u300c]?\s*\d{2,4}\s*\u671f[\s\S]*$/, '');
    t = t.replace(/[\u3010\u300a\u300c][^\u3011\u300b\u300d\u300f]{0,8}$/, '');
    t = t.replace(/[\s\u00b7,.:;\uff0c\u3002\uff1a\uff1b]+$/, '');
    return t.trim();
  }
  function labelOf(el) {
    if (TITLES[el.id]) return TITLES[el.id];
    var cands = el.querySelectorAll('h1,h2,h3,h4,.amcz-title,.module-title,.title,.baomalaodaName');
    for (var i = 0; i < cands.length; i++) {
      var t = cleanTitle(cands[i].innerText || cands[i].textContent);
      if (t && t.length >= 1 && t.length <= 20) return t;
    }
    if (TITLES[el.id]) return TITLES[el.id];
    var name = el.getAttribute('data-wgt-name') || '';
    name = name.replace(/^[^-]+-/, '').replace(/^\d+-/, '');
    return cleanTitle(name) || '\u8d44\u6599\u680f\u76ee';
  }
  function run() {
    if (window.innerWidth > 720) return;
    var app = document.getElementById('app');
    if (!app) return;
    var mods = [].slice.call(app.children).filter(function (e) {
      return e && e.id && /^widgetBox\d+$/.test(e.id) && KEEP.indexOf(e.id) < 0;
    });
    mods.forEach(function (m) {
      if (m.querySelector('#xc-collapse-btn')) return;
      var key = 'xc:fold:' + m.id;
      var saved = null;
      try { saved = window.localStorage.getItem(key); } catch (e) {}
      var open = saved === '1';
      var bar = document.createElement('div');
      bar.className = 'xc-fold-bar';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'xc-collapse-btn';
      btn.className = 'xc-fold-btn';
      btn.setAttribute('data-target', m.id);
      function paint() {
        btn.textContent = labelOf(m);
        btn.title = open ? '\u6536\u8d77' : '\u5c55\u5f00';
        btn.classList.toggle('xc-open', open);
        m.classList.toggle('xc-folded', !open);
      }
      btn.addEventListener('click', function () {
        open = !open;
        try { window.localStorage.setItem(key, open ? '1' : '0'); } catch (e) {}
        paint();
      });
      paint();
      bar.appendChild(btn);
      m.insertBefore(bar, m.firstChild);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
