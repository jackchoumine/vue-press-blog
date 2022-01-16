/*
 * @Description :
 * @Date        : 2022-01-16 19:20:21 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-01-16 19:21:27 +0800
 * @LastEditors : JackChou
 */
const webComponentRoutes = [
  {
    path: '/web-component',
    name: 'web-component',
    component: () => import(/* webpackChunkName: "web-component" */ './index.vue'),
  },
]
export default webComponentRoutes
