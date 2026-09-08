import { useId } from "react";
import { Link } from "react-router-dom";

interface BrandLogoProps {
  light?: boolean;
}

// 12c presentation trial: space the original 12b descriptor glyphs to the
// canvas word's 177–1083px ink bounds, preserving every glyph's proportions.
const descriptorGlyphs = [
  [259, 278], [311, 330], [364, 381], [413, 426], [457, 478],
  [511, 543], [615, 628], [657, 676], [710, 720], [751, 770],
  [804, 807], [840, 853], [885, 903], [937, 947], [976, 996],
];

export function BrandLogo({ light = false }: BrandLogoProps) {
  const inkFilterId = `canvas-logo-ink-${useId().replace(/:/g, "")}`;
  const artworkId = `${inkFilterId}-artwork`;
  const upperClipId = `${inkFilterId}-upper`;

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
          <image
            id={artworkId}
            href="/assets/brand/canvas-logo-12b-wider-lettering.png"
            width="1254"
            height="1254"
            filter={`url(#${inkFilterId})`}
          />
          <clipPath id={upperClipId}>
            <rect x="82" y="476" width="1094" height="344" />
          </clipPath>
          {descriptorGlyphs.map(([left, right], index) => (
            <clipPath id={`${inkFilterId}-glyph-${index}`} key={index}>
              <rect x={left - 2} y="820" width={right - left + 5} height="63" />
            </clipPath>
          ))}
        </defs>
        <use href={`#${artworkId}`} clipPath={`url(#${upperClipId})`} />
        {descriptorGlyphs.map((_, index) => (
          <g transform={`translate(${-82 + (169 * index) / 14} 0)`} key={index}>
            <use href={`#${artworkId}`} clipPath={`url(#${inkFilterId}-glyph-${index})`} />
          </g>
        ))}
      </svg>
    </Link>
  );
}
