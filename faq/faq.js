/* ============================================================
   ORIGO - FAQ page behavior
   Progressive enhancement over pre-rendered HTML: live search,
   topic filter chips, result count, and a one-open-at-a-time
   accordion. Content and answers exist in the static HTML, so the
   page is fully usable (and crawlable) with JS disabled; this only
   layers on the interactivity.
   ============================================================ */
(function () {
  var searchEl = document.getElementById('faq-search');
  var chipsEl  = document.getElementById('faq-chips');
  var countEl  = document.getElementById('faq-count');
  var emptyEl  = document.getElementById('faq-empty');
  var listEl   = document.getElementById('faq-list');
  if (!listEl || !chipsEl || !countEl || !emptyEl) return;

  var sections = Array.prototype.slice.call(listEl.querySelectorAll('.faq-sect'));
  var activeFilter = 'all';
  var query = '';

  /* ---- Accordion: one open at a time ---- */
  function close(item) {
    item.setAttribute('data-open', 'false');
    var row = item.querySelector('.faq-q-row');
    if (row) row.setAttribute('aria-expanded', 'false');
  }
  function toggle(item) {
    var isOpen = item.getAttribute('data-open') === 'true';
    listEl.querySelectorAll('.faq-item[data-open="true"]').forEach(close);
    if (!isOpen) {
      item.setAttribute('data-open', 'true');
      var row = item.querySelector('.faq-q-row');
      if (row) row.setAttribute('aria-expanded', 'true');
    }
  }
  // Native <button> rows give us Enter/Space + focus for free.
  listEl.addEventListener('click', function (e) {
    var row = e.target.closest('.faq-q-row');
    if (!row) return;
    toggle(row.closest('.faq-item'));
  });

  /* ---- Filtering (search + topic), result count, empty state ---- */
  function apply() {
    var q = query.trim().toLowerCase();
    var count = 0;
    sections.forEach(function (sect) {
      var filterOk = activeFilter === 'all' || sect.dataset.topic === activeFilter;
      var shown = 0;
      sect.querySelectorAll('.faq-item').forEach(function (it) {
        var hit = filterOk && (!q || it.dataset.text.indexOf(q) !== -1);
        it.hidden = !hit;
        if (hit) shown++;
      });
      sect.hidden = shown === 0;
      count += shown;
    });
    countEl.textContent = count + (count === 1 ? ' answer' : ' answers');
    emptyEl.classList.toggle('show', count === 0);
  }

  chipsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-chip');
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    chipsEl.querySelectorAll('.faq-chip').forEach(function (c) {
      c.classList.toggle('active', c.dataset.filter === activeFilter);
    });
    apply();
  });

  if (searchEl) {
    searchEl.addEventListener('input', function () {
      query = searchEl.value;
      apply();
    });
  }

  apply();
})();
