// ==========================================================================
// Jamun Labz — shared interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Subtle parallax on hero graphic ---------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.06;
        el.style.transform = `translateY(${y * speed}px)`;
      });
    }, { passive: true });
  }




  /*Real Contact form with web3forms services */
  /* ---------- Contact form (real submission via Web3Forms) ---------- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const status = document.querySelector('.form-status[data-contact-status]');
      const errorBox = document.querySelector('[data-contact-error]');
      if (errorBox) errorBox.classList.remove('is-visible');

      const name = contactForm.name.value.trim();
      const service = contactForm.service.value;
      contactForm.querySelector('input[name="subject"]')?.remove();
      const subjectInput = document.createElement('input');
      subjectInput.type = 'hidden';
      subjectInput.name = 'subject';
      subjectInput.value = `${name} - ${service}`;
      contactForm.appendChild(subjectInput);

      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(contactForm)
        });
        const result = await res.json();
       if (result.success) {
          if (btn) btn.textContent = 'Sent';
          if (status) status.classList.add('is-visible');
          contactForm.reset();
          setTimeout(() => {
            if (btn) { btn.textContent = 'Send'; btn.disabled = false; }
            if (status) status.classList.remove('is-visible');
          }, 6000);
        } else {
          if (btn) { btn.textContent = 'Send'; btn.disabled = false; }
          if (errorBox) { errorBox.textContent = 'Something went wrong — please try again.'; errorBox.classList.add('is-visible'); }
        }
      } catch (err) {
        if (btn) { btn.textContent = 'Send'; btn.disabled = false; }
        if (errorBox) { errorBox.textContent = 'Network error — please check your connection and try again.'; errorBox.classList.add('is-visible'); }
      }
    });
  }


  /* ---------- Know your consultant: flip card + stat count-up ---------- */
  const consultantFlip = document.querySelector('.consultant-flip');
  if (consultantFlip) {
    const flipBtn = consultantFlip.querySelector('.consultant-flip-toggle');
    const stage = consultantFlip.closest('.consultant-stage');
    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        const flipped = consultantFlip.classList.toggle('is-flipped');
        if (stage) stage.classList.toggle('is-flipped', flipped);
        flipBtn.setAttribute('aria-pressed', flipped ? 'true' : 'false');
      });
    }
  }

  const countEls = document.querySelectorAll('[data-count]');
  if (countEls.length && 'IntersectionObserver' in window &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const runCount = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCount(entry.target);
          countIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    countEls.forEach(el => { el.textContent = '0'; countIO.observe(el); });
  }

});
