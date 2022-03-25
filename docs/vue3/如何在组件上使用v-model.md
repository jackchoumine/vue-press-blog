# vue3 如何在组件上使用 v-model

在原生标签上

```html
<input v-model="inputValue" />
<!-- 等价于 -->
<input :value="inputValue" @input="inputValue=$event.target.value" />
```

在组件上

```html
<custom-input :model-value="searchText" @update:model-value="searchText = $event"></custom-input>
```

组件实现`v-model`：声明`model-value`的 prop, 将该 prop 绑定到 value 上，在 value 改变时，通过自定义事件 `update:modelValue` 把最新的值抛出

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `,
})
```

```html
<custom-input v-model="searchText"></custom-input>
```

使用 computed 实现：在 set 中触发自定义事件。

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input v-model="value">
  `,
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
```

> 这种实现在二次封装表单组件时，特别有用。

> 什么时候使用`modelValue`+`update:modelValue`代替 v-model?

组件在循环中时。

```html
<div v-for="item in metricList" :key="item.id">
  <!-- NOTE 使用 v-model 报错 -->
  <MetricOperate :model-value="item" @update:model-value="onUpdateModelValue" />
</div>
```

## 问题

> vue-cli 创建的项目，无法热更新。

```bash
"serve": "vue-cli-service serve --host localhost"
```

[Vue cli 3 hot reload suddenly not working in browsers](https://stackoverflow.com/questions/53589853/vue-cli-3-hot-reload-suddenly-not-working-in-browsers)

这样设置后，运行项目可能不会显示本地 ip 地址，修改为 `vue-cli-service serve --host 0.0.0.0` 即可。
