/*
 * @Description: 应用入口
 * @Date: 2021-06-01 10:07:44 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-11-21 04:18:08 +0800
 * @LastEditors : JackChou
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import './assets/style/reset.css'
import elComponents from './element-ui'
import globalComponents from './components'
import myComponents from './examples'
import FormTable from 'j-form-table'
import router from './route'
import store from './store'
import http from './http/index'
const plugins = [VueRouter, globalComponents, myComponents, FormTable]
// 注入 element-ui 组件
Vue.use(elComponents)

plugins.forEach(plugin => {
  Vue.use(plugin)
})

Vue.prototype.$http = http

Vue.config.productionTip = false

// 引入自定义组件
const script = document.createElement('script')
script.type = 'module'
script.src = 'https://unpkg.com/stencil-rating-component-test'
document.head.appendChild(script)
Vue.config.ignoredElements = ['my-rating']

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
