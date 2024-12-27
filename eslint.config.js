import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  includeIgnoreFile(gitignorePath),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-nocheck': false
        }
      ]
    }
  },
  { ignores: ['**/ClarityScript.astro', '**/GtmScript.astro'] },
  {
    files: ['src/**/logic.js'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }
]
