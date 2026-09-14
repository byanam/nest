"use strict";

/* ══════════════════════════════════════════════════════════════
   NEST — MOBILE HORIZONTAL ENGINE & INTERACTION SCRIPT
   ══════════════════════════════════════════════════════════════ */

(function initMobileNest() {
  var slider = document.getElementById('mobile-slider');
  var slides = document.querySelectorAll('.mobile-slide');
  var slideCurr = document.getElementById('slide-curr');
  var progressFill = document.getElementById('mobile-progress-fill');
  var sectionLabel = document.getElementById('mobile-section-name');
  var btnPrev = document.getElementById('btn-prev-slide');
  var btnNext = document.getElementById('btn-next-slide');
  var menuBtn = document.getElementById('mobile-menu-btn');
  var drawer = document.getElementById('mobile-drawer');
  var drawerLinks = document.querySelectorAll('.m-drawer-link');

  var sectionNames = [
    'Overview',
    'Showcase',
    'Clients',
    'Pricing & Plans',
    'Client Feedback',
    'Who We Are',
    'FAQ & Studio'
  ];

  var currentIndex = 0;
  var totalSlides = slides.length || 7;

  /* ── 1. Update Navigation State ── */
  function updateSlideState(idx) {
    if (idx < 0) idx = 0;
    if (idx >= totalSlides) idx = totalSlides - 1;
    currentIndex = idx;

    // Update Counter: e.g. "01"
    if (slideCurr) {
      slideCurr.textContent = (currentIndex + 1 < 10 ? '0' : '') + (currentIndex + 1);
    }

    // Update Progress Bar
    if (progressFill) {
      var pct = ((currentIndex + 1) / totalSlides) * 100;
      progressFill.style.width = pct + '%';
    }

    // Update Section Name
    if (sectionLabel) {
      sectionLabel.textContent = sectionNames[currentIndex] || 'NEST';
    }

    // Update Drawer Active Item
    drawerLinks.forEach(function (link, i) {
      if (i === currentIndex) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update Arrow states
    if (btnPrev) {
      btnPrev.style.opacity = currentIndex === 0 ? '0.35' : '1';
      btnPrev.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    }
    if (btnNext) {
      btnNext.style.opacity = currentIndex === totalSlides - 1 ? '0.35' : '1';
      btnNext.style.pointerEvents = currentIndex === totalSlides - 1 ? 'none' : 'auto';
    }

    // Trigger SVG Scribbles on view
    if (currentIndex === 1) {
      triggerScribble('m-dont-scribble');
    } else if (currentIndex === 5) {
      triggerScribble('m-who-underline');
    }
  }

  /* ── 2. Scroll-Snap Tracker ── */
  var scrollDebounce;
  if (slider) {
    slider.addEventListener('scroll', function () {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(function () {
        var w = slider.clientWidth || window.innerWidth;
        var idx = Math.round(slider.scrollLeft / w);
        if (idx !== currentIndex) {
          updateSlideState(idx);
        }
      }, 40);
    }, { passive: true });
  }

  /* ── 3. Smooth Scroll to Target Slide ── */
  function scrollToSlide(idx) {
    if (!slider) return;
    var w = slider.clientWidth || window.innerWidth;
    slider.scrollTo({
      left: idx * w,
      behavior: 'smooth'
    });
    updateSlideState(idx);
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      if (currentIndex > 0) scrollToSlide(currentIndex - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      if (currentIndex < totalSlides - 1) scrollToSlide(currentIndex + 1);
    });
  }

  /* ── 4. Mobile Drawer Menu ── */
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', function () {
      var isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        menuBtn.classList.remove('open');
      } else {
        drawer.classList.add('open');
        menuBtn.classList.add('open');
      }
    });

    drawerLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetIndex = parseInt(link.getAttribute('data-slide') || '0', 10);
        drawer.classList.remove('open');
        menuBtn.classList.remove('open');
        scrollToSlide(targetIndex);
      });
    });
  }

  /* ── 5. Hand-Drawn SVG Scribble Trigger ── */
  function triggerScribble(id) {
    var svg = document.getElementById(id);
    if (!svg) return;
    svg.classList.remove('draw');
    void svg.offsetWidth; // force browser reflow
    svg.classList.add('draw');
  }

  /* ── 6. FAQ Accordion ── */
  var faqItems = document.querySelectorAll('.m-faq-item');
  faqItems.forEach(function (item) {
    var header = item.querySelector('.m-faq-header');
    if (!header) return;
    header.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (it) {
        it.classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ── 7. Live London / GMT Clock ── */
  var clockEl = document.getElementById('m-london-clock');
  function updateLondonClock() {
    if (!clockEl) return;
    try {
      var now = new Date();
      var formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      clockEl.textContent = 'LONDON — ' + formatter.format(now) + ' GMT/BST';
    } catch (e) {
      var d = new Date();
      clockEl.textContent = 'LONDON — ' + d.toTimeString().substring(0, 8) + ' GMT';
    }
  }

  setInterval(updateLondonClock, 1000);
  updateLondonClock();

  // Initial call
  updateSlideState(0);
})();
