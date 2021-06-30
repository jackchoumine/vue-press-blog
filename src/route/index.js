/*
 * @Description: 路由配置
 * @Date: 2021-06-01 14:24:30 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-01 05:41:53 +0800
 * @LastEditors: JackChou
 */
import VueRouter from '../vue-router'
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

const About = {
  name: 'About',
  render(h) {
    return (
      <div>
        <h2>About</h2>
      </div>
    )
  }
}
const Test = {
  name: 'Test',
  render(h) {
    return (
      <div>
        <h2>Test</h2>
      </div>
    )
  }
}
const router = new VueRouter.Router({
  mode: 'hash',
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/',
      component: () => import('views'),
      children: childrenRoutes
    }
  ]
})
export default router
