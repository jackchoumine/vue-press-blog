# stencil 简介

stencil 是一个生成 **Web Component** 的**编译器**，但是其具有自己的特殊语法，使用 stencil 生成的组件可**跨框架**和**在 html 中使用**。

其号称结合了最流行框架(angular、react、vue)中的最好的理念，具备这些特点：

- TypeScript (依赖注入、装饰器等 angular 的一些语法)
- Virtual DOM (React)
- JSX (React)
- Reactive data-binding (React)
- Async rendering (React)
- Static Site generation (SSG)
- Live reload 热刷新，开发时很有用
- 自动优化构建产物
- API 很小

stencil 的构建产物已经做了**懒加载**和**按需加载**，所以具有**较高的性能**。

stencil 除了创建 Web Component，还能构建 WPA 的站点。

一个简单的 stencil 组件：

```tsx
import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'my-name',
  styleUrl: 'my-name.scss',
})
export class MyName {
  @Prop() first: string
  @Prop() last: string

  render() {
    return (
      <p>
        Hello, my name is {this.first} {this.last}
      </p>
    )
  }
}
```

使用：

```html
<my-name first="Stencil" last="JS"></my-name>
```

## stencil 出现的动机

[ionic 团队](https://ionicframework.com/)为了实现更好的创建 component，且 component 能跨框架和无框架使用，开发了 stencil，2017 年 8 月发布第一个版本。

> Stencil's primary goal is to remove the need for components to be written using a specific framework's API.

> Stencil's integration with different frameworks is currently a work **in progress**. As Stencil matures, the goal is to make it easy to write standard web components which will compile to various output targets.

> 实际使用时，发现三大流行框架（react、vue angular）对 stencil 生成的 web component 的支持并没有和其宣传的那么好，坑比较多，集成方案很少。

> 本人测试 react17、vue2、vue3 之后，发现 vue2 对 stencil 的支持最好，配置最简单。

实际上，网站关于 stencil 的资料非常少，stackoverflow 上 stencil 相关的问题才 4588 条，vue 相关的 11 万加，react 和 angular 更多了。

> 另外，stencil 相关文档和周边库、组件等也**很少**，想采用它来编写跨裤架的 web component，还是不推荐。

> 那在纯 html 中使用 stencil 构建的 web component 呢？

**不推荐**。比如支持传递 object 和 array 等复杂数据到 web component 内部，还需要配合 jquery 等 DOM 操作库，让前端开发回到 jquery 时代。

> 单独使用 stencil 创建**单页应用**可以吗？

可行，不推荐。

周边库支持不好，文档糟糕，社区不活跃，遇到问题，难以找到解决方案。

> 什么时候需要使用 stencil?

使用 ionic 技术开发 ios、android 应用，可以学习它。

## 为何要学习 stencil 呢？

入职新公司采用 stencil 开发，需要适应新技术，老项目还有其他问题，我们也计划采用新的技术重构这个维护了 4 年多的系统，所以有必要了解 stencil。
