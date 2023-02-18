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

在 components 下新建 `button`目录，然后新建一个`JButton.vue` 和 `index.js`,

index.js 用于导出组件：

```js
import JButton from './JButton.vue'

JButton.install = Vue => {
  Vue.component(JButton.name, JButton)
  return Vue
}

export default JButton
```

> 为何要添加`install`方法？

能组件能通过`Vue.use`实现全局注册，从而实现按需引入部分组件。

`JButton.vue`

```html
<template>
  <div>
    <button><slot></slot></button>
  </div>
</template>

<script>
  export default {
    name: 'JButton',
  }
</script>
```

在`components/index.js`内导出组件：

```js
export { default as JButton } from './button'
```

测试组件：

main.js 中引入组件：

```js
import { JButton } from '../components'

Vue.use(JButton)
```

这就完成了 JButton 组件的全局注册，可在 examples 下的任何组件内使用了。
