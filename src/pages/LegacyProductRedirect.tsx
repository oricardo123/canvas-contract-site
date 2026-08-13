import { Navigate, useParams } from "react-router-dom";
import { catalog } from "../data/catalog";
import { NotFoundPage } from "./NotFoundPage";

const folderToCategory: Record<string, string> = {
  "info-arm": "armchairs",
  "info-side": "side-chairs",
  "info-easy": "lounge-chairs",
  "info-high": "stools",
  "info-low": "stools",
  "info-soft": "sofas",
  "info-table": "tables",
  "info-case": "case-goods",
  "info-bench": "benches",
};

export function LegacyProductRedirect() {
  const { legacyFolder, legacyFile } = useParams();
  const categorySlug = folderToCategory[legacyFolder?.toLowerCase() ?? ""];
  const code = legacyFile?.replace(/\.html$/i, "").toUpperCase();
  const category = catalog.find((candidate) => candidate.slug === categorySlug);
  const product = category?.products.find((candidate) => candidate.code === code);

  if (!category || !product) return <NotFoundPage />;

  return <Navigate to={`/collection/${category.slug}/${product.code.toLowerCase()}`} replace />;
}
