/*
 * @Description: home页路由
 * @Date: 2021-06-01 14:50:13 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-01-16 18:55:39 +0800
 * @LastEditors : JackChou
 */
const storeRoutes = [
  {
    path: '/store',
    name: 'store-page',
    component: () => import(/* webpackChunkName: "store-page" */ './index.vue'),
  },
]
export default storeRoutes
