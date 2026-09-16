/**
 * Scroll-reveal for elements marked with the `.fade-up` utility class
 * (defined in src/styles/global.css).
 *
 * Usage: import { init } from './reveal.js'; init();
 * Called once from Layout.astro on every page (see the inline module
 * script at the bottom of that file), so individual pages only need to
 * add the `fade-up` class to whatever they want to animate in.
 *
 * If the visitor has requested reduced motion, every matched element is
 * marked visible immediately instead of being observed, so nothing ever
 * moves for them.
 */
export function init(selector = '.fade-up') {
  const elements = document.querySelectorAll(selector);
  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
