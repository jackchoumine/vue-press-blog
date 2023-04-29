/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-29 23:26:23
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-29 23:51:43
 * @Description : 公共配置
 */
// import { terser } from 'rollup-plugin-terser'
const { terser } = require('rollup-plugin-terser')

// import('../package.json').then(content => {
//   console.log(content)
// })
const pkg = require('../package.json')

const banner = `/*!
    * ${pkg.name} v${pkg.version}
    * (c) ${new Date().getFullYear()} ${pkg.author}
    * @license MIT
    * @description ${pkg.description}
    * email: ${pkg.author}
    * @update: ${new Date().toLocaleString()}
    */
    `
// export default {
//   plugins: [terser()],
//   // banner,
// }
module.exports = {
  plugins: [terser()],
  banner,
}
