# vue 中的样式

理想的样式解决方案，期待达到以下目的：

1. 样式方便复用

2. 能轻易避免冲突，样式冲突往往难以定位

3. 开发体验好，使用 scss 、less 等预处理，能提高开发效率和体验

4. 方便修改样式

5. 其他，比如兼容 css，降低学习成本

今天看看 vue 的样式解决方案，能否满足以上要求。

## scoped 样式

`style` 标签上添加`scoped`标志，可以把样式作用范围限制在组件内，即组件内部的样式不会影响外部的样式。

原理：组件编译时给标签**添加`data-v-xxx`属性**，选择器附带该属性。

父组件的样式如何作用到子组件内部呢？

## deep 样式

vue 提供了特殊的`:deep`选择器，可将父组件的样式作用到子组件内部。

`v-deep` 已经废弃。

> 将 vue component 转为 web component，deep 样式不生效。

## slot 样式

在组件内部编写 slot 的样式

```css
/* slot 里包含选择器 selector  */
:slotted(selector) {
  color: blue;
}
```

## 全局样式

1. 引入多个 style，没有 scoped 的样式块，全局生效。

```html
<style>
  /* global styles */
</style>

<style scoped>
  /* local styles */
</style>
```

2. `:global` -- 希望单条规则全局生效

```css
:global(.yellow) {
  color: yellow;
}
```

## v-bind 绑定动态属性

```css
.progress-bar > div {
  background-color: #000;
  width: v-bind('props.progress'); /* props.progress 是 props 属性*/
  height: 8px;
  border-radius: 10px;
  transition-property: width;
  transition-duration: 150ms;
}
```

## style module

```html
<template>
  <div>
    <p :class="$style.red">This should be red</p>
    <h3>HelloWorld</h3>
  </div>
</template>

<style module>
  .red {
    color: red;
  }
</style>
```

style module 能很好做到样式隔离，原理：重写选择器，使其全局唯一。

感觉在模板语法中用 style module，不如 scoped 好，更加适合 JSX。

[CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

### 更多参考

[编写组件样式表](https://vue3.chengpeiquan.com/component.html#%E7%BC%96%E5%86%99%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E8%A1%A8)
