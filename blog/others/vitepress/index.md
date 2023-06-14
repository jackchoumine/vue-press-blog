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

## 如何开启搜索功能？

### vitepress 自带的搜索

```js
{
  themeConfig: {
    search: {
      provider: 'local',
    },
  },
}
```

效果一般，不建议使用。

### 使用 vitepress 插件

```js
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
export default defineConfig({
  vite: {
    plugins: [pagefindPlugin()],
  }
})
```

效果好，推荐使用。

还有其他插件，可以自行搜索。

### 接入`algolia`搜索

<!-- TODO我的账号 jackchou4job@163.com -->
