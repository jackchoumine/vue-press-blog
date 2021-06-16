/*
 * @Description: 系统设置路由
 * @Hash:
 * @Date: 2021-06-01 23:58:13 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-02 00:05:53 +0800
 * @LastEditors: JackChou
 */
const homeRoutes = [
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./index.vue'),
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('./role'),
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('./menu'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./test-page'),
  },
]
export default homeRoutes
