# Handoff

## State
- Current branch: `codex/projects-card-folder-flow` at `7a1425b`, pushed to `origin` from `origin/main`.
- The Explore screen now has six monochrome CardFolder entries: three case studies, two side projects, and About.
- Project folders open case studies directly; the other folders open full-screen detail pages with a back path.
- Stack: Next.js App Router, TypeScript, Tailwind CSS 4, local shadcn/ui; Three.js only for the tower builder.
- Keep the site frontend-only; do not add persistence, visitor data, or invented project/contact details.

## Next
- Manually review folder hover/open, back navigation, focus return, and fit on desktop, mobile, and short viewports.
- Confirm the project and side-quest copy; replace portrait and employer assets when supplied.
- Open the PR from `codex/projects-card-folder-flow` to `main` once GitHub CLI authentication works; branch URL: `https://github.com/darthyon/portfolio/pull/new/codex/projects-card-folder-flow`.

## Blockers-decisions
- `npm run build` could not fetch IBM Plex Sans from Google Fonts; retry when the build environment can reach `fonts.googleapis.com`.
- TypeScript and lint passed. No tests or browser preview were run per project policy.
- `gh auth status` reports invalid tokens for both `yon-tug` and `darthyon`; Git's repository credential helper still pushed the branch successfully.
- `origin` is `https://github.com/darthyon/portfolio.git`; this private repository uses its local GitHub credential helper. Do not change the global `gh` account.
- SSH access uses `github-darthyon` / `github-yon-tug` aliases; plain `git@github.com` is not configured.
