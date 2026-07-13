/* ============================================================
   ORIGO - Blog listing behavior (redesign)
   Combined category-chip + text search over the pre-rendered
   cards, featured-post visibility rule, and empty state. Cards
   and their data live in the static HTML (the site's data source);
   this only layers on the interactivity.
   ============================================================ */
(function () {
  var searchEl = document.getElementById('bl-search');
  var chipsEl  = document.getElementById('bl-chips');
  var featEl   = document.getElementById('bl-featured');
  var gridEl   = document.getElementById('bl-grid');
  var emptyEl  = document.getElementById('bl-empty');
  if (!gridEl || !chipsEl || !emptyEl) return;

  var cards = Array.prototype.slice.call(gridEl.querySelectorAll('.bl-card'));
  var activeFilter = 'all';
  var query = '';

  function apply() {
    var q = query.trim().toLowerCase();
    var showFeatured = activeFilter === 'all' && q === '';
    if (featEl) featEl.hidden = !showFeatured;

    var count = 0;
    cards.forEach(function (c) {
      var isFeatured = c.dataset.featured === 'true';
      var catOk = activeFilter === 'all' || c.dataset.category === activeFilter;
      var searchOk = !q || (c.dataset.text || '').indexOf(q) !== -1;
      // The featured (newest) post shows in the hero slot when unfiltered,
      // so hide its duplicate grid card in that case.
      var show = catOk && searchOk && !(showFeatured && isFeatured);
      c.hidden = !show;
      if (show) count++;
    });
    emptyEl.classList.toggle('show', count === 0 && !showFeatured);
  }

  chipsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.bl-chip');
    if (!b) return;
    activeFilter = b.dataset.filter;
    chipsEl.querySelectorAll('.bl-chip').forEach(function (c) {
      c.classList.toggle('active', c.dataset.filter === activeFilter);
    });
    apply();
  });

  if (searchEl) {
    searchEl.addEventListener('input', function () { query = searchEl.value; apply(); });
  }

  // Deep-link support: /blog/?filter=seo (kept from the old listing)
  try {
    var urlFilter = new URLSearchParams(window.location.search).get('filter');
    if (urlFilter) {
      var chip = chipsEl.querySelector('.bl-chip[data-filter="' + urlFilter + '"]');
      if (chip) chip.click();
    }
  } catch (e) {}

  apply();

  /* Newsletter form — TODO: wire action to the real email provider endpoint.
     Until then, submit is a graceful no-op that confirms to the user. */
  var form = document.getElementById('bl-news-form');
  if (form && !form.getAttribute('action')) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = document.getElementById('bl-news-ok');
      if (ok) ok.hidden = false;
      form.hidden = true;
    });
  }
})();
