# tailwind 简介

tailwind 是一套以**原子化 CSS**为基础的**设计系统**（design system）. 传统的诸如 BS UI 框架，是以组件为基础的 CSS 样式声明集合，难以定制和扩展，tailwind 而具备极大的灵活性，同时具备约束性。

tailwind 解决组件化样式框架的问题：

1. 命名困难。使用 class 命名组件，随着规模扩大，命名越来越困难。重名后容易导致冲突。
2. 复用困难。样式规则被限制在特定的 class 里，复用困难。
3. 重构困难。想要覆盖样式，需要使用 `important!`覆盖。
4. 文件膨胀。由于样式规则有很多重复，文件很快膨胀。

同时，和内联样式相比， tailwind 具备以下优势：

1. 支持复用。
2. 支持写状态伪类。内联样式无法设置 hover 或者 focus 这样的状态。
3. 容易现实响应式。
4. 具备约束性。内联样式，每个样式规则都是魔术数字，难以统一 UI 风格。
5. 黑暗模式。

tailwind 缺点：

1. 记忆负担。需要记忆的类比较多，新人维护会比较困难。
2. 类名太多了，代码看着比较丑陋。

## 如何使用

1. link 引入样式表

难以定制，难以发挥 tailwind 的优势。

2. 使用 tailwind cli 构建样式表

[具体操作](https://www.tailwindcss.cn/docs/installation#using-tailwind-cli)

3. 作为 PostCSS 的插件使用

[PostCSS 介绍](https://www.dute.org/blog/what-is-postcss.html)

[PostCSS 官网](https://www.postcss.com.cn/)

结合 webpack 、vite 等工具使用。

> vite + vue3 的项目使用 tailwind

安装依赖：

```bash
npm i -D tailwindcss postcss autoprefixer
```

执行`npx tailwindcss init`，在根目录生成`tailwind.config.js`

```js
module.exports = {
  // 在哪些文件中使用 tailwind
  content: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

创建`postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

新建一个`tailwind.scss`

```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

在 `main.js` 中引入该文件。

使用一个 tailwind 类，可用即配置正确。

在 css 文件中这样引入:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 其他资源

[tailwind play](https://play.tailwindcss.com/)

[tailwind 布局模板](https://tailblocks.cc/)

## 参考

[tailwind 中文文档](https://www.tailwindcss.cn/)

[使用 Tailwind CSS 一年后，我的一些感受](https://juejin.cn/post/6951300894684577823)

[Tailwind 基础教程](http://www.cocoding.cc/post/css/tailwind-tutorial/)
