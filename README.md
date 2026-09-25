# Youn Yusuff portfolio

A one-page portfolio presented inside a browser-style frame. It has an ID-card introduction, folder-based project browser, a small Three.js Petronas Twin Towers builder, and a contact form.

## Run locally

```sh
npm install
npm run dev
```

## Update portfolio content

- Edit profile and project content in `app/portfolio-data.ts`.
- Replace the illustrated portrait slot in `app/site-experience.tsx` with the supplied 3D portrait asset.
- Replace the contact artwork placeholder with the supplied image.
- Set the contact recipient before enabling email delivery in `app/site-experience.tsx`.

The site has no backend or stored visitor submissions. The contact form is a presentation-ready shell until a recipient address is supplied.

## Checks

```sh
npx tsc --noEmit
npm run lint
npm run build
```
