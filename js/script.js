/**
 * script.js — Shared utilities & page-specific logic
 */

(function () {
  /* ─── Particle Grid Background ─── */
  function initParticleGrid() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); createParticles(); });

    let particles = [];
    const PARTICLE_COUNT = window.matchMedia('(max-width: 768px)').matches ? 25 : 60;

    function createParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    }
    createParticles();

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,255,101,${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,101,${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* ─── Glitch Trigger on Hover ─── */
  function initGlitch() {
    document.querySelectorAll('[data-glitch]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.classList.add('glitch');
        setTimeout(() => el.classList.remove('glitch'), 600);
      });
    });
  }

  /* ─── Smooth anchor for same-page links ─── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ─── Copy email on click ─── */
  function initCopyEmail() {
    document.querySelectorAll('[data-copy-email]').forEach(el => {
      el.addEventListener('click', () => {
        const email = el.dataset.copyEmail;
        navigator.clipboard.writeText(email).then(() => {
          const orig = el.textContent;
          el.textContent = 'COPIED!';
          setTimeout(() => { el.textContent = orig; }, 1500);
        });
      });
    });
  }

  /* ─── Hexadecimal clock (decorative) ─── */
  function initHexClock() {
    const el = document.getElementById('hex-clock');
    if (!el) return;
    setInterval(() => {
      const now = Date.now();
      el.textContent = '0x' + now.toString(16).toUpperCase();
    }, 100);
  }

  /* ─── Init ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initParticleGrid();
    initGlitch();
    initSmoothScroll();
    initCopyEmail();
    initHexClock();
  });
})();
