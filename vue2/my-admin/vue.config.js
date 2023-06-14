/*
 * @Description vue 项目配置
 * @Date: 2021-06-01 11:30:40 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-10-11 00:52:34 +0800
 * @LastEditors : JackChou
 */
/**
 * @typedef { import("@vue/cli-service").ProjectOptions } Options
 */
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
/** @type {Options} */
module.exports = {
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src/'))
  //     .set('@com', resolve('src/components'))
  //     .set('views', resolve('src/views'))
  //     .set('@ex', resolve('src/examples'))
  //     .set('@ds', resolve('src/data-structure'))
  //     .set('@qs', resolve('src/data-structure/questions'))
  //     .set('@lc', resolve('src/leetcode'))
  //   config.resolve.extensions.add('.js').add('.jsx').add('.vue').add('.json')
  // },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.jsx', '.vue', '.json'],
      alias: {
        '@': resolve('src/'),
        '@com': resolve('src/components'),
        '@m': resolve('src/modules'),
        views: resolve('src/views'),
        '@ex': resolve('src/examples'),
        '@ds': resolve('src/data-structure'),
        '@qs': resolve('src/data-structure/questions'),
        '@lc': resolve('src/leetcode'),
      },
    },
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: false,
      open: true,
      proxy: {
        '/admin': {
          target: 'http://127.0.0.1:3000',
          // changeOrigin: true,
          pathRewrite: {
            '^/admin/': '', // remove base path
          },
        },
      },
    },
  },
  outputDir: 'build',
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
