const target = () => {
  const now = new Date();
  const y =
    now.getMonth() === 11 && now.getDate() > 25
      ? now.getFullYear() + 1
      : now.getFullYear();
  return new Date(y, 11, 25, 0, 0, 0);
};

const units = document.querySelectorAll("time [data-unit]");
const pad = (n) => String(n).padStart(2, "0");

const tick = () => {
  const diff = Math.max(0, target() - Date.now());
  const s = Math.floor(diff / 1000);
  const values = {
    d: Math.floor(s / 86400),
    h: pad(Math.floor(s / 3600) % 24),
    m: pad(Math.floor(s / 60) % 60),
    s: pad(s % 60),
  };
  units.forEach((el) => (el.textContent = values[el.dataset.unit]));
};

tick();
setInterval(tick, 1000);
