import { NavLink } from "react-router-dom";
import { catalog } from "../data/catalog";

export function CategoryNav() {
  return (
    <nav className="category-nav shell" aria-label="Furniture categories">
      <NavLink to="/collection" end>
        All
      </NavLink>
      {catalog.map((category) => (
        <NavLink key={category.slug} to={`/collection/${category.slug}`}>
          {category.name}
        </NavLink>
      ))}
    </nav>
  );
}
