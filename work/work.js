/* ============================================================
   ORIGO - Featured Work listing behavior
   Service-chip filter with a sliding pill over the pre-rendered
   cards, featured-project visibility (only on "All work"), and the
   empty state. Content is static HTML; this layers on interactivity.
   ============================================================ */
(function () {
  var chipsEl  = document.getElementById('wk-chips');
  var featured = document.querySelector('#wk-featured-slot .wk-featured');
  var grid     = document.getElementById('wk-grid');
  var emptyEl  = document.getElementById('wk-empty');
  if (!chipsEl || !grid) return;
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.wk-card'));
  var activeFilter = 'all';

  function apply() {
    var showFeatured = activeFilter === 'all';
    if (featured) featured.hidden = !showFeatured;
    var count = 0;
    cards.forEach(function (c) {
      var svcs = (c.dataset.services || '').split(' ');
      var match = activeFilter === 'all' || svcs.indexOf(activeFilter) !== -1;
      var isFeat = c.dataset.featured === 'true';
      var show = match && !(showFeatured && isFeat);
      c.hidden = !show;
      if (show) count++;
    });
    grid.style.display = count === 0 ? 'none' : '';
    if (emptyEl) emptyEl.hidden = !(count === 0 && !(showFeatured && featured));
  }

  function movePill() {
    var pill = chipsEl.querySelector('.wk-chip-pill');
    var active = chipsEl.querySelector('.wk-chip.active');
    if (!pill || !active) return;
    pill.style.width = active.offsetWidth + 'px';
    pill.style.height = active.offsetHeight + 'px';
    pill.style.transform = 'translate(' + active.offsetLeft + 'px, ' + active.offsetTop + 'px)';
    pill.style.opacity = '1';
    chipsEl.setAttribute('data-pill-ready', '');
  }

  chipsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.wk-chip');
    if (!btn || btn.dataset.id === activeFilter) return;
    activeFilter = btn.dataset.id;
    chipsEl.querySelectorAll('.wk-chip').forEach(function (c) {
      c.classList.toggle('active', c.dataset.id === activeFilter);
    });
    movePill();
    apply();
  });

  window.addEventListener('resize', movePill);
  window.addEventListener('load', movePill);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(movePill);
  requestAnimationFrame(function () { requestAnimationFrame(movePill); });
  apply();
})();
