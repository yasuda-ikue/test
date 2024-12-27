import { defineConfig } from 'astro/config'
import purgecss from 'astro-purgecss'
import sitemap from '@astrojs/sitemap'
import playformCompress from '@playform/compress'
import relativeLinks from 'astro-relative-links'
import relativeBasePath from './src/astro-integrations/relative-base-path'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  base: '',
  // playformCompress を使用しているのでデフォルトの圧縮は無効化
  compressHTML: false,
  outDir: 'out',
  devToolbar: {
    enabled: false
  },
  build: {
    inlineStylesheets: 'never',
    format: 'preserve'
  },
  integrations: [
    relativeBasePath(),
    relativeLinks(),
    playformCompress(),
    purgecss({
      safelist: {
        standard: [
          // リセットCSSで使っている `:where` セレクターが削除されるのを防ぐ
          // ref: https://github.com/FullHuman/purgecss/issues/978#issuecomment-1595425397
          /^:[-a-z]+$/,
          // data-* 属性は削除されるのを防ぐ (data-activeなどあとからJSで追加されるものでビルドのときには使われていないものがあるため)
          /^data-[\w-]+$/
        ]
      }
    }),
    sitemap()
  ],
  server: {
    port: 4321,
    host: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/mixins.scss" as *;`
        }
      }
    },
    build: {
      // playformCompress を使用しているのでデフォルトの圧縮は無効化
      minify: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.')[1]
            //Webフォントファイルの振り分け
            if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
              extType = 'fonts'
            }
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'images'
            }
            //ビルド時のCSS名を明記してコントロールする
            if (extType === 'css') {
              return `assets/css/[name]-[hash].css`
            }
            return `assets/${extType}/[name]-[hash][extname]`
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      }
    }
  }
})
