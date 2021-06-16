/*
 * @Description: 路由配置
 * @Date: 2021-06-01 14:24:30 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-02 00:24:26 +0800
 * @LastEditors: JackChou
 */
import Router from 'vue-router'
import homeRoutes from 'views/home/route'
import settingsRoutes from 'views/settings/route'

const childrenRoutes = [...homeRoutes, ...settingsRoutes]

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('views'),
      children: childrenRoutes,
    },
  ],
})
export default router
