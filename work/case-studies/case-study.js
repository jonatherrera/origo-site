/* Case-study detail — reading-progress bar.
   Fills #csx-progress as the reader scrolls the article. */
(function () {
  var bar = document.getElementById('csx-progress');
  if (!bar) return;
  var ticking = false;
  function update() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var top = window.pageYOffset || h.scrollTop || 0;
    var pct = max > 0 ? Math.min(1, Math.max(0, top / max)) : 0;
    bar.style.width = (pct * 100) + '%';
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
