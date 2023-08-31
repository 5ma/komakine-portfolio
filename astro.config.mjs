import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://komakine-portfolio.vercel.app/',
  server: {
    port: 1996,
    host: true
  },
  build: {
    inlineStylesheets: `always`,
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      chunkSizeWarningLimit: 99999999,
      rollupOptions: {
        output: {
          // すべてのチャンクを1つのファイルにまとめる
          manualChunks: () => 'main',
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.')[1];
            //Webフォントファイルの振り分け
            if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
              extType = 'fonts';
            }
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'image';
            }
            console.log(extType)
            //ビルド時のCSS名を明記してコントロールする
            if(extType === 'css') {
              return `assets/css/style.css`;
            }
            return `assets/${extType}/[name][extname]`;
          },
          entryFileNames: "assets/js/[name].js",
          chunkFileNames: "assets/js/[name].js"
        },
      },
    },
  },
  experimental: {
    assets: true
  },
  integrations: [vue()]
});