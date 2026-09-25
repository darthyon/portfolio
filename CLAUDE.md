# Portfolio site

## Product

A personal portfolio presented as a mock browser. The one-page flow is an ID-card intro, a folder-based selected-work browser, an optional Petronas Twin Towers builder, and a contact form.

## Stack and boundaries

- Vinext, TypeScript, Tailwind CSS 4, and Three.js for the small builder.
- Keep visitor data and authentication out of scope. There is no backend.
- The contact form must not claim to send until a recipient email is supplied and its mailto behavior is wired.
- Keep portrait and contact artwork replaceable; the owner will provide these assets.
- Use the approved mock browser, light/dark switch, English/Bahasa Melayu toggle, and screen pill.

## Implementation

- Define interfaces in `app/portfolio-data.ts` before adding data consumers.
- Prefer local CSS and existing dependencies. Don't add services or data storage without approval.
- Use `npm run lint`, `npx tsc --noEmit`, and `npm run build`; do not run tests or launch browser previews in chat.
