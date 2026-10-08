import { defineConfig } from 'vitest/config'

// The core's tests: pure ES, so they run in node with no DOM.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['shared/**/*.test.ts', 'scripts/**/*.test.ts', 'src/engine/**/*.test.ts'],
  },
})
