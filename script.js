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

  /* ---------- Consult page: scheduling + mock payment ---------- */
  // const slots = document.querySelectorAll('.slot');
  // const paymentStep = document.querySelector('.payment-step');
  // const selectedTimeEl = document.querySelector('[data-selected-time]');

  // if (slots.length) {
  //   slots.forEach(slot => {
  //     slot.addEventListener('click', () => {
  //       slots.forEach(s => s.classList.remove('selected'));
  //       slot.classList.add('selected');

  //       if (selectedTimeEl) {
  //         const day = slot.dataset.day || '';
  //         const time = slot.textContent.trim();
  //         selectedTimeEl.textContent = `${day}, ${time}`;
  //       }

  //       if (paymentStep) {
  //         paymentStep.classList.add('is-active');
  //         window.setTimeout(() => {
  //           paymentStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //         }, 120);
  //       }
  //     });
  //   });
  // }

  // const payForm = document.querySelector('.pay-form');
  // if (payForm) {
  //   payForm.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const btn = payForm.querySelector('button[type="submit"]');
  //     const status = document.querySelector('.form-status[data-pay-status]');
  //     if (btn) {
  //       btn.textContent = 'Confirming…';
  //       btn.disabled = true;
  //     }
  //     window.setTimeout(() => {
  //       if (btn) {
  //         btn.textContent = 'Booking confirmed';
  //       }
  //       if (status) status.classList.add('is-visible');
  //     }, 900);
  //   });
  // }



  
  /* ---------- Contact form (visual only) ---------- */
  // const contactForm = document.querySelector('.contact-form');
  // if (contactForm) {
  //   contactForm.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const btn = contactForm.querySelector('button[type="submit"]');
  //     const status = document.querySelector('.form-status[data-contact-status]');
  //     if (btn) {
  //       btn.textContent = 'Sending…';
  //       btn.disabled = true;
  //     }
  //     window.setTimeout(() => {
  //       if (btn) btn.textContent = 'Sent';
  //       if (status) status.classList.add('is-visible');
  //     }, 800);
  //   });
  // }



  /*Real Contact form with web3forms services */
  /* ---------- Contact form (real submission via Web3Forms) ---------- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const status = document.querySelector('.form-status[data-contact-status]');

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
        } else {
          if (btn) { btn.textContent = 'Send'; btn.disabled = false; }
          alert('Something went wrong — please try again.');
        }
      } catch (err) {
        if (btn) { btn.textContent = 'Send'; btn.disabled = false; }
        alert('Network error — please try again.');
      }
    });
  }

});
