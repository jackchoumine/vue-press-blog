/*
 * @Description: home页路由
 * @Date: 2021-06-01 14:50:13 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-01-16 18:54:47 +0800
 * @LastEditors : JackChou
 */
const homeRoutes = [
  {
    path: '', // NOTE path 为 '' 否则 路径为 / 时，不会渲染 home 组件
    name: 'Home',
    component: () => import(/* webpackChunkName: "home-page" */ './index.vue'),
  },
]
export default homeRoutes
