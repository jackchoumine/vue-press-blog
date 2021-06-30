/*
 * @Description: home页路由
 * @Date: 2021-06-01 14:50:13 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-30 11:32:24 +0800
 * @LastEditors: JackChou
 */
const storeRoutes = [
  {
    path: '/store',
    name: 'store-page',
    component: () => import('./index.vue')
  }
]
export default storeRoutes
