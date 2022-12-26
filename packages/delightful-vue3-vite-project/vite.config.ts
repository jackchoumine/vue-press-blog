/*
 * @Date        : 2022-08-08 15:54:09
 * @Author      : ZhouQijun
 * @LastEditors : JackChou
 * @LastEditTime: 2022-11-18 01:15:11 +0800
 * @Description : vite 配置
 */
// @ts-nocheck
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
// import basicSsl from '@vitejs/plugin-basic-ssl'
// import fs from 'fs'
const isCustomElement = tag => /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(tag)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
      template: {
        transformAssetUrls,
        compilerOptions: {
          isCustomElement,
        },
      },
    }),
    vueJsx(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue'], //, 'vue-router']
      resolvers: [ElementPlusResolver()],
      // eslint报错解决
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    quasar({
      autoImportComponentCase: 'combined', // 'pascal',
    }),
    // basicSsl(),
  ],
  server: {
    // open: true,
    port: 5173,
    hmr: {
      // port: 5173,
      host: 'localhost',
    },
    // hotReload: true,
    // watch: true,
    watch: {
      usePolling: true,
    },
    // https: {
    //   cert: fs.readFileSync(path.join(__dirname, 'keys/cert.crt')),
    //   key: fs.readFileSync(path.join(__dirname, 'keys/cert.key')),
    // },
    // host: 'localhost',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#c': path.resolve(__dirname, './src/components'),
    },
  },
})
