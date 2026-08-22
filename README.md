# TypeToDeploy — presentation site

Static Astro site for TypeToDeploy, deployed on Cloudflare Workers (static
assets). French is the default locale (`/`), English lives under `/en/`.

## Run locally

```sh
npm install
npm run dev
```

Opens at `http://localhost:4321`. French pages at `/` and `/demonstration`,
English at `/en/` and `/en/demo`.

## Build

```sh
npm run build
```

Outputs the static site to `./dist/`. Check it locally before deploying:

```sh
npm run preview
```

## Deploy

```sh
npm run deploy
```

Runs `astro build` then `wrangler deploy`. This pushes `./dist/` to
Cloudflare as static assets per `wrangler.jsonc` — there is no Worker script,
just the built files. The Cloudflare Pages/Workers project itself is
connected to this repository through the Cloudflare dashboard, not through
this script; `npm run deploy` is for manual/local pushes only.

To check a deploy would succeed without actually deploying:

```sh
npx wrangler deploy --dry-run
```

## Where things live

- **`src/i18n/fr.ts` and `src/i18n/en.ts`** — all page copy, as plain
  dictionaries. To edit any text on the site, edit the matching string in
  both files (French and English carry the same keys). Don't put copy
  directly in `.astro` files — `HomeBody.astro` and `DemoBody.astro` are one
  template each, rendering whichever dictionary (`fr` or `en`) is passed in.
- **`src/components/`** — the two page templates (`HomeBody.astro`,
  `DemoBody.astro`) plus shared pieces (`Header`, `Footer`, `Badge`).
- **`src/pages/`** — thin route files. Each just picks a language, loads its
  dictionary, and renders `Layout` + the matching body component.
- **`src/assets/demo/`** — the demo page's screenshots, imported and
  processed into WebP by Astro at build time.
- **`public/media/`** — the demo video and its poster frame, served as-is
  (not processed by Astro's image pipeline).
- **`public/`** — everything else served verbatim from the site root:
  favicon, OG image, `robots.txt`.

## `website_design/`

This directory is the **approved design reference** — desktop and mobile
mockups exported from Claude Design, for both languages, plus the one-pager.
It is not part of the build (nothing in `src/` or `public/` imports from it),
it is not copied into `dist/`, and it stays in version control as the
record of what the site is supposed to look like. Do not delete or edit it;
when the design changes, that happens in a new export, not a hand-edit here.
