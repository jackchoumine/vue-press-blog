/*
 * @Description: 工具函数
 * @Date: 2021-07-03 19:01:51 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-11-19 12:55:08 +0800
 * @LastEditors : JackChou
 */
import clone from 'clone'
import qs from 'qs'

const dataStr = data => {
  if (typeof data === 'object') return JSON.stringify(data)
  // NOTE 在响应拦截器中，axios 会被把 data 变成 JSON
  // return qs.stringify(JSON.parse(data))
  return data
}

export function generateReqKey(config) {
  const { method, url, params, data } = config
  const split = '---'
  const array = [`url:`, url, `${split}method:`, method]
  params && array.push(`${split}params:`, qs.stringify(params))
  // TODO 请求进不来啊 WHY
  // data && data.push(`${split}data:`, data)
  data && array.push(`${split}data:`, dataStr(data))
  return array.join('')
}
