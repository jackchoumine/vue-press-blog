[[toc]]

## 组件生命周期和指令声明周期的执行顺序

> 挂载组件

```bash
beforeCreate
⬇️
created
⬇️
beforeMount
⬇️
bind # 指令 绑定到元素时调用，父元素可能不存在
⬇️
inserted # 1 指令 被绑定元素插入父元素时调用，父元素一定存在
⬇️
mounted
```

> 更新组件

```bash
beforeUpdate
⬇️
update # 指令，此时组件还没更新完毕，拿不到最新的数据
⬇️
componentUpdated # 指令 此时组件已经更新完毕 能拿到最新的数据
⬇️
updated
```

> 销毁组件

```bash
beforeDestroy
⬇️
unbind # 指令 组件在销毁之前调用，仍然能拿到组件的数据
⬇️
destroyed
```

> 重建组件时

```bash
beforeCreate
⬇️
created (重建)
⬇️
beforeMount
⬇️
bind  # 注意这里，指令绑定这个钩子函数，将会拿不到重建后的最新数据
⬇️
beforeDestroy （组件销毁）
⬇️
unbind # 指令
⬇️
destroyed
⬇️
inserted # 1 指令 使用 该钩子函数，能拿到重建后的数据
⬇️
mounted
```

指令钩子执行顺序：

```bash
beforeCreate
⬇️
created
⬇️
beforeMount
⬇️
bind # 绑定元素的父元素可能不存在，做初始化工作
⬇️
inserted # 父元素已经存在
⬇️
mounted
⬇️
beforeUpdate
⬇️
update # 子组件可能还没更新完毕
⬇️
componentUpdated # 子组件一定更新完毕
⬇️
updated
⬇️
beforeDestroy （组件即将销毁）
⬇️
unbind # 指令解绑
⬇️
destroyed
```

> 结论：只有 `inserted` 和 `componentUpdated` 生命周期钩子，在执行时组件的 DOM 已经更新完毕，可放心使用。

> 如何在指令生命周期中使用 `this`

直接使用`this`为 undefined，可使用`vnode`获取：

```js
inserted(el, binding, vnode, oldVnode) {
  vnode.context.setTile(el)
},
componentUpdated(el, binding, vnode, oldVnode) {
  vnode.context.setTile(el)
},
```

> 指令钩子函数的参数，主要关注 `el` 和 `binding`

`el` 是绑定指令的元素，可对其进行 DOM 操作。

有一指令如下：

```html
<template>
  <div v-test:disabled.foo="msg">
    <h1>{{ msg }}</h1>
  </div>
</template>
```

`:`之后的是指令参数，类似`v-on:keyup`中的 `keyup`。
`.`之后的时指令修饰符，foo 是修饰符。

> 参数只能有一个，修饰符可有多个。

`v-test:disabled:boo.foo.zoo="msg"`

```js
{
  arg: "disabled:boo"
  modifiers: {foo: true, zoo: true}
}
```

希望不同情况下绑定不同的参数，可使用动态参数。

`v-test:[argu].foo.zoo="msg"`

> 参数必须在修饰符之前。

`msg` 是指令表达式，其值对应`binding`对象的 value 属性。

> `binding` 一个对象：

```js
{
  arg: "disabled",
  expression: "msg",
  modifiers: {foo: true},
  name: "test",
  value: "你好",
}
```

`update` 和 `componentUpdated` 钩子函数，binding 对象还有 `oldArg` 和 `oldValue` 属性。

## vue3 在 jsx 中实现 v-html 指令

```js
// before
{
  class: ['foo', 'bar'],
  style: { color: 'red' },
  attrs: { id: 'foo' },
  domProps: { innerHTML: '' },
  on: { click: foo },
  key: 'foo'
}

// after
{
  class: ['foo', 'bar'],
  style: { color: 'red' },
  id: 'foo',
  innerHTML: '',
  onClick: foo,
  key: 'foo'
}
```

vue3 中在 jsx 中实现 v-html:

```js
{
      title: '商品描述',
      dataIndex: 'sourceDesc',
      customRender: ({ record }) => {
        let divEl = document.createElement('div')
        divEl.innerHTML = record.sourceDesc
        const content = divEl.textContent
        // @ts-ignore
        divEl = null
        return (
          (record.sourceDesc && (
            <teleport innerHTML={record.sourceDesc} title={content || '暂无数据'}></teleport>
          )) || <span title="暂无数据">-</span>
        )
      },
},
```
