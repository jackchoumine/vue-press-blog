# vitepress 使用技巧

> 如何让 nav 保持高亮？

nav 里配置 `activeMatch`

```js
{
  nav: [
    { text: 'vue3', link: '/vue3/', activeMatch: '/vue3/' },
    { text: 'vue2', link: '/vue2/', activeMatch: '^/vue2/' },
  ]
}
```
