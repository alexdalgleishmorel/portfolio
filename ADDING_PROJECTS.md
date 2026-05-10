# Adding a new project

Every project on the site has two pieces: a **data entry** in [src/data/projects.ts](src/data/projects.ts) and a **looping animation** that fills the laptop screen behind the project name. This guide walks the full flow.

## TL;DR

1. **Generate the animation** — paste the [system prompt](#step-1-generate-the-animation-via-chatgpt) into ChatGPT (with vision), then send the per-project follow-up + a screenshot of your app. ChatGPT returns a `.tsx` and a `.css` block.
2. **Wire it in** — drop the `.tsx` into [src/motifs/](src/motifs/), append the CSS to [src/styles.css](src/styles.css), register the component, extend the `MotifKey` union.
3. **Add the project** — append a typed entry to [src/data/projects.ts](src/data/projects.ts) pointing at the new motif key.

Then `npm run dev` to verify, `npm run build`, commit + push to `main` to deploy.

---

## Step 1 — Generate the animation via ChatGPT

You need a ChatGPT plan with **image upload** (Plus or Pro) so you can attach a screenshot of the actual app.

### 1a. Paste this system / preamble prompt into a fresh chat

```
I'm building a portfolio site in React + TypeScript. The site shows project content inside a stylized laptop screen, with a looping animation as the backdrop. I'm generating a custom animation for each project, and you're going to write them.

For each project I'll send you:
- The project name and one-sentence description
- Tags (tech stack)
- Two accent colors (hex)
- A motif key (lowercase, kebab-case — used for the wrapper class)
- A PascalCase component name
- A screenshot of the actual app

You return TWO artifacts in two code blocks:

1) `src/motifs/<PascalCase>.tsx`:

import type { MotifProps } from './index';
import type { CSSProperties } from 'react';

export const <PascalCase> = ({ accent, accent2 }: MotifProps) => (
  <div
    className="<motif-key>-motif"
    style={{ '--a': accent, '--b': accent2 } as CSSProperties}
  >
    {/* your JSX */}
  </div>
);

2) A CSS block to append to `src/styles.css`. ALL selectors must be scoped under `.<motif-key>-motif` so styles don't leak. Reference colors as `var(--a)` and `var(--b)`.

CONSTRAINTS:
- CSS animations only. @keyframes + animation property. No JS timers, no requestAnimationFrame, no SVG <animate>, no canvas.
- Loop seamlessly. Start state must equal end state. Period 4–12 seconds.
- Use SVG and/or divs. No <img>, no fetch, no network, no external assets.
- The wrapper container is `position: absolute; inset: 0;` (sized to its parent — typically a near-square or 16:9 area inside a stylized laptop screen). Your animation must fill it edge to edge.
- LARGE shapes only. Bold, simple, geometric. Treat this like a poster, not a chart. No thin lines, no fine detail, no axis labels, no legends.
- NO small text. Avoid text entirely if you can. If you must have text, make it dominate the frame (single short word, takes up a third or more of the container).
- Match the app's aesthetic. Look at the screenshot. Sample its palette and geometry. Choose abstract OR stylized-literal — whatever feels native to that app.
- The two accent colors are the project's brand. Use them prominently. You may add neutrals (white, near-black) if needed but the accents should dominate.

Just output the two code blocks. No prose, no explanation.
```

### 1b. Send a per-project follow-up turn (with the app screenshot attached)

Fill the blanks below and paste it as your next message in the same chat.

```
Project: <Display name, e.g. "Mortgage Visualization App">
Description: <One sentence on what the app does>
Tags: <Comma-separated tech stack — matches the `tags` array in the data file>
accent  <#HEX>  (<short color name>)
accent2 <#HEX>  (<short color name>)
Motif key: <lowercase-kebab-case, e.g. mortgage>
Component name: <PascalCase, e.g. Mortgage>

Screenshot attached. Generate the component and the CSS now.
```

**Naming rules** that the rest of the codebase depends on:
- The **motif key** must be `lowercase-kebab-case`, no leading or trailing dashes. It becomes the wrapper CSS class (`.<key>-motif`) and the value of `Project.motif`.
- The **component name** must be `PascalCase`, matches the filename (`<PascalCase>.tsx`).
- The motif key does **not** have to match the project `id` in [src/data/projects.ts](src/data/projects.ts), but matching them is conventional (see existing entries).

You'll typically iterate once or twice — ask ChatGPT to "make the shapes bigger", "drop the small text", "use accent2 more prominently", etc. Save the final `.tsx` and the `.css` block once you're happy.

---

## Step 2 — Wire the animation into the codebase

Given ChatGPT's two artifacts:

1. **Save the `.tsx`** as `src/motifs/<PascalCase>.tsx`.
2. **Append the CSS** to [src/styles.css](src/styles.css), inserted **just before** the trailing `@media (prefers-reduced-motion: reduce)` rule. That global rule freezes any animation when the OS requests it; keeping the new CSS above it preserves the freeze for free.
3. **Register the component** in [src/motifs/index.ts](src/motifs/index.ts) — add an `import` at the top and an entry in the `motifs` record:
   ```ts
   import { <PascalCase> } from './<PascalCase>';
   // ...
   export const motifs: Record<MotifKey, ComponentType<MotifProps>> = {
     // ...existing entries...
     '<motif-key>': <PascalCase>,
   };
   ```
4. **Extend the `MotifKey` union** in [src/types.ts](src/types.ts):
   ```ts
   export type MotifKey =
     | 'wave' | 'rings' | 'bars' | 'pulse'
     | 'mortgage' | 'flow-report' | 'average-cost' | 'poker-flow'
     | '<motif-key>';
   ```
   TypeScript will fail the build if you forget either the union extension or the registry entry — they have to match.

---

## Step 3 — Add the project entry

Append a new object to the `projects` array in [src/data/projects.ts](src/data/projects.ts). The shape (defined in [src/types.ts](src/types.ts)) is:

```ts
export interface Project {
  id: string;            // unique kebab-case slug — used as React key
  name: string;          // display name shown on the laptop screen
  headline: string;      // one-line tagline shown in the detail modal
  description: string;   // longer paragraph, shown in the detail modal
  links: {               // all optional — only the buttons you set will render
    github?: string;
    demo?: string;       // demo video link
    try?: string;        // live app link
  };
  accent: string;        // primary hex color, e.g. '#F0A36B'
  accent2: string;       // secondary hex color, e.g. '#7A4FE0'
  motif: MotifKey;       // the motif key from step 2
}
```

Project order in the array is the carousel order. Put new projects wherever you want them to land in the scroll.

---

## Verify

```sh
npm run dev
```

Open the dev server URL. In the carousel:
- The new project appears in carousel order.
- The animation fills the laptop screen and loops smoothly.
- Both `accent` and `accent2` show up in the animation (not just one).
- Clicking the project opens a detail modal with the description and link buttons.

Toggle your OS's "reduce motion" setting → all animations should freeze.

If TypeScript complains about an exhaustiveness mismatch, double-check the registry entry and the `MotifKey` union match each other exactly.

---

## Deploy

```sh
npm run build
```

This runs `tsc -b` then Vite, outputting the static site to [docs/](docs/) (configured in [vite.config.ts](vite.config.ts)). The `CNAME` for `alexdalgleishmorel.com` ships automatically from [public/CNAME](public/CNAME).

Commit the source changes **and** the regenerated `docs/` directory, push to `main`, and GitHub Pages serves the new build.

---

## Reference

- [src/types.ts](src/types.ts) — `Project` interface and `MotifKey` union
- [src/motifs/index.ts](src/motifs/index.ts) — `MotifProps` (the shape every motif component receives) and the `motifs` registry
- [src/data/projects.ts](src/data/projects.ts) — current project list
- [src/components/ProjectScreen.tsx](src/components/ProjectScreen.tsx) — how a project + motif are rendered together inside the laptop screen
- [scripts/sample-bbox.mjs](scripts/sample-bbox.mjs) — only relevant if you ever add a **new background scene** (one of the four `scene-*.png` files in [public/](public/)). Adding a project does **not** touch this.
