/*
 * @Description:
 * @Date: 2021-07-01 00:30:51 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-01 00:31:40 +0800
 * @LastEditors: JackChou
 */
const myRouterRoutes = [
  {
    path: '/my-router',
    name: 'myRouter',
    component: () => import('./index.vue'),
  },
]
export default myRouterRoutes
