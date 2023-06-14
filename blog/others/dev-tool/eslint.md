# eslint

## eslint 规则不生效

不会提示错误，也不会自动修复问题，删除这个配置

```js
  "eslint.options": {
    "plugins": [
      "html",
      "vue",
      "javascript",
      "jsx",
      "typescript"
    ],
    "extensions": [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".vue"
    ]
  },
```

## prettier 规则和 eslint 规则冲突

希望使用`prettier`按照`eslint`的格式化规则来规范代码，有些规则会冲突，比如尾逗号和缩进，禁止使用 prettier 规则即可。
比如 eslint `'comma-dangle': [2, 'always-multiline']` 和 `trailingComma: 'es5'` 冲突。

```js
'prettier/prettier': 0,// 禁用 prettier 规则
```

<!-- 为何没进入版本控制 -->
