# jack-ui-vue

封装基于 vue2 的组件库。

## 搭建开发环境

```bash
vue create jack-ui-vue
```

修改目录：

1. 移动 components 到根目录

2. 把 src 改成 examples

修改项目入口：

package.json

```json
"serve": "vue-cli-service serve examples/main.js",
```

不修改，可能会报错：`This relative module was not found: * ./src/main.js in multi `

[How can I tell Vue-cli where my app's entrypoint is?](https://stackoverflow.com/questions/52841790/how-can-i-tell-vue-cli-where-my-apps-entrypoint-is)

测试改动是否成功：`npm run serve`。

最后的目录结构：

```bash
.
├── .browserslistrc
├── .eslintrc.js
├── .gitignore
├── .prettierrc.cjs
├── README.md
├── babel.config.js
├── components
│   └── HelloWorld.vue
├── examples
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   └── main.js
├── package-lock.json
├── package.json
└── public
    ├── favicon.ico
    └── index.html
```

在 components 下编写组件，在 examples 下测试组件，主要关心这个两个目录。

## 开发组件
