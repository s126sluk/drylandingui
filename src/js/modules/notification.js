export default function () {
  // ── Refresh counter (legacy — currently no counter elements in DOM) ──
  const counters = document.querySelectorAll(
    ".notification__refresh span"
  );

  if (counters.length) {
    let timeLeft = 59;

    const updateCounters = () => {
      counters.forEach(counter => {
        counter.textContent = timeLeft;
      });
    };

    updateCounters();

    setInterval(() => {
      timeLeft--;
      if (timeLeft < 1) {
        timeLeft = 59;
      }
      updateCounters();
    }, 1000);
  }

  // ── Sticky header scroll shadow ──
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const onScroll = () => {
      if (window.scrollY > 10) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
  }
}
