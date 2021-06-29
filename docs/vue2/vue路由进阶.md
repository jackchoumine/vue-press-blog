# vue 路由进阶

路由可向路由匹配的组件传递参数，`不同情况`向组件传递不同的参数，从而实现组件的复用。

<!--more-->

## 路由向组件传递参数

和路由匹配的组件可以在组件中使用 `$route` 获取路由上的参数：

### 传参方式

`:`、`params`和`query`

#### `:` 在路径传递参数

```js
{
	path: "/argu/:id/book",
	name: "argu",
	component: () => import("@/views/ArguPage")
}
```

`路径`中的一部分是参数，`必须`传递该参数：

```html
<!--路径跳转-->
<router-link to="/argu/123/book">path跳转</router-link>
<!--路由名跳转-->
<router-link :to="{name:'argu',params:{id:'test'}}" tag="button">name+params跳转</router-link>
<!--获取参数-->
<h1>{{$route.params.id}}</h1>
<!--params的名字路径中的的参数名一致-->
```

此时 `path`+ `parmas`传递参数，`params`会被忽略。

#### `params`+`name`传递参数

路由：

```js
{
	path: "/argu",
	name: "argu",
	component: () => import("@/views/ArguPage")
}
```

跳转方式是 `name`+`params`+（query），通过`path`跳转，params 会被忽略。

```html
<router-link :to="{name:'argu', params:{name:'hangge'}}">跳转到 hello</router-link>
// path + params ，params 会被忽略，因为路径中没有定义参数
<router-link :to="{path:'/argu', params:{name:'hangge'}}">跳转到 hello</router-link>
```

#### query 参数

query 参数参数，表现为查询字符串，和`localtion.search`一样的。

不需要先在路径中先定义，可通过`path`、`path`+`query` 或者 `name` + `query` 传递参数。

```html
<router-link to="/argu?queryName=value">跳转到 hello</router-link>
<router-link :to="{path:'/argu',query:{queryName:value}}">跳转到 argu</router-link>
<router-link :to="{name:'argu',query:{queryName:value}}">跳转到 argu</router-link>
<h1>{{ $route.query.queryName }}</h1>
```

函数传递 query

```js
// 主要是  $router 不是 $route
go() {
	this.$router.push({
		name: 'argu',
		query: {
				queryName: "你好"
			}
		})
	}
}
```

但是这样使得 `$route` 和组件耦合在一起，不方便组件的复用，如果能将路由中的参数传递到 组件的`props` 就好了，恰恰是可以这样设置的。

### props 接收路由的 `params`

路由传参数的三种方式：

1. 布尔模式

```js
{
    path: '/user/:id',
    component: User,
    props: true //表明 将 id 作为 props 传递到匹配的组件 User 中。
}
```

User 中定义 props 接收 id:

```js
export default {
  props: {
    id: {
      type: String,
      default: 'jackzhou' //默认值
    }
  }
}
```

2. 对象模式

将路由的 `props` 属性设置一个对象，也可在组件中获取到该值，这种方式往往用于传递静态值，即 name 值不会变化。

路由对象：

```js
{
	name: 'home',
	alias:'/home_page',
	path: '/',
	props:{name:'jack jack'},
	component: Home
}
```

Home 组件：

```js
props:{
	name:{
		type:String,
	}
}
```

3. 函数模式

以上两种方式，params 参数的名字必须和组件中的 props 属性名字相同，如果想对 params 进行改造后传递到组件，就可将 `props` 设置成函数，在函数内获取路由中的 params 或者 query，或者其他属性值，对其进行处理后再传递给组件。

**注意**：这种方式函数必须返回一个对象。

路由：

```js
{
	name: 'about',
	path: '/about/:years', //params 有一个参数 years
	props:(route) {
  		const now = new Date()
  		return {
		// 将 years 改造成 name
    	name: (now.getFullYear() + parseInt(route.params.years)) + '!'
        }
	    },
	component: () => import('@/views/AboutPage'),
}
```

组件中的 props:

```js
props: {
  name: {
    type: String
  }
}
```

命名视图的路由，要为每个命名视图添加 `props`：

```js
{
	path:'/name/:view',
	name:'name_view',
	components:{
		default:()=>import('@/views/ChildPage'),
		sister:()=>import('@/views/SisterPage'),
		brother:()=>import('@/views/BrotherPage'),
	},
	props:{
        default:true,
        sister:false,
        brother:(route)=>({view:route.params.view.toUpperCase()})
    }
}
```

### 完整的例子

<p class="codepen" data-height="544" data-default-tab="result" data-slug-hash="JqBzWE" data-user="JackZhouMine" style="height: 544px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/JackZhouMine/pen/JqBzWE">
  route 的 params 传递参数</a> by JackChouMine (<a href="https://codepen.io/JackZhouMine">@JackZhouMine</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## HTML5 History 模式

路由配置里有一个属性 `mode` ，默认值是 `hash`，以 hash 来模拟一个 url，url 改变时，页面不会重新加载。

先使用普通模式，可将 `mode` 设置成 `history`，这种模式会使用 `history.pushSate` 来完成 url 跳转而页面不会重新加载。这种模式需要**服务器设置一下**。

使用 history 模式，因为 web 应用往往是单页应用，当用户访问一个不存在的路径时，需要提供一个后备页面。

在路由配置的最后增加一个 404 路由：

```js
{
	path:'*',
	component:NotFoundPage// 前面没有匹配的路由，最后会匹配该路由。
}
```

## meta 元信息

可在路由对象中配置 `meta` 属性，meta 是一个对象。

比如，根据不同页面显示不同的 title。

```js
{
	name: "about",
	path: "/about",
	meta: {
		title: "关于"
	},
   	component: () => import("@/views/AboutPage")
}
```

在路由配置文件中，设置各个页面的 title：

```js
const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  //setTitle 函数用于设置页面标题
  to.meta && setTitle(to.meta.title) //这是简化if语句的简写
  console.table(to)
  console.table(from)
  next()
})
export default router
```

## 导航守卫

### 全局守卫

1. 全局前置守卫

```js
const router = new Router({
    {
        path:"/",
        name:"heom_page"
        component:Home,
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            //处理逻辑
            next()
        }
    }
})
//每次路由进入都会调用
router.beforeEach((to,from,next)=>{
    //处理逻辑，比如登录判断，可跳转到任意页面
    //不要忘记调用 next，不调用 next，页面不会跳转
})
```

2. 后置钩子

```js
//路由跳转之后做一些操作，比如去掉登录样式
router.afterEach((to, form) => {
  //逻辑处理
})
```

3. 路由独享守卫
   只在匹配某个路由时执行。

4. 组件内守卫

`beforeRouteEnter`, 组件创建之前调用，组件不具备`this`；
`beforeRouteUpdate`，路由更新，而组件被复用时调用，可使用`this`；
`beforeRouteLeave`，离开路由时调用，可使用`this`。

```js
export default {
  name: 'Home',
  data() {
    return {}
  },
  /**
   * 组件内路由守卫
   * 1. 该函数在路由进入时执行
   * 2. 此时 组件还未渲染，不可用 this,当可在  next 中用 vm
   * 3. next 晚于 mounted 执行，next 之前的代码，早于beforeCreate 	  *	   执行
   * 4. 最后需要调用 next 使得路由跳转
   */
  beforeRouteEnter(to, from, next) {
    console.log('①，home 组件内路由守卫，beforeRouteEnter')
    // next 晚于 mounted 执行，next 之前的代码，早于beforeCreate 执行
    next(vm => {
      console.log('vm')
      console.log(vm) //有值
      console.log('this')
      console.log(this) // undefined
      console.log('②，home 组件内路由守卫，beforeRouteEnter')
    })
  },
  /**
   * 组件内路由守卫
   * 1. 该函数在路由离开时执行,最先调用,然后在调用全局守卫，再调用		*	 beforeDestroy
   * 2. 此时，该路由守卫所在组件已渲染，可用 this
   * 3. 最后需要调用 next 使得路由跳转
   */
  beforeRouteLeave(to, from, next) {
    console.log('①，home 组件内路由守卫，beforeRouteLeave')
    let leave = confirm('你确定要离开 home 页吗？')
    if (leave) {
      // console.log(to.name, from.name);
      // console.log(this);
      next(() => {
        console.log('②，home 组件内路由守卫，beforeRouteLeave')
      }) //给 next 传递 false ,路由不会跳转
    } else {
      next(false)
    }
  },
  /*
   * 当路由发生变化，而组件被复用时调用
   * 1. 此时该复用组件已被渲染，可用 this
   * 2. 需要调用 next，组件才能渲染
   */
  beforeRouteUpdate(to, from, next) {
    console.log('①，argu，组件内路由守卫，beforeRouteUpdate')
    next(() => {
      console.log('next，argu，组件内路由守卫，beforeRouteUpdate')
    })
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  }
}
```

路由全过程：

1. 导航被触发
2. 离开页面（失活的组件）里调用离开守卫 beforeRouteLeave
3. 调用`全局前置守卫` beforeEach
4. 在重用的组件里调用 beforeRouteUpdate (非重用组件，没有这个步骤)
5. 调用路由独享守卫 beforeEnter
6. 解析异步路由组件
7. 在进入页面（激活组件）调用 beforeRouteEnter
8. 调用`全局解析守卫` beforeResolve （导航被确认之前，组件内守卫和异步路由组件被解析之后，调用 beforeResolve）
9. 导航被确认（什么时候被确认，全部钩子执行完了，是被确认的）
10. 调用`全局后置守卫` afterEach
11. 触发 DOM 更新
12. 在 vue 实例中（此时页面解析完毕了吗？是的）调用 beforeRouterEnter 守卫里传给 next 的回调。`next`在`mounted`之后被调用。

## 过渡效果

可以给路由匹配的组件设置过渡效果，让页面平滑地显示，提升用户体验。
需要用到 `transition` 标签，如果有多个视图需要过渡，则用 `transition-group`。

```html
<transition-group name="router-view">
  <!-- 视图渲染组件,该组件内不需要房子任何内容，可写成只闭合标签-->
  <router-view key="default" />
  <!-- 有多个路由视图需要匹配，则用命名视图 -->
  <router-view key="sister" name="sister"></router-view>
  <router-view key="brother" name="brother"></router-view>
</transition-group>
```

css 过渡效果：

```css
.router-view-enter {
  opacity: 0;
}
.router-view-enter-active {
  transition: opacity 1s ease;
}

.router-view-enter-to {
  opacity: 1;
}
.router-view-leave {
  opacity: 1;
}
.router-view-leave-active {
  transition: opacity 1s ease;
}

.router-view-leave-to {
  opacity: 0;
}
```

这些设置，每个页面的效果都是一样的，要为不同的页面设置不同的效果，可用路由传递相应的参数来，让动态绑定到 transition 的 name 属性上。

或者监听路由变化：

```js
watch: {
	'$route'(to){
		console.log(to);
		to.params&&to.params.view&&(this.effect = to.params.view)
	},
}
```

## 参考

[Vue.js - 路由 vue-router 的使用详解 2（参数传递）](http://www.hangge.com/blog/cache/detail_2121.html)
