# Tan Development

Marketing site for Tan Development, a Nashville custom home builder led by Sebastian Tan. Built with [Astro](https://astro.build) and shipped as static output, so every page is a plain HTML file at deploy time. Pages cover the home, portfolio, individual project, process, about, and contact routes, plus a lead form that posts to a Cloudflare Worker.

## Requirements

- Node.js `^18.17.1`, `^20.3.0`, or `>=21.0.0` (matches Astro 4.16's supported range)
- npm `>=9.6.5`

## Install

```bash
npm install
```

## Run the dev server

```bash
npm run dev
```

Starts Astro's dev server at `http://localhost:4321` with hot reload.

## Build

```bash
npm run build
```

Outputs the static site to `dist/`. Run `npm run preview` afterward to serve that build locally and sanity-check it before deploying.

## Cloudflare Pages deploy settings

- **Build command:** `npm run build`
- **Output directory:** `dist`

No environment variables are required for the build. The contact form's Turnstile site key and the Worker URL are both hardcoded client-side (see `src/pages/contact/index.astro`), not build-time secrets.

## How to add a new project

Projects are loaded from markdown files in `src/data/projects/` (an Astro content collection defined in `src/content/config.ts`, using the `glob` loader against that folder). To add one:

1. Create a new file at `src/data/projects/<slug>.md`.
2. Fill in the required frontmatter fields:
   - `name` (string): project display name
   - `slug` (string): matches the filename, used in the `/portfolio/<slug>/` URL
   - `neighborhood` (string)
   - `sqft` (number)
   - `beds` (number)
   - `baths` (number)
   - `year` (number)
   - `status` (one of `"Sold"`, `"Available"`, `"Under Construction"`)
   - `heroImage` (string): path to the hero image, e.g. `/images/projects/<slug>/hero-1600x1066.jpg` (name it with its real pixel dimensions, see "How to swap in a new photo" below)
   - `heroImageAlt` (string): descriptive alt text for the hero image
   - `gallery` (array of `{ src, alt }` objects): as many gallery photos as you have
   - `description` (string): one to two sentence summary used on cards and listings
   - `order` (number, optional): controls placement among featured/sorted projects
3. Write the project's body copy below the frontmatter (this renders on the project's detail page).
4. Add the project's images under `public/images/` (see below for the folder convention the existing projects use, e.g. `public/images/projects/<slug>/`).

The homepage, portfolio index, and project detail pages all read from this collection automatically. No route code needs to change to add a project.

## How to swap in a new photo

The site currently uses only real photos and renderings (no placeholder SVGs remain), stored under `public/images/projects/<slug>/` and referenced by exact path from a page's frontmatter or template.

1. Existing images encode their real pixel dimensions in the filename (e.g. `hero-1600x1066.jpg`), which lets `aspectDims()` in `src/pages/portfolio/[slug].astro` size the `<img>` correctly without layout shift. Follow the same convention for new images: `<slot-name>-<width>x<height>.<ext>`.
2. Either:
   - Replace the file at the same path and keep the same filename (simplest: no other file needs to change), or
   - Save the new photo at a new path (e.g. `public/images/projects/<slug>/hero-2400x1600.jpg`) and update the reference to it in the project's markdown frontmatter, the page template, or wherever that image path is used.
3. Update the `alt` text alongside the image to describe what's actually in the photo.

See `TODO.md` for the open facts on the current real projects (photo rights, unconfirmed specs) and the two sections that were removed entirely for lack of suitable real content.

## Contact form and the Cloudflare Worker

The contact form (`/contact/`) posts directly to a Cloudflare Worker at:

```
https://solitary-violet-297c.aistrategyus.workers.dev
```

It currently logs five fields: `name`, `phone`, `email`, `message`, and `turnstileToken`. The form on this site now also sends a sixth field, `projectType` (the "I'm interested in" dropdown: Custom Build, Available Homes, Land I Own, or Other). Nothing is broken today: the Worker simply ignores the extra field it does not recognize. But that field will not be captured or logged anywhere until the Worker is updated to read and log `projectType` alongside the other five fields.
