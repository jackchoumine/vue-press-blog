/*
 * @Description vue 项目配置
 * @Date: 2021-06-01 11:30:40 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-04 23:01:20 +0800
 * @LastEditors: JackChou
 */
/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 */
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
/** @type {Options} */
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src/'))
      .set('@com', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('@ex', resolve('src/examples'))
      .set('@ds', resolve('src/data-structure'))
      .set('@qs', resolve('src/data-structure/questions'))
    config.resolve.extensions.add('.js').add('.jsx').add('.vue').add('.json')
  },
}

/** @type {Options} */
// module.exports = {
//   configureWebpack: {
//     resolve: {
//       extensions: ['.js', '.vue', '.json'],
//       alias: {
//         '@': resolve('src/'),
//         '@com': resolve('src/components'),
//         views: resolve('src/views'),
//       },
//     },
//   },
// }
