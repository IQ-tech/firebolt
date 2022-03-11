import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig({
  root: "src/",
  publicDir: "public/",
  plugins: [react(), viteCommonjs()],
  optimizeDeps: {
    include: ["@iq-firebolt/client > @iq-firebolt/validators", "iq-blueberry"],
  },
  define: {
    global: {}
  },
  build: {
    outDir: "../dist",
  },
});
