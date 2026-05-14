const target = () => {
  const now = new Date();
  const y =
    now.getMonth() === 11 && now.getDate() > 25
      ? now.getFullYear() + 1
      : now.getFullYear();
  return new Date(y, 11, 25, 0, 0, 0);
};

const timeEl = document.querySelector("time");
const units = document.querySelectorAll("time [data-unit]");
const srOnly = document.querySelector("[data-sr-only]");
const pad = (n) => String(n).padStart(2, "0");

timeEl.setAttribute("datetime", target().toISOString().slice(0, 10));

let lastMinute = -1;

const tick = () => {
  const diff = Math.max(0, target() - Date.now());

  if (diff === 0) {
    document.body.classList.add("christmas");
    clearInterval(interval);
    return;
  }

  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor(s / 3600) % 24;
  const m = Math.floor(s / 60) % 60;
  const values = { d, h: pad(h), m: pad(m), s: pad(s % 60) };
  units.forEach((el) => (el.textContent = values[el.dataset.unit]));

  if (m !== lastMinute) {
    lastMinute = m;
    srOnly.textContent = `${d} days, ${h} hours, ${m} minutes to Christmas.`;
  }
};

tick();
const interval = setInterval(tick, 1000);

// Fullscreen toggle
const fsBtn = document.querySelector("[data-fullscreen]");

const onFullscreenChange = () => {
  const isFs = !!document.fullscreenElement;
  document.body.classList.toggle("fullscreen", isFs);
  fsBtn.setAttribute(
    "aria-label",
    isFs ? "Exit fullscreen" : "Enter fullscreen",
  );
};

document.addEventListener("fullscreenchange", onFullscreenChange);

fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});
