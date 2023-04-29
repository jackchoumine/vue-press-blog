/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-29 23:59:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-30 00:03:53
 * @Description :
 */
/**
 * 获取类型
 * @param {any} value 需要检查类型的值
 * @returns {string} 返回类型
 */
export function type(value) {
  const typeStr = Object.prototype.toString.call(value)
  return typeStr.slice(8, -1).toLowerCase()
}

export function isEmptyObj(value) {
  return true
}
function noUseFn() {
  console.log('noUseFn')
}
// window.name = 'jack'
