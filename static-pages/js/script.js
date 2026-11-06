// Static Pages Interactive Script
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });
  }

  // 2. Header shadow on scroll
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }

  // 3. Directions Modal Setup (Contact Page)
  const openModalButtons = document.querySelectorAll('.open-directions-modal');
  const closeModalButtons = document.querySelectorAll('.close-directions-modal');
  const modalOverlay = document.getElementById('directions-modal');

  if (modalOverlay) {
    openModalButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalOverlay.classList.add('open');
      });
    });

    closeModalButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modalOverlay.classList.remove('open');
      });
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        modalOverlay.classList.remove('open');
      }
    });
  }

  // 4. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.15,
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 5. 3D Perspective Tilt with Form Input Focus Lock
  const tiltElements = document.querySelectorAll('[data-tilt]');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice) {
    tiltElements.forEach(card => {
      const maxTilt = parseFloat(card.getAttribute('data-max-tilt') || '6');
      let isFocused = false;

      // Lock flat if a form element inside is focused
      card.addEventListener('focusin', () => {
        isFocused = true;
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });

      card.addEventListener('focusout', (e) => {
        if (!card.contains(e.relatedTarget)) {
          isFocused = false;
        }
      });

      card.addEventListener('mouseenter', () => {
        if (isFocused) return;
        card.classList.add('is-hovered');
      });

      card.addEventListener('mousemove', (e) => {
        if (isFocused) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const tiltX = (0.5 - y) * maxTilt * 2;
        const tiltY = (x - 0.5) * maxTilt * 2;

        card.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-hovered');
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    });
  }
});
