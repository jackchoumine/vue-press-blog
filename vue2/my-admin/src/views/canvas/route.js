/*
 * @Description:
 * @Date: 2021-07-01 00:30:51 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-10-11 00:48:35 +0800
 * @LastEditors : JackChou
 */
const myRouterRoutes = [
  {
    path: '/canvas',
    name: 'canvas学习',
    component: () => import('./index.vue'),
  },
]
export default myRouterRoutes
