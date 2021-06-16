/*
 * @Description: 应用入口
 * @Date: 2021-06-01 10:07:44 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-09 20:50:26 +0800
 * @LastEditors: JackChou
 */
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import './assets/style/reset.css'
import elComponents from './element-ui'
import globalComponents from './components'
import myComponents from './examples'
import FormTable from 'j-form-table'
import router from './route'

const plugins = [VueRouter, globalComponents, myComponents, FormTable]
// 注入 element-ui 组件
Vue.use(elComponents)

plugins.forEach(plugin => {
  Vue.use(plugin)
})

Vue.config.productionTip = false

new Vue({
  name: 'Root',
  router, // NOTE 属性必须为 router
  render: h => h(App),
}).$mount('#app')
