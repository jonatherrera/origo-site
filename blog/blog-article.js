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

  // Newsletter form -> GoHighLevel webhook
  var NEWSLETTER_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/uEL4ayBklqQs6ylNNJt6/webhook-trigger/532005fe-212e-4c46-b27d-b2a310a0b9c0";
  var nlForm = document.getElementById('post-news-form');
  var nlOk = document.getElementById('post-news-ok');
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
