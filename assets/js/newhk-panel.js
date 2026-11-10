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
  api('data/manual-ziliao.json').then(function (zl) {
    var box = document.getElementById('widgetBox43159');
    if (!box || !zl || !zl.rows) return;
    var inner = box.querySelector('.nmsx-festive-content');
    if (!inner) return;
    inner.innerHTML = zl.rows.map(function (r) {
      var oe = r.oddEven === '\u53cc' ? '\u53cc\u6570' : '\u5355\u6570';
      if (r.status === 'upcoming' || !r.result || !r.result.c) {
        return '<div class="nmsx-festive-row"><span class="nmsx-festive-issue">\u65b0\u9999\u6e2f' + r.issue + '\u671f:\u5185\u5e55</span><span class="nmsx-festive-type">\u3010\u5f85\u5f00\u3011</span></div>';
      }
      return '<div class="nmsx-festive-row"><span class="nmsx-festive-issue">\u65b0\u9999\u6e2f' + r.issue + '\u671f:\u5185\u5e55</span>' +
        '<span class="nmsx-festive-type">\u3010' + oe + '\u3011</span><span class="nmsx-festive-main">\u4e3b</span>' +
        '<span class="nmsx-festive-zodiac">\u3010' + (r.threeZodiac || []).join('') + '\u3011</span><span>\u5f00</span>' +
        '<span class="nmsx-festive-result">' + (r.result.z || '') + r.result.c + '</span><span class="nmsx-festive-accurate">\u51c6</span></div>';
    }).join('');
  }).catch(function () {});
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

/* v2：三彩种对齐 + 内幕待开 + tab 文案 */
(function () {
  function $(s, r) { return (r || document).querySelector(s); }
  function $a(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function blk(el) { var b = el; while (b && b !== document.body) { if (b.querySelector && b.querySelectorAll('.baomalaodaMa').length >= 7) return b; b = b.parentNode; } return null; }
  var R = [1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46], B = [3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48];
  function color(v) { return R.indexOf(v) >= 0 ? '#e71607' : (B.indexOf(v) >= 0 ? '#2873e6' : '#1fb61d'); }
  function api(path) {
    var us = ['https://cdn.jsdelivr.net/gh/BYD666-WQ/xingchen-caixun@main/' + path,
              'https://raw.githubusercontent.com/BYD666-WQ/xingchen-caixun/main/' + path, path];
    function go(i) { return i >= us.length ? Promise.reject() : fetch(us[i] + '?v=' + Math.floor(Date.now() / 60000), { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : go(i + 1); }).catch(function () { return go(i + 1); }); }
    return go(0);
  }
  function setBlock(name, issue, nums) {
    $a('.baomalaodaName').forEach(function (n) {
      if ((n.textContent || '').replace(/\s+/g, '') !== name) return;
      var b = blk(n); if (!b) return;
      var qi = b.querySelector('.baomalaodaQi'); if (qi && issue) qi.textContent = String(issue);
      var tiles = b.querySelectorAll('.baomalaodaMa');
      (nums || []).forEach(function (x, i) {
        if (!tiles[i]) return;
        tiles[i].textContent = x.c;
        var t = tiles[i].parentNode;
        if (t) { t.style.background = color(parseInt(x.c, 10)); var z = t.querySelector('.baomalaodaXiao'); if (z) z.textContent = x.z || ''; }
      });
    });
  }
  function fixTabs() {
    $a('.tie').forEach(function (tie) {
      $a(':scope > *', tie).forEach(function (t) {
        var s = (t.textContent || '').replace(/\s+/g, '');
        if (s.indexOf('老澳') >= 0 || s.indexOf('快乐8') >= 0) { t.remove(); return; }
        if (s.indexOf('新香港') >= 0 || s.indexOf('新港') >= 0) t.textContent = '\u65b0\u6e2f';
        else if (s.indexOf('新澳') >= 0) t.textContent = '\u65b0\u6fb3';
        else if (s.indexOf('香港') >= 0) t.textContent = '\u9999\u6e2f';
      });
    });
  }
  function fixZiliao(zl) {
    var box = $('#widgetBox43159'); if (!box || !zl || !zl.rows) return;
    var inner = box.querySelector('.nmsx-festive-content'); if (!inner) return;
    inner.innerHTML = zl.rows.map(function (r) {
      if (r.status === 'upcoming' || !r.result || !r.result.c) {
        return '<div class="nmsx-festive-row"><span class="nmsx-festive-issue">\u65b0\u9999\u6e2f' + r.issue + '\u671f:\u5185\u5e55</span><span class="nmsx-festive-type">\u3010\u5f85\u5f00\u3011</span></div>';
      }
      return '<div class="nmsx-festive-row"><span class="nmsx-festive-issue">\u65b0\u9999\u6e2f' + r.issue + '\u671f:\u5185\u5e55</span>' +
        '<span class="nmsx-festive-type">\u3010' + (r.oddEven === '\u53cc' ? '\u53cc\u6570' : '\u5355\u6570') + '\u3011</span>' +
        '<span class="nmsx-festive-main">\u4e3b</span><span class="nmsx-festive-zodiac">\u3010' + (r.threeZodiac || []).join('') + '\u3011</span>' +
        '<span>\u5f00</span><span class="nmsx-festive-result">' + (r.result.z || '') + r.result.c + '</span><span class="nmsx-festive-accurate">\u51c6</span></div>';
    }).join('');
  }
  function run() {
    Promise.all([api('data/manual-draw.json'), api('data/draw.json'), api('data/manual-ziliao.json')]).then(function (r) {
      var md = r[0] || {}, dr = r[1] || {}, zl = r[2] || {};
      fixTabs();
      if (md.nums) setBlock('\u65b0\u9999\u6e2f', md.issue, md.nums);
      var byRule = {}; (dr.games || []).forEach(function (g) { byRule[g.rule] = g; });
      if (byRule.Macau) setBlock('\u65b0\u6fb3\u5f69', byRule.Macau.issue, byRule.Macau.nums);
      if (byRule.HongKong) setBlock('\u9999\u6e2f\u5f69', byRule.HongKong.issue, byRule.HongKong.nums);
      fixZiliao(zl);
    }).catch(function (e) { console.log('[panel v2]', e && e.message); });
  }
  setTimeout(run, 1200); setTimeout(run, 2600); setTimeout(run, 4500);
})();
})();