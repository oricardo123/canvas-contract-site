import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

const navigation = [
  { label: "Collection", to: "/collection" },
  { label: "Studio", to: "/studio" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const main = document.querySelector<HTMLElement>("main");
    const footer = document.querySelector<HTMLElement>("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const focusables = () => [
      toggleRef.current,
      ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []),
    ].filter((item): item is HTMLElement => Boolean(item));

    window.requestAnimationFrame(() => focusables()[1]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
      }
      if (event.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.body.classList.add("menu-is-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-is-open");
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <BrandLogo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a className="header-enquiry" href="mailto:sales@canvascontract.com?subject=Project enquiry">
          Discuss a project
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} />
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <NavLink to="/" end>
            <span>01</span>Home
          </NavLink>
          {navigation.map((item, index) => (
            <NavLink key={item.to} to={item.to}>
              <span>{String(index + 2).padStart(2, "0")}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__contact">
          <p>Begin a conversation</p>
          <a href="mailto:sales@canvascontract.com">sales@canvascontract.com</a>
          <a href="tel:+351914827020">+351 914 827020</a>
        </div>
      </div>
    </header>
  );
}
