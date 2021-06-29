---
title: vue 状态管理（三）
date: 2019-05-26 20:35:39
tags:
- vue
- vuex
categories:
- [vue]
- [前端框架]
---
我们修改 state，然后刷新浏览器，状态又变化原来的了，因为 state 是存在内存中的，为了点击刷新，状态不回到原来的，就需要 Vuex 提供的插件功能，当然插件还能实现其他复杂的功能。

<!-- more -->

## 插件

Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯一参数：

```js
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}
```
使用插件：
```js
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```
使用插件本地 state 持久化。

```js
//localstore.js
export default store => {
	// 当 store 初始化后调用
	console.log('store 初始化', JSON.stringify(store.state, '', 2))
	// 已经初始化 
	// 不能 store.state = '' 直接赋值方式改变 state
	if (localStorage.getItem('state')) store.replaceState(JSON.parse(localStorage.state))
	store.subscribe((mutation, state) => {
		// 每次 mutation 之后调用
		localStorage.state = ''
		try {
			localStorage.setItem('state', JSON.stringify(state))
		} catch (error) {
			console.log('持久化遇到错误')
			console.error(error)
		}
		console.log('mutation', mutation)
		// mutation 的格式为 { type, payload }
	})
}
```
修改 store
```js
// 引入插件
import { localStore } from './plugins'
Vue.use(Vuex)
export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		user
	},
	plugins: [localStore]
})
```
启用插件后，调用 commit 更新 state 后，会更新本地存储，即使实现浏览器，值也不会变。

## 处理表单

在学习 mutations 时，我们使用表单的值更新state，我们这样写
```html
		<input type="text" name="age" id="age" v-model="age" placeholder="请输入年纪" />
		<button @click="changeAge">修改年纪</button>
		<p>年纪:{{this.$store.state.age}}</p>
		<input type="text" v-model="lastName" placeholder="请输入姓氏" @input="changeLastName" />
```
```js
	import { mapMutations } from 'vuex'
	export default {
		name: 'Store',
		data() {
			return {
				age: '',
				lastName: ""
			}
		},
		methods: {
			//方法名和 muations 相同
			...mapMutations(['CHANGE_LAST_NAME', 'CHANGE_AGE']),
			// 将 `this.changeAge2()` 映射为 `this.$store.commit('CHANGE_AGE')`
			...mapMutations({ changeAgeAlias: 'CHANGE_AGE' }),
			changeAge2() {
				this.changeAgeAlias({ age: Number.parseInt(this.age) })
			},
			changeLastName() {
				// this.$store.commit('CHANGE_LAST_NAME', this.lastName)
				this.CHANGE_LAST_NAME(this.lastName)
			},
		}
	}
```
以上方式都是在方法中提获取表单的输入值，需要再data里生属性。其实我们可以在计算属性中使用`setter`、`getter`中实现，充分利用 `v-model` 双向绑定的特性来简化了代码。

```html
<template>
	<div class="store">
		<p v-text="this.$store.getters.fullName"></p>
		<input type="text" v-model="lastName" placeholder="请输入姓氏" @input="changeLastName" />
</template>
<script>
	export default {
		name: 'Store',
		computed: {
			lastName: {
				get() {
					return this.$store.state.lastName
				},
				set(newLastName) {
					this.$store.commit('CHANGE_LAST_NAME', newLastName)
				}
			}
		}
	}
</script>
```

