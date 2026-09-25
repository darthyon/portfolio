# Youn Yusuff portfolio

A one-page portfolio presented inside a browser-style frame. It has an ID-card introduction, folder-based project browser, a small Three.js Petronas Twin Towers builder, and a contact form.

## Component system

- Use the local shadcn/ui components in `components/ui` for controls, form fields, badges, separators, progress, and Card composition.
- Use `PortfolioCard` from `components/portfolio-card.tsx` for card surfaces. Its default `raised` elevation is for main surfaces; `elevation="subtle"` is for cards inside another surface. Both are borderless and use the light/dark shadow tokens in `app/globals.css`.
- Use `PortfolioInfoCard` from `components/portfolio-info-card.tsx` for the static Side Quests and About entries. Pass the localized category, title, and summary as props.
- Put layout and artwork rules in `app/globals.css`. Keep card elevation in the shared tokens there instead of adding a separate border or shadow to each screen.
- Project rows are shadcn Buttons so each row remains one keyboard-accessible action; they use the same subtle shadow token as nested cards.

```tsx
import { PortfolioCard } from "@/components/portfolio-card";
import { CardContent } from "@/components/ui/card";

<PortfolioCard elevation="subtle">
  <CardContent>Card content</CardContent>
</PortfolioCard>
```

The surface styling takes its rounded shape and soft elevation cue from the [useLayouts Bento Card](https://uselayouts.com/docs/components/bento-card), adapted to this portfolio's borderless look. The mock browser structure and Three.js canvas remain site-specific.

## Run locally

```sh
npm install
npm run dev
```

## Update portfolio content

- Edit profile and project content in `app/portfolio-data.ts`.
- Replace the portrait slot in `app/site-experience.tsx` with the supplied 3D portrait asset.
- Replace the contact artwork placeholder with the supplied image.
- Set the contact recipient before enabling email delivery in `app/site-experience.tsx`.

The site has no backend or stored visitor submissions. The contact form is a presentation-ready shell until a recipient address is supplied.

## Checks

```sh
npx tsc --noEmit
npm run lint
npm run build
```
