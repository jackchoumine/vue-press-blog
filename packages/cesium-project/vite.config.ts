// @ts-nocheck
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import AutoImportHook from 'unplugin-auto-import/vite'
import { quasar } from '@quasar/vite-plugin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cesium(),
    quasar(),
    AutoImportHook({
      imports: ['vue'],
    }),
  ],
})
