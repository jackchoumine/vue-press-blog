# JS 风格

> 要求 Element 元素统一使用 El 后缀

```js
// ✗ bad
const elem = this.$el;
const element = e.target;
const input = this.$refs.input;

// ✓ good
const el = this.$el;
const el = e.target;
const inputEl = this.$refs.input;
```

> 要求 Vue 实例统一使用 vm / Vm 后缀

```js
// ✗ bad
const instance = this;
const form = this.$refs.form;
this.$emit("select", {
	item,
});

// ✓ good
const vm = this;
const formVm = this.$refs.form;
this.$emit("select", {
	item,
	itemVm: selectedVm,
});
```

> 事件处理方法使用 on 前缀

```js
// ✗ bad
{
    methods: {
			// input --- 元素？事件处理器？
        input() {
            // ...
				},
				// handle --- 太长
        handleValidate() {
            // ...
        },
    },
}

// ✓ good
{
    methods: {
        onInput() {
            // ...
        },
        onValidate() {
            //...
        },
    },
}
```

> 变量命名

```js
常见状态：default, primary, info, success, warning, error, disabled, muted, ...
大小分级：mini, small, base, large, huge, ...
颜色分级：darkest, darker, dark, base, light, lighter, lightest,
```
