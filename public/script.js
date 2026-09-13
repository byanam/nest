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
   "Whaaaa......" Scroll-Driven Dynamic Dots & Slow Blink
   - Dots start at 1 and increase sequentially to 6 as user scrolls into the section
   - Once finalized at 6 dots, the 6th dot blinks slowly
   ══════════════════════════════════════════════ */
(function () {
  var whaaTitle = document.getElementById('whaa-title');
  if (!whaaTitle) return;

  var whaaDots = whaaTitle.querySelectorAll('.whaa-dot');
  if (!whaaDots.length) return;

  var lastDotIndex = whaaDots.length - 1;

  function updateDots() {
    var rect = whaaTitle.getBoundingClientRect();
    var windowH = window.innerHeight || document.documentElement.clientHeight || 800;

    // Start with 0 dots while above threshold, then sequentially reveal 1 to 6 dots
    var startThreshold = windowH * 0.82;
    var endThreshold = windowH * 0.35;
    var travel = startThreshold - endThreshold;
    var progress = (startThreshold - rect.top) / travel;

    var count = 0;
    if (progress > 0) {
      count = Math.min(6, Math.floor(progress * 6) + 1);
    }

    for (var i = 0; i < whaaDots.length; i++) {
      if (i < count) {
        whaaDots[i].classList.add('active');
      } else {
        whaaDots[i].classList.remove('active');
      }
    }

    // When finalized after increasing (all 6 dots visible), the last dot blinks slowly
    if (count === whaaDots.length) {
      whaaDots[lastDotIndex].classList.add('blinking');
    } else {
      whaaDots[lastDotIndex].classList.remove('blinking');
    }
  }

  window.addEventListener('scroll', updateDots, { passive: true });
  window.addEventListener('resize', updateDots, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateDots);
  } else {
    updateDots();
  }
})();

/* ══════════════════════════════════════════════
   Pricing Section — Automatic Cascade of Red Sketch Pen Ticks (Top to Bottom)
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
  var isPlaying = false;
  var hasPlayed = false;
  var playTimer = null;

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

  function startAutomaticTicking() {
    if (featBoxes.length !== featIds.length) {
      initBoxes();
    }
    if (featBoxes.length === 0 || isPlaying || hasPlayed) return;

    isPlaying = true;
    hasPlayed = true;

    var index = 0;
    var intervalMs = 130; // Triggers each box in sequence at a natural, paced rate

    function tickNext() {
      if (index < featBoxes.length) {
        var box = featBoxes[index];
        if (box && !box.classList.contains('checked')) {
          box.classList.add('checked');
        }
        index++;
        playTimer = setTimeout(tickNext, intervalMs);
      } else {
        isPlaying = false;
        playTimer = null;
      }
    }

    tickNext();
  }

  function resetTicking() {
    if (playTimer) {
      clearTimeout(playTimer);
      playTimer = null;
    }
    isPlaying = false;
    hasPlayed = false;
    for (var i = 0; i < featBoxes.length; i++) {
      if (featBoxes[i]) {
        featBoxes[i].classList.remove('checked');
      }
    }
  }

  function checkPricingVisibility() {
    if (featBoxes.length !== featIds.length) {
      initBoxes();
    }
    if (featBoxes.length === 0) return;

    var clientWidth = document.documentElement.clientWidth || window.innerWidth;
    var scale = clientWidth / 1280;
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var winHeight = window.innerHeight || 800;

    // Trigger when user gets to the pricing page
    var triggerY = 3020 * scale - winHeight * 0.70;
    // Reset if user scrolls back up far above pricing
    var resetY = 3020 * scale - winHeight * 0.95;

    if (scrollY >= triggerY) {
      if (!hasPlayed && !isPlaying) {
        startAutomaticTicking();
      }
    } else if (scrollY < resetY) {
      if (hasPlayed || isPlaying) {
        resetTicking();
      }
    }
  }

  window.addEventListener('scroll', checkPricingVisibility, { passive: true });
  window.addEventListener('resize', checkPricingVisibility, { passive: true });

  // Also setup IntersectionObserver for instantaneous detection when pricing section enters viewport
  function setupObserver() {
    initBoxes();
    if ('IntersectionObserver' in window) {
      var target = document.getElementById('pcb1') || document.getElementById('feat1-1') || document.getElementById('pt1');
      if (target) {
        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              if (!hasPlayed && !isPlaying) {
                startAutomaticTicking();
              }
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -15% 0px' });
        observer.observe(target);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setupObserver();
      checkPricingVisibility();
    });
  } else {
    setupObserver();
    checkPricingVisibility();
  }
})();

/* ══════════════════════════════════════════════
   Hero Social Proof — Squarespace-Style Spring-Driven Rolling Counter
   - Exactly matches Squarespace counter algorithm (stiffness: 100, damping: 30)
   - Digits rotate on vertical drum reels with seamless circular wrapping
   - Staggered entrance timing (0.15s, 0.35s, 0.55s) with interactive hover re-spin
   ══════════════════════════════════════════════ */
(function () {
  var counters = document.querySelectorAll('.stats__counter');
  if (!counters.length) return;

  var DIGIT_HEIGHT = 64;
  var STIFFNESS = 100;
  var DAMPING = 30;

  function getDigitOffset(digitChar, currentVal, h) {
    var a = parseInt(digitChar, 10);
    var t = ((currentVal % 10) + 10) % 10;
    var s = (10 + a - t) % 10;
    var i = s * h;
    if (s > 5) i -= 10 * h;
    return i;
  }

  function setupCounter(counter) {
    var targetVal = parseInt(counter.getAttribute('data-value'), 10) || 0;
    var suffix = counter.getAttribute('data-suffix') || '';

    // Determine places (e.g. 100 -> [100, 10, 1], 9 -> [1], 20 -> [10, 1])
    var places = [];
    if (targetVal >= 100) {
      places = [100, 10, 1];
    } else if (targetVal >= 10) {
      places = [10, 1];
    } else {
      places = [1];
    }

    // Build drum reels
    counter.innerHTML = '';
    var reels = [];

    places.forEach(function (place) {
      var digitSpan = document.createElement('span');
      digitSpan.className = 'stats__digit';
      digitSpan.setAttribute('data-place', place);

      // Dummy sizer to reserve character width
      var sizer = document.createElement('span');
      sizer.className = 'stats__sizer';
      sizer.setAttribute('aria-hidden', 'true');
      sizer.textContent = '0';
      digitSpan.appendChild(sizer);

      var numSpans = [];
      for (var a = 0; a <= 9; a++) {
        var numSpan = document.createElement('span');
        numSpan.className = 'stats__number';
        numSpan.setAttribute('data-digit', a);
        numSpan.setAttribute('aria-hidden', 'true');
        numSpan.textContent = a;
        digitSpan.appendChild(numSpan);
        numSpans.push(numSpan);
      }

      counter.appendChild(digitSpan);
      reels.push({
        place: place,
        numSpans: numSpans,
        spring: { pos: 0, vel: 0 },
        finalN: targetVal / place
      });
    });

    if (suffix) {
      var sufSpan = document.createElement('span');
      sufSpan.className = 'stats__suffix';
      sufSpan.textContent = suffix;
      counter.appendChild(sufSpan);
    }

    // Set initial positions at 0
    reels.forEach(function (reel) {
      reel.numSpans.forEach(function (span, a) {
        var offset = getDigitOffset(a, 0, DIGIT_HEIGHT);
        span.style.transform = (offset === 0) ? 'none' : 'translate3d(0,' + offset + 'px,0)';
      });
    });

    var isAnimating = false;
    var animFrame = null;

    function playAnimation() {
      if (isAnimating) cancelAnimationFrame(animFrame);
      isAnimating = true;

      // Reset spring states to 0 so it rolls from start
      reels.forEach(function (reel) {
        reel.spring.pos = 0;
        reel.spring.vel = 0;
      });

      var startTime = performance.now();
      var lastTime = startTime;
      var countDuration = 550; // ms to count up q to target value

      function frame(now) {
        var dt = Math.min(0.033, (now - lastTime) / 1000);
        lastTime = now;
        if (dt <= 0) dt = 0.016;

        var elapsed = now - startTime;
        var q = Math.min(targetVal, (elapsed / countDuration) * targetVal);

        var allSettled = elapsed >= countDuration;

        reels.forEach(function (reel) {
          var targetN = q / reel.place;
          var diff = reel.spring.pos - targetN;
          var force = -STIFFNESS * diff - DAMPING * reel.spring.vel;
          reel.spring.vel += force * dt;
          reel.spring.pos += reel.spring.vel * dt;

          if (Math.abs(reel.spring.pos - reel.finalN) > 0.003 || Math.abs(reel.spring.vel) > 0.005) {
            allSettled = false;
          }

          var currentPos = reel.spring.pos;
          reel.numSpans.forEach(function (span, a) {
            var offset = getDigitOffset(a, currentPos, DIGIT_HEIGHT);
            span.style.transform = (Math.abs(offset) < 0.05) ? 'none' : 'translate3d(0,' + offset.toFixed(2) + 'px,0)';
          });
        });

        if (!allSettled) {
          animFrame = requestAnimationFrame(frame);
        } else {
          // Snap final exact target digits
          reels.forEach(function (reel) {
            reel.spring.pos = reel.finalN;
            reel.spring.vel = 0;
            reel.numSpans.forEach(function (span, a) {
              var offset = getDigitOffset(a, reel.finalN, DIGIT_HEIGHT);
              span.style.transform = (Math.abs(offset) < 0.05) ? 'none' : 'translate3d(0,' + Math.round(offset) + 'px,0)';
            });
          });
          isAnimating = false;
        }
      }

      animFrame = requestAnimationFrame(frame);
    }

    return {
      play: playAnimation,
      element: counter
    };
  }

  var counterControllers = [];
  counters.forEach(function (c) {
    counterControllers.push(setupCounter(c));
  });

  // Staggered launch matching Squarespace timing
  function startAll() {
    counterControllers.forEach(function (ctrl, idx) {
      setTimeout(function () {
        ctrl.play();
      }, 150 + idx * 200);
    });
  }

  // Interactive re-spin on hover over stat cards
  document.querySelectorAll('.stat').forEach(function (statEl, idx) {
    statEl.addEventListener('mouseenter', function () {
      if (counterControllers[idx]) {
        counterControllers[idx].play();
      }
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startAll);
  } else {
    startAll();
  }
})();




