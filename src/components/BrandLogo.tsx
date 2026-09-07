import { useId } from "react";
import { Link } from "react-router-dom";

interface BrandLogoProps {
  light?: boolean;
}

export function BrandLogo({ light = false }: BrandLogoProps) {
  const inkFilterId = `canvas-logo-ink-${useId().replace(/:/g, "")}`;

  return (
    <Link
      className={`brand-logo${light ? " brand-logo--light" : ""}`}
      to="/"
      aria-label="Canvas — Home"
    >
      <svg
        className="brand-logo__artwork"
        viewBox="82 476 1094 407"
        width="1094"
        height="407"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          {/* Derive the web ink from the wider 12b revision; preserve the approved 12a master. */}
          <filter id={inkFilterId} colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -0.2126 -0.7152 -0.0722 0 1"
            />
            <feComponentTransfer result="artwork">
              <feFuncA type="linear" slope="2" intercept="-0.3" />
            </feComponentTransfer>
            <feFlood floodColor="currentColor" />
            <feComposite in2="artwork" operator="in" />
          </filter>
        </defs>
        <image
          href="/assets/brand/canvas-logo-12b-wider-lettering.png"
          width="1254"
          height="1254"
          filter={`url(#${inkFilterId})`}
        />
      </svg>
    </Link>
  );
}
