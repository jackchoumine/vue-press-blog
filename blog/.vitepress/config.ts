/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-12 03:01:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-23 15:29:52
 * @Description : vitepress 配置
 */
import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

export default defineConfig({
  vite: {
    plugins: [pagefindPlugin()],
  },
  ignoreDeadLinks: true,
  title: `Jack Chou's blog`,
  description: 'A VitePress Site',
  // base: '/jack-front/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  markdown: {
    // theme: 'material-theme-palenight',
    lineNumbers: true,
    // 中文锚点跳转，不添加
    // anchor: {
    //   slugify(str) {
    //     return encodeURIComponent(str)
    //   },
    // },
    toc: {
      //生成目录的 markdown 标题 默认 2 3
      // NOTE 需要安装 # ## ### 的层级编写才会在右侧生成目录
      // NOTE 在文档里使用 [[toc]] 会在当前位置生成目录
      // BUG 不生效，只有 2 3 级标题生成目录
      level: [1, 2, 3, 4],
    },
  },
  themeConfig: {
    // logo:'https://avatars.githubusercontent.com/u/21340150?s=96&v=4',
    logo: '/jack.png',
    // 搜索功能 需要自己去algolia注册账号
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '8J64VVRP8K',
    //     apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //     indexName: 'vitepress',
    //   },
    // },
    // vitepress 的本地搜索
    // search: {
    //   provider: 'local',
    // },
    nav: [
      { text: 'vue3', link: '/vue3/', activeMatch: '/vue3/' },
      { text: 'vue2', link: '/vue2/', activeMatch: '^/vue2/' },
      { text: 'react', link: '/react/', activeMatch: '^/react/' },
      { text: 'node', link: '/node/', activeMatch: '^/node/' },
      { text: '科学', link: '/science/', activeMatch: '^/science/' },
      {
        text: 'web',
        items: [
          { text: 'js', link: '/web/js/', activeMatch: '/web/' },
          // { text: 'css', link: '/web/css/' },
          { text: 'webpack', link: '/webpack/', activeMatch: '/web/' },
        ],
      },
      {
        text: '其他',
        // 二级下拉
        items: [
          { text: '函数式编程', link: '/others/functional-programming/' },
          { text: 'angular', link: '/angular/' },
          { text: 'vitepress', link: '/others/vitepress/' },
          { text: '开发工具', link: '/others/dev-tool/' },
          { text: 'mac使用', link: '/others/mac/' },
        ],
      },
      // { text: '面试', link: '/interview/' },
    ],
    // docFooter: {
    //   //上下篇文本
    //   prev: '上一篇',
    //   next: '下一篇',
    // },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Jack Chou',
    },
    // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
