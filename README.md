# Hyeonjun Cho — Academic Research Portfolio

Live at <https://cheesss.github.io/>.

An English-language research portfolio for robot-learning laboratory outreach. The site is written for a professor reviewing it in 30–90 seconds: research question, personal contribution, metric with its evaluation condition, real-robot evidence, and limitations, in that order.

## Local development

Requirements: Node.js 22.12 or newer and pnpm 11. If `pnpm` is not on your PATH, the same binaries are available under `node_modules/.bin`.

```bash
pnpm install
pnpm astro dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

The preview binds to `http://localhost:4321/`.

Quality gates:

```bash
pnpm check          # astro check
pnpm build          # validate-content, check-media, audit-public, then astro build
pnpm test           # Playwright (desktop + mobile projects)
pnpm release:check  # every published asset must be cleared
```

Two dev-server caveats:

- Edits to scoped `<style>` blocks in `.astro` files are not always picked up by the running background server. Restart it with `pnpm astro dev stop && pnpm astro dev --background`.
- Edits to `src/content.config.ts` can leave the dev server validating against the old schema (new fields silently stripped) even though `pnpm build` passes. Stop the server, delete `.astro/data-store.json`, `.astro/collections`, `node_modules/.vite`, and `node_modules/.astro`, then restart.

## Design

- English only. Source Serif 4 for headings, Inter for body and UI, both bundled locally.
- Neutral light palette: `#f3f4f5` background, near-black ink, a single navy link colour. No shadows, gradients, cards, badges, uppercase labels, or decorative animation.
- 1180 px container; long sections use a heading column plus a content column. Body copy is capped at about 46 rem.
- Method diagrams are static SVG block diagrams on the page background with thin ink strokes; the author's own contribution is outlined with a dashed navy region. Captions are numbered `Figure n.` and `Video n.` in page order.

## Pages

- `/` — name, affiliation, two-paragraph research statement, hero video, and a one-line index of the four projects with their headline metric. Built to be read in one screen.
- `/research/` — the full project list: method-figure thumbnail, first sentence of the problem, contribution, headline metric with its condition, links.
- `/research/<slug>/` — one page per project with an in-page contents nav (Problem · Key result · Contribution · Experiment · Method · Results · Limitations).
- `/about/` — education, research experience with advisor, awards, technical skills.

## Content model

Research case studies live in `src/content/projects`. Each project declares title, period, status, summary, contribution, optional `problem` / `approach` / `findings` paragraphs, individual role, team contribution, metrics, methods, limitations, media, links, featured status, and order. Astro validates the schema during checks and builds.

- `problem` renders as the first section of the page, `approach` as the lead paragraph of *Method*, and `findings` under the results table. Keep them within what the CV and the evidence on the page support.
- Media entries carry a `section` of `intro`, `method`, `evidence`, or `limitation`. `intro` is a single project video shown before the contribution; `limitation` is for failure footage so unsuccessful trials are never presented as positive results.
- Metrics are rendered as a table (condition, result, note). Put the evaluation condition in the note.

To add a project:

1. Add one Markdown file in `src/content/projects` with a unique filename/slug.
2. Add its reviewed web derivatives under `public/media`.
3. Register every published asset in `content/media-manifest.json`.
4. Run `pnpm check`, `pnpm build`, and `pnpm test`.

Only link a project repository when its public history and README clearly substantiate Hyeonjun Cho's contribution. Otherwise leave `links: []`; the page then shows "Available on request."

## Media policy and budget

- Faces: Hyeonjun Cho has approved showing his own face (recorded in the manifest with the date). Any other identifiable person must be pixelated before publication; the mask window and frame counts are logged next to the source in `content/raw-media/`.
- Videos: H.264 MP4, 720p or lower, muted, fast-start, no more than 8 MB each. Assets marked `intendedUse: "Hero"` are limited to 5 MB; the current homepage video is registered as `Hero and Evidence` and therefore uses the 8 MB budget.
- Posters: WebP, no more than 250 KB. General images: WebP or AVIF, no more than 350 KB.
- Published media total: no more than 45 MB.

`content/raw-media/` is git-ignored. It holds source recordings, the masking scripts (`mask_faces_video.py`, `lpb/mask_hero_full.py`), and their JSON logs. Never commit originals, and never substitute a re-recorded preview for a source file.

Web derivatives may be staged locally with `publicClearance: false` in the manifest for review. The GitHub Pages workflow runs `pnpm release:check` and refuses to deploy while any published asset remains uncleared, so flipping that field is the release decision. All 38 assets published on 2026-08-26 were approved by the owner; the approval note lives in the manifest `policy` block.

## Deployment and recovery

The GitHub Pages workflow (`.github/workflows/deploy.yml`) runs `pnpm check`, `pnpm release:check`, and `pnpm build`, then deploys `dist` on every push to `main`. This user-site repository intentionally sets `site: https://cheesss.github.io` and no Astro `base` path.

A bad deployment is recovered by reverting the responsible commit on `main`; GitHub Actions then redeploys the last good state.

The site uses no analytics, cookies, forms, CMS, or runtime integrations.
