import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from "vite-tsconfig-paths"

const timeout = process.env.PWDEBUG ? Infinity : process.env.CI ? 50000 : 30000

export default defineConfig({
  test: {
    include: ["**/*.e2e-spec.ts"],
    globals: true,
    root: './',
    setupFiles: ["./test/setup-e2e.ts"],
    hookTimeout: timeout,
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})