import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import metaMapPlugin from "vite-plugin-react-meta-map";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    metaMapPlugin({
      pageMetaMapFilePath: "./src/seo/pageMetaMap.ts",
      pageTemplateFilePath: "./src/seo/PageTemplate.tsx",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
