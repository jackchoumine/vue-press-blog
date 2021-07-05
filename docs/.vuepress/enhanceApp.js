/*
 * @Description: 全局配置
 * @Date: 2021-07-06 00:26:24 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-06 01:28:32 +0800
 * @LastEditors: JackChou
 */
// 重试
function tryRun(fn, times = 3) {
  let execCount = 1

  fn(next)

  function next(delay) {
    if (execCount >= times) return
    setTimeout(() => {
      execCount += 1
      fn(next)
    }, delay)
  }
}
function renderUtterancComment(parentEl) {
  console.log(parentEl)
}
function integrateUtterancComment(router) {
  router.afterEach((to, from) => {
    // 页面滚动，hash值变化，也会触发afterEach钩子，避免重新渲染
    if (to.path === from.path) return
    // 已被初始化则根据页面重新渲染 评论区
    tryRun(next => {
      const $page = document.querySelector('.page')
      if ($page) {
        setTimeout(() => {
          renderUtterancComment($page)
        }, 1)
      } else {
        next(500)
      }
    }, 10)
  })
}
// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  // options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  // siteData, // 站点元数据
  isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  try {
    // 生成静态页时在node中执行，没有document对象
    document && integrateUtterancComment(router)
  } catch (e) {
    console.error(e.message)
  }
}
