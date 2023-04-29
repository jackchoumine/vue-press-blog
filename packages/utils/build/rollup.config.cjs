/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-29 22:20:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-29 23:44:43
 * @Description : rollup 配置 cjs 输出配置
 */
// import baseConfig from './base.config.cjs'
// export default {
//   input: 'index.js',
//   output: {
//     file: 'dist/index.cjs.js',
//     format: 'cjs',
//     banner: baseConfig.banner,
//   },
//   plugins: baseConfig.plugins,
// }

const baseConfig = require('./base.config.cjs')

module.exports = {
  input: 'index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
    banner: baseConfig.banner,
  },
  plugins: baseConfig.plugins,
}
