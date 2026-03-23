'use strict';

/** ============================================
 *  SHIDHARTH JAYAKANNAN — PORTFOLIO JS ENGINE
 *  Particles, Typing, Scroll Reveals, Interactions
 *  ============================================ */

// ---------- UTILITY FUNCTIONS ----------
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ---------- SET YEAR IN FOOTER ----------
(function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// ---------- PARTICLE BACKGROUND ----------
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;
  let animationId;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  
  const onResize = debounce(resize, 250);
  window.addEventListener('resize', onResize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${this.opacity})`;
      ctx.fill();
    }
  }

  const count = Math.min(80, Math.floor(w * h / 15000));
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    animationId = requestAnimationFrame(animate);
  }
  animate();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => cancelAnimationFrame(animationId));
})();


// ---------- CUSTOM CURSOR ----------
(function initCursor() {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  let mx = 0, my = 0, ox = 0, oy = 0;
  let rafId;

  const onMouseMove = throttle(e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = (mx - 3) + 'px';
    dot.style.top = (my - 3) + 'px';
  }, 10);

  document.addEventListener('mousemove', onMouseMove);

  function animateOutline() {
    ox += (mx - ox) * 0.12;
    oy += (my - oy) * 0.12;
    outline.style.left = ox + 'px';
    outline.style.top = oy + 'px';
    rafId = requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Scale on interactive elements
  document.querySelectorAll('a, button, .btn, .project-card, .skill-chip, .social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
      outline.style.transform = 'translate(-50%,-50%) scale(1.8)';
      outline.style.borderColor = 'rgba(0,212,255,.7)';
    });
    el.addEventListener('mouseleave', () => {
      outline.style.transform = 'translate(-50%,-50%) scale(1)';
      outline.style.borderColor = 'rgba(0,212,255,.4)';
    });
  });

  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
})();


// ---------- TYPING EFFECT ----------
(function initTyping() {
  const el = document.getElementById('typed-role');
  if (!el) return;
  const roles = [
    'Senior Software Engineer (SDE-II)',
    'Backend Architect',
    'API Engineering Specialist',
    'Microservices Developer',
    'Cloud-Native Builder'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;
  let typeTimeout;

  function type() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        typeTimeout = setTimeout(() => { deleting = true; type(); }, 2000);
        return;
      }
      typeTimeout = setTimeout(type, 60);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeTimeout = setTimeout(type, 400);
        return;
      }
      typeTimeout = setTimeout(type, 30);
    }
  }
  
  typeTimeout = setTimeout(type, 800);

  window.addEventListener('beforeunload', () => clearTimeout(typeTimeout));
})();


// ---------- SCROLL REVEALS ----------
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-right');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }, idx * 80);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();


// ---------- COUNTER ANIMATION ----------
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        let current = 0;
        const step = target / 40;
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = Math.floor(current);
        }, 40);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


// ---------- NAVBAR ----------
(function initNavbar() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('[data-nav]');

  if (!nav) return;

  // Scroll effect
  const onScroll = throttle(() => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, 50);

  window.addEventListener('scroll', onScroll);

  // Mobile toggle with proper ARIA
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.toggle('active');
      menu.classList.toggle('active', isActive);
      toggle.setAttribute('aria-expanded', isActive);
    });
  }

  // Active link & close mobile menu on click
  links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (menu) menu.classList.remove('active');
      if (toggle) {
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', false);
      }
    });
  });

  // Active on scroll
  const sections = document.querySelectorAll('section[id]');
  const onScrollActive = throttle(() => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      }
    });
  }, 50);

  window.addEventListener('scroll', onScrollActive);
})();


// ---------- SKILL CHIP ANIMATION ----------
(function initSkillAnimate() {
  const chips = document.querySelectorAll('.skill-chip');
  if (!chips.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const level = el.dataset.level || 80;
        el.style.setProperty('--level', level);
        setTimeout(() => el.classList.add('animate'), 100);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  chips.forEach(c => observer.observe(c));
})();


// ---------- PROJECT EXPAND ----------
(function initProjectExpand() {
  document.querySelectorAll('.project-expand').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      if (details) {
        const isOpen = btn.classList.toggle('open');
        details.classList.toggle('open', isOpen);
        details.setAttribute('aria-hidden', !isOpen);
        btn.setAttribute('aria-expanded', isOpen);
      }
    });
  });
})();


// ---------- SMOOTH SCROLL FOR ANCHORS ----------
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const href = a.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


// ---------- CONTACT FORM VALIDATION & SUBMISSION ----------
(function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = form.querySelector('button[type="submit"]');
  const formMessage = document.getElementById('form-message');

  // Real-time validation
  const validateField = (field) => {
    const error = field.nextElementSibling?.nextElementSibling;
    if (!error) return true;

    if (!field.validity.valid) {
      if (field.validity.valueMissing) {
        error.textContent = `${field.previousElementSibling.textContent.replace(':','')} is required`;
      } else if (field.validity.typeMismatch) {
        error.textContent = 'Please enter a valid email address';
      } else if (field.validity.tooShort) {
        error.textContent = `Minimum ${field.minLength} characters required`;
      }
      return false;
    }
    error.textContent = '';
    return true;
  };

  if (nameInput) nameInput.addEventListener('blur', () => validateField(nameInput));
  if (emailInput) emailInput.addEventListener('blur', () => validateField(emailInput));
  if (messageInput) messageInput.addEventListener('blur', () => validateField(messageInput));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      showFormMessage('Please fix the errors above', 'error');
      return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.setAttribute('disabled', 'disabled');

    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success message
      showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      
      // Clear any validation errors
      form.querySelectorAll('.form-error').forEach(err => err.textContent = '');
    } catch (error) {
      showFormMessage('Failed to send message. Please try again.', 'error');
      console.error('Form error:', error);
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.removeAttribute('disabled');
    }
  });

  function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);
    formMessage.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      formMessage.setAttribute('aria-hidden', 'true');
    }, 5000);
  }
})();