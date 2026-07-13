/* ============================================================
   ORIGO - Blog article behavior (redesign)
   Reading-progress bar + share buttons (X / LinkedIn / copy link).
   ============================================================ */
(function () {
  // Reading-progress bar
  var bar = document.getElementById('post-progress');
  if (bar) {
    var update = function () {
      var el = document.documentElement;
      var max = el.scrollHeight - el.clientHeight;
      bar.style.width = (max > 0 ? (el.scrollTop / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  // Share buttons
  var share = document.querySelector('.post-share');
  if (share) {
    var url = window.location.href.split('#')[0];
    var title = document.title;
    var x = share.querySelector('.post-share__x');
    var li = share.querySelector('.post-share__li');
    if (x) x.href = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
    if (li) li.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
    var copy = share.querySelector('.post-share__copy');
    if (copy) {
      copy.addEventListener('click', function () {
        var done = function () {
          copy.classList.add('is-copied');
          copy.setAttribute('aria-label', 'Link copied');
          setTimeout(function () { copy.classList.remove('is-copied'); copy.setAttribute('aria-label', 'Copy link'); }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, done);
        } else {
          var t = document.createElement('textarea'); t.value = url; document.body.appendChild(t);
          t.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t); done();
        }
      });
    }
  }

  // Newsletter form — placeholder until wired to the provider endpoint.
  var form = document.getElementById('post-news-form');
  if (form && !form.getAttribute('action')) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = document.getElementById('post-news-ok');
      if (ok) ok.hidden = false;
      form.hidden = true;
    });
  }
})();
