/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-29 22:20:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-29 23:49:32
 * @Description : rollup 配置 esm 输出配置
 */
// import baseConfig from './base.config.cjs'

// export default {
//   input: 'index.js',
//   output: {
//     file: 'dist/index.js',
//     format: 'es',
//     banner: baseConfig.banner,
//   },
//   plugins: baseConfig.plugins,
// }
const baseConfig = require('./base.config.cjs')

module.exports = {
  input: 'index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    banner: baseConfig.banner,
  },
  plugins: baseConfig.plugins,
}
