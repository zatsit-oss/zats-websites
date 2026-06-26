/**
 * Triangle of partner-cards: each card sits at a fixed vertex and is highlighted
 * one by one when the block enters the viewport. No looping/orbital motion —
 * once a card is highlighted it stays highlighted (final high-contrast state).
 */
export function initOrbitTriangle(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cards = container.querySelectorAll<HTMLElement>('.partner-card');
  if (cards.length !== 3) return;

  // Triangle geometry: cards sit on a circle of radius 80px
  // around center (210, 130) inside a 420×220 container.
  // Cards are 100×100, so base position = center minus half card size.
  const cx = 160; // 210 - 50
  const cy = 80;  // 130 - 50
  const radius = 80;

  // Place each card at a fixed vertex: top, bottom-right, bottom-left.
  cards.forEach((card, i) => {
    const angle = (i * 120 - 90) * Math.PI / 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    card.style.left = `${cx}px`;
    card.style.top = `${cy}px`;
    card.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  });

  // Reduced motion: keep every card in its final high-contrast state, no animation.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach(card => card.classList.add('active'));
    return;
  }

  // Start from the dimmed state. The section sits below the fold on load,
  // so stripping the baseline 'active' class here is not visible.
  cards.forEach(card => card.classList.remove('active'));

  let revealed = false;
  const revealSequentially = () => {
    if (revealed) return;
    revealed = true;
    // Highlight each card once, in order, and leave it highlighted (no loop).
    cards.forEach((card, index) => {
      setTimeout(() => card.classList.add('active'), index * 400);
    });
  };

  // Trigger the reveal only when the block enters the viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealSequentially();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(container);

  // Cleanup on page navigation (ViewTransitions)
  document.addEventListener('astro:before-swap', () => {
    observer.disconnect();
  }, { once: true });
}
