/*
 * @Description: jest 配置
 * @Date: 2021-06-04 21:49:57 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-04 23:03:00 +0800
 * @LastEditors: JackChou
 */
// const path = require('path')
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleFileExtensions: [
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@ex/(.*)$': '<rootDir>/src/examples/$1',
    '^@ds/(.*)$': '<rootDir>/src/data-structure/$1',
    '^@qs/(.*)$': '<rootDir>/src/data-structure/questions/$1',
  },
  collectCoverage: false,
  coverageDirectory: '<rootDir>/tests/unit/coverage', // 同 webpack.output
  collectCoverageFrom: [
    // 同 webpack 的 rule.include
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/**/route.js',
    '!**/node_modules/**',
  ],
}
