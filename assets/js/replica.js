/* Xingchen Caixun - draw data injection (ASCII-only on purpose) */
(function () {
  'use strict';
  var status = window.DRAW_STATUS || null;
  var data = window.DRAW_DATA || null;
  var sample = window.DRAW_SAMPLE || null;
  var hasFresh = !!(status && status.ok && data && data.games && data.games.length);

  var SAMPLE_TAG = '\u6837\u672c\u6570\u636e\uff08\u5b58\u6863 313 \u671f\uff09\u00b7 \u81ea\u52a8\u66f4\u65b0\u5f85\u6253\u901a';
  var UPDATING = '\u6570\u636e\u66f4\u65b0\u4e2d';
  var OK_TEXT = '\u6570\u636e\u5df2\u66f4\u65b0\uff1a';

  var FRESH_PREFIX = '\uff08\u6570\u636e\u66f4\u65b0\u4e8e ';
  var FRESH_SUFFIX = '\uff09';
  var JUST_NOW = '\u521a\u521a';
  var MIN_AGO = ' \u5206\u949f\u524d';
  var HOUR_AGO = ' \u5c0f\u65f6\u524d';
  var DAY_AGO = ' \u5929\u524d';

  function relTime(iso) {
    if (!iso) return '';
    var t = Date.parse(String(iso).replace(' ', 'T'));
    if (isNaN(t)) return '';
    var mins = Math.floor((Date.now() - t) / 60000);
    if (mins < 1) return JUST_NOW;
    if (mins < 60) return mins + MIN_AGO;
    var hours = Math.floor(mins / 60);
    if (hours < 24) return hours + HOUR_AGO;
    return Math.floor(hours / 24) + DAY_AGO;
  }

  function setFreshBadge(msg, iso) {
    var el = document.getElementById('xc-data-badge');
    if (!el) return;
    var rel = relTime(iso);
    el.textContent = msg + (rel ? FRESH_PREFIX + rel + FRESH_SUFFIX : '');
  }

  function badge(text, isErr) {
    var div = document.createElement('div');
    div.className = 'xc-data-badge' + (isErr ? ' err' : '');
    div.textContent = text;
    return div;
  }
  function placement() {
    return document.getElementById('widgetBox41750') ||
           document.querySelector('[data-wgt-id="41750"]') ||
           document.querySelector('.baomalaodaName');
  }
  function findBlock(el) {
    var node = el;
    while (node && node !== document.body) {
      if (node.querySelector && node.querySelector('.baomalaodaQi') &&
          node.querySelectorAll('.baomalaodaMa').length >= 7) return node;
      node = node.parentNode;
    }
    return null;
  }
  function fillGames(games) {
    var byName = {};
    for (var gi = 0; gi < games.length; gi++) byName[(games[gi].name || '').trim()] = games[gi];
    var names = document.querySelectorAll('.baomalaodaName');
    var seen = 0;
    for (var i = 0; i < names.length; i++) {
      var block = findBlock(names[i]);
      if (!block) continue;
      var label = (names[i].textContent || '').trim();
      var game = byName[label] || games[seen];
      if (!game) continue;
      seen++;
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
  }
  function clearAll() {
    var nodes = document.querySelectorAll('.baomalaodaMa, .baomalaodaXiao');
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = '\u2014';
    var qis = document.querySelectorAll('.baomalaodaQi');
    for (var k = 0; k < qis.length; k++) qis[k].textContent = '?';
  }
  function insertBadge(text, isErr, id) {
    var box = placement();
    if (!box || !box.parentNode) return;
    var b = badge(text, isErr);
    if (id) b.id = id;
    box.parentNode.insertBefore(b, box);
  }
  function bindRefresh() {
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.children.length === 0 && /^\s*\u5237\u65b0\s*$/.test(el.textContent || '')) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function () { location.reload(); });
      }
    }
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (hasFresh) {
      fillGames(data.games);
      var msg = status.message || (OK_TEXT + (status.lastSuccess || status.updated || ''));
      insertBadge(msg, false, 'xc-data-badge');
      setFreshBadge(msg, (data && data.updatedAt) || status.updatedAt || data.updated || status.lastSuccess);
      setInterval(function () {
        setFreshBadge(msg, (data && data.updatedAt) || status.updatedAt || data.updated || status.lastSuccess);
      }, 30000);
    } else if (sample && sample.games && sample.games.length) {
      fillGames(sample.games);
      var cfg = window.SITE_CONFIG || {};
      if (cfg.showSampleBadge !== false) insertBadge(SAMPLE_TAG, false, 'xc-data-badge');
    } else {
      clearAll();
      insertBadge(UPDATING, true, 'xc-data-badge');
    }
    bindRefresh();
  });
})();
