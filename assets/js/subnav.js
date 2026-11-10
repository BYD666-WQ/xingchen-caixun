/* subnav.js — 底部导航「资料大全」抽屉入口（全站子页共用） */
(function () {
  var ENTRIES = [
    ['资料大全（总览）', 'ziliao.html', '全部资料列表'],
    ['波色五行对照表', 'bose.html', '49 码 · 红蓝绿'],
    ['生肖属性表', 'zodiac-attr.html', '12 生肖 · 号码'],
    ['诗象库', 'poem.html', '原站 15 期'],
    ['开奖日历', 'calendar.html', '未来 7 天'],
    ['近 10 期走势', 'trend.html', '特码统计'],
    ['常见问题', 'faq.html', '8 问 8 答'],
    ['免责声明', 'disclaimer.html', '数据说明']
  ];
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var link = null;
    var anchors = nav.querySelectorAll('a');
    for (var i = 0; i < anchors.length; i++) {
      if ((anchors[i].textContent || '').replace(/\s+/g, '') === '资料大全') { link = anchors[i]; break; }
    }
    if (!link) return;
    link.setAttribute('href', 'ziliao.html');

    var css = document.createElement('style');
    css.id = 'xc-subnav-css';
    css.textContent = [
      '.xc-sheet{position:fixed;inset:0;z-index:999;display:none}',
      '.xc-sheet.on{display:block}',
      '.xc-sheet-mask{position:absolute;inset:0;background:rgba(0,0,0,.45)}',
      '.xc-sheet-panel{position:absolute;left:0;right:0;bottom:56px;max-height:72vh;overflow:auto;background:linear-gradient(#FFFDF6,#FFF3D6);border-top:2px solid #D4AF37;border-radius:8px 8px 0 0;box-shadow:0 -6px 18px rgba(80,0,0,.28);padding-bottom:6px}',
      '.xc-sheet-hd{display:flex;align-items:center;gap:8px;padding:9px 12px;background:linear-gradient(#E60012,#B3000E);border-bottom:2px solid #FFD24D;position:sticky;top:0;z-index:1}',
      '.xc-sheet-hd b{font-size:18px;font-weight:900;color:#FFD24D;letter-spacing:1px}',
      '.xc-sheet-hd span{margin-left:auto;font-size:13px;color:#FFD24D;border:1px solid #FFD24D;border-radius:4px;padding:2px 9px}',
      '.xc-sheet-list{padding:4px 10px 8px}',
      '.xc-entry{display:flex;align-items:center;gap:8px;padding:10px 2px;border-bottom:1px dashed #E8D098;text-decoration:none;color:#222;font-size:16px}',
      '.xc-entry:last-child{border-bottom:0}',
      '.xc-entry i{font-style:normal;flex:0 0 42px;text-align:center;font-size:12px;font-weight:800;color:#fff;background:linear-gradient(#E60012,#B3000E);border:1px solid #C9A227;border-radius:4px;padding:2px 0}',
      '.xc-entry span{flex:1 1 auto;font-weight:700}',
      '.xc-entry em{font-style:normal;flex:0 0 auto;font-size:12px;color:#8a6a3a}',
      '.xc-entry::after{content:"›";color:#C90000;font-weight:900;font-size:18px;line-height:1}',
      'body.xc-sheet-lock{overflow:hidden}'
    ].join('\n');
    document.head.appendChild(css);

    var wrap = document.createElement('div');
    wrap.className = 'xc-sheet';
    wrap.id = 'xc-subnav';
    var rows = ENTRIES.map(function (it, idx) {
      return '<a class="xc-entry" href="' + it[1] + '"><i>' + (idx === 0 ? '总览' : '资料') + '</i><span>' + it[0] + '</span><em>' + it[2] + '</em></a>';
    }).join('');
    wrap.innerHTML = '<div class="xc-sheet-mask"></div><div class="xc-sheet-panel" role="dialog" aria-modal="true" aria-label="资料大全入口"><div class="xc-sheet-hd"><b>资料大全</b><span class="xc-sheet-close">关闭</span></div><div class="xc-sheet-list">' + rows + '</div></div>';
    document.body.appendChild(wrap);

    function close() {
      wrap.classList.remove('on');
      document.body.classList.remove('xc-sheet-lock');
    }
    function open(e) {
      if (e) e.preventDefault();
      wrap.classList.add('on');
      document.body.classList.add('xc-sheet-lock');
    }
    link.addEventListener('click', open);
    wrap.querySelector('.xc-sheet-mask').addEventListener('click', close);
    wrap.querySelector('.xc-sheet-close').addEventListener('click', close);
    wrap.querySelectorAll('.xc-entry').forEach(function (a) { a.addEventListener('click', close); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.__xcSubnav = { open: open, close: close, entries: ENTRIES };
  });
})();
