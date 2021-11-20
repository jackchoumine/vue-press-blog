# 组件设计

## 受控组件

- 受控组件
- v-model 原理
- 使用 v-model 实现受控组件

toggle 为例说明受控组件

## 自定义的受控组件

- v-model 加强

value + input 不够自然，希望自定义

```js
model: {
  prop: 'toggle',
  event:'toggle'
}
```

## 使用外部库封装组件

知识点：如何使用第三方库封装组件？

1. ref 获取 dom
2. 库的必要选项通过 props 传入

## 外部行为---全局事件

modal 为例子

1. 使用 ref 自动聚焦；在 watch 里聚焦；nextTick 里聚焦，tabIndex 进行导航，这个实现复杂了，同时不希望用户看到聚焦 而是秘密聚焦
2. 在 created hook 里监听按下 esc 键，实现关闭 modal，在 destory 里清除事件监听 ，缺点，将事
