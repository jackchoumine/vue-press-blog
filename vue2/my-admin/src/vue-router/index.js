/*
 * @Description: 手写 vue-router
 * @Date: 2021-07-01 01:17:36 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-01 05:51:07 +0800
 * @LastEditors: JackChou
 */
/*

router 工作流程

url 改变
⬇️
触发路由监听事件
hash：location.hash onhashchange
history：location.pathname onpopstate
⬇️
改变 vue-router 里面的 current 变量
⬇️
vue 监听 current 的监听者
⬇️
获取到路由配置里的 component
⬇️
在 router-view 组件里渲染 component

 */

let Vue = null
class Router {
  constructor(routerConfig) {
    const { mode = 'hash', routes = [] } = routerConfig
    this.mode = mode
    this.routes = routes
    this.current = location.hash.slice(1) || '/'
    this.init()
    Vue && Vue.util.defineReactive(this, 'current', location.hash.slice(1) || '/')
  }

  init() {
    if (this.mode === 'hash') {
      window.addEventListener('DOMContentLoaded', () => {
        this.current = location.hash.slice(1) // remove #
      })
      window.addEventListener('hashchange', () => {
        this.current = location.hash.slice(1)
      })
    }
  }
}

const install = function (_vue) {
  Vue = _vue
  // Vue && Vue.util.defineReactive(this, 'current', location.hash.slice(1) || '/')

  Vue.component('router-link', {
    name: 'RouterLink',
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      console.log(this.$router)
      // NOTE 哈希模式，添加 #
      return <a href={'#' + this.to}>{this.$slots.default}</a>
    },
  })

  Vue.component('router-view', {
    name: 'RouterView',
    render(h) {
      // console.log(this.$router)
      // NOTE 在这里渲染 current 对应的 component
      // 如何拿到 current 和 routes 呢？ 混入
      // TODO 如何做到响应式的
      const current = this.$router.current
      const router = this.$router.routes.find(router => router.path === current)
      // console.log(router)
      return h(router.component)
    },
  })

  // eslint-disable-next-line vue/require-name-property
  Vue.mixin({
    beforeCreate() {
      !Vue.prototype.$router && (Vue.prototype.$router = this.$options.router)
      // if (this.$options.router) {
      //   this._router = this.$options.router
      // } else {
      //   //TODO 'RouterView' 和 'RouterLink' 没有 parent
      //   this._router = this.$parent && this.$parent.$options.router
      // }
      // this._router.init(this)
    },
  })
}
export default { Router, install }
