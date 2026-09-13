/* Dynamic responsive scaling to fit full width on any screen (Windows, Mac, etc.) */
(function () {
  function fitToScreen() {
    var wrapper = document.getElementById('scaler-wrapper');
    var scaler = document.getElementById('scaler');
    if (!scaler || !wrapper) return;

    var clientWidth = document.documentElement.clientWidth || window.innerWidth;
    var scale = clientWidth / 1280;

    scaler.style.transform = 'scale(' + scale + ')';
    scaler.style.transformOrigin = 'top left';
    wrapper.style.height = Math.ceil(6716 * scale) + 'px';
  }

  window.addEventListener('resize', fitToScreen);
  window.addEventListener('orientationchange', fitToScreen);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fitToScreen);
  } else {
    fitToScreen();
  }
})();

/* Banner marquee — clone SVG for seamless loop */
(function () {
  var track = document.getElementById('banner-track');
  if (track) {
    var original = track.querySelector('svg');
    if (original) {
      var clone = original.cloneNode(true);
      track.appendChild(clone);
    }
  }
})();

/* FAQ accordion */
(function () {
  var items = document.querySelectorAll('.faq-item');

  items.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;

    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      /* close all items */
      items.forEach(function (it) {
        it.classList.remove('open');
      });

      /* toggle clicked item */
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
})();

(function () {
  /* smooth-scroll nav links */
  var sectionTops = {
    '#pricing': 2860,
    '#feedback': 3600,
    '#about': 4390
  };

  var navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (sectionTops[href]) {
        e.preventDefault();
        var clientWidth = document.documentElement.clientWidth || window.innerWidth;
        var scale = clientWidth / 1280;
        window.scrollTo({
          top: sectionTops[href] * scale,
          behavior: 'smooth'
        });
      }
    });
  });

  /* Hero action buttons */
  var btnStart = document.getElementById('hero-btn-get-started');
  if (btnStart) {
    btnStart.style.cursor = 'pointer';
    btnStart.addEventListener('click', function () {
      var clientWidth = document.documentElement.clientWidth || window.innerWidth;
      var scale = clientWidth / 1280;
      window.scrollTo({ top: 2860 * scale, behavior: 'smooth' });
    });
  }

  var btnQuote = document.getElementById('hero-btn-quote');
  if (btnQuote) {
    btnQuote.style.cursor = 'pointer';
    btnQuote.addEventListener('click', function () {
      var clientWidth = document.documentElement.clientWidth || window.innerWidth;
      var scale = clientWidth / 1280;
      window.scrollTo({ top: 2860 * scale, behavior: 'smooth' });
    });
  }
})();

/* ══════════════════════════════════════════════
   Scroll-Driven Circular Interchange for "Having Second Thoughts" Boxes
   - Strictly scroll-driven: NO auto-timer
   - Low pause duration: responds smoothly and promptly as you scroll
   - Silky C2-continuous quintic curve + LERP damping for maximum smoothness
   - Confined strictly inside #whaa-dark-bg (top: 1038px, bottom: 1922px)
   ══════════════════════════════════════════════ */
(function () {
  var wb1 = document.getElementById('wb1');
  var wb2 = document.getElementById('wb2');
  var wb3 = document.getElementById('wb3');
  var darkBg = document.getElementById('whaa-dark-bg');
  if (!wb1 || !wb2 || !wb3) return;

  // Closed parametric orbit strictly contained within #whaa-dark-bg
  var Cx = 471.3333;
  var Cy = 1338.3333;
  var Ax = 5.6667;
  var Ay = -268.3333;
  var Bx = -349.30;
  var By = -25.98;

  var base1 = { x: 477, y: 1070 };
  var base2 = { x: 166, y: 1450 };
  var base3 = { x: 771, y: 1495 };

  function getOrbitPoint(theta) {
    return {
      x: Cx + Ax * Math.cos(theta) + Bx * Math.sin(theta),
      y: Cy + Ay * Math.cos(theta) + By * Math.sin(theta)
    };
  }

  var TWO_PI_3 = (2 * Math.PI) / 3;

  function renderAngle(theta) {
    var pos1 = getOrbitPoint(theta);
    var pos2 = getOrbitPoint(theta + TWO_PI_3);
    var pos3 = getOrbitPoint(theta + 2 * TWO_PI_3);

    var dx1 = (pos1.x - base1.x).toFixed(2);
    var dy1 = (pos1.y - base1.y).toFixed(2);
    var dx2 = (pos2.x - base2.x).toFixed(2);
    var dy2 = (pos2.y - base2.y).toFixed(2);
    var dx3 = (pos3.x - base3.x).toFixed(2);
    var dy3 = (pos3.y - base3.y).toFixed(2);

    wb1.style.transform = 'translate3d(' + dx1 + 'px, ' + dy1 + 'px, 0)';
    wb2.style.transform = 'translate3d(' + dx2 + 'px, ' + dy2 + 'px, 0)';
    wb3.style.transform = 'translate3d(' + dx3 + 'px, ' + dy3 + 'px, 0)';

    renderText(theta);
  }

  var textSlides = null;
  function getTextSlides() {
    if (!textSlides) {
      var s0 = document.getElementById('whaa-slide-0');
      var s1 = document.getElementById('whaa-slide-1');
      var s2 = document.getElementById('whaa-slide-2');
      if (s0 && s1 && s2) {
        textSlides = [s0, s1, s2];
      }
    }
    return textSlides;
  }

  // Crossfade text smoothly in direct synchronization with image positions
  function renderText(theta) {
    var slides = getTextSlides();
    if (!slides) return;

    var uStep = theta / TWO_PI_3;
    var k = Math.floor(uStep);
    var r = uStep - k; // Progress within the current 120-degree step in [0, 1)

    var currIdx = ((k % 3) + 3) % 3;
    var nextIdx = (((k + 1) % 3) + 3) % 3;
    var otherIdx = (((k + 2) % 3) + 3) % 3;

    var currOpacity = 1;
    var currY = 0;
    var nextOpacity = 0;
    var nextY = 8;

    if (r < 0.5) {
      // Smoothly fade out current text as image leaves
      var t = r / 0.5;
      var easeOut = 3 * t * t - 2 * t * t * t;
      currOpacity = Math.max(0, 1 - easeOut);
      currY = -8 * easeOut;
      nextOpacity = 0;
      nextY = 8;
    } else {
      // Smoothly fade in incoming text as new image arrives
      var t = (r - 0.5) / 0.5;
      var easeIn = 3 * t * t - 2 * t * t * t;
      currOpacity = 0;
      currY = -8;
      nextOpacity = Math.min(1, easeIn);
      nextY = 8 * (1 - easeIn);
    }

    slides[currIdx].style.opacity = currOpacity.toFixed(3);
    slides[currIdx].style.transform = 'translate3d(0, ' + currY.toFixed(2) + 'px, 0)';

    slides[nextIdx].style.opacity = nextOpacity.toFixed(3);
    slides[nextIdx].style.transform = 'translate3d(0, ' + nextY.toFixed(2) + 'px, 0)';

    slides[otherIdx].style.opacity = '0';
    slides[otherIdx].style.transform = 'translate3d(0, 8px, 0)';
  }

  // Step-wise scroll rhythm: stops for a brief moment at each position, then glides smoothly
  function computeTargetAngle(u) {
    // u represents progress in units of 120-degree interchanges (2*PI/3)
    var k = Math.floor(u);
    var r = u - k; // Progress within the current step in [0, 1)
    var pauseRatio = 0.25; // Brief rest dwell (~50px of scroll) at each anchor position
    var eased;
    if (r < pauseRatio) {
      eased = 0;
    } else {
      var t = (r - pauseRatio) / (1 - pauseRatio);
      // Smoothstep easing (zero velocity at departure t=0 and arrival t=1)
      eased = 3 * t * t - 2 * t * t * t;
    }
    return (k + eased) * TWO_PI_3;
  }

  var targetAngle = 0;
  var currentAngle = 0;
  var isTicking = false;

  function onScroll() {
    var clientWidth = document.documentElement.clientWidth || window.innerWidth;
    var scale = clientWidth / 1280;

    // Trigger precisely as the user arrives at the first image (centered in viewport)
    var triggerStart = Math.max(0, 1070 * scale - window.innerHeight * 0.52);
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var delta = Math.max(0, scrollY - triggerStart);

    // 200px of scroll per 120-degree interchange (50px brief stop + 150px silky glide)
    var stepDistance = 200 * scale;
    var u = delta / stepDistance;

    targetAngle = computeTargetAngle(u);

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateLoop);
    }
  }

  function updateLoop() {
    var diff = targetAngle - currentAngle;
    // Responsive LERP damping (0.18) settles cleanly into pauses while keeping movement fluid
    currentAngle += diff * 0.18;
    renderAngle(currentAngle);

    if (Math.abs(diff) > 0.0004) {
      requestAnimationFrame(updateLoop);
    } else {
      currentAngle = targetAngle;
      renderAngle(currentAngle);
      isTicking = false;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial render at 0
  renderAngle(0);
  onScroll();
})();

/* ══════════════════════════════════════════════
   Pricing Section — Fast Scroll-Driven Red Sketch Pen Ticks (Top to Bottom)
   ══════════════════════════════════════════════ */
(function () {
  // Ordered strictly from top to bottom (row-by-row across Starter, Growth, Scale)
  var featIds = [
    'feat1-1', // Row 1 (y=3213px): Logo design (Starter)
    'feat1-2', // Row 2 (y=3253px): Brand identity (Starter)
    'feat2-1', // Row 2 (y=3255px): App design & development (Growth)
    'feat3-1', // Row 2 (y=3255px): Paid advertising (Scale)
    'feat1-3', // Row 3 (y=3293px): Landing page (Starter)
    'feat2-2', // Row 3 (y=3295px): Marketing creatives (Growth)
    'feat3-2', // Row 3 (y=3295px): Analytics & reporting (Scale)
    'feat1-4', // Row 4 (y=3333px): Social media kit (Starter)
    'feat2-3', // Row 4 (y=3335px): Content design (Growth)
    'feat3-3', // Row 4 (y=3335px): Ongoing creative support (Scale)
    'feat1-5', // Row 5 (y=3373px): Brand guidelines (Starter)
    'feat2-4', // Row 5 (y=3375px): Campaign assets (Growth)
    'feat3-4'  // Row 5 (y=3375px): Dedicated project support (Scale)
  ];

  var featBoxes = [];

  function ensureTickSvg(box) {
    if (!box.querySelector('.sketch-tick')) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'sketch-tick');
      svg.setAttribute('viewBox', '0 0 38 36');
      svg.setAttribute('fill', 'none');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M4 17C5.5 20 9.5 26.5 13.5 29C17 26.5 26 12 35 3');
      svg.appendChild(path);
      box.appendChild(svg);
    }
  }

  function initBoxes() {
    featBoxes = [];
    featIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        var box = el.querySelector('.feat-box');
        if (box) {
          ensureTickSvg(box);
          featBoxes.push(box);
        }
      }
    });
  }

  function updatePricingTicks() {
    if (featBoxes.length !== featIds.length) {
      initBoxes();
    }
    if (featBoxes.length === 0) return;

    var clientWidth = document.documentElement.clientWidth || window.innerWidth;
    var scale = clientWidth / 1280;
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var winHeight = window.innerHeight || 800;

    // Trigger window: as the user scrolls over the pricing card features
    // Cards start at y=3029px, features at y=3213px to 3375px
    var startY = 3020 * scale - winHeight * 0.58;
    // Measured scroll window so checkboxes trigger progressively at a comfortable, leisurely pace
    var scrollRange = 160 * scale;

    var progress = (scrollY - startY) / scrollRange;

    var numBoxes = featBoxes.length;
    var checkedCount = 0;
    if (progress > 0) {
      checkedCount = Math.min(numBoxes, Math.floor(progress * (numBoxes + 0.4)));
    }

    for (var i = 0; i < numBoxes; i++) {
      var box = featBoxes[i];
      if (!box) continue;

      if (i < checkedCount) {
        if (!box.classList.contains('checked')) {
          box.classList.add('checked');
        }
      } else {
        if (box.classList.contains('checked')) {
          box.classList.remove('checked');
        }
      }
    }
  }

  window.addEventListener('scroll', updatePricingTicks, { passive: true });
  window.addEventListener('resize', updatePricingTicks, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updatePricingTicks);
  } else {
    updatePricingTicks();
  }
})();

