/**
 * Vivek Kumar Verma Portfolio — High Performance Scroll-Driven Animation & Interactions
 * - 239 Frames @ 1080p
 * - Progressive multi-stage preloader
 * - HiDPI / Retina Crispness with object-fit: cover
 * - Liquid-smooth LERP (Linear Interpolation) momentum scrubbing
 * - Dynamic Hero 3D Parallax & Active Navigation Tracking
 * - Interactive Footer (IST Clock & 1-Click Email Copy)
 */

(function () {
  'use strict';

  // --- Configuration ---
  const TOTAL_FRAMES = 239;
  const LERP_FACTOR = 0.085; // Buttery momentum factor
  const CONCURRENCY_LIMIT = 2; // Number of parallel image fetches
  const FRAME_URL = (index) => `frames/frame_${String(index + 1).padStart(4, '0')}.jpg`;

  // --- DOM Elements ---
  const canvas = document.getElementById('frame-canvas');
  const ctx = canvas.getContext('2d', { alpha: false }); // alpha false for max GPU performance
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const heroName = document.getElementById('hero-name');
  const heroGrid = document.getElementById('hero-grid');
  const navLinks = document.querySelectorAll('.nav-link');
  const footerLiveTime = document.getElementById('footer-live-time');
  const emailCopyPill = document.getElementById('email-copy-pill');
  const copyBadge = document.getElementById('copy-badge');

  // --- State ---
  const frames = new Array(TOTAL_FRAMES).fill(null);
  let loadedCount = 0;
  let targetProgress = 0;
  let currentProgress = 0;
  let renderedFrameIndex = -1;
  let isLoaderHidden = false;
  let needsResize = true;

  // --- 1. HiDPI Canvas Sizing & Cover Math ---
  function updateCanvasDimensions() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const requiredWidth = Math.round(displayWidth * dpr);
    const requiredHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== requiredWidth || canvas.height !== requiredHeight) {
      canvas.width = requiredWidth;
      canvas.height = requiredHeight;
      needsResize = true;
    }
  }

  function renderFrame(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    updateCanvasDimensions();

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // "object-fit: cover" calculation
    const scale = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const drawX = (canvas.width - drawWidth) / 2;
    const drawY = (canvas.height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    needsResize = false;
  }

  // --- 2. Fallback Mechanism (Bidirectional Search) ---
  function getNearestLoadedFrame(targetIndex) {
    if (frames[targetIndex] && frames[targetIndex].complete && frames[targetIndex].naturalWidth > 0) {
      return { img: frames[targetIndex], index: targetIndex };
    }

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && frames[prev] && frames[prev].complete && frames[prev].naturalWidth > 0) {
        return { img: frames[prev], index: prev };
      }
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && frames[next] && frames[next].complete && frames[next].naturalWidth > 0) {
        return { img: frames[next], index: next };
      }
    }

    return null;
  }

  // --- 3. Progressive Preloader with Priority Ordering ---
  function preloadImage(index) {
    return new Promise((resolve) => {
      if (frames[index]) {
        resolve(frames[index]);
        return;
      }

      const img = new Image();
      img.decoding = 'async';

      img.onload = () => {
        frames[index] = img;
        loadedCount++;
        onProgressUpdate();

        // Render first frame immediately
        if (index === 0 && renderedFrameIndex === -1) {
          renderFrame(img);
          renderedFrameIndex = 0;
        }

        resolve(img);
      };

      img.onerror = () => {
        setTimeout(() => {
          img.src = FRAME_URL(index);
        }, 500);
        resolve(null);
      };

      img.src = FRAME_URL(index);
    });
  }

  function onProgressUpdate() {
    const percent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

    if (loaderBar) loaderBar.style.width = `${percent}%`;
    if (loaderPercent) loaderPercent.textContent = `${percent}%`;

    // Once the first 25 frames or 100% are loaded, fade out preloader smoothly
    if (!isLoaderHidden && (loadedCount >= 25 || percent >= 100)) {
      isLoaderHidden = true;
      if (loader) {
        loader.classList.add('is-hidden');
      }
    }
  }

  async function startProgressivePreload() {
    // Stage 1: Load Frame 0 immediately with highest priority
    await preloadImage(0);

    // Stage 2: Create priority queue
    // 1) Keyframes every 4th frame (rapid scrub coverage)
    // 2) Remaining in-between frames
    const keyframes = [];
    const remainingFrames = [];

    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (i % 4 === 0) {
        keyframes.push(i);
      } else {
        remainingFrames.push(i);
      }
    }

    const queue = [...keyframes, ...remainingFrames];

    let currentIndex = 0;
    async function worker() {
      while (currentIndex < queue.length) {
        const frameToLoad = queue[currentIndex++];
        await preloadImage(frameToLoad);
      }
    }

    const workers = [];
    for (let i = 0; i < CONCURRENCY_LIMIT; i++) {
      workers.push(worker());
    }
    await Promise.all(workers);
  }

  // --- 4. Scroll Tracking, Parallax & LERP Loop ---
  function calculateScrollProgress() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    return Math.min(1, Math.max(0, scrollY / maxScroll));
  }

  function updateHeroParallax(scrollY) {
    if (heroName) {
      const translateY = -scrollY * 0.28;
      const opacity = Math.max(0, 1 - scrollY / 480);
      heroName.style.transform = `translate3d(0, ${translateY}px, 0)`;
      heroName.style.opacity = opacity.toFixed(3);
    }
    if (heroGrid) {
      const translateY = -scrollY * 0.16;
      const opacity = Math.max(0, 1 - scrollY / 620);
      heroGrid.style.transform = `translate3d(0, ${translateY}px, 0)`;
      heroGrid.style.opacity = opacity.toFixed(3);
    }
  }

  function updateActiveNav() {
    const sections = ['about', 'projects', 'skills', 'experience', 'education', 'testimonials', 'contact'];
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    let currentSection = 'about';
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop - 260;
        if (scrollY >= top) {
          currentSection = id;
        }
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function onScroll() {
    targetProgress = calculateScrollProgress();
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    updateHeroParallax(scrollY);
    updateActiveNav();
  }

  function animationLoop() {
    // Interpolate current progress towards target
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.0001) {
      currentProgress += diff * LERP_FACTOR;
    } else {
      currentProgress = targetProgress;
    }

    // Map progress (0 -> 1) to frame index (0 -> 238)
    const targetFrameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
    );

    if (targetFrameIndex !== renderedFrameIndex || needsResize) {
      const frameMatch = getNearestLoadedFrame(targetFrameIndex);
      if (frameMatch) {
        renderFrame(frameMatch.img);
        renderedFrameIndex = targetFrameIndex;
      }
    }

    requestAnimationFrame(animationLoop);
  }

  // --- 5. Resize Handling ---
  function onResize() {
    needsResize = true;
    updateCanvasDimensions();
    const frameMatch = getNearestLoadedFrame(renderedFrameIndex >= 0 ? renderedFrameIndex : 0);
    if (frameMatch) {
      renderFrame(frameMatch.img);
    }
    onScroll();
  }

  // --- 6. Live Clock & Interactive Email Copy ---
  function initLiveTime() {
    if (!footerLiveTime) return;

    function updateTime() {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat('en-IN', options);
      footerLiveTime.textContent = `${formatter.format(new Date())} IST`;
    }

    updateTime();
    setInterval(updateTime, 1000);
  }

  function initEmailCopy() {
    if (!emailCopyPill || !copyBadge) return;

    emailCopyPill.addEventListener('click', (e) => {
      const email = 'viivek008@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          copyBadge.textContent = 'Copied!';
          copyBadge.style.background = '#22c55e';
          copyBadge.style.color = '#ffffff';

          setTimeout(() => {
            copyBadge.textContent = 'Copy';
            copyBadge.style.background = '';
            copyBadge.style.color = '';
          }, 2000);
        });
      }
    });
  }

  // --- 7. Initialization ---
  function init() {
    updateCanvasDimensions();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    onScroll();
    currentProgress = targetProgress;

    requestAnimationFrame(animationLoop);
    startProgressivePreload();
    initLiveTime();
    initEmailCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
