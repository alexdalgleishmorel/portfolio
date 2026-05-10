# Deploying the portfolio

## TL;DR

GitHub Pages serves this site from the **`/docs` folder on `main`**, mapped to the custom domain `alexdalgleishmorel.com`. To ship any change:

```sh
npm run build                        # rebuilds the docs/ folder
git add .                            # stage source + rebuilt docs/
git commit -m "describe the change"
git push origin main
```

Pages auto-deploys within ~1 minute. No manual upload, no GitHub Actions, nothing else to push.

---

## How this is wired up

The site is a single-page Vite + React app. `npm run build` runs `tsc -b` (type-check) then `vite build`, which:

1. Compiles JSX/TS into a hashed JS + CSS bundle.
2. Outputs to [docs/](docs/) (configured in [vite.config.ts](vite.config.ts) via `build.outDir: 'docs'`).
3. Copies everything in [public/](public/) over to `docs/` — including `CNAME`, `scene.png`, `scene-wide.png`, `scene-square.png`, `scene-mobile.png`.

GitHub Pages settings on this repo (Settings → Pages):
- **Source:** Deploy from a branch — `main` / **`/docs`** folder.
- **Custom domain:** `alexdalgleishmorel.com`, HTTPS enforced.
- DNS for the apex domain points at GitHub Pages' IPs; [public/CNAME](public/CNAME) gets copied to `docs/CNAME` on every build, which is what tells Pages to serve under that hostname.

That setup already exists on `main`. Nothing to configure when you merge V2 in — Pages just notices the new commit and redeploys.

---

## Initial deployment (merging V2 → main)

The V2 branch already has a fresh production build committed under `docs/`. When V2 lands on `main`, the deploy is automatic:

1. Open the PR for V2 → main, merge it.
2. Wait ~30–60 seconds.
3. Hard-refresh `https://alexdalgleishmorel.com` (`Cmd+Shift+R` on Mac) to bypass the browser cache.
4. The new design should be live.

If something looks stale after a few minutes, check the deploy status under the repo's **Actions** tab (look for the "pages build and deployment" workflow) or the **Deployments** sidebar on the right of the repo home page.

---

## Future changes (the standard loop)

Every time you change anything in `src/`, `public/`, or `index.html`:

1. **Edit** the source.
2. **Test locally:**
   ```sh
   npm run dev
   ```
   Dev server runs at `http://localhost:5173/` with hot reload.
3. **Build:**
   ```sh
   npm run build
   ```
   This regenerates `docs/`. If `tsc` reports a type error, fix it before committing.
4. **Commit both source AND the rebuilt `docs/` together:**
   ```sh
   git add .
   git commit -m "describe the change"
   ```
   The asset filenames inside `docs/assets/` are content-hashed (`index-AbC123.js`), so they change on every build. You'll see one old pair removed and one new pair added in the diff — that's expected.
5. **Push:**
   ```sh
   git push origin main
   ```
6. Pages redeploys within a minute. Hard-refresh the live site to verify.

---

## Optional: preview the production build before pushing

```sh
npm run preview
```

This serves the built `docs/` at a local URL so you can sanity-check that the production bundle works before committing it.

---

## Common gotchas

- **Forgot to run `npm run build`?** Pages keeps serving whatever's already in `docs/` on `main`. Your source change won't be live until a rebuild lands. Run the build, commit `docs/`, push again.
- **Don't edit files inside `docs/` directly.** They're regenerated on every build and your edits will be overwritten on the next `npm run build`.
- **Don't delete [public/CNAME](public/CNAME).** Without it, every build wipes the custom-domain mapping and you'd need to re-add the domain in repo Settings → Pages.
- **Asset paths:** `vite.config.ts` uses `base: '/'` because the site lives at the root of `alexdalgleishmorel.com`. If you ever change the URL structure (e.g. moving to `username.github.io/portfolio`), update `base` to `'/portfolio/'` and rebuild — otherwise asset paths will 404.
- **Public assets are referenced absolutely.** Use `/scene.png`, not `./scene.png`. Vite serves [public/](public/) at the URL root.
- **Cache:** if you don't see a change after a successful deploy, it's almost always the browser cache. Hard-refresh first before assuming something broke.

---

## Reference

- [vite.config.ts](vite.config.ts) — build output directory + base URL
- [public/CNAME](public/CNAME) — custom-domain marker
- [package.json](package.json) — `dev` / `build` / `preview` scripts
- [ADDING_PROJECTS.md](ADDING_PROJECTS.md) — how to add a new project + animation (separate from deploying)
