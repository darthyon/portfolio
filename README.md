# Youn Yusuff portfolio

A one-page portfolio presented inside a browser-style frame. It has an ID-card introduction, folder-based project browser, a small Three.js Petronas Twin Towers builder, and a contact form. It stays within the viewport and changes one screen at a time through the bottom navigation, mouse wheel, touch swipes, and page up/down keys.

## Component system

- Use the local shadcn/ui components in `components/ui` for controls, form fields, badges, separators, progress, and Card composition.
- Use `PortfolioCard` from `components/portfolio-card.tsx` for card surfaces. Its default `raised` elevation is for main surfaces; `elevation="subtle"` is for cards inside another surface. Both are borderless and use the light/dark shadow tokens in `app/globals.css`.
- Use `PortfolioInfoCard` from `components/portfolio-info-card.tsx` for the static Side Quests and About entries. Pass the localized category, title, and summary as props.
- Explore folders use `FolderVisual` for a small CSS card fan on hover, focus, or selection, adapted from [useLayouts Folder Interaction](https://uselayouts.com/docs/components/folder-interaction) without adding its animation dependency.
- The right panel's `ProjectRowCard` uses a shadcn Button for its single keyboard-accessible action and follows the thumbnail-first list-card pattern from [useLayouts Animated Collection](https://uselayouts.com/docs/components/animated-collection). Keep the project preview, metadata, title, description, and arrow together in this component.
- Put layout and artwork rules in `app/globals.css`. Keep card elevation in the shared tokens there instead of adding a separate border or shadow to each screen.
- Project rows are shadcn Buttons so each row remains one keyboard-accessible action; they use the same subtle shadow token as nested cards.
- The full-screen switcher is a set of discrete shadcn Buttons with one active state, inspired by [useLayouts Discrete Tabs](https://uselayouts.com/docs/components/discrete-tabs). It does not need the source component's extra motion or icon dependencies.

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
- Replace `public/portrait-youn.png` to update the intro portrait.
- Replace the matching files in `public/logos/` to update the employer marks.
- Set the contact recipient before enabling email delivery in `app/site-experience.tsx`.

The contact screen uses a centered note composer and has no backend or stored visitor submissions. Email delivery remains disconnected until a recipient address is supplied.

## Checks

```sh
npx tsc --noEmit
npm run lint
npm run build
```
