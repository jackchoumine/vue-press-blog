/*
 * @Description: home页路由
 * @Date: 2021-06-01 14:50:13 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-02 00:24:36 +0800
 * @LastEditors: JackChou
 */
const homeRoutes = [
  {
    path: '', // NOTE path 为 '' 否则 路径为 / 时，不会渲染 home 组件
    name: 'Home',
    component: () => import('./index.vue'),
  },
]
export default homeRoutes
