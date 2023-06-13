/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-12 03:01:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-14 02:12:21
 * @Description : 
 */
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title:`Jack Chou's blog`,
  description: 'A VitePress Site',
  base: '/jack-front/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // logo:'https://avatars.githubusercontent.com/u/21340150?s=96&v=4',
    logo:'/jack.png',
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' },
    // ],
    search: {
      provider: 'algolia',
      options: {
        appId: '8J64VVRP8K',
        apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
        indexName: 'vitepress'
      }
    },
    nav: [
      { text: 'vue3', link: '/vue3/' },
      { text: 'vue2', link: '/vue2/' },
      { text: 'react', link: '/react/' },
      { text: 'node', link: '/node/' },
      { text: '科学', link: '/science/' },
      {
        text: 'web',
        items: [
          { text: 'js', link: '/web/js/' },
          // { text: 'css', link: '/web/css/' },
          { text: 'webpack', link: '/webpack/' },
        ],
      },
      {
        text: '其他',
        // 二级下拉
        items: [
          { text: '函数式编程', link: '/others/functional-programming/' },
          { text: 'angular', link: '/angular/' },
          { text: '开发工具', link: '/others/dev-tool/' },
          { text: 'mac使用', link: '/others/mac/' },
        ],
      },
      // { text: '面试', link: '/interview/' },
    ],
    // markdown: {
    //   lineNumbers: true, // 代码块显示行号
    //   toc: {
    //     includeLevel: [1, 2, 3, 4], //生成目录的 markdown 标题 默认 2 3
    //   },
    // },
    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' },
    //     ],
    //   },
    // ],
    docFooter: { //上下篇文本
      prev: '上一篇',
      next: '下一篇'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Jack Chou'
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
