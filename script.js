/* Marks Electronics — interactive behaviours */

(function () {
  'use strict';

  /* ── Cart state ── */
  let cartCount = 0;
  let wishlistItems = new Set();

  const cartBadge = document.getElementById('cart-badge');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  function updateCartBadge() {
    if (cartBadge) cartBadge.textContent = cartCount;
  }

  function showToast(msg) {
    if (!toast) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ── Add to cart ── */
  document.querySelectorAll('.add-cart-btn, .buy-now-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      cartCount++;
      updateCartBadge();
      const name = this.closest('[data-name]')?.dataset.name || 'Item';
      showToast('✓  ' + name + ' added to cart');
    });
  });

  /* ── Wishlist toggle ── */
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = this.dataset.id;
      if (wishlistItems.has(id)) {
        wishlistItems.delete(id);
        this.classList.remove('active');
        this.textContent = '♡';
      } else {
        wishlistItems.add(id);
        this.classList.add('active');
        this.textContent = '♥';
        showToast('♥  Added to wishlist');
      }
    });
  });

  /* ── Sticky header shadow ── */
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  });

  /* ── Mobile menu ── */
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('overlay');
  const hamburger = document.getElementById('hamburger');
  const closeNav = document.getElementById('close-nav');

  function openMenu() {
    mobileNav?.classList.add('open');
    overlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMenu);
  closeNav?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  /* ── Newsletter form ── */
  document.getElementById('newsletter-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = this.querySelector('input');
    if (input && input.value.trim()) {
      showToast('🎉  Subscribed! Welcome to Marks Electronics.');
      input.value = '';
    }
  });

  /* ── Smooth nav active highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-inner a[data-section]');

  function setActiveNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });
})();
