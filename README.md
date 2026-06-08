# portfolio — archived

> **Archived — this repo is no longer the live source for alexdalgleishmorel.com.**
>
> The site now runs on the **composable-site-platform** as a hosted client:
>
> - **Presentation** (laptop scene, per-project motifs, glass theme, components) lives in
>   `composable-site-platform/clients/alex/bundle` — make any visual/layout changes there.
> - **Content** (project text, links, accent colors, animations) is edited live in the shared
>   **admin** (backed by DynamoDB), not in this repo. Animations can also be uploaded (Lottie) — no
>   redeploy needed.
>
> GitHub Pages hosting has been retired (the `CNAME` was removed and DNS now points to CloudFront).
> This repo is kept read-only for its history and the motif-authoring / scene-bbox tooling.

---

A bespoke single-page developer portfolio (Vite + React): a laptop-on-a-cliff scene with per-project
animated CSS **motifs** and a glassmorphism UI.

- `CLAUDE.md` — design notes and conventions.
- `ADDING_PROJECTS.md` — how the per-project motifs were authored.
- `scripts/` — tooling (e.g. the magenta-screen bbox sampler used to place the laptop "screen").
