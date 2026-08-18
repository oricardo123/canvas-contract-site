import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const location = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (location.hash) {
      firstRender.current = false;
      window.requestAnimationFrame(() => {
        const target = document.getElementById(location.hash.slice(1));
        if (!target) return;

        target.scrollIntoView({ block: "start", behavior: "auto" });
        const heading = target.querySelector<HTMLElement>("h2, h3");
        if (!heading) return;
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    window.requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>("main h1");
      if (!heading) return;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    });
  }, [location.hash, location.pathname]);

  return null;
}
