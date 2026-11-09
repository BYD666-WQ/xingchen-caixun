/* 新站-复刻 · 骨架加载逻辑
   1) 把存档资源映射（assets/js/archive-map.js -> window.ARCHIVE_ASSETS）暴露成 App.asset(url)
   2) 报告接线状态（存档资源/CSS/数据 JSON 是否就绪）
   3) 存档 CSS 不在骨架页全局启用（会把整站压成目标站的 720px 宽），
      演示见 pages/archive-preview.html —— 那里按原始顺序加载存档样式表。 */
(function (global) {
  'use strict';

  var App = {};
  App.assetMap = global.ARCHIVE_ASSETS || {};
  App.cssList = global.ARCHIVE_CSS || [];
  App.data = global.SITE_DATA || null;
  App.status = { assets: 0, css: 0, data: 'untested', slots: 0 };

  /** 资源路径前缀：子目录页面传 '../'（archive-map 里存的是站点根相对路径） */
  App.base = '';

  /** 存档里的原始 URL -> 本地资源路径；没映射就原样返回（页面不会因此崩） */
  App.asset = function (url) {
    if (!url) return '';
    var local = App.assetMap[url];
    if (!local) return url;
    return App.base + local;
  };

  /** 读本地静态 JSON：http 下 fetch；file:// 下 fetch 会失败，回退到预先载入的 SITE_DATA */
  App.loadData = function (url) {
    if (App.data) return Promise.resolve(App.data);
    return fetch(url, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (json) {
      App.data = json;
      return json;
    }).catch(function (err) {
      if (global.SITE_DATA) { App.data = global.SITE_DATA; return App.data; }
      throw err;
    });
  };

  App.mountSkeleton = function (opts) {
    opts = opts || {};
    App.base = opts.base || '';
    App.status.assets = Object.keys(App.assetMap).length;
    App.status.css = App.cssList.length;
    App.status.slots = document.querySelectorAll('.slot').length;

    App.loadData(opts.dataUrl || 'data/site-data.json').then(function (d) {
      var n = (d && d.modules) ? d.modules.length : 0;
      App.status.data = n ? ('ok, ' + n + ' modules') : 'ok, 0 modules';
      paint();
    }).catch(function () {
      App.status.data = 'missing (等待存档数据)';
      paint();
    });
  };

  function paint() {
    var box = document.getElementById('wiring');
    if (!box) return;
    var nl = String.fromCharCode(10);
    box.textContent =
      'archive-assets : ' + App.status.assets + (App.status.assets ? ' file(s)  OK' : '  EMPTY') + nl +
      'archive-css    : ' + (App.status.css
        ? App.status.css + ' stylesheet(s) imported -> 见 pages/archive-preview.html'
        : 'none (等待 import_archive.py)') + nl +
      'data-json      : ' + App.status.data + nl +
      'module-slots   : ' + App.status.slots + ' (骨架占位，等 hacker 抓取报告 + researcher 内容清单)';
  }

  global.App = App;
})(window);
