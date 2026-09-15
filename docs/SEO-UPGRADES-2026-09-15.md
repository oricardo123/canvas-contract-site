# Metadata upgrades without visual changes

The intended audience is high-end hotels, restaurants, clubs and luxury private residences worldwide, without a country priority. Search titles and descriptions reflect that direction and the existing catalogue/project evidence. These are relevance-based choices; search volume, competition and buying roles have not been validated.

`src/seo/page-meta.ts` owns route metadata for both client navigation and build-time HTML heads. The 997 sitemap URLs now each have their own initial title, description, canonical and social metadata. Product search titles add the furniture type while visible codes remain unchanged. `seo.config.json` retains shared homepage/brand/origin settings.

The app remains client-rendered. Generating heads does not prerender visible page content. Existing unknown/legacy route behaviour remains; genuine HTTP 404s and server-side legacy redirects are separate work.

The build validates all route heads, distinct titles, images, canonicals, sitemap coverage and indexing mode. Only `VERCEL_ENV=production` enables indexing. Vercel review hosts retain their noindex header and review builds block crawling. `cleanUrls` serves generated `.html` files at their existing extensionless URLs, with the SPA fallback retained.

Cloudflare uses the existing static-only Worker with native SPA fallback and automatic HTML handling. Build using `VERCEL_ENV=production npm run build`; omit the legacy Netlify `_redirects` file from the upload and retain the workers.dev-only noindex `_headers`. Do not change DNS, email or registrar settings for this release.

Visible JSX, CSS, assets, product data, project records and links are preserved. Task evidence and deployment results live in the Canvas owner workspace at `work/website-finishing/seo-upgrades-2026-09-15/`.
