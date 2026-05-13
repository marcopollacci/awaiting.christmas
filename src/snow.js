// Lightweight snow — respects reduced motion, scales with viewport, devicePixelRatio aware.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  let w, h, dpr, flakes;

  const COUNT = () => Math.min(120, Math.round((w * h) / 14000));

  const resize = () => {
    dpr = Math.min(2, devicePixelRatio || 1);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({ length: COUNT() }, spawn);
  };

  const spawn = (initial = true) => ({
    x: Math.random() * w,
    y: initial ? Math.random() * h : -10,
    r: 0.6 + Math.random() * 2.2,
    vy: 0.3 + Math.random() * 1.1,
    vx: -0.3 + Math.random() * 0.6,
    a: 0.4 + Math.random() * 0.5,
    drift: Math.random() * Math.PI * 2,
  });

  const tick = (t) => {
    ctx.clearRect(0, 0, w, h);
    for (const f of flakes) {
      f.drift += 0.01;
      f.x += f.vx + Math.sin(f.drift) * 0.3;
      f.y += f.vy;
      if (f.y - f.r > h) Object.assign(f, spawn(false));
      if (f.x < -10) f.x = w + 10;
      if (f.x > w + 10) f.x = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 248, 240, ${f.a})`;
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  };

  addEventListener("resize", resize);
  resize();
  requestAnimationFrame(tick);
})();
