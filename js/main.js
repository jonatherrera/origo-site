/* ============================================================
   ORIGO — main.js
   Mobile nav · Scroll reveal · Nav scroll state · Footer year
   Dark mode toggle
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Dynamic footer year
  ---------------------------------------------------------- */
  const yearEl = document.getElementById('year') || document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ----------------------------------------------------------
     2. Nav scroll state
  ---------------------------------------------------------- */
  const nav = document.getElementById('nav') || document.getElementById('site-nav');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load


  /* ----------------------------------------------------------
     3. Mobile hamburger / nav overlay
  ---------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger') || document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav') || document.getElementById('nav-links');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on mobile nav link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  /* ----------------------------------------------------------
     4. Services dropdown keyboard support
  ---------------------------------------------------------- */
  const dropdownToggle = document.querySelector('.nav__dropdown-toggle');
  if (dropdownToggle) {
    dropdownToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const dropdown = dropdownToggle.closest('.nav__dropdown');
        const menu = dropdown.querySelector('.nav__dropdown-menu');
        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? '' : 'block';
        dropdownToggle.setAttribute('aria-expanded', !isOpen);
      }
    });
  }


  /* ----------------------------------------------------------
     5. Scroll reveal — Intersection Observer
  ---------------------------------------------------------- */
  const staggerGroups = document.querySelectorAll('.stagger-group');
  const staggeredChildren = new Set();

  if ('IntersectionObserver' in window) {
    // Stagger group observer — fires on the container
    const staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.reveal');
          items.forEach(function (item, i) {
            setTimeout(function () {
              item.classList.add('visible');
            }, i * 90);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    staggerGroups.forEach(function (group) {
      group.querySelectorAll('.reveal').forEach(function (child) {
        staggeredChildren.add(child);
      });
      staggerObserver.observe(group);
    });
  }

  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealEls.forEach(function (el) {
      // Skip children already handled by stagger observer
      if (!staggeredChildren.has(el)) {
        observer.observe(el);
      }
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ----------------------------------------------------------
     6. Smooth scroll for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ----------------------------------------------------------
     7. Dark mode toggle
  ---------------------------------------------------------- */
  // Remove preload class once styles are ready — enables transitions
  requestAnimationFrame(function () {
    document.body.classList.remove('preload');
  });

  var toggleBtns = document.querySelectorAll('.theme-toggle');

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('origo-theme', theme);
    toggleBtns.forEach(function (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  });

  // Set initial aria-label based on current theme
  var currentTheme = getTheme();
  toggleBtns.forEach(function (btn) {
    btn.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });

})();

// ============================================================
// STAT COUNTERS
// ============================================================
(function () {
  var counters = document.querySelectorAll('.stat-item__number');
  if (!counters.length) return;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    var target   = parseInt(el.getAttribute('data-target'), 10);
    var suffix   = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var start    = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var elapsed  = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var value    = Math.floor(easeOutQuart(progress) * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }

    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();

// ============================================================
// SPLIT HEADLINE ANIMATIONS
// ============================================================
(function () {
  var headlines = document.querySelectorAll('.split-headline');
  if (!headlines.length) return;

  function wrapWord(content) {
    var line = document.createElement('span');
    line.className = 'split-line';
    var word = document.createElement('span');
    word.className = 'split-word';
    if (typeof content === 'string') {
      word.textContent = content;
    } else {
      word.appendChild(content);
    }
    line.appendChild(word);
    return line;
  }

  function splitHeadline(el) {
    var nodes = Array.from(el.childNodes);
    el.innerHTML = '';
    var wordIndex = 0;

    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        var parts = node.textContent.split(/(\s+)/);
        parts.forEach(function (part) {
          if (/^\s+$/.test(part)) {
            el.appendChild(document.createTextNode(' '));
          } else if (part.length) {
            var wrapped = wrapWord(part);
            wrapped.querySelector('.split-word').style.transitionDelay = (wordIndex * 0.055) + 's';
            wordIndex++;
            el.appendChild(wrapped);
          }
        });
      } else if (node.nodeType === 1) {
        if (node.tagName === 'BR') {
          el.appendChild(node.cloneNode(true));
        } else {
          var wrapped = wrapWord(node.cloneNode(true));
          wrapped.querySelector('.split-word').style.transitionDelay = (wordIndex * 0.055) + 's';
          wordIndex++;
          el.appendChild(wrapped);
        }
      }
    });
  }

  headlines.forEach(function (el) { splitHeadline(el); });

  // Dedicated observer — independent of the main reveal observer
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('words-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  headlines.forEach(function (el) { observer.observe(el); });
})();

// ============================================================
// MAGNETIC BUTTONS
// ============================================================
(function () {
  var magnets = document.querySelectorAll('.magnetic');
  if (!magnets.length) return;

  magnets.forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width  / 2;
      var y = e.clientY - rect.top  - rect.height / 2;
      el.style.transition = 'transform 0s';
      el.style.transform  = 'translate(' + (x * 0.28) + 'px, ' + (y * 0.28) + 'px)';
    });

    el.addEventListener('mouseleave', function () {
      el.style.transition = 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      el.style.transform  = '';
    });
  });
})();

// ============================================================
// CUSTOM CURSOR
// ============================================================
(function () {
  // Touch / mobile — don't init
  if (window.matchMedia('(hover: none)').matches) return;

  var dot  = document.createElement('div');
  var ring = document.createElement('div');
  dot.className  = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(ring);
  document.body.appendChild(dot);
  document.body.classList.add('cursor-custom');

  var mouseX = 0, mouseY = 0;
  var ringX  = 0, ringY  = 0;
  var visible = false;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
    if (!visible) {
      ringX = mouseX;
      ringY = mouseY;
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
      visible = true;
    }
  });

  document.addEventListener('mouseleave', function () {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function () {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  // Hover state via event delegation
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('a, button, [role="button"], label, input, select, textarea')) {
      document.body.classList.add('cursor-hover');
    } else {
      document.body.classList.remove('cursor-hover');
    }
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  (function animateRing() {
    ringX = lerp(ringX, mouseX, 0.1);
    ringY = lerp(ringY, mouseY, 0.1);
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();
})();
