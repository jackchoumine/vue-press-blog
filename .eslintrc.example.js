// 常用的 eslint 命令
// 0. 安装全局的 eslint 才能使用命令
// 1. eslint [opinions] [file|dir|glob]*
// eslint file1.js file2.json file3.js
// eslint lib/**  // NOTE 使用 glob 模式传递参数，注意环境shell
// eslint --fix file3.js 自动修复问题
// eslint --color 彩色输出问题
// eslint --env [dev] 指定环境变量 // TODO 可指定 prod dev 等环境吗？
// https://eslint.org/docs/user-guide/configuring/language-options 语言选项
// eslint . --ext .js,.ts //NOTE 扩展只能有于路径，使用 glob 模式和文件名，--ext 被忽略
// eslint lib/* --ext .js 检查 lib/目录的所有文件，不管是不是.js文件
module.exports = {
  // 限制 lint 范围，可提高 lint 速度，尤其是当一个项目有多个配置文件时
  // eslint 查找配置文件路径：从当前目录一直向上查找直到根目录，除非遇到 root:true
  root: true,
  parser: 'vue-eslint-parser',
  // 运行环境
  env: {
    node: true,
    browser: true,
  },
  // NOTE 安装 npm ，需要加上 eslint-plugin- 前缀
  plugins: ['@typescript-eslint'],
  // 扩展它的规则、插件、和语言选项
  // NOTE eslint-config- 前缀被省略，安装 npm 时需要加上
  // eslint --init 生成一个配置
  // extends 值的组成：
  // 1. plugin
  // 2. npm 包【省略 eslint-plugin- ，比如 react 是 eslint-plugin-react】
  // 3. 配置名字
  // 4. 'eslint:all'---当前 eslint 内置的所有配置
  // 5. /
  // 6. 配置的相对路径
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint',
  ],
  // https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      tsx: true, // Allows for the parsing of JSX
    },
  },
  // https://eslint.org/docs/rules/  eslint:recommended 规则列表
  rules: {
    /** js/ts */
    'max-len': [1, 100],
    'eol-last': 'error',
    'no-trailing-spaces': 'error',
    'no-console': ['warn', { allow: ['error', 'log'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    camelcase: ['error', { properties: 'never' }],
    semi: ['error', 'never'],
    'spaced-comment': [2, 'always'],
    'object-curly-spacing': [2, 'always'],
    'comma-spacing': [2, { before: false, after: true }],
    'computed-property-spacing': [2, 'never'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'object-curly-spacing': ['error', 'always'],
    'arrow-parens': ['error', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 0,
    /** vue **/
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    // 自闭和标签
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never', // 通用的标签
          normal: 'never', // 知名的html元素
          component: 'always', // vue组件
        },
      },
    ],
    // 每行允许显示最大属性个数
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 3, // 开始标签在一行中时最大显示个数
        multiline: 1, // 位于多行时每行显示个数
      },
    ],
    //
    'vue/require-default-prop': 'off',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/component-name-in-template-casing': [
      2,
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: ['/el-(.*)/', '/router(.*)/', 'component', 'keep-alive'],
      },
    ],
  },
  // NOTE 某个路径、文件进行特殊配置
  // 使用场景：
  // 1. 多人开发一个项目，希望 eslint 只检查自己的工作目录而不影响他人的目录
  overrides: [
    {
      files: ['app/**/*.js'],
      excludeFiles: ['*.test.js'],
      rules: {
        // 规则
      },
    },
  ],
}
