import { Link } from "react-router-dom";

interface BrandLogoProps {
  light?: boolean;
}

export function BrandLogo({ light = false }: BrandLogoProps) {
  return (
    <Link
      className={`brand-logo${light ? " brand-logo--light" : ""}`}
      to="/"
      aria-label="Canvas — Home"
    >
      <span className="brand-logo__crop" aria-hidden="true">
        <img
          src="/assets/brand/canvas-logo-transparent.png"
          alt=""
          width="1672"
          height="941"
        />
      </span>
    </Link>
  );
}
