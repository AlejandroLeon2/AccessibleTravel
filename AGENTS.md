# AGENTS.md — AccessibleTravel

## Stack

Astro 7 (static) + TinaCMS 3 + Tailwind CSS v4 + MDX. Package manager: **pnpm**.

## Dev server

```sh
pnpm dev          # Starts TinaCMS (ports 9000/4001) + Astro (4321) in parallel
pnpm dev:stop     # Kills all dev processes on those ports
```

If `pnpm dev` fails with "TinaCMS ya está ejecutándose", run `pnpm dev:stop` first.

## Build

```sh
pnpm build        # tinacms build --content=local && astro build
pnpm preview      # Preview production build
```

Build order matters: TinaCMS generates content first, then Astro builds. Do not skip the TinaCMS step.

## i18n

- Locales: `en`, `es` (default: `en`)
- **Prefix routing is on for all locales** including default — routes are `/en/...` and `/es/...`
- Pages live in `src/pages/en/` and `src/pages/es/` (mirrored structure)
- Root `src/pages/index.astro` exists but the real entry points are the locale pages

## Content architecture

Two content pipelines coexist:

1. **TinaCMS-managed** (CMS editing via `tinacms dev`):
   - Blog: `src/content/blog-es/`, `src/content/blog-en/`
   - Group tours: `src/content/tours-grupales/es/`, `src/content/tours-grupales/en/`
   - Site config: `src/content/config/site.json`
   - Menus: `src/content/config/menu-es.json`, `menu-en.json`
   - Gallery logos: `src/content/config/gallery-logos.json`

2. **Script-generated** (run manually):
   - Global tours: `src/scripts/convertPeruToursToContent.mjs` reads `src/data/peru/peru-{en,es}/travels.json` → writes to `src/content/tours-global/peru/{en,es}/`
   - Run with: `pnpm content:global-tours`

Content schemas are defined in `src/content.config.ts` (Astro) and `tina/schemas/` (TinaCMS). Both must stay in sync when adding fields.

## TinaCMS

- Config: `tina/config.ts`
- Generated output: `tina/__generated__/` (gitignored)
- Admin build: `public/admin/`
- Required env vars (in `.env`): `PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`
- Dev allows origins: `localhost:4321`, `localhost:4001`

## Styling

- Tailwind CSS v4 via `@tailwindcss/vite` plugin (not PostCSS)
- Global styles: `src/styles/global.css` — imports Tailwind + animations + custom fonts
- Custom fonts loaded from `/fonts/` in public directory (TAN Nimbus, Satisfy)

## TypeScript

Extends `astro/tsconfigs/strict`. No separate tsconfig.

## No test suite

No tests, test runner, linting, or formatting config exist in this repo.

## Skills

- `tinacms-work` — load when working on TinaCMS collections, fields, config, schemas, visual editing, or content model changes. Covers the dual-schema system (TinaCMS + Astro), field types, visual editing islands, and common gotchas.

## Key gotchas

- The `predev` hook auto-runs `stop-dev.mjs` before every `pnpm dev`, so orphaned processes on ports 4321/4001/9000 are cleaned up automatically.
- `tina/__generated__` is gitignored — do not commit generated TinaCMS files.
- `.env` is gitignored — the checked-in `.env` contains TinaCMS credentials; treat it as non-secret for local dev but do not commit new secrets.
- Tailwind v4 uses `@tailwindcss/vite` — no `tailwind.config.js` file exists. Customization happens in CSS with `@theme` directives.
- The `ssr.noExternal` in astro config includes `@tinacms/astro` and `@tinacms/bridge` — removing them breaks the Tina integration.
