---
title: vue 状态管理（一）
date: 2019-05-26 03:03:39
tags:
- vue
- vuex
categories:
- [vue]
- [前端框架]
---

父子组件之间往往使用**props**和 **\$emit** 实现数据共享，任意组件可通过**bus（一个vue实例）**作为桥梁，实现数据共享。当项目中组件越来越多时，组件之间的数据共享变得复杂，难以维护。使用 Vuex 可**集中管理**组件之间的数据（状态），使组件之间的**数据共享**变得简单。

<!-- more -->

## 父子组件间通信

父→（props）子组件；子→（\$meit）父组件，即子组件自定义一个事件，在父组件中监听该事件。

自定义输入组件：
```html
<template>
	<input @input="handleInput" :value="value" :placeholder="placeholder" />
</template>
<script>
	export default {
		name: "CustomInput",
		//props 接收父组件传递过来的数据
		props: {
			value: {
				type: [Number, String],
				required: true,
				default: ""
			},
			placeholder: {
				type: String,
				default: "提示文本"
			}
		},
		methods: {
			handleInput(event) {
				let val = event.target.value;
				// 子组件的事件监听函数中触发一个自定义事件
				this.$emit("customInput", val);
			}
		}
	};
</script>
```

使用组件：
```html
<template>
	<div class="store">
		<!-- props 传递值 -->
		<custom-input :value="value" @customInput="handleInput" :placeholder="placeholder" />
		<p v-text="value"></p>
	</div>
</template>
<script>
	import CustomInput from '_c/CustomInput.vue'
	export default {
		name: 'Store',
		components: {
			CustomInput
		},
		data() {
			return {
				value: '',
				placeholder: '自定义事件传递值'
			}
		},
		methods: {
			//  自定义事假处理器
			handleInput(val) {
				this.value = val
			}
		}
	}
</script>
```
因为 `v-model` 指令是双向绑定的，我们也可以用其来实现值的传递：
```html
<template>
	<div class="store">
		<custom-input v-model="inputValue" :placeholder="placeholder" />
		<p v-text="inputValue"></p>
	</div>
</template>
<script>
	import CustomInput from '_c/CustomInput.vue'
	export default {
		name: 'Store',
		components: {
			CustomInput
		},
		data() {
			return {
				inputValue: '',
				placeholder: 'v-mode 传递值'
			}
		}
	}
</script>
```

## bus 任意组件通信

创建一个空的 vue 实例，然后将该实例添加到 vue 的原型上，通过该实例`触发事件`和`监听事件`来在不同组件之间共享数据。
```js
//bus.js
import Vue from "vue";
let Bus = new Vue();
export default Bus;
```
在 main.js 中添加原型属性：
```js
import Bus from './lib/bus'
// 通过 bus 实现任意组件传递参数
Vue.prototype.$bus=bus
```
```html
//ChildPage.vue
<template>
	<div id="child-page">
		<h1>{{ msg }}</h1>
		<h3 v-text="data"></h3>
	</div>
</template>
<script>
	export default {
		name: "ChildPage",
		data() {
			return {
				msg: "I am child",
				data: ""
			};
		},
		mounted() {
			// 在挂载声明周期函数中监听自定义事件
			this.$bus.$on("customEvent", data => {
				this.data = data;
			});
		}
	};
</script>
```
```html
<template>
	<div id="app">
		<button @click="sendData">给child传递数据</button>
		<p v-text="num"></p>
	</div>
</template>

<script>
	export default {
		name: "App",
		data() {
			return { num: 0 }
		},
		methods: {
			sendData(data) {
				// 由 bus 触发一个事件，在接收数据的组件中监听该事件
				this.$bus.$emit('customEvent', ++this.num);
			}
		}
	};
</script>
```

## Vuex 状态管理

随着组件的增加，通过以上方式共享数据，会越来越复杂，vue 提供了状态管理插件 `Vuex`。

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式；集中存储和管理应用的所有组件状态。

理解：
- **状态**：数据，相当于组件内部的**data 的返回值**，Vue 是数据驱动的，数据变化往往会表现在视图层；
- **集中存储**：[Vue 只关注视图层](https://cn.vuejs.org/v2/guide/#Vue-js-%E6%98%AF%E4%BB%80%E4%B9%88)，Vuex 提供了一个仓库（store）来保存数据，使得数据和视图分离；
- **管理**：处理保存数据，还可计算、处理数据；
- **所有组件状态**：所有组件都可获取仓库中的数据，即一个项目只有一个数据源。

Vuex 文档中说：
>通过定义和**隔离**状态管理中的各种概念并通过强制规则维持视图和状态间的**独立性**，我们的代码将会变得更结构化且易维护。

Vuex 就是通过隔离数据、拆分改变数据的方式使得数据和视图独立，数据被组件数共享。

![Vuex 状态图](https://raw.githubusercontent.com/JackZhouMine/jack-picture/master/vuex.png "Vuex状态图")

虚线内部的三个部分组成了一个Store,组件的数据保存在 `State` 中，用户和组件交互时，通过组件内的方法分发（dispatch）一个动作（action，有点像事件），动作会提交（Commit）一个更改（Mutation，也类似事件），改变 State 中的数据，然后获取数据渲染到视图上。

- actions *可以是* 异步操作，故可在action中调用后台接口获取新的数据；
- mutations *只能是* 同步操作；
- mutations 和 actions 都可直接更改 state，但是当 action 含有异步操作时，会使得数据变化混乱，难以跟踪，使得调试困难；
- 基于以上原因，Vuex 规定只能是 mutations 来改变 state。
- 在开发工具中也可提交 mutations。

### 使用 vuex

```js
//main.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);// Vuex 是 Vue 的插件

let store = new Vuex.Store({
	state: {     //放置state的值
    	count: 0,
    	str:"abcd234"
    },
  	getters: {   //放置getters方法
      	strLen: state => state.str.length
  	},
  	// mutations只能是同步操作
  	mutations: {   //放置mutations方法
       increment(state, payload) {
          //在这里改变state中的数据
          state.count = payload.number;
       }
  	},
  	// actions可以是异步操作
  	actions: {      //放置actions方法
       	actionName({ commit }) {
          	//dosomething
         	commit('mutationName')
       	},
       	getSong ({commit}, id) {
					  //请求后台数据
          	api.getMusicUrlResource(id).then(res => {
            	let url = res.data.data[0].url;
          	})
          	.catch((error) => {  // 错误处理
              	console.log(error);
         	});
      	}
	}
});

new Vue({
  el: '#app',
  store  //  通过 this.store 访问 store
});
```
我们看看 Vuex 和 store 是什么？

Vuex：

![Vuex输出](https://raw.githubusercontent.com/JackZhouMine/jack-picture/master/vuexStore.png)

Vuex 它实际上是一个对象，里面包含了Store这一构造函数，还有几个mapActions、mapGetters、mapMutations、mapState、install 方法。

store：

![store仓库](https://raw.githubusercontent.com/JackZhouMine/jack-picture/master/vuex-store.png)

store 是 Vuex 的实例（废话）。

实际项目中往往将 store 单独放置的一个文件夹在，mutations 、getters、actions 等属性各自用一个文件保存。

### state 

state 对象的属性时 Vuex 管理的状态，类似单个组建的 data。

访问 getters:

1. `this.$store.state`；
2. 使用 `mapState` 映射成计算属性，`推荐`。

```js
//state.js
export default {
	count: 100,
	name: 'Jack*Zhou',
	firstName: 'Jack',
	lastName: 'Zhou',
	age: 24,
	profession: 'web deveploper',
	company: 'Baidu'
}
```
组件：
```js
import {mapState} from 'vuex'
export default {
	data(){
		return {
			localCount:0
		}
	},
	computed: {
			localCount() {
				return this.$store.state.count + 1;
			},
			//计算属性名和 state 属性名相同:传入数组
			// ...mapState(['count','name']),
			// 计算属性名和 state 属性不同，传入对象
			...mapState({
				name: state => state.name,
				count: state => state.count,
				countAlias: 'count',
				//为了使用 this 不能使用箭头函数
				countPlusLocalCount(state) {
					return state.count + this.localCount;
				}
			})
		},
}
```
### getters

getters 是对 state 的加工，类似于组件中的 data 和计算属性的关系。getters 的返回值会被缓存起来，只有当它的依赖改变，才会重新计算。

访问 getters:

1. `this.$store.getters`；
2. 使用 `mapGetters` 将 getters 映射成计算属性，`推荐`；
3. 方法访问，不会缓存。

```js
// getters.js
export default {
	fullName: state => state.firstName + ' ' + state.lastName,
	//在getters 中访问 getters
	info: (state, getters) => {
		return state.age + ',' + getters.fullName;
	},
	//为了传递参数，返回一个函数，
	personInfo: (state, getters) => (city) => {
		return {
			name: getters.fullName,
			age: state.age,
			company: state.company,
			city
		}
	}
}
```
使用 getters:
```js
import { mapGetters } from 'vuex'
export default {
	name: 'Store',
	computed: {
		...mapGetters(['fullName', 'info', 'personInfo']),
		myInfo() { return this.personInfo('杭州') },
		...mapGetters({
			fullNameAlias1: 'fullName',
			//不能写成函数
			// fullNameAlias2(state){
			// 	return state.name+'，你好'+this.$store.getters.fullName;
			// }
		})
	},
	mounted() {
		console.log(this.personInfo('成都'))
		console.log(this.myInfo)
	}
}
```

## 参考
- [理解Vuex，看这篇就够了](https://mobilesite.github.io/2016/12/18/vuex-introduction/)
- [vuex 文档](https://vuex.vuejs.org/zh/)