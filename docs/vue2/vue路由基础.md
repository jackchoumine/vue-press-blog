# vue 路由基础

vue 使用 vue-router 插件处理路由，路由是开发单页应用必须掌握的知识。

<!--more-->

## 什么是 vue-router？

（1）**vue-router** 是 **Vue** 官方提供前端路由插件，借助它我们实现可以基于路由和组件的单页面应用。

（2）它与传统的页面区别在于：

- 传统的页面应用采用的是`后端路由`，即通过超链接来实现页面切换和跳转的。
- 而在 **vue-router** 单页面应用中，则是通过路径之间的切换（实际上就是组件的切换）。

### router-link 和 router-view 组件

`router-link` 是一个`a`（链接）标签的封装，`router-view` 是路由视图，渲染 router-link 匹配到的组件，可配合使用`<transition>` 和 `<keep-alive>` 使用。

[更多详细信息](https://router.vuejs.org/zh/api/#router-link)

## 路由配置

### 动态路由

路由对象为：

```js
{
	path:'/argu/:name',
    // 使用 import 动态引入路径对应的组件，起到懒加载的作用
    component:()=>import('@/views/ArguPage')
}
```

可在该路由的`组件`中这样获取 name 的值：

```js
$route.params.name //给同一个组件设置传递不同的params，实现组件的复用
```

`$route` 是当前路由，可用` watch`在组件中监它的变化，有一个 `params` 属性，值一个包含动态路由的对象。

```js
watch: {
  '$route'(to) {
	 console.log(to);
	 //将路由的 params 属性赋值给组件的 data 属性
	 to.params && to.params.view && (this.effect = to.params.view)
	},
}
```

### 嵌套路由

在路由对象中添加一个 `children` 属性，值是一个数组，可包含多个子路由。`子路由 path 前面不能有 / ` 。 父级路由对应的组件必须有路由出口，即 router-view。

### 命名路由

路由对象中的 name 属性是路由的名字，可用该名字指定路径。
在 router-link 的 to 属性`动态绑定` `路由对象`。

```html
<router-link :to="{name:'home'}"></router-link>
```

### 命名视图

route-view 是路由视图，只有一个视图时，路由匹配的组件在该视图中渲染，多个视图则要对视图进行命名。

```html
<!-- 视图渲染组件,该组件内不需要房子任何内容，可写成只闭合标签-->
<router-view />
<!-- 有多个路由视图需要匹配，则用命名视图 -->
<router-view name="sister"></router-view>
<router-view name="brother"></router-view>
```

路由对象：

```js
{
	path:'/name/view',
	name:'name_view',
	// 注意命名视图的 components 和 组件的 component 的区别
	components:{
		// 不给 router-view 设置 name 属性，name 值就是 default
		default:()=>import('@/views/ChildPage'),
		sister:()=>import('@/views/SisterPage'),
		brother:()=>import('@/views/BrotherPage'),
	}
}
```

### JS 操作路由

路由对象 $router 有多个函数`push `、`go`、` replace`

push 可导航到不同的页面，会将该路径进入历史记录。
`$router.push` 和 `window.history.pushSate` 一样。
push 可接受不同的参数：

```js
//字符串路径
this.$router.push('home')

// 路由对象
this.$router.push({ path: 'home' })

// 命名路由加参数
this.$router.push({ name: 'argu', params: { name: 'jack' } })
//  path 路由和 query
this.$router.push({ path: 'argu', query: { name: 'jack' } })
//  path  和 params 不可一起使用，params 会被忽略
this.$router.push({ path: 'argu', params: { name: 'jack' } })
this.$router.push({ name: 'argu', query: { name: 'jack' } })
```

go 的参数是一个整数，表示回退或者前进多少历史记录。

```js
// 在浏览器记录中前进一步，等同于 history.forward()
$router.go(1)

// 后退一步记录，等同于 history.back()
$router.go(-1)

// 前进 3 步记录
$router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
$router.go(-100)
$router.go(100)
```

`router.replace(location)` = `window.history.replaceState`
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录

使用场景：不需要用户回退的情况，比如权限验证。

```js
// 路由名字
this.$router.replace('name_view')
// 字符串路径
this.$router.replace('/name/view')
// 路由对象
this.$router.replace({ path: '/name/view' })
// 命名路由带 params
this.$router.replace({ name: 'name_view', params: { age: 24 } })
// path 和 query
this.$router.replace({ path: 'name_view', query: { age: 24 } })
// this.$router.replace({path:'/name/view',params:{age:24}});
```

### 重定向和别名

```js
// 路由重定向:访问 /index ，重定向到 /
{
	path:'/index',
	redirect:'/'
}
```

redirect 也可设置一个对象：

```js
{
	path:'/index',
	redirect:{
		name:'home'
	}
}
```

redirect 还可以设置为一个函数，传递一个参数 to,可根据该对象的不同值，重定向到不同的页面，返回一个 `命名路由 ` 或者 `字符串路径 ` 。

```js
{
	path:'/index',
	redirect:to=>{
		// do something with to
		return {
			name:'home'
		}
	}
}
```

`to` 是一个包含路径参数的对象：

```json
{
  "name": "index",
  "meta": {}, // 路由元数据，可在全局导航守卫中获取该对象，然后不同页面设置不同的值，比如设置页面的标题
  "path": "/index", // 路由路径 解析为绝对路径 /a/b
  "hash": "", // 书签
  "query": {}, // 查询参数 /a?user=jack, $route.query.uer 的值为 jack
  "params": {}, //
  "fullPath": "/index", // 完整路径
  "matched": [
    {
      // 当前路由的所有嵌套路径片段的路由记录,路由记录就是路由的副本。
      "path": "/index",
      "regex": {
        "keys": []
      },
      "components": {},
      "instances": {},
      "name": "index",
      "meta": {},
      "props": {}
    }
  ],
  "redirectedForm": "" // 重定向来源的名字
}
```

```js
router.beforeEach((to, from, next) => {
  console.log('①，全局前置守卫,beforeEach')
  //给每个页面设置不同的标题，标题就从 meta 中获取
  //setTitle = (title)=>{
  // window.document.title=title||'admin'
  //}
  to.meta && setTitle(to.meta.title)
  next(() => {
    console.log('②，全局前置守卫,beforeEach')
  })
})
```

#### 路径别名

```js
{
	name: 'home',
	alias:'home_page',// 路径别名
	path: '/',
	component: Home
}
```

## 常见面试题

- [route 和 router 的区别](https://segmentfault.com/q/1010000009289159/a-1020000018573459)

route 是当前路由,就是你设置路由时的那个 routes 里的元素，参数在这里获取。

router 是全局路由对象，就是我们 new 出来的那个对象。常见的路由方法在这里获取。

this.$route 是 this.$router.options.routes 里的一个元素。
