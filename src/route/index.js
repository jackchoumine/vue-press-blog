/*
 * @Description: 路由配置
 * @Date: 2021-06-01 14:24:30 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-01 15:41:49 +0800
 * @LastEditors: JackChou
 */
import VueRouter from 'vue-router'
// import Vue from 'vue'
const childrenRoutes = []

// TODO 前端工程化
function importRoutes(r) {
  const paths = r.keys()
  paths.forEach(path => {
    childrenRoutes.push(...r(path).default)
  })
}

importRoutes(require.context('../views', true, /route\.js$/))

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('views'),
      children: childrenRoutes
    }
  ]
})
export default router
