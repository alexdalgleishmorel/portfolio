# CLAUDE.md — orientation for future sessions

This is `alex.dalgleishmorel.com` — a single-page React/Vite portfolio. Read this first; the other Markdown files ([DEPLOYING.md](DEPLOYING.md), [ADDING_PROJECTS.md](ADDING_PROJECTS.md)) cover specific workflows in more depth.

## What the site is

The whole UI lives on top of a single illustrated dusk scene (`scene*.png`) of a laptop sitting on a cliff overlooking a lake/mountain range. The **magenta rectangle painted on the laptop screen** in each scene file is the content viewport: a React-rendered overlay sits exactly on top of the magenta and shows either:

- **Projects** — a looping animation per project (the "motif"), backed by a bottom carousel of project chips with a click-to-open detail modal.
- **About** — three big tiles inside the laptop screen: Resume / GitHub / LinkedIn.

The header (name + role + nav chip) sits above the laptop; the carousel/bio panel sits below. All UI is `position: fixed` so it always anchors to the viewport, never to the (possibly oversized) scene `.stage`.

## Stack

- **Vite + React 18 + TypeScript** (strict). Output goes to `docs/` (configured in [vite.config.ts](vite.config.ts)).
- **GitHub Pages** serves from `main` / `/docs` folder, custom domain `alexdalgleishmorel.com` via [public/CNAME](public/CNAME).
- **No backend.** Everything is static. Project data is hard-coded in [src/data/projects.ts](src/data/projects.ts).
- **No external animation library.** Motifs are pure CSS `@keyframes` + a small JSX shell.

`npm run dev` for local HMR, `npm run build` produces `docs/`, `npm run preview` serves the built bundle.

## Deploy in one sentence

`npm run build`, commit **both** the source change and the regenerated `docs/`, push `main` — GitHub Pages picks it up in ~30s. Full details in [DEPLOYING.md](DEPLOYING.md).

## File layout

```
public/                    static assets — copied to docs/ on build
  scene.png                16:9 standard (1672×941)
  scene-wide.png           21:9 ultrawide (1916×821)
  scene-square.png         4:3 (1448×1086)
  scene-mobile.png         9:16 portrait (941×1672)
  CNAME                    custom-domain pin
  logo.png                 favicon / apple-touch-icon

src/
  main.tsx                 ReactDOM root
  App.tsx                  layout + cover-fit math + state
  styles.css               THE stylesheet (single file, ~1500 lines)
  types.ts                 Project + MotifKey types
  data/
    projects.ts            the project array — single source of truth
    scenes.ts              per-scene metadata (size + magenta bbox %)
  hooks/
    useReducedMotion.ts    matchMedia wrapper
    useHashRoute.ts        #/projects | #/about
    useScene.ts            picks the scene whose AR is closest to viewport
  components/
    NavChip.tsx            top Projects/About segmented control
    ProjectScreen.tsx      laptop-screen content for a project
    AboutScreen.tsx        laptop-screen content for /about (3 tiles)
    ProjectsPanel.tsx      bottom carousel + arrows + dots + auto-advance
    BioPanel.tsx           bottom one-liner on /about
    DetailCard.tsx         project modal
  motifs/
    index.ts               registry: MotifKey → Component
    Wave.tsx, Rings.tsx, Bars.tsx, Pulse.tsx     generic motifs (kept as fallbacks, currently unused)
    Mortgage.tsx, FlowReport.tsx, AverageCost.tsx, PokerFlow.tsx     active per-project motifs

scripts/
  sample-bbox.mjs          reads a scene PNG, prints magenta bbox %s

docs/                      built site (committed; do not hand-edit)
ADDING_PROJECTS.md         how to add a new project + animation
DEPLOYING.md               how deploy works
```

## How the laptop overlay aligns to the magenta

Each scene PNG has a flat `#FF00FF`-ish rectangle painted where the laptop screen is. [scripts/sample-bbox.mjs](scripts/sample-bbox.mjs) scans the PNG for those pixels (threshold `R≥200, G≤30, B≥200`) and prints the rect as percentages with a small per-side overshoot (default 0.4%) so the dark bezel covers any subpixel rounding gap. Those values are pasted into [src/data/scenes.ts](src/data/scenes.ts).

At runtime, [src/hooks/useScene.ts](src/hooks/useScene.ts) listens to `resize` and picks the scene whose intrinsic aspect ratio is **closest** to `innerWidth / innerHeight` — not a threshold scheme. [src/App.tsx](src/App.tsx) then sets the `<img>` src + the laptop overlay's `left/top/width/height` from `scene.bbox`.

## Cover-fit, not letterbox

The `.stage` is **oversized** to the larger of viewport-width or viewport-height-in-scene-AR, then absolutely positioned so the **scene image is centered** in the viewport. `.stage-wrap` clips overflow, so the visible result is always edge-to-edge with no gradient bars. The math lives in [src/App.tsx](src/App.tsx) (`stageW`, `stageH`, `stageStyle`). `vp` (viewport size) is tracked in state and updates on `resize`.

Because `.stage` can extend past the viewport, every UI overlay (`.ui-nav`, `.ui-panel`) uses **`position: fixed`** so it anchors to the viewport, not to the oversized stage. (See [src/styles.css](src/styles.css) for these rules.)

The `.ps-motif` wrapper has `inset: 0 1.5%` — a tiny horizontal inset so the motif content doesn't kiss the screen edges. The visible side strips show solid black (set on `.ps-root` and `.about-root`).

## Motif system (the per-project animations)

A motif is two artifacts:

1. A `.tsx` in [src/motifs/](src/motifs/) that renders inert JSX inside a wrapper class `<key>-motif` and exposes brand colors as CSS custom properties:
   ```tsx
   <div className="<key>-motif" style={{ '--a': accent, '--b': accent2 } as CSSProperties}>
     {/* shapes */}
   </div>
   ```
2. A block of CSS appended to [src/styles.css](src/styles.css), all selectors scoped under `.<key>-motif`, animations defined as `@keyframes`.

Adding a new motif requires four things in lockstep:
- Save the `.tsx` in [src/motifs/](src/motifs/).
- Append the CSS just **before** the trailing `@media (prefers-reduced-motion: reduce)` rule (so the global motion-reset still wins).
- Register the component in [src/motifs/index.ts](src/motifs/index.ts).
- Extend the `MotifKey` union in [src/types.ts](src/types.ts).

TypeScript's exhaustiveness on `Record<MotifKey, ...>` will fail the build if the union and the registry diverge.

The four current motifs were generated by ChatGPT using the system + per-project prompts in [ADDING_PROJECTS.md](ADDING_PROJECTS.md). The constraints baked into that prompt that worked well: **bold large shapes, no small text, CSS-only animations, seamless 4–12s loop, accents via `var(--a)` / `var(--b)`**. Use those same prompts for any new project.

### Motif design conventions established by user iteration

- **No project text on the laptop screen.** Project name + tags + headline used to overlay the animation; they were removed entirely. The animation owns the screen.
- **`tags` field is removed from the `Project` type.** Don't add it back. The carousel chip sub-text reads literally `"CLICK TO LEARN MORE"`.
- **Colors that work on the dark dashboard motifs**: `#60A5FA` (blue), `#4ADE80` (green), `#FCA5A5/#FECACA` (pastel red), `#86EFAC/#BBF7D0` (pastel green). Used across average-cost / poker-flow / mortgage.
- **Mortgage motif** has solid black bg (no peach gradient). Pastel red/green gradient bars at low opacity (0.45) so the blue draw-in trend line dominates.

## Project carousel — auto-advance + wrap

[src/components/ProjectsPanel.tsx](src/components/ProjectsPanel.tsx) is the carousel. Important behaviors:

- **Order = array order in [src/data/projects.ts](src/data/projects.ts), newest first.** The carousel renders projects in array order and opens on index 0, so a **new project must be added to the _top_ of the array** (not appended) to lead the page. Keep [ADDING_PROJECTS.md](ADDING_PROJECTS.md) in sync if this convention changes.
- **Auto-advance** every `AUTO_ADVANCE_MS` (currently `6000` ms). A single `setTimeout` keyed off `selected` — every render reschedules, so any user interaction that changes `selected` resets the clock for free.
- **Wrap-around** in both directions via `(selected ± 1 + length) % length`. **Both arrows are always enabled** — `disabled` is intentionally not on them.
- **Pauses** when `isDetailOpen` (modal up) or `prefers-reduced-motion: reduce` is set.
- **Long-distance scroll jumps** (wraps + multi-step dot clicks where `Math.abs(prev - next) > 1`) use `behavior: 'auto'`; adjacent steps stay `'smooth'`. Without this, a wrap from index 3 → 0 would smooth-scroll 3 panels backward over ~1.5s and clash with the auto-advance cadence.
- **Scroll-driven `setSelected` is debounced by 50 ms.** Without the debounce, a single swipe could oscillate `selected` (A→B→A→B) as the snap animation overshoots, retriggering the `screen-fade` mount animation mid-transition and producing a visible flicker.

If anything in this file changes, also re-test: arrow click, dot tap, drag scroll on desktop, native swipe on mobile, modal open/close, and the about route swap (which unmounts the panel — its timers must clean up).

## Stylesheet (single file)

[src/styles.css](src/styles.css) is monolithic. ~1500 lines. Sections are commented (`/* ────── stage ────── */` etc.). Generic conventions:

- iOS Safari fix at the very top: `html { background-color: #09090e; overscroll-behavior: none }`, plus `.app, .stage-wrap { height: 100dvh }` (with `100vh` fallback). Don't regress these.
- Container queries on `.screen` (`container-type: inline-size`) — that's why motifs and about-screen text use `cqw` units.
- Body gradient is `background-attachment: fixed`. Works on desktop; the html dark fallback handles iOS quirk.
- The four scene PNGs are ~2 MB each and shipped uncompressed. Optional follow-up: pngquant or WebP — never blocked anything yet.

## Common gotchas (learned the hard way)

- **Always commit `docs/` alongside the source change.** GitHub Pages serves the build, not the source. Hashed asset filenames change on every build (`index-Abc123.js`), so the diff will show one pair removed and one new pair added — that's expected.
- **`.vite/` is local cache; never commit it.** Worth adding to `.gitignore` if it keeps showing up; the existing `.gitignore` only has `node_modules/`.
- **Don't hand-edit files inside `docs/`.** They're regenerated.
- **Don't delete [public/CNAME](public/CNAME).** Without it, every build wipes the custom domain and you have to re-add it in repo Settings.
- **Container-query units (`cqw`)** measure the *inline* dimension. On a near-square laptop screen, `1cqw ≈ 1cqh`, but they're not interchangeable.
- **`vite.config.ts` uses `base: '/'`** because the site is at the root of the custom domain. If you ever change the URL structure, update `base` and rebuild.
- **No `<picture>` or `srcset`.** Scene selection is JS-driven via `useScene`. Don't try to convert to media-query swapping; the bbox metadata has to flow into the React overlay too.

## Decisions that have been made (don't re-litigate without asking)

- **Scene picker is closest-AR**, not a `minAR` threshold scheme. Threshold version was tried and produced more letterbox at boundary viewports.
- **Cover-fit always**, not contain-fit. User explicitly chose this when 1152×570 was leaving gradient bars.
- **`tags` removed from project schema.** Carousel chip sub-text is literal `"CLICK TO LEARN MORE"`. Modal eyebrow with tags also removed.
- **Project name/headline overlay on the laptop screen is gone.** Animations have the screen to themselves; project name + headline + description live in the detail modal only.
- **Generic motifs (`wave/rings/bars/pulse`) stay registered** as fallbacks even though all 4 projects use bespoke motifs now. Cleanup is a one-line PR if ever wanted.
- **Sky / pot / chip-c / bottomnav / decision-tree / extra icons** were all removed from the various motifs through user iteration. If a motif feels "busy," check the git history before adding decoration.
- **Auto-advance is 6 seconds**, debounce is 50 ms. These were tuned by user feel.
- **About screen has 3 tiles** (Resume, GitHub, LinkedIn) at `flex: 1 1 0`. Adding a 4th would require shrinking icon/font sizes again.

## Quick test checklist after non-trivial changes

1. `npm run dev`, walk every project in the carousel — animation renders, both accent colors visible, no console errors.
2. Open the detail modal for at least one project — links open in a new tab, icons sit on the **left** of the button text.
3. Toggle to /about — three tiles, GitHub button works, Resume placeholder still has `href="#"` (until you have a Resume URL).
4. Resize the window from ultrawide → mobile portrait — confirm the active scene swaps and the laptop overlay tracks the magenta cleanly.
5. Toggle OS reduced-motion — animations freeze, auto-advance stops, manual nav still works.
6. `npm run build` — strict TS pass, no orphaned CSS warnings.

## Pointers

- [DEPLOYING.md](DEPLOYING.md) — full deploy flow + gotchas
- [ADDING_PROJECTS.md](ADDING_PROJECTS.md) — system prompt + per-project ChatGPT prompt + integration steps
- [scripts/sample-bbox.mjs](scripts/sample-bbox.mjs) — re-sample magenta bbox if a new scene is added
