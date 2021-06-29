---
title: vue 状态管理（二）
date: 2019-05-26 18:57:29
tags:
- vue
-  vuex
categories:
- [vue]
- [前端框架]
---

上篇文章中说了 state 和 getters，本篇文章就来说说 mutations 和 actions。
提交 mutations 是改变 state 的唯一方式，不能用异步操作。actions 通过分发 action 来提交 mutation，可包含异步操作，比如 xhr 。

<!-- more -->
## mutations

声明 mutations:
```js
// mutations.js
import vue from 'vue'
export default {
	CHANGE_LAST_NAME(state, newLastName) {
		state.lastName = newLastName
	},
	CHANGE_AGE(state, params) {
		state.age = params.age + 5
	},
	// 新增一个属性
	SET_REPOS(state,repos){
		// 给 state 新添加属性
		vue.set(state,'repoList',repos)
	}
}
```
使用 mutations 
1. 通过 `mapMutations` 映射方法；
2. 在方法中 调用 `this.$store.commit('mutaion')`；
3. 可以在 mutation 种给 state 新增状态（属性），新增的状态会响应到视图上。

```html
<template>
	<div class="store">
		<p>基本信息：{{this.info}}</p>
		<input type="text" name="age" id="age" v-model="age" placeholder="请输入年纪" />
		<button @click="changeAge">修改年纪</button>
		<button @click="changeAge2">修改年纪2</button>
		<p>年纪:{{this.$store.state.age}}</p>
		<input type="text" v-model="lastName" placeholder="请输入姓氏" @input="changeLastName" />
	</div>
</template>
<script>
	import CustomInput from '_c/CustomInput.vue'
	import { mapState, mapGetters, mapMutations } from 'vuex'
	export default {
		name: 'Store',
		data() {
			return {
				age: '',
				lastName: ""
			}
		},
		methods: {
			handleInput(val) {
				this.value = val
			},
			//方法名和 muations 相同
			...mapMutations(['CHANGE_LAST_NAME', 'CHANGE_AGE']),
			// 将 `this.changeAge2()` 映射为 `this.$store.commit('CHANGE_AGE')`
			...mapMutations({ changeAgeAlias: 'CHANGE_AGE' }),
			changeAge() {
				// 传递载荷
				// this.$store.commit('CHANGE_AGE', { age: Number.parseInt(this.age) })
				//对象提交方式
				// this.$store.commit({ type: 'CHANGE_AGE', age: Number.parseInt(this.age) })
				this.CHANGE_AGE({ age: Number.parseInt(this.age) })
			},
			changeAge2() {
				this.changeAgeAlias({ age: Number.parseInt(this.age) })
			},
			changeLastName() {
				// this.$store.commit('CHANGE_LAST_NAME', this.lastName)
				this.CHANGE_LAST_NAME(this.lastName)
			},
		}
	}
</script>
```
## actions 

mutation  只能是同步操作，为了使用异步操作，Vuex 提供了 actions。

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

声明 actions

- action 接收一个和 store 具有相同属性和方法的对象，可 context.commit 提交 mutation；
- 可以解构赋值，获取 `commit` 和 `dispatch`，commit 用于提交 mutation, dispatch  用于分发其他 action。

```js
import http from 'axios'
export default {
	// action 接收一个和 store 具有相同属性和方法的对象，可 context.commit 提交 mutation
	changeAgeAsync(context, params) {
		console.dir(context)
		//模拟异步操作
		setTimeout(() => { context.commit('CHANGE_AGE', params) }, 5000)
	},
	//通过 github API 获取我的 github 仓库信息
	async 	repos({ commit, dispatch }, username) {
		let response = await http.get(`https://api.github.com/users/${username}/repos`)
		let repoList = response.data
		commit('SET_REPOS', repoList)
		// 分发其他 action 形成组合 action
		dispatch('changeAgeAsync', { age: 30 })
		// 给 state 新添加属性 不能直接改变 state
		// vue.set(state,'repoList',repoList)
	}
}
```
在组件中使用 actions

- 通过 `mapActions` 映射为方法。
- `this.$store.dispatch`。

```html
<template>
	<div class="store">
		<input type="text" name="age" id="age" v-model="age" placeholder="请输入年纪" />
		<button @click="changeAge">修改年纪</button>
		<p>年纪:{{this.$store.state.age}}</p>
		<input type="text" v-model="lastName" placeholder="请输入姓氏" @input="changeLastName" />
		<hr>
		<button @click="getRepos">获取仓库列表</button>
		<h2>我的仓库列表：</h2>
		<ol>
			<li v-for="(item, index) in repoList" :key="index">{{item.full_name}}</li>
		</ol>
	</div>
</template>
<script>
	import { mapState, mapActions} from 'vuex'
	export default {
		name: 'Store',
		data() {
			return {
				age: '',
				lastName: ""
			}
		},
		methods: {
			...mapActions(['changeAgeAsync','repos']),
			changeAge() {
				// this.$store.dispatch('changeAgeAsync',{ age: Number.parseInt(this.age) })
				this.changeAgeAsync({age: Number.parseInt(this.age)})
			},
			getRepos(){
				// this.$store.dispatch('repos','jackzhoumine')
				this.repos('jackzhoumine')
			}
		},
		computed: {
			//计算属性名和 state 属性名相同:传入数组
			...mapState(['repoList'])
		}
	}
</script>
```

## module

状态对象很复杂时用 module 划分。
这个似乎用得很少。需要用时看[veux 文档](https://vuex.vuejs.org/zh/guide/modules.html)即可。

## 总结

1. 提交 `mutation` 是改变你 state 的唯一方式；
2. 方法执行上：
   - `dispatch` 分发 action ;
    - `commit` 提交mutation。
3. 辅助方法的映射
  - getters、state 映射为计算属性；
  - actions、mutations 映射为法法。
4. 分离功能：
  - state 保存数据；
  - getters 是对 state 的操作；
  - actions 要提交 mutation;
  - mutations 改变 state。
5. 异步与同步：
  - action 封装异步处理；
  - mutation 只能是同步。
6. 视图响应

  ( `vue component dispatch` → ) `vue component commit` → ` state` → （ `getters` →） `vue component`

7. state 对象太过复杂，使用 `module` 划分。

## 参考

- [理解Vuex，看这篇就够了](https://mobilesite.github.io/2016/12/18/vuex-introduction/)
- [veux 文档](https://vuex.vuejs.org/zh/guide/forms.html)