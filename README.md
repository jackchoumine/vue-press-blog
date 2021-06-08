# VuePress 搭建博客

## 文章编辑

1. 自定义容器

```markdown
::: tip 提醒
这里是 tip 容器
:::

::: warning 警告
这里是警告容器
:::

::: danger 危险
这里是危险容器
:::

::: details
This is a details block, which does not work in IE / Edge
:::
```

2. 添加代码赋值按钮

```bash
yarn add -D @mr-hope/vuepress-plugin-copy-code
```

配置

```js
plugins: [['@mr-hope/copy-code', {}]],
```
