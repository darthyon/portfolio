# Handoff

## State
- Branch: `codex/populate-projects-folder` (from `main`). Local commits: `7cea133` tower fix and `6f8ab97` MyLorry Driver case study. WellUber and CounselAI work is uncommitted; preserve the working tree.
- Modified: `app/portfolio-data.ts`, `components/screens/explore-screen.tsx`, `components/screens/narrative-gallery.tsx`, `app/globals.css`, and this file. New assets: `public/projects/welluber/*.webp`, `public/projects/counselai/*.webp`. Untracked `.claude/launch.json` (dev preview config).
- Explore has six project folders. MyLorry Driver is committed as a five-beat English/Bahasa Melayu narrative with ten WebP screenshots, compact galleries, and a journey diagram.
- WellUber is greenfield. Its uncommitted five-beat English/Bahasa Melayu story uses third-person, conversational copy. There is no old WellUber UI. Beat 2 shows a simple policy → entitlement → employee-view model above a wide gallery of two admin policy screenshots. Beats 3–4 show five employee-app screenshots in compact galleries. Beat 5 is text-only until exception evidence is supplied.
- CounselAI uses a `showcase` layout (not `narrative`): intro line, `ScreenStack` (`components/screens/screen-stack.tsx`, motion drag + ←/→ keys + clickable 5-step flow), one reasoning line per step, closing. Analytics/file-cabinet screenshots deliberately unused. Galleries have no fill; phone frames use the 393:852 ratio.
- WellUber and MyLorry Driver copy was rewritten in plain language (EN/BM); layouts unchanged.
- WellUber beat 1 is text-only; the `process` visual was removed.
- The two admin WebPs replaced the earlier policy/entitlement captures. The model now has equal-height, padded panels and centred arrows; full-width narrative beats allow copy to span the content column. Other projects and the case-study back/contact paths are unchanged.

## Next
- Owner to supply a CounselAI role line (role, solo/team, duration) to show under the title. Populate MyLorry, Mindline and Sentient (not the old template). Owner to confirm CounselAI screenshot inconsistencies (see below).
- Have the owner confirm WellUber factual claims. Ask for an organisation-switch state and a second organisation-specific Home screen, a paid “Amount to pay” state, and exception/process evidence before expanding beats 3–5.
- Confirm that the contact details visible in WellUber Profile and MyLorry Driver old Account/new Profile, plus the WellUber voucher code, are suitable for public display.
- Keep WellUber uncommitted until the owner requests a commit. Review the final diff before committing.

## Blockers-decisions
- CounselAI screenshots contradict themselves: “Discriminatory Conduct” title vs expense-fraud summary; chat recommends Termination 94% while the panel says Formal Warning 81%.
- The user rejected a two-row claims-versus-WellUber comparison as unclear. Keep the single product flow unless new evidence changes the story; do not imply an earlier WellUber product.
- Latest `npm run lint`, `npx tsc --noEmit`, and `git diff --check` passed. No automated tests ran per repo policy. At the owner's explicit request, the open local page was visually inspected at desktop/mobile widths in English/Bahasa Melayu and light/dark themes; browser settings were restored.
- A prior production build was unverified: Turbopack could not bind a worker port, and a Webpack retry could not fetch IBM Plex Sans from Google Fonts (`ENOTFOUND`).
