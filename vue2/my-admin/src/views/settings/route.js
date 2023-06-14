/*
 * @Description: 系统设置路由
 * @Hash:
 * @Date: 2021-06-01 23:58:13 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-01-16 18:54:59 +0800
 * @LastEditors : JackChou
 */
const homeRoutes = [
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings-page" */ './index.vue'),
  },
  {
    path: '/role',
    name: 'role',
    component: () => import(/* webpackChunkName: "role-page" */ './role'),
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import(/* webpackChunkName: "menu-page" */ './menu'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test-page" */ './test-page'),
  },
]
export default homeRoutes
