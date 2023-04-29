/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-29 22:20:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-29 23:03:14
 * @Description : rollup 配置 cjs 输出配置
 */
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
  },
  plugins: [terser()],
}
