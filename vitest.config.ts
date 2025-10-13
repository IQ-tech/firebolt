/// <reference types="vitest" />
import { defineConfig } from "vite"

export default defineConfig({
  // ESBuild configuration for JSX handling
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  test: {
    // Use jsdom environment for DOM tests
    environment: "jsdom",

    // Configurações para React 18 compatibility
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },

    // Global test setup
    setupFiles: ["./vitest.setup.ts"],

    // Test file patterns
    include: [
      "**/*.{test,spec}.{js,ts,jsx,tsx}",
      "**/__tests__/**/*.{js,ts,jsx,tsx}",
    ],

    // Exclude patterns
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.{idea,git,cache,output,temp}/**",
    ],

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "json-summary", "html", "lcov"], // Added json-summary
      // Only include files that have corresponding tests
      all: false,
      include: [
        // Client-core files that have tests
        "packages/client-core/lib/**/*.{js,ts,jsx,tsx}",
        // Client files that have tests
        "packages/client/src/**/*.{js,ts,jsx,tsx}",
        // Validators files that have tests
        "packages/validators/src/**/*.{js,ts,jsx,tsx}",
      ],
      exclude: [
        "coverage/**",
        "dist/**",
        "packages/*/test{,s}/**",
        "**/*.d.ts",
        "cypress/**",
        "test{,s}/**",
        "test{,-*}.{js,cjs,mjs,ts,tsx,jsx}",
        "**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}",
        "**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}",
        "**/__tests__/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
        "**/.{eslint,mocha,prettier}rc.{js,cjs,yml}",
      ],
      thresholds: {
        statements: 80,
        branches: 70,
        functions: 70,
        lines: 80,
      },
    },

    // Global variables (similar to Jest's globals)
    globals: true,

    // CSS modules handling
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },

  // Resolve configuration for better module resolution
  resolve: {
    alias: {
      // Add any path aliases if needed
    },
  },

  // Define configuration for CSS handling
  css: {
    modules: {
      // CSS modules configuration
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
})
