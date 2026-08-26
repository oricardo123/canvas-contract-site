# Canvas Contract Furniture

A responsive React rebuild of the Canvas Contract Furniture website. The design retains the original sober charcoal, warm neutral and white palette, while introducing clearer editorial hierarchy, modern catalogue tools and an accessible mobile experience.

## Included

- Home, Collection, Studio, Work and Contact pages
- Eight furniture categories
- 984 searchable product records and dynamic product-detail pages
- Redirects for the current `.html` routes and product URLs
- Locally stored catalogue imagery, so the new site is not dependent on the existing website at runtime
- Keyboard-accessible navigation, visible focus styles, skip link, semantic landmarks, reduced-motion support and responsive layouts
- Page-specific canonical, Open Graph and Twitter metadata, plus a generated sitemap containing all 997 public URLs
- A data model with `salesMode`, `price`, `stock` and `edition` fields ready for a future unique-pieces shop

## Run locally

```sh
npm install
npm run dev
```

The development server prints the local address. For a production build:

```sh
npm run build
npm run preview
```

The production output is written to `dist/`.

Every production build also verifies the eight category totals, all 984 unique product routes and the presence of the 1,968 local catalogue image files before generating `public/sitemap.xml`.

## Deployment

The project includes SPA route fallbacks for Netlify-compatible hosts (`public/_redirects`) and Vercel (`vercel.json`). For another host, configure all unknown paths to serve `index.html` so direct visits to catalogue and legacy routes work correctly.

Canonical URLs and the sitemap currently use `https://www.canvascontract.com`. If the finished site will use another production domain, update `SITE_ORIGIN` in `src/hooks/usePageMeta.ts` and `origin` in `scripts/generate-sitemap.mjs` before launch. A server-rendered or pre-rendered deployment is recommended if HTTP-level 404 responses and metadata without JavaScript are important to the final SEO strategy.

## Contact form

The current contact form prepares a pre-filled email in the visitor's email application. Before launch, it can be connected to a serverless form endpoint or CRM without changing the page layout.

## Brand asset

The supplied screenshot remains preserved at `public/assets/brand/canvas-logo.png`.
The website uses the derived transparent asset at
`public/assets/brand/canvas-logo-transparent.png` so the header, footer and
browser icon have no white rectangle. For the sharpest production result,
replace the derived file later with the official transparent SVG or master PNG.

The legacy source only provides 100×100 px artwork for ECB-23, ECB-25 and CAB-01 through CAB-06. Those eight records are intentionally shown at their original size instead of being blurred by enlargement. Replace their `-large.jpg` files when original high-resolution photography becomes available.
