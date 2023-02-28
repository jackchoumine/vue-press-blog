/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-20 09:02:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-23 20:21:17
 * @Description :
 */
import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: 'histoire.setup.ts',
})
