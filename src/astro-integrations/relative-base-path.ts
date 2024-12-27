import type { AstroIntegration } from 'astro'
import { writeFileSync, readFileSync } from 'fs'
import { globSync } from 'glob'
import path from 'path'
import { fileURLToPath } from 'url'

export default function relativeBasePath(): AstroIntegration {
  return {
    name: 'relative-base-path',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDirPath = fileURLToPath(dir)

        globSync(`${decodeURI(dir.pathname)}**/*.html`).forEach((filePath) => {
          const html = readFileSync(filePath, 'utf8')
          const relativePath = path.relative(path.dirname(filePath), outDirPath).split(path.sep).join(path.posix.sep) || '.'
          const htmlWithRelativePath = html.replace('data-relative-base-path="."', `data-relative-base-path="${relativePath}"`)
          writeFileSync(filePath, htmlWithRelativePath, 'utf8')
        })
      }
    }
  }
}
