# react-router 使用

## 快速入门

安装

```bash
yarn add react-router-dom
或者
npm install react-router-dom
```

react 以组件为核心，react-router-dom 也是同样的道理，通过相关组件来配置路由导航。

> 使用的版本是：`"react-router-dom": "^4.3.1"`, react-router 为何核心、dom 和 native,dom 用于 web app， native 用于 react native app。

## 核心组件的使用

```bash
<BrowserRouter/>
<HashRouter/>
<Route/>
<Switch/>
<Redirect/>
<Link/> (<NavLink/>)
withRouter
```

```js
<BrowserRouter>
  // 渲染成 a 标签
  <Link to='/'>主页</Link>
  <Link to='/recommend'>推荐</Link>
  <Link to='/detail/1'>详情</Link>
  <Route path='/' exact component={Home} />
  <Route path='/detail/:id' exact component={Detail} />
  <Route path='/recommend' exact component={Recomm} />
</BrowserRouter>
```

> hash 模式 vs history 模式

vue-router 在配置路由时可执行模式，react-router 也支持相同的功能：

history 模式，使用 `BrowserRouter` 组件，哈希模式使用`HashRouter`组件。

> 区别：

history 在地址栏 url 改变时，会发请求到服务器，单页应用，需要返回一个 html 文件，服务器配置需要总是返回`index.html`，否则返回 404。`Link组件跳转，不会发送 http 请求。`

hash 模式，不会发起 http 请求，而是使用 hash 定位到相关组件。`哈希历史记录不支持 location.key 和 location.state，当通过state 传递参数的时候，无法从历史记录中获取到`。

## 基本配置

```js
import React, { Component } from 'react'
import { LoginForm, ListBook, Books, WithPersistentData } from '../components'
import { HashRouter, Route, Link } from 'react-router-dom'
const HocListBook = WithPersistentData(ListBook)

class Home extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h2>hash 基本配置例子</h2>
          <br />
          <Link to='/form'>表单</Link>
          <br />
          <Link to='/books'>书籍</Link>
          <br />
          <Link to='/list-books'>书籍列表</Link>
          <br />
          <Link to='/render'>render例子</Link>
          {/*  类似 <router-view />  */}
          <Route path='/form' component={LoginForm} />
          <Route path='/books' component={Books} />
          <Route path='/list-books' component={HocListBook} />
          <Route
            path='/render'
            render={() => {
              return <h3>render函数</h3>
            }}
          />
        </div>
      </HashRouter>
    )
  }
}

export default Home
```

`HashRouter` hash 模式的路由，HashRouter 组只有一个子节点，需要使用 `div` 包裹。

`Link` 组件表示一个链接，会被渲染成 `a` 标签，`to` 属性表示跳转的路径。

`Route` 组件是路由出口，类似 vue-router 种的 `router-view`，当地址栏的 url 匹配到它的 `path`属性，会渲染它的 `component` 属性指定的组件，不提供 component 属性，还可传递一个 render 函数。同时提供两个属性，会渲染 `component` 指定的组件。

> vue-router 可实现多个 path 只在一个路由出口渲染，react-router 如何实现这种工功能？

> 如何在一个文件中集中配置路由？

### history 模式

### hash 模式

### 嵌套路由

### 其他

## 路由传参

两种方式：动态路由和 query

1. 动态路由 ---- 参数在路径中

```js
// 路由配置
<Route path='/dynamic/:age' component={Params}></Route>
// 传递参数
<Link to={`/dynamic/${this.state.age}`}>动态路由</Link>
this.props.history.push("/dynamic/25");
// 在 Params 组件中获取参数
constructor(props) {
  super(props)
  console.log(this.props.match.params)// {age:'25'}
}
```

2. query ---- 参数放在查询字符串中

```js
// 路由配置
<Route path='/query' component={Params}></Route>
// 传递参数
<Link to={`/query?age=${this.state.age}&name=jack`}>query</Link>
this.props.history.push(`/query?age=${this.state.age}&name=jack`);
// 在 Params 组件中获取参数
constructor(props) {
  super(props)
  console.log(this.props.location.search)// ?age=25&name=jack
}
```

## 路由跳转

路由跳转主要有两种方式：组件跳转和 js 跳转

1. 组件跳转

`Link` 和 `NavLink` 组件跳转

2. js 跳转

## 路由守卫

## 异步路由

## 参考

[中文文档](https://react-guide.github.io/react-router-cn/docs/Introduction.html)
