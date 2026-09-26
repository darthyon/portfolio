# Portfolio

## Product

A personal portfolio presented as a mock browser. It has an ID-card intro with contact actions, folder-based selected work, and a small Petronas Twin Towers builder. Show one screen at a time in a locked viewport. Support the screen switcher, wheel, swipe, keyboard, light/dark theme, and English/Bahasa Melayu.

## Stack and boundaries

- Next.js App Router, TypeScript, Tailwind CSS 4, and local shadcn/ui components.
- Three.js is used only for the tower builder.
- Use npm and the standard Next.js commands in `package.json`.
- Keep the site frontend-only. Do not add a backend, authentication, visitor data, services, or persistence without approval.
- Keep the portrait and employer marks replaceable. Do not invent contact URLs or a recipient email.

## Implementation

- Define portfolio content interfaces in `app/portfolio-data.ts` before adding data consumers.
- Keep global screen, theme, language, and gesture state in `app/site-experience.tsx`.
- Keep each screen's rendering in `components/screens/`; keep screen-specific behavior near that screen. `components/screens/copy.ts` owns shared screen labels and copy.
- Use `PortfolioCard` for portfolio surfaces and local shadcn/ui primitives for controls. Add a shadcn component only when the UI needs it.
- Keep mock-browser and artwork layout rules in `app/globals.css`; use shared tokens for card surfaces.
- Avoid eyebrow/overline labels across portfolio screens. Start sections with their title; show category metadata after the title in normal casing.
- The intro contact dialog exposes the supplied LinkedIn profile and email. If visitors need a phone number, direct them to LinkedIn; do not display or collect the phone number. Do not add a GitHub or résumé link without the owner's consent.
- Avoid hosting-provider configuration in the app. Keep deployment setup outside the product code.

## Verification

- Use `npm run lint`, `npx tsc --noEmit`, and `npm run build` when permitted.
- Do not run automated tests or launch a browser preview in chat. List the manual interaction checks for the owner after code changes.
