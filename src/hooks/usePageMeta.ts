import { useEffect } from "react";
import seo from "../../seo.config.json";

const SITE_ORIGIN = seo.siteOrigin;
const SITE_NAME = seo.siteName;
const DEFAULT_DESCRIPTION = seo.home.description;
const DEFAULT_IMAGE = seo.home.image;

interface PageMetaOptions {
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "product";
  noIndex?: boolean;
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.append(link);
  }

  link.href = href;
}

function absoluteUrl(value: string) {
  return new URL(value, SITE_ORIGIN).href;
}

function setSiteNameData(isHome: boolean) {
  let element = document.head.querySelector<HTMLScriptElement>("#site-name-data");

  if (!isHome) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.id = "site-name-data";
    element.type = "application/ld+json";
    document.head.append(element);
  }

  element.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  });
}

export function usePageMeta(
  title: string,
  description?: string,
  { path, image, imageAlt, type = "website", noIndex = false }: PageMetaOptions = {},
) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const pageDescription = description?.trim() || DEFAULT_DESCRIPTION;
    const pagePath = path || window.location.pathname;
    const canonicalUrl = absoluteUrl(pagePath);
    const socialImage = new URL(
      image || DEFAULT_IMAGE,
      seo.reviewMode ? seo.reviewOrigin : SITE_ORIGIN,
    ).href;
    const socialImageAlt = imageAlt || `${title} from ${SITE_NAME}`;

    document.title = fullTitle;
    setCanonical(canonicalUrl);
    setSiteNameData(pagePath === "/");

    setMeta("name", "description", pageDescription);
    setMeta("name", "robots", noIndex || seo.reviewMode ? "noindex, nofollow" : "index, follow");

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", socialImage);
    setMeta("property", "og:image:alt", socialImageAlt);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_GB");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", pageDescription);
    setMeta("name", "twitter:image", socialImage);
    setMeta("name", "twitter:image:alt", socialImageAlt);
  }, [description, image, imageAlt, noIndex, path, title, type]);
}
