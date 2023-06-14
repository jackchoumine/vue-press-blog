/*
 * @Description: 应用入口
 * @Date: 2021-06-01 10:07:44 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-11-17 00:03:56 +0800
 * @LastEditors : JackChou
 */
import Vue from 'vue'

// learn axios
import './utils/bind.js'

import VueRouter from 'vue-router'
import App from './App'
import './assets/style/reset.css'
import elComponents from './element-ui'
import globalComponents from './components'
import myComponents from './examples'
import FormTable from 'j-form-table'
import router from './route'
import store from './store'
import http from './http/index4' // 只发出老的请求，新来的请求取消，使用 abortController 取消
// import http from './http/index3' // 只发出老的请求，新来的请求取消
// import http from './http/index2' // 只发出最新请求
// import http from './http/index' // 允许发出多个重复请求，有一个成功后，取消其他
import { vAuth, vClickOutside } from './plugins'
// import { defineCustomElements } from 'web-components-jack/loader'
// defineCustomElements(window)
// 引入自定义组件
const script = document.createElement('script')
script.type = 'module'
// NOTE jsdelivr 支持
// script.src = 'https://cdn.jsdelivr.net/npm/web-components-jack@1.2.3'
script.src = 'https://unpkg.com/web-components-jack'
const script2 = document.createElement('script')
script2.type = 'module'
script2.src = 'http://localhost:3334/build/echarts-web-components.esm.js'
document.head.appendChild(script)
document.head.appendChild(script2)

const plugins = [VueRouter, globalComponents, myComponents, FormTable, vClickOutside, vAuth]
// 注入 element-ui 组件
Vue.use(elComponents)

plugins.forEach(plugin => {
  Vue.use(plugin)
})

Vue.prototype.$http = http

Vue.config.productionTip = false

Vue.config.ignoredElements = ['my-rating', 'my-name', 'hello-stencil']

new Vue({
  name: 'Root',
  // 除了 vue 规定的属性，还能传递自定义属性
  city: 'chengdu',
  // NOTE 给根组件注入 store，在Mixin的beforeCreate会给每个组件注入 $store
  store,
  beforeCreate() {
    console.log('Root beforeCreate')
    // debugger
  },
  router, // NOTE 属性必须为 router
  render: h => h(App),
}).$mount('#app')
