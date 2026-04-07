/**
 * animations.js — Scroll reveals, progress bars, typing effect, cursor
 */

(function () {
  /* ─── Custom Cursor (desktop/mouse only) ─── */
  function initCursor() {
    // Skip custom cursor on touch / pointer:coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .card, .gallery-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
        follower.style.transform = 'translate(-50%,-50%) scale(0.4)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    });
  }

  /* ─── Scroll Progress ─── */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    let ticking = false;

    function updateBar() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrollTop / total) * 100 : 0;
      bar.style.width = pct + '%';
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateBar);
        ticking = true;
      }
    }, { passive: true });

    // Also update on resize (content height may change)
    window.addEventListener('resize', updateBar, { passive: true });
  }

  /* ─── Reveal on Scroll ─── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => observer.observe(el));
  }

  /* ─── Progress Bars ─── */
  function initProgressBars() {
    const bars = document.querySelectorAll('.progress-bar-fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const target = bar.dataset.width || '75%';
          setTimeout(() => { bar.style.width = target; }, 200);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
  }

  /* ─── Typing Effect ─── */
  function initTyping() {
    const el = document.querySelector('.typing-text');
    if (!el) return;

    const words = el.dataset.words
      ? JSON.parse(el.dataset.words)
      : ['Cybersecurity', 'Ethical Hacking', 'Python Programming', 'Network Security', 'Penetration Testing', 'Digital Forensics'];

    let wi = 0, ci = 0, deleting = false;

    function type() {
      const word = words[wi];
      if (deleting) {
        el.textContent = word.slice(0, --ci);
      } else {
        el.textContent = word.slice(0, ++ci);
      }

      let delay = deleting ? 60 : 110;

      if (!deleting && ci === word.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        delay = 400;
      }

      setTimeout(type, delay);
    }
    type();
  }

  /* ─── Nav Active State ─── */
  function initNavActive() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ─── Mobile Nav Toggle ─── */
  function initNavToggle() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');
    if (!toggle || !links) return;

    function closeMenu() {
      links.classList.remove('open');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      links.classList.toggle('open');
      const spans = toggle.querySelectorAll('span');
      if (links.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        closeMenu();
      }
    });

    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && nav && !nav.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ─── Stat Counter Animate ─── */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 40);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  /* ─── Lightbox ─── */
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
      item.addEventListener('click', () => {
        lbImg.src = item.dataset.src;
        lightbox.classList.add('active');
      });
    });

    lbClose && lbClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') lightbox.classList.remove('active');
    });
  }

  /* ─── Form Submit Handler ─── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const btn = form.querySelector('button[type=submit]');
      if (btn) { btn.textContent = 'TRANSMITTING...'; btn.disabled = true; }

      // Simulate send (replace with actual backend/EmailJS/Formspree)
      setTimeout(() => {
        if (status) {
          status.textContent = '> MESSAGE SENT SUCCESSFULLY. AWAITING RESPONSE.';
          status.className = 'form-status success';
        }
        if (btn) { btn.textContent = 'SEND MESSAGE'; btn.disabled = false; }
        form.reset();
      }, 1500);
    });
  }

  /* ─── Init All ─── */
  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollProgress();
    initReveal();
    initProgressBars();
    initTyping();
    initNavActive();
    initNavToggle();
    initCounters();
    initLightbox();
    initContactForm();
  });
})();
