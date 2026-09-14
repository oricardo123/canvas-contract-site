# Canvas homepage SEO launch preparation

Confirmed by Ricardo on 8 September 2026: brand **Canvas**, launch domain **canvascustomfurniture.com**. The preferred URL is `https://canvascustomfurniture.com/`.

- Title: **Custom Furniture | Made to Your Specifications | Canvas**
- Description: Custom furniture made to your specifications for hotels, restaurants, bars and private projects. Based in Portugal, working internationally.
- Social image: the existing St. Regis Venice public lounge photograph, with a descriptive alternative text.
- Homepage WebSite structured data and `og:site_name` identify the site as Canvas.

The visible homepage headline and approved content remain unchanged. “Custom furniture” is the working target keyword; no search-volume study or ranking claim has been made. Search engines may choose a different title, snippet or site name.

## Current review behavior

`seo.config.json` centralizes the brand, domain and homepage metadata. `vite.config.ts` uses the build environment to produce matching initial HTML, runtime metadata and robots.txt. `usePageMeta` updates metadata after route navigation. The generated sitemap contains all existing public routes at the confirmed launch origin.

Only `VERCEL_ENV=production` enables indexing and uses the launch origin for social images. Preview, development and unset environments retain the noindex meta tag, blocking robots.txt and review-origin images. The source `public/robots.txt` remains blocking; the Vite build writes the appropriate generated version. Vercel's conditional X-Robots-Tag header blocks indexing on every hostname except `canvascustomfurniture.com`, including Vercel's production alias. The established review branch remains unchanged. A build alone does not launch or index the site.

## Launch actions still required

1. Obtain domain/DNS access and connect the confirmed domain to the intended Vercel project. Public records currently identify Stack Domains/20i DNS; the recorded transfer was arranged through Christine Reed. Verify current access. Preserve existing mail records and confirm both published email addresses still work.
2. Configure HTTPS and the preferred hostname: redirect `www.canvascustomfurniture.com` to the apex, preserving paths and query strings. Verify the actual DNS instructions supplied by Vercel at launch.
3. Deploy this launch branch in Vercel's **Production** environment with access to system environment variables enabled. `VERCEL_ENV=production` switches the build's initial/rendered robots metadata, social image origin and robots.txt together. A preview build must be rebuilt for Production; assigning a production hostname to an existing preview artifact does not change its metadata. Verify actual response headers on the apex and Vercel review host.
4. Run both `VERCEL_ENV=preview npm run build` and `VERCEL_ENV=production npm run build`. Their SEO validation rejects mismatched homepage metadata, missing sharing artwork, incorrect sitemap routes or inconsistent indexing controls. A plain `npm run build` also defaults to review protection. Inspect the exact production output before deployment.
5. On the deployed domain, verify HTTPS, homepage HTML/rendered canonical and metadata, sharing image access, robots.txt, response headers and sitemap. Inspect representative Collection/product and legacy URLs.
6. Verify domain ownership in Google Search Console, submit the sitemap and use URL Inspection on the homepage. No ownership verification, sitemap submission or production deployment has been performed in this preparation.

## Broader site launch work

This change prepares the homepage. Other routes still receive the shared SPA HTML before JavaScript runs. For reliable route-specific social previews and initial metadata, prepare server rendering or prerendering for those routes. The fallback currently returns the app for unknown paths; implement genuine HTTP 404 responses and HTTP redirects for legacy URLs before considering the complete site SEO finished. Browser-side route changes alone do not provide those HTTP semantics.

Current Google guidance: [title links](https://developers.google.com/search/docs/appearance/title-link), [site names](https://developers.google.com/search/docs/appearance/site-names), [snippets](https://developers.google.com/search/docs/appearance/snippet) and [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
