import { useEffect } from "react";
import { getPageMeta } from "../seo/page-meta";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

export function usePageMeta(path?: string) {
  useEffect(() => {
    const meta = getPageMeta(path || window.location.pathname, __CANVAS_REVIEW_MODE__);
    document.title = meta.title;

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (meta.canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.append(canonical);
      }
      canonical.href = meta.canonicalUrl;
    } else canonical?.remove();

    let schema = document.head.querySelector<HTMLScriptElement>("#site-name-data");
    if (meta.siteNameData) {
      if (!schema) {
        schema = document.createElement("script");
        schema.id = "site-name-data";
        schema.type = "application/ld+json";
        document.head.append(schema);
      }
      schema.textContent = JSON.stringify(meta.siteNameData);
    } else schema?.remove();

    for (const [key, value] of Object.entries({
      description: meta.description, robots: meta.robots,
      "twitter:card": "summary_large_image", "twitter:title": meta.title,
      "twitter:description": meta.description, "twitter:image": meta.image,
      "twitter:image:alt": meta.imageAlt,
    })) setMeta("name", key, value);
    for (const [key, value] of Object.entries({
      "og:title": meta.title, "og:description": meta.description, "og:type": meta.type,
      "og:image": meta.image, "og:image:alt": meta.imageAlt,
      "og:site_name": meta.siteName, "og:locale": "en_GB",
    })) setMeta("property", key, value);
    if (meta.canonicalUrl) setMeta("property", "og:url", meta.canonicalUrl);
    else document.head.querySelector('meta[property="og:url"]')?.remove();
  }, [path]);
}
