# SpecPilot 

Live - [SpecPilot](https://specpilot.netlify.app/app)

---

I built this because every time someone asks "which laptop should I buy?" the answers online are either sponsored garbage or a Reddit thread from 2019. SpecPilot is my attempt at a clean, honest, hardware-first guide for the Indian laptop market in 2026.

No affiliate bait, no "editor's choice" that happens to be whoever paid the most. Just specs, traps to avoid, and a recommendation you can actually trust.

---

## What's inside

| File | What it does |
|------|-------------|
| `index.html` | Landing page — project intro, features overview, links to the app |
| `app.html` | The actual tool — recommendation engine, trap detector, budget catalog, comparison panel |
| `styles.css` | Shared styles + theme variables (light/dark) across both pages |
| `script.js` | All the interactive logic — flowchart engine, trap cards, budget tabs, comparison table |
| `theme.js` | The light/dark toggle button, shared by both pages |

---

## Features

- **Buying flowchart** — pick your use case, budget, battery preference, and display type. Get a matched laptop recommendation instantly.
- **Trap detector** — 6 real buying traps (soldered RAM, low TGP, 45% NTSC screens, etc.) with a plain-english explanation of why they're bad and the exact marketing pitch used to sell them.
- **Budget catalog** — curated laptops across 4 price brackets from ₹25K to ₹1.2L+, with key specs at a glance.
- **Comparison table** — send up to 3 recommendations into a proper side-by-side spec table (CPU, GPU, RAM, display, price as rows), not three cards repeating the same labels.
- **Light/dark theme** — toggle pinned to the bottom of the screen. Remembers your choice, respects your system preference on first visit, no flash of the wrong theme on load.
- **Tech jargon explainer** — quick definitions for NPU/TOPS, TGP, LPDDR5X, and single-slot SSDs because not everyone has the time to Google each term.

---

## How to run it

No build step, no npm install, no config. Just open `index.html` in any browser and you're good.

----

## Things I'd add later

- Actual Amazon/Flipkart price tracking (right now prices are hardcoded)
- More laptops in the recommendation database — it's one entry per use case right now
- A proper filter system for the budget catalog
- Maybe persist the comparison list across page reloads instead of resetting on refresh

---
