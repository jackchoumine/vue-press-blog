/*
 * @Description: 路由配置
 * @Date: 2021-06-01 14:24:30 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-01-16 19:42:19 +0800
 * @LastEditors : JackChou
 */
import VueRouter from 'vue-router'
// import { MessageBox } from 'element-ui'

// import Vue from 'vue'

// TODO 前端工程化
export function importRoutes(r = require.context('../views', true, /route\.js$/)) {
  const childrenRoutes = []
  const paths = r.keys()
  paths.forEach(path => {
    childrenRoutes.push(...r(path).default)
  })
  return childrenRoutes
}

const childrenRoutes = importRoutes()

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "layout" */ 'views'),
      children: childrenRoutes,
    },
  ],
})
router.beforeEach((to, from, next) => {
  try {
    if (to.path === '/role' && from.path === '/') {
      // MessageBox.confirm('确认操作吗', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      // })
      //   .then(() => {
      //     next(true)
      //   })
      //   .catch(_ => {
      //     next(false)
      //     console.log('取消请求')
      //   })
      // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      // console.log(answer)
      // if (!answer) return next(false)
      next()
    }
    next()
  } catch (error) {
    console.log(error.message)
  }
})
export default router
