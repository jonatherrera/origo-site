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

  // Newsletter form -> GoHighLevel webhook
  var NEWSLETTER_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/uEL4ayBklqQs6ylNNJt6/webhook-trigger/532005fe-212e-4c46-b27d-b2a310a0b9c0";
  var nlForm = document.getElementById('bl-news-form');
  var nlOk = document.getElementById('bl-news-ok');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = nlForm.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      fetch(NEWSLETTER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: 'origo.ooo newsletter cta' })
      }).then(function () {
        nlForm.hidden = true;
        if (nlOk) nlOk.hidden = false;
      }).catch(function () {
        if (nlOk) { nlOk.hidden = false; nlOk.textContent = 'Something went wrong. Try again in a moment.'; }
      });
    });
  }
})();
