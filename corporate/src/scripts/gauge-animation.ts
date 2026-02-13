/**
 * Initialize gauge animation with IntersectionObserver
 * Animates circular progress gauges and counter values when section is in view
 */
export function initGaugeAnimation(sectionId: string): void {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const gauges = section.querySelectorAll('.gauge-progress');
  const values = section.querySelectorAll('.gauge-value');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gauges.forEach((gauge) => gauge.classList.add('animate'));
          values.forEach((valueEl) => {
            const target = parseInt(valueEl.getAttribute('data-value') || '0', 10);
            animateCounter(valueEl as HTMLElement, target);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5, rootMargin: '-100px 0px' }
  );

  observer.observe(section);
}

/**
 * Animate a counter from 0 to target value with easing
 */
function animateCounter(element: HTMLElement, target: number): void {
  const duration = 1200;
  const start = performance.now();

  function update(currentTime: number): void {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    element.textContent = `${current}%`;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
