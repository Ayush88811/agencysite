/* ==========================================================================
   NOVAFLARE DIGITAL — MAIN SCRIPT
   Table of contents:
     1. Preloader
     2. Sticky navbar on scroll
     3. Mobile menu toggle
     4. Smooth scroll + active link highlighting
     5. Scroll-reveal animations (IntersectionObserver)
     6. Animated stat counters
     7. Back-to-top button
     8. Contact form validation
     9. Footer year
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------
     1. PRELOADER
     Hide the loading screen once the page has fully loaded so the
     first paint the user sees is intentional, not a flash of content.
  ------------------------------------------------------------------- */
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    if (preloader) {
      preloader.classList.add('loaded');
      // Remove from the accessibility tree / layout once fully hidden
      setTimeout(function () { preloader.style.display = 'none'; }, 700);
    }
  });

  /* ------------------------------------------------------------------
     2. STICKY NAVBAR ON SCROLL
     Adds a frosted-glass background to the header once the user has
     scrolled past the hero area, keeping the transparent look on load.
  ------------------------------------------------------------------- */
  var header = document.getElementById('header');
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ------------------------------------------------------------------
     3. MOBILE MENU TOGGLE
     Toggles the off-canvas nav menu and keeps aria-expanded in sync
     for screen-reader users. Closes automatically when a link is tapped.
  ------------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  function closeMenu() {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // lock background scroll
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  navMenu.querySelectorAll('.nav-link, .nav-cta-wrap a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close mobile menu on Escape key for keyboard users
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ------------------------------------------------------------------
     4. ACTIVE LINK HIGHLIGHTING WHILE SCROLLING
     Native CSS `scroll-behavior: smooth` (set in style.css) already
     handles the smooth scroll itself; this only updates which nav
     link is marked "active" as each section enters the viewport.
  ------------------------------------------------------------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var id = entry.target.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('active-link'); });
        link.classList.add('active-link');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (section) { navObserver.observe(section); });

  /* ------------------------------------------------------------------
     5. SCROLL-REVEAL ANIMATIONS
     Any element with the `.reveal` class fades/slides into place the
     first time it crosses into the viewport. Runs once per element.
  ------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        // Small stagger so grids of cards don't all pop in at once
        var delay = (index % 3) * 90;
        setTimeout(function () {
          entry.target.classList.add('is-visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ------------------------------------------------------------------
     6. ANIMATED STAT COUNTERS
     Counts each stat up from 0 to its data-target value once the
     stats grid scrolls into view, using a simple eased increment.
  ------------------------------------------------------------------- */
  var statsGrid = document.getElementById('statsGrid');
  var statNumbers = document.querySelectorAll('.stat-number');
  var statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1400; // ms
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var value = Math.floor(eased * target);
        el.textContent = value + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      }
      requestAnimationFrame(step);
    });
  }

  if (statsGrid) {
    var statsObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsGrid);
  }

  /* ------------------------------------------------------------------
     7. BACK-TO-TOP BUTTON
     Appears once the user has scrolled a full viewport height down,
     and scrolls smoothly back to the hero when clicked.
  ------------------------------------------------------------------- */
  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > window.innerHeight) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------------------------------
     8. CONTACT FORM VALIDATION
     Lightweight client-side validation with inline error messages.
     Prevents submission (this is a static demo with no backend) and
     shows a success message once all fields pass validation.
  ------------------------------------------------------------------- */
  var form = document.getElementById('contactForm');

  var validators = {
    name: function (value) {
      return value.trim().length >= 2 ? '' : 'Please enter your full name.';
    },
    email: function (value) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value.trim()) ? '' : 'Please enter a valid email address.';
    },
    phone: function (value) {
      var pattern = /^[0-9+\-\s()]{7,16}$/;
      return pattern.test(value.trim()) ? '' : 'Please enter a valid phone number.';
    },
    message: function (value) {
      return value.trim().length >= 10 ? '' : 'Please add a few more details (10+ characters).';
    }
  };

  function showError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var errorEl = document.getElementById(fieldId + 'Error');
    var group = input.closest('.form-group');
    if (errorEl) errorEl.textContent = message;
    if (group) group.classList.toggle('has-error', Boolean(message));
  }

  function validateField(fieldId) {
    var input = document.getElementById(fieldId);
    var message = validators[fieldId](input.value);
    showError(fieldId, message);
    return message === '';
  }

  if (form) {
    // Validate a field as soon as the user leaves it
    ['name', 'email', 'phone', 'message'].forEach(function (fieldId) {
      var input = document.getElementById(fieldId);
      input.addEventListener('blur', function () { validateField(fieldId); });
      input.addEventListener('input', function () {
        // Clear the error as soon as the field becomes valid again
        if (validators[fieldId](input.value) === '') showError(fieldId, '');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isNameValid = validateField('name');
      var isEmailValid = validateField('email');
      var isPhoneValid = validateField('phone');
      var isMessageValid = validateField('message');

      var successEl = document.getElementById('formSuccess');

      if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        successEl.textContent = 'Thanks! Your message has been sent — we will reply within one business day.';
        form.reset();
        // In production, this is where a fetch() call would POST to your backend or form service.
      } else {
        successEl.textContent = '';
        // Move focus to the first invalid field for keyboard/screen-reader users
        var firstInvalid = form.querySelector('.has-error input, .has-error textarea');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     9. FOOTER YEAR
     Keeps the copyright year current without manual edits.
  ------------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
