/* \u661f\u8fb0\u5f69\u8baf \u00b7 \u5b50\u9875\u6570\u636e\u6e32\u67d3\uff08\u8d44\u6599\u5927\u5168/\u56fe\u5e93/\u89c4\u5f8b\u8d70\u52bf/\u6570\u636e\u5927\u5385/\u8d44\u6599\u5217\u8868\uff09
   \u6570\u636e\u6765\u81ea\u672c\u5730\u9759\u6001 JSON\uff08data/*.json\uff09\uff0c\u9875\u9762\u4e0d\u53d1\u5916\u7f51\u8bf7\u6c42\uff1b\u6ca1\u6709\u6570\u636e\u65f6\u663e\u793a\u7a7a\u6001\u3002 */
(function () {
  'use strict';
  function q(s, r) { return (r || document).querySelector(s); }
  function qsa(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function base() { return location.pathname.indexOf('/pages/') >= 0 ? '../' : ''; }
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function loadJson(name) {
    return fetch(base() + 'data/' + name + '.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .catch(function () { return null; });
  }
  function localize(p) {
    if (!p) return '';
    if (/^(https?:|data:|\/)/.test(p)) return p;
    return base() + p.replace(/^\/+/, '');
  }
  function emptyState(text) {
    return '<div class="xc-empty-box"><p>' + esc(text || '\u6682\u65e0\u6570\u636e') + '</p></div>';
  }
  function searchBar(placeholder) {
    return '<div class="xc-search"><input type="search" id="xc-q" placeholder="' + esc(placeholder) + '" autocomplete="off"></div>';
  }
  function tabsHTML(tabs, activeId) {
    if (!tabs || !tabs.length) return '';
    return '<div class="xc-subtabs" id="xc-tabs">' + tabs.map(function (t) {
      return '<a href="javascript:void(0)" data-id="' + esc(t.id) + '" class="' + (t.id === activeId ? 'active' : '') + '">' + esc(t.name) + '</a>';
    }).join('') + '</div>';
  }
  function gridHTML(items, type) {
    if (!items.length) return emptyState('\u8be5\u5206\u7c7b\u6682\u65e0\u5185\u5bb9');
    var html = '<div class="xc-grid-' + (type === 'tuku' ? 'pic' : 'link') + '">';
    items.forEach(function (it) {
      if (type === 'tuku') {
        html += '<a class="xc-pic-card" href="javascript:void(0)" data-img="' + esc(localize(it.image || it.thumb)) + '" data-title="' + esc(it.title) + '">' +
          '<div class="xc-pic-thumb"><img loading="lazy" src="' + esc(localize(it.thumb)) + '" alt="' + esc(it.title) + '"></div>' +
          '<div class="xc-pic-title">' + esc(it.title) + '</div></a>';
      } else {
        var href = it.link || ('ziliao-list.html?cat=' + encodeURIComponent(it.id));
        html += '<a class="xc-link-card" href="' + esc(href) + '">' +
          (it.icon ? '<img class="xc-link-icon" loading="lazy" src="' + esc(localize(it.icon)) + '" alt="">' : '') +
          '<span class="xc-link-title">' + esc(it.title) + '</span>' +
          (it.badge ? '<span class="xc-link-badge">' + esc(it.badge) + '</span>' : '') + '</a>';
      }
    });
    html += '</div>';
    return html;
  }
  function lightboxOpen(src, title) {
    var box = q('#xc-lightbox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'xc-lightbox';
      box.innerHTML = '<div class="xc-lightbox-inner"><img alt=""><div class="xc-lightbox-title"></div>' +
        '<button type="button" class="xc-lightbox-close" aria-label="\u5173\u95ed">\u00d7</button></div>';
      document.body.appendChild(box);
      box.addEventListener('click', function (e) {
        if (e.target === box || e.target.className === 'xc-lightbox-close') box.classList.remove('open');
      });
    }
    q('img', box).src = src;
    q('.xc-lightbox-title', box).textContent = title || '';
    box.classList.add('open');
  }
  function bindPics() {
    qsa('.xc-pic-card').forEach(function (a) {
      a.addEventListener('click', function () { lightboxOpen(a.getAttribute('data-img'), a.getAttribute('data-title')); });
    });
  }

  // ---------- \u8d44\u6599\u5927\u5168 ----------
  function renderZiliao(rootEl) {
    loadJson('ziliao').then(function (d) {
      if (!d || !(d.items || []).length) { rootEl.innerHTML = searchBar('\u641c\u7d22\u8d44\u6599\u680f\u76ee') + emptyState('\u8d44\u6599\u6570\u636e\u8fd8\u6ca1\u5230\uff08\u7b49 内容 \u7684 ziliao.json\uff09'); return; }
      var active = (d.tabs && d.tabs[0] && d.tabs[0].id) || '';
      var kw = '';
      function paint() {
        rootEl.innerHTML = searchBar('\u641c\u7d22\u8d44\u6599\u680f\u76ee') + tabsHTML(d.tabs, active) +
          '<div id="xc-body"></div>' +
          (d.updated ? '<p class="xc-updated">\u6570\u636e\u65f6\u95f4\uff1a' + esc(d.updated) + '</p>' : '');
        paintBody();
        qsa('#xc-tabs a').forEach(function (a) {
          a.addEventListener('click', function () {
            active = a.getAttribute('data-id');
            qsa('#xc-tabs a').forEach(function (x) { x.classList.toggle('active', x === a); });
            shown = 20;
            paintBody();
          });
        });
        q('#xc-q').addEventListener('input', function (e) { kw = e.target.value.trim(); shown = 20; paintBody(); });
      }
      var shown = 20;
      function paintBody() {
        var list;
        if (kw) list = (d.items || []).filter(function (it) { return (it.title || '').indexOf(kw) >= 0; });
        else list = (d.items || []).filter(function (it) { return it.tabId === active; });
        list = list.map(function (it) { it.link = 'ziliao-detail.html?id=' + encodeURIComponent(it.id); return it; });
        var slice = list.slice(0, shown);
        q('#xc-body').innerHTML = gridHTML(slice, 'link') +
          (list.length > shown ? '<div class="xc-more"><button type="button" id="xc-more">\u52a0\u8f7d\u66f4\u591a\uff08' + shown + '/' + list.length + '\uff09</button></div>' : (list.length ? '<p class="xc-updated">\u5df2\u5168\u90e8\u52a0\u8f7d\uff08' + list.length + ' \u6761\uff09</p>' : ''));
        var btn = q('#xc-more');
        if (btn) btn.addEventListener('click', function () { shown += 20; paintBody(); });
      }
      paint();
    });
  }

  // ---------- \u8d44\u6599\u5217\u8868 ----------
  function renderZiliaoList(rootEl) {
    var cat = (location.search.match(/[?&]cat=([^&]+)/) || [])[1] || '';
    loadJson('ziliao-list').then(function (d) {
      var node = (d && d.byCategory && d.byCategory[cat]) || null;
      var rows = Array.isArray(node) ? node : (node && node.rows) || [];
      rootEl.innerHTML = '<div class="xc-crumb"><a href="ziliao.html">\u8d44\u6599\u5927\u5168</a> / \u5217\u8868</div>' +
        (rows.length ? '<ul class="xc-artlist">' + rows.map(function (r) {
          return '<li><a href="javascript:void(0)"><span class="t">' + esc(r.title) + '</span><span class="d">' + esc(r.date || '') + '</span></a></li>';
        }).join('') + '</ul>' : emptyState('\u8be5\u5206\u7c7b\u6682\u65e0\u8d44\u6599\uff08\u7b49 内容 \u7684 ziliao-list.json\uff09'));
    });
  }

  // ---------- \u56fe\u5e93 ----------
  function renderZiliaoDetail(rootEl) {
    var id = (location.search.match(/[?&]id=([^&]+)/) || [])[1] || '';
    id = decodeURIComponent(id);
    var tabId = (id.match(/^c_([a-z0-9]+)_/) || [])[1] || '';
    Promise.all([loadJson('ziliao'), loadJson('ziliao-list')]).then(function (arr) {
      var zd = arr[0] || {}, idx = arr[1] || {};
      var item = null;
      (zd.items || []).forEach(function (x) { if (String(x.id) === String(id)) item = x; });
      var tab = null;
      (idx.tabs || []).forEach(function (t) { if (String(t.id) === tabId) tab = t; });
      var file = ((tab && tab.file) || ('ziliao-list-' + tabId + '.json')).replace(/\.json$/, '');
      loadJson(file).then(function (d) {
        d = d || {};
        var cats = d.categories || {}, by = d.byCategory || {};
        var rows = Array.isArray(by[id]) ? by[id] : [];
        var meta = cats[id] || {};
        var title = (item && item.title) || meta.name || '\u8d44\u6599\u5217\u8868';
        var html = '<div class="xc-crumb"><a href="ziliao.html">\u8d44\u6599\u5927\u5168</a> / ' + esc(title) + '</div>' +
          '<h2 class="xc-detail-title">' + esc(title) + (meta.total ? '\uff08' + meta.total + '\u6761\uff09' : '') + '</h2>';
        if (rows.length) {
          html += '<ul class="xc-artlist">' + rows.map(function (r) {
            return '<li><a href="javascript:void(0)"><span class="t">' + esc(r.title || '') +
              '</span><span class="d">' + esc(r.issueLabel || r.date || '') + '</span></a></li>';
          }).join('') + '</ul>';
        } else { html += emptyState('\u8be5\u5206\u7c7b\u6682\u65e0\u8be6\u60c5\u6570\u636e'); }
        html += '<p class="xc-updated">\u6570\u636e\u65f6\u95f4\uff1a' + esc(d.updated || zd.updated || '-') + '</p>';
        rootEl.innerHTML = html;
      });
    });
  }

  function renderTuku(rootEl) {
    Promise.all([loadJson('tuku'), loadJson('tuku-images')]).then(function (res) {
      var d = res[0] || {}, tmap = res[1] || [];
      if (d) d.items = d.cards || d.items || [];
      var byBase = {};
      var tarr = Array.isArray(tmap) ? tmap : (tmap.items || tmap.maps || tmap.list || Object.values(tmap || {}));
      tarr.forEach(function (m) {
        if (m && m.localPath) {
          var b = (m.localPath.split('/').pop() || '').split('?')[0];
          byBase[b] = m.localPath;
        }
      });
      (d.items || []).forEach(function (it) {
        ['thumb', 'image'].forEach(function (k) {
          var v = it[k] || '';
          var b = v.split('/').pop().split('?')[0];
          if (byBase[b]) it[k] = byBase[b];
        });
      });
      if (!d || !(d.items || []).length) { rootEl.innerHTML = searchBar('\u641c\u7d22\u56fe\u7eb8') + emptyState('\u56fe\u5e93\u6570\u636e\u8fd8\u6ca1\u5230\uff08\u7b49 内容 \u7684 tuku.json\uff09'); return; }
      var activeTab = (d.tabs && d.tabs[0] && d.tabs[0].id) || '';
      var activeColor = 'colorful';
      var kw = '';
      function paint() {
        rootEl.innerHTML = searchBar('\u641c\u7d22\u56fe\u7eb8') + tabsHTML(d.tabs, activeTab) +
          '<div class="xc-filters" id="xc-filters">' + ((d.filters && d.filters.color) || []).map(function (f) {
            return '<a href="javascript:void(0)" data-id="' + esc(f.id) + '" class="' + (f.id === activeColor ? 'active' : '') + '">' + esc(f.name) + '</a>';
          }).join('') + '</div><div id="xc-body"></div>' +
          (d.updated ? '<p class="xc-updated">\u6570\u636e\u65f6\u95f4\uff1a' + esc(d.updated) + '</p>' : '');
        paintBody();
        qsa('#xc-tabs a').forEach(function (a) { a.addEventListener('click', function () { activeTab = a.getAttribute('data-id'); paint(); }); });
        qsa('#xc-filters a').forEach(function (a) { a.addEventListener('click', function () { activeColor = a.getAttribute('data-id'); paint(); }); });
        q('#xc-q').addEventListener('input', function (e) { kw = e.target.value.trim(); paintBody(); });
      }
      function paintBody() {
        var list = (d.items || []).filter(function (it) {
          if (it.tabId && it.tabId !== activeTab) return false;
          if (it.color && it.color !== activeColor) return false;
          if (kw && (it.title || '').indexOf(kw) < 0) return false;
          return true;
        });
        q('#xc-body').innerHTML = gridHTML(list, 'tuku');
        bindPics();
      }
      paint();
    });
  }

  // ---------- \u89c4\u5f8b\u8d70\u52bf ----------
  function renderGuilv(rootEl) {
    Promise.all([loadJson('guilv'), loadJson('guilv-images')]).then(function (res) {
      var d = res[0], gmap = res[1] || [];
      var byUrl = {};
      (Array.isArray(gmap) ? gmap : []).forEach(function (m) { if (m && m.url) byUrl[m.url] = m.localPath; });
      if (!d || !(d.games || []).length) { rootEl.innerHTML = emptyState('\u89c4\u5f8b\u8d70\u52bf\u6570\u636e\u8fd8\u6ca1\u5230\uff08\u7b49 内容 \u7684 guilv.json\uff09'); return; }
      var active = d.games[0].tabId;
      function paint() {
        rootEl.innerHTML = '<div class="xc-subtabs" id="xc-tabs">' + d.games.map(function (g) {
          return '<a href="javascript:void(0)" data-id="' + esc(g.tabId) + '" class="' + (g.tabId === active ? 'active' : '') + '">' + esc(g.name) + '</a>';
        }).join('') + '</div><div id="xc-body"></div>';
        paintBody();
        qsa('#xc-tabs a').forEach(function (a) { a.addEventListener('click', function () { active = a.getAttribute('data-id'); paint(); }); });
      }
      function paintBody() {
        var g = null;
        (d.games || []).forEach(function (x) { if (x.tabId === active) g = x; });
        if (!g) { q('#xc-body').innerHTML = emptyState(); return; }
        var newest = (g.issues && g.issues[0] && g.issues[0].issue) || '?';
        var html = '<p class="xc-updated">\u5b58\u6863\u671f\u53f7\uff1a\u7b2c ' + esc(newest) + ' \u671f\uff08\u539f\u7ad9\u5b58\u6863\u5feb\u7167\uff0c\u975e\u5b9e\u65f6\uff09</p>';
        (g.issues || []).forEach(function (iss) {
          html += '<h3 class="xc-iss-title">\u7b2c ' + esc(iss.issue) + ' \u671f</h3><div class="xc-grid-pic">';
          (iss.images || []).forEach(function (im) {
            html += '<a class="xc-pic-card" href="javascript:void(0)" data-img="' + esc(localize(im.file)) + '" data-title="\u7b2c ' + esc(iss.issue) + ' \u671f \u00b7 ' + esc(im.n) + '">' +
              '<img loading="lazy" src="' + esc(localize(im.file)) + '" alt=""></a>';
          });
          html += '</div>';
        });
        q('#xc-body').innerHTML = html || emptyState();
        bindPics();
      }
      paint();
    });
  }

  // ---------- \u6570\u636e\u5927\u5385 ----------
  function renderHub(rootEl) {
    loadJson('hub').then(function (d) {
      if (!d || !(d.items || []).length) { rootEl.innerHTML = searchBar('\u641c\u7d22\u76ee\u5f55') + emptyState('\u6570\u636e\u5927\u5385\u6570\u636e\u8fd8\u6ca1\u5230\uff08\u7b49 内容 \u7684 hub.json\uff09'); return; }
      var all = d.items || [], shown = 200, kw = '';
      function paint() {
        rootEl.innerHTML = searchBar('\u641c\u7d22\u76ee\u5f55\uff08\u5171 ' + (d.total || all.length) + ' \u6761\uff09') + '<div id="xc-body"></div>';
        paintBody();
        q('#xc-q').addEventListener('input', function (e) { kw = e.target.value.trim(); shown = 200; paintBody(); });
      }
      function paintBody() {
        var list = all.filter(function (it) { return !kw || (it.title || '').indexOf(kw) >= 0; }).slice(0, shown);
        q('#xc-body').innerHTML = gridHTML(list, 'link') +
          (all.length > shown ? '<div class="xc-more"><button type="button" id="xc-more">\u52a0\u8f7d\u66f4\u591a</button></div>' : '');
        var btn = q('#xc-more');
        if (btn) btn.addEventListener('click', function () { shown += 200; paintBody(); });
      }
      paint();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var el = q('#xc-app');
    if (!el) return;
    var page = el.getAttribute('data-page');
    if (page === 'ziliao') renderZiliao(el);
    else if (page === 'ziliao-list') renderZiliaoList(el);
    else if (page === 'ziliao-detail') renderZiliaoDetail(el);
    else if (page === 'tuku') renderTuku(el);
    else if (page === 'guilv') renderGuilv(el);
    else if (page === 'hub') renderHub(el);
  });
})();
