# SpecPilot

A small two-page site for figuring out which laptop to buy in India, without wading through ten YouTube "TOP 5 LAPTOPS!!" videos first. There's a landing page and an app page — answer a few questions, get a hardware match, check it against a trap list, compare a few options side by side.

## Files

```
index.html   → landing page, links out to the app
app.html     → the actual tool (flowchart, trap detector, catalog, comparison)
styles.css   → theme variables + all the custom component styles
script.js    → app logic (flowchart matching, catalog rendering, comparison table)
theme.js     → the light/dark toggle, shared by both pages
```




## How the recommendation engine works

It's genuinely just a lookup table, not anything fancier. `flowRecommendations` in `script.js` is a small array of laptop profiles tagged with use-case, budget, battery preference, and display preference. When you click through the selectors, `updateFlowResult()` filters that array for the best match, and falls back to a looser match (ignoring battery/display) if nothing fits exactly. Four laptops total right now — one per use case. Add more entries to the array if you want finer-grained results per budget tier.

## The comparison table

Click "Send to Comparison Slot" after getting a recommendation and it gets added as a column in a spec table (up to 3 at a time). Each row is one spec — CPU, GPU, RAM, etc. — so you can actually scan across and compare rather than reading three separate cards that repeat the same labels. There's a remove button per column and a clear-all button once you've got something in there.

## Known limitations/things I didn't do

- The catalog and recommendation data are hand-written placeholder specs, not pulled from anywhere live. Prices will drift.
- No routing, no state persistence beyond the theme — refresh the app page and your comparison list resets.
- Only tested down to ~375px width. Should be fine on most phones but I haven't checked anything ancient.
- No build tooling on purpose. If this grows past a few more sections, it's probably worth moving to a bundler, but for now editing raw HTML is faster than fighting a toolchain.

## Local preview

There's no server-side anything, so any static file server works:

```bash
python3 -m http.server 8000
```

then open `localhost:8000`.
