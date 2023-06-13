# 生产级别的 vue ---《[Production-Grade Vue.js](https://frontendmasters.com/courses/production-vue/)》课程笔记

花了 3 个小时，听了 front master 的 production-grade vue 课程，课程不错，比较基础，但是也学到了一些东西，现在总结如下。

## 拆分组件的标识

哪种情况下拆分组件，有时候往往没有一个清晰的边界，以下几种情况，需要拆分组件：

- 发现组件难以阅读

- 难以简洁明确的描述组件职责

单一职责是软件设计的黄金法则。

- 组件内**单独一段代码**具有自己的状态

组件内有一个状态不和其他状态产生关联，可拆分成单独组件，让组件更加清晰。

## 更好的组织你的目录

目录嵌套太深，不利于重构和浏览文件。

课程里推荐**两层**的目录，从命名上把相关的文件组织到一起，比如：

```bash
srr
  components
    DashboardHeader.vue
    DashboardHeader.test.js
    Dashboard.test.js
    Dashboard.vue
```

这样命名，组件被 vscode 聚拢到一起，方便阅读。

但是实际上命名一直是很多人难题，很多人也不愿意花点时间，思考命名，所以我更推荐最多三层目录，把相关组件组织到单独目录下，使用 index 导出变量：

```bash
srr
  components
    Dashboard # 文件大写
      DashboardHeader.vue
      DashboardHeader.test.js
      Dashboard.test.js
      Dashboard.vue
      index.js # 导出相关变量
```

或者

```bash
srr
  components
    Dashboard # 文件大写
      Header.vue
      Header.test.js
      Dashboard.test.js
      Dashboard.vue
      index.js # 导出相关变量
```

## 如何解决 props-base 设计的问题

props-base 设计方法面对简单的功能时，可胜任，但是所有组件的功能都通过 props 来实现，props 就会变得很多，或者层层传递 props，造成 props 钻井。

具体来说，props-base 设计有这些问题：

- 新功能会增加复杂性

- 职责不单一

- 在模板中会出现大量`v-if`

- 难以扩展

- 难以维护

- 难以使用

### transparent component （透明组件）可减缓上述问题

```html
<template>
  <div>
    <input type="text" v-on="$listeners" v-bind="{...$attrs,...$props}" />
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
  }
</script>
```

> 通过 `v-on="$listeners"` 和 `v-bind="{...$attrs,...$props}"` 可绑定多个事件和多个值。

### provide 和 inject

通过 provide 和 inject 可轻松在跨级组件之间共享数据，减缓 props 钻井问题。

> provide 和 inject 在 vue 插件中才能才能发挥其巨大威力，在业务项目中使用多了，会导致数据来源不清楚，应少用。

## vue-meta 在路由中的使用

这个网站的 seo 有关，感觉不够实用。

## 如何确保用户导航到某个路由自己都重新渲染？

```html
<router-view :key="$route.fullPath" />
```

## 测试最佳实践

- 不测 vue，比如测试生命周期函数的调用

- 使用生成器生成模板代码，比如`plop.js`

## 如何制定团队的最佳实践 --- 规范

- 选择最佳实践

没有时间讨论最佳实践或者不知道有哪些最佳实践，就直接选择一个社区的规范。

- 实现最佳实践

配置 lint prettier 等工具让规范自动约束开发者的行为。

linter --- styleLint eslint markdownlint

formatter --- prettier

代码模板生产成--- plop

编辑器设置 --- .vscode

- 如何执行规范

保证你的情绪稳定、不要责怪他人、找到系统的解决方案、有能力，就要保护你的成员

## 可访问性

`eslint-plugin-a11y`可帮助检查。

## vue 代码最佳实践

[Vue Styleguidist](https://vue-styleguidist.github.io/)

这个有点繁琐了，进度不允许写这么多注释。

## 总结

这个课程没有想象中的好，只推荐 vue 使用 2 年内的看。
