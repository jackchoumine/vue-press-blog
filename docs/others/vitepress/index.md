# vitepress 使用技巧

[[toc]]

## 如何让 nav 保持高亮？

nav 里配置 `activeMatch`

```js:no-line-numbers {3}
{
  nav: [
    { text: 'vue3', link: '/vue3/', activeMatch: '/vue3/' },
    { text: 'vue2', link: '/vue2/', activeMatch: '^/vue2/' },
  ]
}
```

## 如何让代码块显示行号？

```js
{
  markdown: {
    lineNumbers: true,
  },
}
```

[更多 markdown 配置](https://vitepress.vuejs.org/guide/markdown.html#line-numbers)

## 如何添加评论功能？

<!-- TODO -->
