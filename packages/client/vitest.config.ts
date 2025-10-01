/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  // ESBuild configuration for JSX handling
  esbuild: {
    jsx: "react-jsx",
    jsxImportSource: "react",
  },
  
  test: {
    // Use jsdom environment for React tests
    environment: "jsdom",
    
    // Setup file for React testing utilities
    setupFiles: ["./vitest.setup.ts"],
    
    // Global variables
    globals: true,
    
    // Include patterns
    include: [
      "**/*.{test,spec}.{js,ts,jsx,tsx}",
      "**/__tests__/**/*.{js,ts,jsx,tsx}",
    ],
    
    // Exclude patterns
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
    ],
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      // Add any path aliases if needed
    },
  },
})