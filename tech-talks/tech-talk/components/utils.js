/*
 * @Description : 工具函数
 * @Date        : 2023-02-01 23:45:22 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-02 00:08:14 +0800
 * @LastEditors : JackChou
 */
export function http(key = '') {
  return new Promise(resolve => {
    setTimeout(() => {
      let list = [
        { name: 'vue' },
        { name: 'react' },
        { name: 'solidjs' },
        { name: 'angular' },
        { name: 'svelte' },
        { name: 'preact' },
      ]
      key && (list = list.filter(item => item.name.includes(key)))
      resolve(list)
    }, 100)
  })
}
