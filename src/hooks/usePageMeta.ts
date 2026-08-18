import { useEffect } from "react";

const SITE_ORIGIN = "https://www.canvascontract.com";
const SITE_NAME = "Canvas Contract Furniture";
const DEFAULT_DESCRIPTION =
  "Made-to-order furniture for hotels, restaurants and private interiors. Based in Portugal and working internationally.";
const DEFAULT_IMAGE = "/assets/editorial/home-05.jpg";

interface PageMetaOptions {
  path?: string;
  image?: string;
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

export function usePageMeta(
  title: string,
  description?: string,
  { path, image, type = "website", noIndex = false }: PageMetaOptions = {},
) {
  useEffect(() => {
    const fullTitle = `${title} — Canvas`;
    const pageDescription = description?.trim() || DEFAULT_DESCRIPTION;
    const canonicalUrl = absoluteUrl(path || window.location.pathname);
    const socialImage = absoluteUrl(image || DEFAULT_IMAGE);

    document.title = fullTitle;
    setCanonical(canonicalUrl);

    setMeta("name", "description", pageDescription);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", pageDescription);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", socialImage);
    setMeta("property", "og:image:alt", `${title} from ${SITE_NAME}`);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_GB");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", pageDescription);
    setMeta("name", "twitter:image", socialImage);
  }, [description, image, noIndex, path, title, type]);
}
