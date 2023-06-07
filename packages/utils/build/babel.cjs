/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-30 00:26:15
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-30 02:44:05
 * @Description : babel 配置
 */
const { babel } = require('@rollup/plugin-babel')
// import { getBabelOutputPlugin } from '@rollup/plugin-babel'
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')

function getCompiler(opt) {
  return babel({
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: 'last 2 versions, > 1%, ie >= 8, Chrome >= 45, safari >= 10',
            node: '0.12',
          },
          modules: false,
          loose: false,
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 2,
          helpers: false,
          regenerator: false,
        },
      ],
    ],
    runtimeHelpers: true,
    exclude: 'node_modules/**',
  })
}

exports.getCompiler = getCompiler
