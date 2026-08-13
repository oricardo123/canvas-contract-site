import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CategoryPage } from "./pages/CategoryPage";
import { CollectionPage } from "./pages/CollectionPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { LegacyProductRedirect } from "./pages/LegacyProductRedirect";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { StudioPage } from "./pages/StudioPage";

const legacyCategoryRoutes: Record<string, string> = {
  "armchair.html": "armchairs",
  "sidechair.html": "side-chairs",
  "easychair.html": "lounge-chairs",
  "highchair.html": "stools",
  "sofa.html": "sofas",
  "table.html": "tables",
  "case.html": "case-goods",
  "bench.html": "benches",
};

const legacyBrokenProductRoutes: Record<string, string> = {
  "Info-Pages/Info-Armacd-01.html": "/collection/armchairs/acd-01",
  "Info-Pages/Info-Armacd-02.html": "/collection/armchairs/acd-02",
  "Info-Pages/Info-Arm/ect-01.html": "/collection/lounge-chairs/ect-01",
  "Info-Pages/Info-Arm/ecw-01.html": "/collection/lounge-chairs/ecw-01",
  "Info-Pages/Info-Arm/ecd-01.html": "/collection/lounge-chairs/ecd-01",
  "Info-Pages/Info-Table/tab-101.html": "/collection/tables/tab-11",
};

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="collection" element={<CollectionPage />} />
        <Route path="collection/:categorySlug" element={<CategoryPage />} />
        <Route path="collection/:categorySlug/:productCode" element={<ProductDetailPage />} />
        <Route path="studio" element={<StudioPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="contact" element={<ContactPage />} />

        <Route path="index.html" element={<Navigate to="/" replace />} />
        <Route path="products.html" element={<Navigate to="/collection" replace />} />
        <Route path="about-us.html" element={<Navigate to="/studio" replace />} />
        <Route path="portfolio.html" element={<Navigate to="/projects" replace />} />
        <Route path="contact-us.html" element={<Navigate to="/contact" replace />} />
        {Object.entries(legacyCategoryRoutes).map(([legacyPath, slug]) => (
          <Route key={legacyPath} path={legacyPath} element={<Navigate to={`/collection/${slug}`} replace />} />
        ))}
        {Object.entries(legacyBrokenProductRoutes).map(([legacyPath, destination]) => (
          <Route key={legacyPath} path={legacyPath} element={<Navigate to={destination} replace />} />
        ))}
        <Route path="Info-Pages/:legacyFolder/:legacyFile" element={<LegacyProductRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
