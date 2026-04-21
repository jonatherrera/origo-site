(function () {
  'use strict';

  var index = [];
  var debounceTimer;

  var searchInput   = document.getElementById('blog-search-input');
  var searchClear   = document.getElementById('blog-search-clear');
  var searchResults = document.getElementById('blog-search-results');
  var searchMeta    = document.getElementById('blog-search-meta');
  var blogGrid      = document.querySelector('.blog-grid');
  var filterSection = document.querySelector('.blog-filter-buttons');

  if (!searchInput) return;

  fetch('/blog/search-index.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { index = data; });

  // ── helpers ────────────────────────────────────────────────

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function tokenize(q) {
    return q.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(function (t) { return t.length > 1; });
  }

  function highlight(text, tokens) {
    var safe = escHtml(text);
    tokens.forEach(function (token) {
      var rx = new RegExp('(' + token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      safe = safe.replace(rx, '<mark>$1</mark>');
    });
    return safe;
  }

  function snippet(body, tokens, len) {
    len = len || 220;
    var lower = body.toLowerCase();
    var best  = -1;
    tokens.forEach(function (t) {
      var pos = lower.indexOf(t);
      if (pos !== -1 && (best === -1 || pos < best)) best = pos;
    });
    var start = best === -1 ? 0 : Math.max(0, best - 80);
    var end   = Math.min(body.length, start + len);
    var text  = (start > 0 ? '\u2026' : '') + body.slice(start, end) + (end < body.length ? '\u2026' : '');
    return highlight(text, tokens);
  }

  // ── search ─────────────────────────────────────────────────

  function runSearch(query) {
    var tokens = tokenize(query);
    if (!tokens.length) return [];

    return index.map(function (post) {
      var score = 0;
      var tl = post.title.toLowerCase();
      var bl = post.body.toLowerCase();
      var cl = (post.category || '').toLowerCase();

      tokens.forEach(function (t) {
        if (tl.includes(t)) score += 4;
        if (cl.includes(t)) score += 2;
        if (bl.includes(t)) score += 1;
      });
      return { post: post, score: score };
    })
    .filter(function (r) { return r.score > 0; })
    .sort(function (a, b) { return b.score - a.score; })
    .map(function (r) { return r.post; });
  }

  // ── render ─────────────────────────────────────────────────

  function renderResults(results, query) {
    var tokens = tokenize(query);

    searchMeta.textContent = results.length
      ? results.length + ' result' + (results.length === 1 ? '' : 's') + ' for \u201c' + query + '\u201d'
      : '';

    if (!results.length) {
      searchResults.innerHTML =
        '<p class="blog-search-empty">No results found for \u201c<strong>' + escHtml(query) + '</strong>\u201d. Try a different keyword.</p>';
      return;
    }

    searchResults.innerHTML = results.map(function (post) {
      var displayUrl = 'origo.ooo' + post.url;
      var snip       = snippet(post.body, tokens);
      var titleHtml  = highlight(post.title, tokens);
      var catHtml    = post.category ? '<span class="blog-search-result__cat">' + escHtml(post.category) + '</span>' : '';

      return '<article class="blog-search-result">' +
        catHtml +
        '<a class="blog-search-result__title" href="' + post.url + '">' + titleHtml + '</a>' +
        '<span class="blog-search-result__url">' + escHtml(displayUrl) + '</span>' +
        '<p class="blog-search-result__snippet">' + snip + '</p>' +
        (post.date ? '<span class="blog-search-result__date">' + escHtml(post.date) + '</span>' : '') +
        '</article>';
    }).join('');
  }

  // ── show / hide ────────────────────────────────────────────

  function showSearchUI() {
    blogGrid.style.display      = 'none';
    filterSection.style.display = 'none';
    searchResults.style.display = 'block';
    searchClear.style.display   = 'flex';
  }

  function hideSearchUI() {
    blogGrid.style.display      = '';
    filterSection.style.display = '';
    searchResults.style.display = 'none';
    searchClear.style.display   = 'none';
    searchMeta.textContent      = '';
    searchInput.value           = '';
    searchResults.innerHTML     = '';
  }

  // ── events ─────────────────────────────────────────────────

  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    var q = searchInput.value.trim();
    if (!q) { hideSearchUI(); return; }
    debounceTimer = setTimeout(function () {
      showSearchUI();
      renderResults(runSearch(q), q);
    }, 160);
  });

  searchClear.addEventListener('click', hideSearchUI);

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideSearchUI();
  });
})();
