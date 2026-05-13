# awaiting.christmas

A quiet countdown to Christmas — minimal, animated, no dependencies.

**Live at:** [awaiting.christmas](https://awaiting.christmas)

## What it is

A single-page site that counts down to December 25th, every year. When Christmas passes, it automatically targets the next one.

## Structure

```
src/
├── index.html   — markup and layout
├── main.css     — styles (Cormorant Garamond + JetBrains Mono)
├── main.js      — countdown logic
└── snow.js      — canvas snow animation
```

## Features

- **Countdown** — days, hours, minutes, seconds updated every second
- **Snow** — lightweight canvas animation, density scales with viewport, devicePixelRatio-aware (up to 2×)
- **Accessible** — respects `prefers-reduced-motion`, canvas is `aria-hidden`
- **No dependencies** — vanilla HTML, CSS, JS

## Running locally

Just open `src/index.html` in a browser — no build step required.
