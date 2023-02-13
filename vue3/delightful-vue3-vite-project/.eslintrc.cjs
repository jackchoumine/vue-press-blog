/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-11 20:20:20
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-13 09:15:40
 * @Description : stylelint 配置
 */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 解决 prettier 和 eslint 冲突
    'prettier',
    'plugin:vue/vue3-essential',
    'standard',
    '@vue/eslint-config-typescript',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  overrides: [],
  // 支持ts的最新语法
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  // 添加vue和@typescript-eslint插件，增强eslint的能力
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 关闭 prettier 规则提示
    'prettier/prettier': 0,
    // NOTE comma-dangle trailingComma 冲突
    // https://www.npmjs.com/package/@vue/eslint-config-prettier
    // https://www.npmjs.com/package/eslint-config-prettier
    // 'comma-dangle': 0, // [0, 'always-multiline'],
    'comma-dangle': [2, 'always-multiline'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    '@typescript-eslint/no-unused-vars': 1,
    'vue/no-setup-props-destructure': 0,
    'vue/no-multiple-template-root': 0,
  },
}
