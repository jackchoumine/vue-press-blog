/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-15 00:34:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-15 00:34:30
 * @Description :
 */
import { defineConfig } from 'vite'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 静态资料引入路径，默认绝对路径 /
  //   plugins: [],
  // 设置路径别名和扩展名
  resolve: {
    // FIXME
    // Cannot find module '@c' or its corresponding type declarations. 编译时报错
    // tsconfig 配置了路径映射，还是报错
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@c': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
    extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx'],
  },
  build: {
    // minify: true, // 压缩代码 默认开启，使用 esbuild 压缩
    minify: 'terser', // 使用 terser 压缩
    // 安装：npm i -D terser
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // rollup 配置
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    open: true,
    host: true,
  },
})
