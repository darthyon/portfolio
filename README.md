# Yon Yusuff portfolio

A one-page portfolio inside a browser-style frame. Visitors can explore selected work, read about the designer, play with a small Petronas Twin Towers builder, and use contact actions below the intro's employer details.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS 4 and local shadcn/ui primitives
- Three.js for the tower builder
- npm

The app has no backend or stored visitor data.

## Structure

- `app/site-experience.tsx` owns the shared browser chrome, screen navigation, theme, language, and screen-level state.
- `components/screens/` contains one component for each screen and the shared screen copy.
- `app/portfolio-data.ts` contains typed profile, folder, project, and contact data.
- `app/tower-builder.tsx` contains the interactive Three.js scene.
- `components/portfolio-card.tsx` defines the shared portfolio card surface. Use its `raised` or `subtle` elevation.
- `app/globals.css` contains the mock-browser layout and artwork styles.

Keep project descriptions and visual previews together in the typed portfolio data. Add local UI primitives only as the interface needs them.

## Run locally

```sh
npm install
npm run dev
```

## Update portfolio content

- Edit profile, folders, projects, and contact channels in `app/portfolio-data.ts`.
- The intro has a Need to talk? action that opens a contact dialog with LinkedIn, email, and a link directing visitors to LinkedIn if they need a phone number. Do not publish or collect the phone number, add a GitHub link, or add a public résumé without the owner's consent.
- Replace `public/portrait-yon.png` to update the portrait.
- Replace matching files in `public/logos/` to update employer marks.
- Add only owner-approved contact details to `contactChannels`. Email links open the visitor's email app; social links use the supplied profile URLs.

## Checks

```sh
npm run lint
npx tsc --noEmit
npm run build
```
