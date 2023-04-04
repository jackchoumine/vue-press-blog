/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-05 09:46:55
 * @LastEditors : JackChou
 * @LastEditTime: 2023-04-04 00:35:08 +0800
 * @Description :
 */
import { createRouter, createWebHistory } from 'vue-router'

export function generateRoutes({ keepOriginalNames = ['JSX', 'WC'] } = {}) {
  // { path: ()=>import(path) }
  const modules = import.meta.glob('../views/**/*.vue')

  const routes = Object.keys(modules).map(key => {
    const dashNameMap = {}
    const dashKeys = []
    keepOriginalNames.forEach(name => {
      const dashName = name.toLowerCase().split('').join('-')
      dashKeys.push(dashName)
      dashNameMap[dashName] = name
    })

    const fileName = key.split('/').at(-1).replace('.vue', '')
    let dashCasePath = fileName.replace(/[A-Z]/g, m => '-' + m.toLowerCase()).slice(1)
    const hasDashKey = dashKeys.find(key => dashCasePath.includes(key))
    if (hasDashKey) {
      // 路径中含有专门的大写，不转化
      dashCasePath = dashCasePath.replace(hasDashKey, dashNameMap[hasDashKey])
    }
    // {path:'/about-page',name:'about'}
    // 首页 - 分隔路径，读写性高
    return {
      path: dashCasePath.includes('home') ? '/' : `/${dashCasePath}`,
      name: dashCasePath.replace('-page', ''),
      component: modules[key],
    }
  })
  return routes
}

const routes = generateRoutes()

const router = createRouter({
  history: createWebHistory(/* import.meta.env.BASE_URL */),
  routes,
})

export default router
