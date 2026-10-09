// Prev/next buttons for the scroll-snap rows. The rows work without them
// (swipe, trackpad, arrow keys once focused); the buttons make the overflow
// visible and give pointer users without a trackpad a way through.
// Markup: a [data-strip-controls] block right before each [data-strip].
export function initScrollStrips() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll<HTMLElement>('[data-strip]').forEach((strip) => {
    const controls = strip.previousElementSibling as HTMLElement | null;
    if (!controls?.hasAttribute('data-strip-controls')) return;
    const prev = controls.querySelector<HTMLButtonElement>('[data-strip-prev]');
    const next = controls.querySelector<HTMLButtonElement>('[data-strip-next]');
    if (!prev || !next) return;

    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      controls.hidden = max <= 1;
      prev.disabled = strip.scrollLeft <= 1;
      next.disabled = strip.scrollLeft >= max - 1;
    };
    // One item at a time: the snap points do the alignment
    const step = () => strip.querySelector('li')?.getBoundingClientRect().width ?? strip.clientWidth;
    const scroll = (direction: number) =>
      strip.scrollBy({ left: direction * step(), behavior: reduceMotion ? 'auto' : 'smooth' });

    prev.addEventListener('click', () => scroll(-1));
    next.addEventListener('click', () => scroll(1));
    strip.addEventListener('scroll', update, { passive: true });
    new ResizeObserver(update).observe(strip);
    update();
  });
}
