import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "admin/ui",
  publicDir: "admin/public/",
  plugins: [react()],
  build: {
    outDir: "../dist",
  },
});
