import { NavLink } from "react-router-dom";
import { catalog } from "../data/catalog";

const navigationLabels: Record<string, string> = {
  armchairs: "Arm",
  "side-chairs": "Side",
  "lounge-chairs": "Lounge",
  stools: "High",
  sofas: "Soft",
  tables: "Surface",
  "case-goods": "Storage",
  benches: "Length",
};

export function CategoryNav() {
  return (
    <nav className="category-nav shell" aria-label="Furniture categories">
      <NavLink to="/collection" end>
        All
      </NavLink>
      {catalog.map((category) => {
        const label = navigationLabels[category.slug] ?? category.name;
        return (
          <NavLink
            key={category.slug}
            to={`/collection/${category.slug}`}
            aria-label={`${label} — ${category.name}`}
          >
            {label}
          </NavLink>
        );
      })}
    </nav>
  );
}
