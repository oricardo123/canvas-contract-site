import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFoundPage() {
  usePageMeta("Page not found", undefined, { noIndex: true });
  return (
    <section className="not-found shell page-enter">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>Return to the collection or the home page</p>
      <Link className="button button--dark" to="/">
        <ArrowLeft aria-hidden="true" size={17} strokeWidth={1.5} />
        Back home
      </Link>
    </section>
  );
}
