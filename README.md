# Hyeonjun Cho — Academic Research Portfolio

An English-language research portfolio for robot-learning laboratory outreach. The site prioritizes fast evidence review: research direction, personal role, team contribution, quantitative results, limitations, and contact actions.

## Local development

Requirements: Node.js 22.12 or newer and pnpm 11.

```bash
pnpm install
pnpm astro dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

Quality gates:

```bash
pnpm check
pnpm build
pnpm test
pnpm audit:public
```

## Content model

Research case studies live in `src/content/projects`. Each project declares its title, period, status, summary, individual role, team contribution, metrics, methods, limitations, media, links, featured status, and order. Media entries use a `section` value of `method`, `evidence`, or `limitation` so unsuccessful trials are never presented as positive results. Astro validates the schema during checks and builds.

To add a project:

1. Add one Markdown file in `src/content/projects` with a unique filename/slug.
2. Add its reviewed visual assets under `public/media`.
3. Register every published asset in `content/media-manifest.json`.
4. Run `pnpm check`, `pnpm build`, and `pnpm test`.

Only link a project repository when its public history and README clearly substantiate Hyeonjun Cho's contribution. Otherwise retain `Code available upon request.`

## Media policy and budget

- No identifiable faces or team photos in v1; prefer robots, sensors, and screen recordings.
- Videos: H.264 MP4, 720p or lower, muted, fast-start, no more than 8 MB each.
- Hero video: no more than 5 MB.
- Posters: WebP, no more than 250 KB.
- General images: WebP or AVIF, no more than 350 KB.
- Initial published media total: no more than 45 MB.

Original research media is not committed until ownership and public-release permission are confirmed. Never substitute a re-recorded Notion preview for the source file.

Web derivatives may be staged locally with `publicClearance: false` in the manifest for review. Do not push those assets to the public repository until the owner changes that field after confirming release permission.
The GitHub Pages workflow runs `pnpm release:check` and refuses to deploy while any staged asset remains uncleared.

## Deployment and recovery

The GitHub Pages workflow builds and deploys on a push to `main`. This user-site repository intentionally sets `site: https://cheesss.github.io` and no Astro `base` path.

Deployment is intentionally deferred until the local copy, research claims, attribution, and media clearance are approved. After publication, a bad deployment can be recovered by reverting the responsible commit on `main`; GitHub Actions then redeploys the last approved state.

The site uses no analytics, cookies, forms, CMS, or runtime Notion integration.
