# Handoff

## State
- Portfolio rebuild and UI refinements are committed as `e2deb0f` (`Rebuild portfolio as local Next.js app`).
- Pushed to GitHub: `main` and `refactor/local-nextjs` both point at `e2deb0f` on `origin`.
- `origin` is `https://github.com/darthyon/portfolio.git`; the repository is private, as the owner requires.
- Stack: Next.js App Router, TypeScript, Tailwind CSS 4, local shadcn/ui, npm; Three.js only for the tower builder.
- Global screen, theme, language, and navigation state lives in `app/site-experience.tsx`; screen UI and shared copy live in `components/screens/`.
- The app is frontend-only. The tower builder is interactive. Intro contact opens a dialog with LinkedIn and email, plus a LinkedIn prompt for visitors who need a phone number. No phone number, GitHub profile, or résumé link is published.
- The remote's original placeholder `Initial commit` (`8e6f526`) was replaced by force-push; it is preserved locally as `backup/origin-main-initial`.

## Next
- Manually review screen navigation and fit on desktop, mobile, and short viewports.
- Confirm profile and project copy, then replace portrait and employer assets when supplied.
- Only add a public résumé link if the owner decides to share a downloadable PDF.
- Delete the now-redundant `refactor/local-nextjs` remote branch if work continues on `main`.

## Blockers-decisions
- Do not add a backend, persist visitor data, or invent contact details.
- Do not reconnect this repository to Sites or change the hosted version without an explicit request.
- Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`; there is no test script and no browser preview in chat.

## GitHub access
- The owner uses `darthyon` for personal work and `yon-tug` for work, so `yon-tug` stays the globally active `gh` account.
- This repository pins `darthyon` with a repository-local credential helper (`credential.https://github.com.helper`), because the global `gh` helper resolves to the active account and `yon-tug` returns 404 for this private repo. Do not remove it, and do not switch the global active account.
- SSH: plain `git@github.com` is not registered on GitHub, so it fails with `Permission denied (publickey)`. The working keys are wired to the `github-darthyon` and `github-yon-tug` aliases in `~/.ssh/config`.
- An earlier session reported invalid `gh` tokens and no repo access. That was an agent sandbox that could not read the macOS Keychain or reach the SSH agent, not an account problem; both accounts authenticate correctly on the host.
