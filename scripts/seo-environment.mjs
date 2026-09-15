import { readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const seo = JSON.parse(readFileSync(new URL("../seo.config.json", import.meta.url), "utf8"));

// Only production enables indexing; local and preview builds stay excluded from indexing.
export const reviewMode = process.env.VERCEL_ENV !== "production";

export function deploymentMetadata() {
  const imageOrigin = reviewMode ? seo.reviewOrigin : seo.siteOrigin;
  const escapeHtml = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  return {
    name: "canvas-deployment-metadata",
    transformIndexHtml(html) {
      return html
        .replaceAll("__CANVAS_TITLE__", escapeHtml(`${seo.home.title} | ${seo.siteName}`))
        .replaceAll("__CANVAS_DESCRIPTION__", escapeHtml(seo.home.description))
        .replace("__CANVAS_ROBOTS__", reviewMode ? "noindex, nofollow" : "index, follow")
        .replaceAll("__CANVAS_IMAGE_ORIGIN__", imageOrigin);
    },
    async writeBundle(options) {
      if (!options.dir) throw new Error("Canvas metadata requires a build output directory");
      // Override the fail-closed public/robots.txt only in the generated build.
      await writeFile(resolve(options.dir, "robots.txt"), reviewMode
        ? "User-agent: *\nDisallow: /\n"
        : `User-agent: *\nAllow: /\n\nSitemap: ${seo.siteOrigin}/sitemap.xml\n`);
    },
  };
}
