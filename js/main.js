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
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
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
