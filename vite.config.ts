/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    setupFiles: ["./src/app/tests/setup.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/package.json/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
      "e2e/**",
      "playwright-report/**",
      "test-results/**",
    ],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/tests/**",
        "src/**/*.test.*",
        "src/**/testing.ts",
        "**/*.css",
        "**/types.ts",
        "**/index.ts",
        "src/app/entrypoint/**",
      ],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
        "src/entities/**": {
          statements: 85,
          branches: 85,
          functions: 85,
          lines: 85,
        },
        "src/shared/**": {
          statements: 85,
          branches: 80,
          functions: 85,
          lines: 85,
        },
        "src/app/theme/colorSchemeManager.ts": { statements: 100, lines: 100 },
        "src/app/theme/cssVariablesResolver.ts": {
          statements: 100,
          lines: 100,
        },
      },
    },
  },
});
