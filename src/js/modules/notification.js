export default function () {
  const counters = document.querySelectorAll(
    ".notification__refresh span"
  );

  if (!counters.length) return;

  let timeLeft = 59;

  const updateCounters = () => {
    counters.forEach(counter => {
      counter.textContent = timeLeft;
    });
  };

  // initial render
  updateCounters();

  setInterval(() => {
    timeLeft--;

    if (timeLeft < 1) {
      timeLeft = 59;
    }

    updateCounters();
  }, 1000);
}