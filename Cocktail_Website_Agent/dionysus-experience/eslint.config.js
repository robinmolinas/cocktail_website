import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  // Spine dependency diagram: shared → nothing but zod; src → shared only.
  // A later block replaces a rule's options wholesale, so the test block
  // restates the shared patterns with vitest allowed.
  {
    files: ['shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-globals': ['error', 'window', 'document', 'navigator', 'localStorage', 'sessionStorage', 'location'],
      'no-restricted-imports': ['error', {
        patterns: [
          { regex: '^(?!zod(/|$))[^./]', message: 'shared/ is pure ES: no packages but zod.' },
          { regex: '^(\\.\\./)+(src|server|api)(/|$)', message: 'shared/ imports nothing outside shared/.' },
        ],
      }],
    },
  },
  {
    files: ['shared/**/*.test.ts'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { regex: '^(?!(zod|vitest)(/|$))[^./]', message: 'shared/ tests: no packages but zod and vitest.' },
          { regex: '^(\\.\\./)+(src|server|api)(/|$)', message: 'shared/ imports nothing outside shared/.' },
        ],
      }],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { regex: '^(\\.\\./)+(server|api)(/|$)', message: 'src/ meets the API shell over HTTP only.' },
        ],
      }],
    },
  },
])
