# Handoff

## State
- Branch: `codex/projects-card-folder-flow`; Explore has six monochrome folders, three of them opening project case studies.
- Case studies now have a compact hero and a scrollable seven-part structure: situation, insights, decisions, system artifact, result, and contact CTA.
- Existing project summaries remain. Role/year/scope, evidence, insights, decisions, and outcomes are visibly marked for the owner to supply; no project claims were invented.
- Wheel, touch, and keyboard navigation inside the case study scroll region are exempt from global screen switching.
- The project roster discussion is pending: WellUber, MyLorry platform, MyLorry Driver, CounselAI, Mindline or TF, and Sentient. Current folders were not replaced yet.

## Next
- Owner reviews the layout in the browser and supplies real copy, screenshots, and one system artifact per case study.
- Decide Mindline vs TF and Sentient's distinct capability before replacing the current six folders.
- Manually check case study scroll and return path on desktop/mobile, keyboard, both themes, and both languages.
- Open PR to `main` when GitHub CLI authentication works: https://github.com/darthyon/portfolio/pull/new/codex/projects-card-folder-flow

## Blockers-decisions
- useLayouts Accessible Action page and registry source could not be fetched here; the optional CTA uses the supplied LinkedIn URL instead.
- `npx tsc --noEmit` and `npm run lint` passed on the case study layout. No tests or browser preview were run per project policy.
- Earlier `npm run build` could not fetch IBM Plex Sans from Google Fonts; retry with network access.
- `gh auth status` previously reported invalid tokens for both configured accounts; Git push via the repository credential helper works.
