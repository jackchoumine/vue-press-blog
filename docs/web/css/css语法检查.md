# CSS 语法检查

希望能像 eslint 一样检查样式，自动格式化，统一团队的写法是很有必要的。

使用 `stylelint` 能实现这些。

## vscode 扩展

```json
{
  "recommendations": ["stylelint.vscode-stylelint", "mrmlnc.vscode-stylefmt"]
}
```

## npm 依赖

```bash
{
  "scripts": {
    "lint:style": "stylelint src/**/*.scss --syntax scss --fix"
  },
  "devDependencies": {
    "husky": "^4.3.8",
    "lint-staged": "^10.5.3",
    "stylelint": "^13.9.0",
    "stylelint-config-prettier": "^8.0.2",
    "stylelint-config-sass-guidelines": "^7.1.0",
    "stylelint-config-standard": "^20.0.0",
    "stylelint-csstree-validator": "^1.9.0",
    "stylelint-order": "^4.1.0",
    "stylelint-scss": "^3.18.0",
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "**/*.{js,vue,ts,jsx,tsx,scss}": [
      "npm run lint:style"
    ]
  }
}
```

## 规则配置

`stylelint.config`

`null` 表示不开启

```js
module.exports = {
  root: true,
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-sass-guidelines'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'order/properties-order': [
      // 布局属性
      'display',
      'position',
      'left',
      'top',
      'right',
      'bottom',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'visibility',
      'overflow',
      'overflow-x',
      'overflow-y',
      // 尺寸属性
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'box-shadow',
      // 盒子边框等
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      // 背景相关
      'background',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'background-clip',
      // 文本属性
      'text-align',
      'vertical-algin',
      'color',
      'font',
      'font-size',
      'font-weight',
      'font-family',
      'text-decoration',
      'text-shadow',
      'text-justify',
      'text-indent',
      'text-overflow',
      'white-space',
      // 其他属性
      'content',
      'cursor',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'z-index',
      'resize',
      'transition'
    ],
    'max-nesting-depth': null,
    'no-empty-source': null,
    'no-descending-specificity': null,
    'order/properties-alphabetical-order': null,
    'property-no-vendor-prefix': null,
    'selector-max-compound-selectors': null,
    'scss/at-import-partial-extension-blacklist': null,
    'value-no-vendor-prefix': null
  }
}
```

忽略规则：

> 不加会报错：`Could not find "stylelint-config-standard". Do you need a `configBasedir`? `

`.stylelintignore`

```bash
node_modules
bin
obj
*.*
!*.css
!*.scss
```

## 配置保存时的行为

```bash
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.stylelint": true
  },
```

## 写样式测试
