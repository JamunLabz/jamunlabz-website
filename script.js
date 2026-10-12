// ==========================================================================
// Jamun Labz — shared interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    const setMenu = (open) => {
      navLinks.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setMenu(false));
    });
    // close with Escape, by tapping outside, or when the screen becomes wide (tablet rotated)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && navLinks.classList.contains('open')) setMenu(false);
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
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });   // threshold 0: very tall blocks still reveal
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Legal pages: "On this page" contents ----------
     Always open as a sidebar on wide screens; a collapsible box on
     phones/tablets that closes again after a link is tapped. */
  const toc = document.querySelector('details.legal-toc');
  if (toc) {
    const wide = window.matchMedia('(min-width: 1000px)');
    const syncToc = () => { toc.open = wide.matches; };
    syncToc();
    if (wide.addEventListener) wide.addEventListener('change', syncToc);
    else if (wide.addListener) wide.addListener(syncToc);   // older Safari
    toc.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => { if (!wide.matches) toc.open = false; });
    });
  }

  /* ---------- Footer icons ----------
     1. Icons whose link is still "#" (profile not added yet) do nothing when clicked.
     2. The email icon opens the visitor's mail app AND copies the address,
        so it still works on computers with no mail app set up. */
  document.querySelectorAll('.social-links a[href="#"]').forEach(a => {
    a.setAttribute('aria-disabled', 'true');
    a.addEventListener('click', (e) => e.preventDefault());
  });

  const showToast = (msg) => {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      t.setAttribute('role', 'status');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('is-visible');
    clearTimeout(t._hide);
    t._hide = setTimeout(() => t.classList.remove('is-visible'), 3200);
  };

  document.querySelectorAll('[data-copy-email]').forEach(a => {
    a.addEventListener('click', () => {
      const email = a.dataset.copyEmail;
      const done = () => showToast(`Email address copied: ${email}`);
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(done).catch(() => showToast(`Email us at ${email}`));
      } else {
        showToast(`Email us at ${email}`);
      }
    });
  });

  /* ---------- Subtle parallax on hero graphic ---------- */
  // Updated at most once per frame so it never makes scrolling stutter.
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !reducedMotion) {
    let parallaxQueued = false;
    const applyParallax = () => {
      parallaxQueued = false;
      const y = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.06;
        el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
      });
    };
    window.addEventListener('scroll', () => {
      if (!parallaxQueued) { parallaxQueued = true; requestAnimationFrame(applyParallax); }
    }, { passive: true });
  }

  /* ---------- Super-smooth mouse-wheel scrolling ----------
     A normal mouse wheel moves the page in hard jumps. This glides the page
     to where the wheel is pointing instead.
     It only takes over for a real mouse wheel. Trackpads (MacBook, Windows
     precision touchpads), touch screens, the keyboard and the scrollbar are
     already smooth, so they are left completely native.
     Change SMOOTHNESS to taste: bigger = longer, silkier glide. */
  const SMOOTHNESS = 120;   // milliseconds; try 90 (snappier) to 160 (floatier)

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !reducedMotion) {
    let current = window.scrollY;
    let target = current;
    let rafId = null;
    let lastTime = 0;
    let lastTrackpad = -Infinity;

    const maxScroll = () => Math.max(0, root.scrollHeight - window.innerHeight);

    const stopGlide = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      root.style.scrollBehavior = '';
    };

    const glide = (now) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      const diff = target - current;
      if (Math.abs(diff) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        stopGlide();
        return;
      }
      // time-based easing: feels the same on 60Hz and 120Hz screens
      current += diff * (1 - Math.exp(-dt / SMOOTHNESS));
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(glide);
    };

    // true if the wheel is over something that scrolls by itself (e.g. the message box)
    const scrollsInside = (el, dy) => {
      while (el && el !== document.body && el !== root) {
        if (el.scrollHeight > el.clientHeight + 1) {
          const oy = getComputedStyle(el).overflowY;
          if (oy === 'auto' || oy === 'scroll') {
            if (dy < 0 && el.scrollTop > 0) return true;
            if (dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
          }
        }
        el = el.parentElement;
      }
      return false;
    };

    window.addEventListener('wheel', (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey) return;   // zoom / sideways scroll
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const now = performance.now();
      const lineMode = e.deltaMode === 1;
      // a real wheel moves in fixed "notches"; a trackpad sends lots of tiny values
      const notched = lineMode ||
        (typeof e.wheelDeltaY === 'number' && e.wheelDeltaY !== 0 && Math.abs(e.wheelDeltaY) % 120 === 0);

      if (!notched) { lastTrackpad = now; stopGlide(); return; }
      if (now - lastTrackpad < 1200) return;            // still in a trackpad gesture
      if (scrollsInside(e.target, e.deltaY)) return;

      e.preventDefault();

      let dy = e.deltaY;
      if (lineMode) dy *= 34;
      else if (e.deltaMode === 2) dy *= window.innerHeight;

      if (rafId === null) {
        current = target = window.scrollY;
        lastTime = now;
        root.style.scrollBehavior = 'auto';             // our glide replaces the CSS one while it runs
        rafId = requestAnimationFrame(glide);
      }
      target = Math.min(Math.max(target + dy, 0), maxScroll());
    }, { passive: false });

    // anything else that scrolls the page takes over immediately
    ['keydown', 'mousedown', 'touchstart'].forEach(type => {
      window.addEventListener(type, stopGlide, { passive: true });
    });
    window.addEventListener('resize', () => { target = Math.min(target, maxScroll()); });
  }


  const BLOCKED = ['company.com','example.com','test.com','domain.com','email.com','mailinator.com','yopmail.com'];

  async function validateEmail(email) {
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) return 'Enter a valid email address.';
    const domain = email.split('@')[1].toLowerCase();
    if (BLOCKED.includes(domain)) return 'Please use your real email address.';
    try {
      const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`);
      const data = await res.json();
      if (!data.Answer) return "That email domain can't receive mail.";
    } catch (e) {}
    return null;
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

      const emailError = await validateEmail(contactForm.email.value.trim());
      if (emailError) {
        if (errorBox) { errorBox.textContent = emailError; errorBox.classList.add('is-visible'); }
        return;
      }

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

});