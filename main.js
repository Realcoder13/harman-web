// =============================================
// HARMANJEET SINGH — PORTFOLIO JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAV SCROLL ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // ---- MOBILE MENU ----
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    burger.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  });

  window.closeMobile = function() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    burger.classList.remove('active');
    document.body.style.overflow = '';
  };

  // ---- COUNT-UP ANIMATION ----
  function animateCount(el, target, duration = 1800) {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  // ---- REVEAL ON SCROLL ----
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // Hero reveals + count-up — trigger after short delay on load
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => {
      el.classList.add('visible');
    });

    // Trigger count-up for hero stats immediately
    const countEls = document.querySelectorAll('.stat__num[data-count]');
    countEls.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'));
      el.removeAttribute('data-count');
      animateCount(el, target);
    });
  }, 400);

  // ---- SMOOTH ACTIVE NAV ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', isActive);
        });
      }
    });
  }, { rootMargin: '-35% 0px -35% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

});
