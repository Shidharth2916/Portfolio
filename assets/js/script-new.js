'use strict';

/** ============================================
 *  PREMIUM PORTFOLIO - Apple Style JS
 *  Optimized for performance & smooth interactions
 *  ============================================ */

// Set year in footer
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Utility: Debounce
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

// Utility: Throttle
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

// ---------- NAVBAR ----------
(function initNavbar() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('[data-nav]');

  if (!nav) return;

  // Scroll effect
  const onScroll = throttle(() => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, 50);

  window.addEventListener('scroll', onScroll);

  // Mobile toggle
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.toggle('active');
      menu.classList.toggle('active', isActive);
      toggle.setAttribute('aria-expanded', isActive);
    });
  }

  // Active link
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

  // Update active on scroll
  const sections = document.querySelectorAll('section[id]');
  const onScrollActive = throttle(() => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link && scrollY >= top && scrollY < top + height) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, 50);

  window.addEventListener('scroll', onScrollActive);
})();

// ---------- REVEAL ANIMATIONS ----------
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }, idx * 100);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
})();

// ---------- IMAGE CAROUSEL ----------
(function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  
  if (!track || !slides.length) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayInterval;

  function goToSlide(n) {
    currentSlide = (n + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  // Dot navigation
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(autoplayInterval);
      goToSlide(idx);
      startAutoplay();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
})();

// ---------- PROJECT EXPAND/COLLAPSE ----------
(function initProjectExpand() {
  const expandBtns = document.querySelectorAll('.project-expand');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      if (!details) return;
      const isOpen = details.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
      details.setAttribute('aria-hidden', !isOpen);
    });
  });
})();

// ---------- SCROLL ANIMATIONS (REVEAL) ----------
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  // Quick return if none found
  if (!reveals.length) return;
  
  const revealOptions = {
    threshold: 0.1, // Trigger when 10% visible (faster)
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before crossing the threshold
  };
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed for better performance
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);
  
  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });
})();

// ---------- CONTACT FORM ----------
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
    const label = field.nextElementSibling;
    const error = label ? label.nextElementSibling : null;
    if (!error || !error.classList.contains('form-error')) return true;

    if (!field.validity.valid) {
      const fieldName = label ? label.textContent.replace(':','').trim() : 'Field';
      if (field.validity.valueMissing) {
        error.textContent = `${fieldName} is required`;
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

    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      showFormMessage('Please fix the errors above', 'error');
      return;
    }

    submitBtn.classList.add('loading');
    submitBtn.setAttribute('disabled', 'disabled');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
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

// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const href = a.getAttribute('href');
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior:'smooth' });
  });
});

// Performance: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
    imageObserver.observe(img);
  });
}

console.log('%cPremium Portfolio Loaded - Apple Style', 'color: #0066ff; font-size: 16px; font-weight: bold;');
