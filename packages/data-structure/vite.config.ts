/*
 * @Description : vite 配置
 * @Date        : 2023-01-15 23:10:32 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-15 23:20:13 +0800
 * @LastEditors : JackChou
 */
// @ts-nocheck
/// <reference  types="vitest"/>
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
  },
})
