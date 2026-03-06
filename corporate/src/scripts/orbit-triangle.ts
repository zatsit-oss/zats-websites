/**
 * Orbital rotation animation for a triangle of partner-cards.
 * Cards orbit around the centroid, and the one at the top gets highlighted.
 */
export function initOrbitTriangle(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cards = container.querySelectorAll<HTMLElement>('.partner-card');
  if (cards.length !== 3) return;

  // Triangle geometry: cards orbit on a circle of radius 80px
  // around center (210, 130) inside a 420×220 container.
  // Cards are 100×100, so base position = center minus half card size.
  const cx = 160; // 210 - 50
  const cy = 80;  // 130 - 50
  const radius = 80;
  let step = 0;

  function positionCards(animate: boolean) {
    const angleDeg = step * 120;

    cards.forEach((card, i) => {
      const angle = (angleDeg + i * 120 - 90) * Math.PI / 180;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      card.style.left = `${cx}px`;
      card.style.top = `${cy}px`;
      card.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;

      if (animate) {
        card.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
      }
    });

    // Highlight the card currently at the top position
    const topIndex = (3 - (step % 3)) % 3;
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === topIndex);
    });
  }

  // Position immediately without animation
  positionCards(false);

  // Enable transitions after first paint
  requestAnimationFrame(() => {
    positionCards(true);
  });

  const intervalId = setInterval(() => {
    step++;
    positionCards(true);
  }, 2500);

  document.addEventListener('astro:before-swap', () => {
    clearInterval(intervalId);
  }, { once: true });
}
