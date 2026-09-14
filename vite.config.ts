import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { deploymentMetadata, reviewMode } from "./scripts/seo-environment.mjs";

export default defineConfig({
  define: {
    __CANVAS_REVIEW_MODE__: JSON.stringify(reviewMode),
  },
  plugins: [react(), deploymentMetadata()],
  server: {
    host: "127.0.0.1",
  },
  preview: {
    host: "127.0.0.1",
  },
});
