/**
 * Clusters of partner-cards on the home page (hexagon, triangle, square): the
 * cards light up one after the other, once, when the cluster reaches the
 * middle of the viewport. The markup ships every card active, so the cluster
 * reads in full without JS or with reduced motion.
 */
const observers: IntersectionObserver[] = [];

function initClusterReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-cluster-reveal]').forEach((container) => {
    const cards = [...container.querySelectorAll<HTMLElement>('.partner-card')];
    if (!cards.length) return;

    // Start from the dimmed state; the clusters sit below the fold on load
    cards.forEach((card) => card.classList.remove('active'));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        cards.forEach((card, index) => setTimeout(() => card.classList.add('active'), index * 400));
        obs.disconnect();
      },
      // The project's middle-of-viewport trigger, with the zone stretched far
      // above the line: a fast scroll, PageDown or an anchor that jumps the
      // line over the cluster still lands it in the zone and reveals it
      { root: null, rootMargin: '10000% 0px -50% 0px', threshold: 0 },
    );
    observer.observe(container);
    observers.push(observer);
  });
}

document.addEventListener('astro:page-load', initClusterReveals);
document.addEventListener('astro:before-swap', () => {
  observers.forEach((observer) => observer.disconnect());
  observers.length = 0;
});
