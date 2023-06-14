/**
 * 相关npm:
 *  
 *  "@vue/eslint-config-prettier": "^6.0.0",
    "@vue/eslint-config-standard": "^5.1.2",
    "eslint": "^6.7.2",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^3.4.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "eslint-plugin-vue": "^6.2.2",
    "prettier": "2.3.2",
 */
module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  plugins: ['prettier'],
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'prettier/prettier': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 0, // [2, 'always-multiline'],
    'space-before-function-paren': 0, //[0, 'never'],
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    'no-void': 0,
    semi: [2, 'never'],
    yoda: [2, 'never', { exceptRange: true }], // 犹大条件 变量在前 color === 'red'
    'no-new': 2, // 禁用 new 创建对象而不赋值给变量
    // 强制在关键字前后使用一致的空格 (前后腰需要)
    'keyword-spacing': 2,
    // 强制一行的最大长度
    'max-len': [1, 120],
    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: [2, 'allow-null'],
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止将 undefined 作为标识符
    // NOTE 使用 void 0 代替 undefined
    'no-undefined': 2,
    // 禁止出现未使用过的变量
    // NOTE 不要全局关闭，在文件内和当前行关闭该规则的检查: cmd + .
    'no-unused-vars': [1, { vars: 'all', args: 'none' }],
    // 要求使用 const 声明那些声明后不再被修改的变量
    'no-var': 2,
    'prefer-const': 1,
    'spaced-comment': [2, 'always'],
    'vue/require-name-property': 2,
    'vue/multiline-html-element-content-newline': 0,
    // 一行多少属性
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 4,
        multiline: {
          max: 4,
          allowFirstLine: true,
        },
      },
    ],
    // 自闭和标签
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always', // 通用的标签
          normal: 'never', // 知名的html元素
          component: 'always', // vue组件
        },
      },
    ],
    'vue/component-name-in-template-casing': 0,
    //   2,
    //   'PascalCase',
    //   {
    //     registeredComponentsOnly: false,
    //     ignores: ['/el-(.*)/', '/router(.*)/', 'component', 'keep-alive', '/w-w/'],
    //   },
    // ],
    'vue/html-indent': [
      2,
      2,
      {
        attribute: 1, // 属性缩进
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // https://eslint.vuejs.org/rules/attributes-order.html
    'vue/attributes-order': [
      2,
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
    'vue/order-in-components': [
      2,
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
  },
}
