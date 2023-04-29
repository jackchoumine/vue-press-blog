/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-29 22:20:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-29 23:00:27
 * @Description : rollup 配置 esm 输出配置
 */
export default {
  input: 'index.js',
  output: {
    file: 'dist/index.umd.js',
    format: 'umd',
    name: 'jackUtils',
  },
}
