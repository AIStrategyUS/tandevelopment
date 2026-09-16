/**
 * Hamburger / full-screen overlay menu logic, used by Nav.astro.
 *
 * Handles: opening and closing the overlay, trapping Tab focus inside it
 * while open, closing on Escape, closing when a link inside the overlay
 * is selected, and returning focus to the toggle button on close.
 *
 * Usage (see Nav.astro's inline script):
 *   import { initMobileMenu } from './mobile-menu.js';
 *   initMobileMenu({
 *     toggle: '#nav-toggle',
 *     overlay: '#nav-overlay',
 *     close: '#nav-close',
 *     linkSelector: '[data-nav-link]',
 *   });
 *
 * `toggle`, `overlay`, and `close` accept either a CSS selector string or
 * an already-resolved Element.
 */
export function initMobileMenu({ toggle, overlay, close, linkSelector } = {}) {
  const toggleEl = resolve(toggle);
  const overlayEl = resolve(overlay);
  const closeEl = resolve(close);

  if (!toggleEl || !overlayEl) return;

  let lastFocused = null;

  function resolve(target) {
    if (!target) return null;
    return typeof target === 'string' ? document.querySelector(target) : target;
  }

  function getFocusable() {
    return Array.from(
      overlayEl.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);
  }

  function openMenu() {
    lastFocused = document.activeElement;
    overlayEl.hidden = false;
    document.body.classList.add('nav-open');
    toggleEl.setAttribute('aria-expanded', 'true');

    const focusable = getFocusable();
    (focusable[0] || overlayEl).focus();

    document.addEventListener('keydown', onKeydown);
  }

  function closeMenu() {
    if (overlayEl.hidden) return;
    overlayEl.hidden = true;
    document.body.classList.remove('nav-open');
    toggleEl.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key === 'Tab') {
      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  toggleEl.addEventListener('click', () => {
    const isOpen = toggleEl.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (closeEl) {
    closeEl.addEventListener('click', closeMenu);
  }

  if (linkSelector) {
    overlayEl.querySelectorAll(linkSelector).forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }
}
