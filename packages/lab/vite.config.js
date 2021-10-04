import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "src/",
  publicDir: "public/",
  plugins: [react()],
  optimizeDeps: {
    include: ["@iq-firebolt/client > @iq-firebolt/validators"],
  },
  build: {
    outDir: "../dist",
  },
});
