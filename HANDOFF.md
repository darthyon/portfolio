# Handoff

## State
- The local portfolio uses Next.js App Router, TypeScript, Tailwind CSS 4, local shadcn/ui components, and npm.
- Sites/Vinext/Cloudflare build wiring was removed from this repository. The previously hosted Site was not changed.
- Global screen, theme, language, and navigation state lives in `app/site-experience.tsx`; screen UI and shared copy live in `components/screens/`.
- The app is frontend-only. The tower builder is interactive. Intro contact opens a dialog with LinkedIn, email, and a LinkedIn prompt for visitors who need a phone number. No phone number, GitHub, or résumé link is published.

## Next
- Manually review screen navigation and fit on desktop, mobile, and short viewports.
- Confirm profile and project copy, then replace portrait and employer assets when supplied.
- Only add a public résumé link if the owner decides to share a downloadable PDF.

## Blockers-decisions
- Do not add a backend, persist visitor data, or invent contact details.
- Do not reconnect this repository to Sites or change the hosted version without an explicit request.
- Run `npm run lint`, `npx tsc --noEmit`, and `npm run build`; no tests or previews are run in chat.
