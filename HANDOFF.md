# Handoff

## State
- Branch: `codex/projects-card-folder-flow`; Explore has six monochrome CardFolder entries opening a shared scrollable case study layout.
- Project lineup: WellUber, MyLorry, MyLorry Driver, CounselAI, Mindline, Sentient. The previous MySubsidi, Little tools, Interaction studies, and About entries are removed from Explore.
- Five case studies use the owner's supplied insights, changes, artifact framing, and before → after results, with concise English/Bahasa Melayu copy.
- Sentient is framed as learning Web3 onboarding and wallet mechanics; its detailed story is pending. Role/year/scope and real visuals remain marked as pending for every project.
- The hero uses an abstract labelled placeholder instead of a fabricated product screenshot. The CTA uses the owner's supplied LinkedIn URL.
- Wheel, touch, and keyboard input inside a case study scroll region do not switch portfolio screens.
- Dark theme uses neutral black and charcoal surfaces, borders, artwork, and Play scene; primary blue remains on interactive actions.

## Next
- Owner reviews six folders, case study content, scroll/back path, mobile layout, both themes, and both languages; check dark theme on Intro, Explore, case studies, Play, and contact dialog.
- Supply real project visuals, role/year/scope, system artifacts, and Sentient insights/decisions/result.
- Open PR to `main` when GitHub CLI authentication works: https://github.com/darthyon/portfolio/pull/new/codex/projects-card-folder-flow

## Blockers-decisions
- useLayouts Accessible Action page and registry source could not be fetched; the optional CTA uses LinkedIn directly.
- `git diff --check`, `npx tsc --noEmit`, and `npm run lint` passed for the dark theme update. No tests or browser preview were run per project policy.
- Earlier `npm run build` could not fetch IBM Plex Sans from Google Fonts; retry with network access.
- `gh auth status` previously reported invalid tokens for both configured accounts; Git push through the repository credential helper works.
