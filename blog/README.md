# VuePress 搭建博客

## 文章编辑

1. 自定义容器

```md
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

2. 添加代码复制按钮

```bash
yarn add -D @mr-hope/vuepress-plugin-copy-code
```

配置

```js
plugins: [['@mr-hope/copy-code', {}]],
```

3. 图片放大

使用 `@vuepress/plugin-medium-zoom` 插件 没有生效，有空再看看其他方案。

> 其他问题

1 px 问题解决方案

transform

2. useEffect

执行 updated
willUnmount
依赖传递情况

3. Array.form vs new Array

类数组你会怎么实现

new Array() vs new Array(undefined)

4. await 解决什么问题

依赖关系

6. vNode 解决了什么问题

7. 说说居中布局

8. 说说你的印象最深刻的博客

9. symbol for

10. MongoDB update 时没有数据 结果如何

## 常用的表情和符号

✅
😎
🔴
❌
👌

①
②
③
④
⑤
⑥
⑦
⑧
⑨
⑩
⑪
⑫
⑬
⑭
⑮
⑯
⑰
⑱
⑲
⑳
