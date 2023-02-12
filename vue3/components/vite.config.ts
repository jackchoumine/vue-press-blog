import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ include: './lib' })],
  build: {
    lib: {
      entry: resolve(__dirname, './lib/index.ts'),
      name: 'jack-components',
      fileName: 'jack-components',
    },
    rollupOptions: {
      // 排除不想打包的依赖
      external: ['vue'],
      output: {
        // 外部依赖为一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
