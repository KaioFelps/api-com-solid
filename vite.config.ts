import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // "prisma" é o exato nome q vem dps de 'prisma-test-'
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
  },
});
