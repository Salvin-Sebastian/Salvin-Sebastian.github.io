/**
 * loading.js — Cyber loading screen & matrix rain canvas
 */

(function () {
  /* ─── Matrix Rain ─── */
  function initMatrixRain() {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;

    // Disable matrix rain on mobile to save CPU and battery
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン!@#$%^&*()_+-=[]{}|<>?/\\~`';
    const fontSize = 14;
    let cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -100);

    function draw() {
      ctx.fillStyle = 'rgba(2, 12, 6, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px "Share Tech Mono", monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const brightness = Math.random();
        if (brightness > 0.97) {
          ctx.fillStyle = '#ffffff';
        } else if (brightness > 0.8) {
          ctx.fillStyle = '#00ff65';
        } else {
          ctx.fillStyle = 'rgba(0, 255, 101, 0.4)';
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
    }

    let lastTime = 0;
    function animateDraw(timestamp) {
      if (timestamp - lastTime >= 50) {
        lastTime = timestamp;
        draw();
      }
      requestAnimationFrame(animateDraw);
    }
    requestAnimationFrame(animateDraw);

    window.addEventListener('resize', () => {
      resize();
      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(0);
    });
  }

  /* ─── Loading Screen ─── */
  function initLoadingScreen() {
    const screen = document.getElementById('loading-screen');
    if (!screen) return;

    const bar = screen.querySelector('.loading-bar');
    const loadText = screen.querySelector('.loading-text');

    const messages = [
      'INITIALIZING SYSTEM...',
      'LOADING SECURITY PROTOCOLS...',
      'ESTABLISHING SECURE CONNECTION...',
      'DECRYPTING ASSETS...',
      'ACCESS GRANTED',
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < messages.length) {
        if (loadText) loadText.textContent = messages[step];
        if (bar) bar.style.width = ((step + 1) / messages.length) * 100 + '%';
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          screen.classList.add('hide');
          document.body.style.overflow = '';
          // trigger hero animations
          const heroContent = document.querySelector('.hero-content');
          if (heroContent) heroContent.classList.add('revealed');
        }, 400);
      }
    }, 380);
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', () => {
    const hasLoadingScreen = !!document.getElementById('loading-screen');
    if (hasLoadingScreen) {
      document.body.style.overflow = 'hidden';
      initLoadingScreen();
    }
    initMatrixRain();
  });
})();
