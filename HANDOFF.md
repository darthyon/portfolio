# Handoff

## State
- Branch: `feat/remaining-case-studies` (from `main` after PR #3 merged). Uncommitted: MyLorry case study; preserve the working tree. Untracked `.claude/launch.json` (dev preview config, owner undecided).
- Case studies live in `app/portfolio-data.ts`. Two layouts:
  - `narrative` (scrolling sections, any count): WellUber, MyLorry Driver, MyLorry. `screens` visuals accept `layout: "wide"` for desktop screenshots; wide galleries and phone galleries have no background box.
  - `showcase` (CounselAI): intro line, `ScreenStack` (`components/screens/screen-stack.tsx`, motion drag, ←/→ keys, clickable five-step flow), one reasoning line per step, closing.
- MyLorry: four sections (two text-only), calendar + new-appointment gallery, full-width trip planner. Assets in `public/projects/mylorry/`.
- Copy is deliberately plain language for non-technical visitors, in English and Bahasa Melayu. Folder card summaries must fit one line on a 375px phone (about 31 characters).
- Digital Identity Wallet (id `identity-wallet`): four sections, phone galleries. Screenshots were redacted from the real product (only the brand name, logo and branded URL removed; owner is fine with the sample username, display name and recovery words); never add the original product name anywhere, including ids, filenames or alt text.
- Folder 06 is "Crafter" (id `crafter`), a crafting-notes game companion, not built yet. Its page shows a `comingSoon` empty state (hatching-chick emoji, “Still hatching” note); projects without `narrative`/`showcase` fall back to that view. The old placeholder template and Mindline were removed.

## Next
- Owner to review MyLorry on screen (not visually verified: browser navigation to localhost was denied).
- Folder order: Applied: MyLorry Driver, CounselAI, WellUber, MyLorry Schedule, Digital Identity Wallet, Crafter.
- Owner to supply a CounselAI role line (role, solo/team, duration).
- Cleanup candidate: `story`, `CaseStudyStory`, `previewItems`, and old-template CSS/copy keys (`caseStudyRole`, `caseStudySituation`…) are now unused.
- Folder sheets carry Fluent Emoji 3D (MIT; `public/projects/emoji/` with LICENSE.txt), set per project via `folderEmoji`.

## Blockers-decisions
- CounselAI screenshot case details are inconsistent; owner accepted this (do not raise again).
- WellUber: owner to confirm factual claims, including "an employee can be linked to more than one employer".
- `gh` active account is `yon-tug`; use `GH_TOKEN=$(gh auth token --user darthyon)` per command for `darthyon/portfolio`. CI status is checked manually by the owner.
- No automated tests per repo policy; `npm run build` has not been run on this branch.
