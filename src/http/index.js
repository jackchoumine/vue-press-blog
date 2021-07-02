/* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */
/* eslint comma-dangle: 0 */
/*
 * @Description: 封装 axios
 * @Date: 2021-07-02 19:19:37 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-03 00:39:24 +0800
 * @LastEditors: JackChou
 */

import axios from 'axios'
import { logInfo, redLog, blackLog } from '@/utils'
import { Message, MessageBox } from 'element-ui'

const http = axios.create({
  // timeout: 1000 * 4,
  withCredentials: true,
  // NOTE axios 默认使用 发送 json
  // 当 post 发送 key=value&key2=value2 的数据时，是 www-form 格式发送
  headers: {
    // 为何不使用？
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
const beforeRequest = config => {
  // 设置 token
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
  config.headers['my-header'] = 'jack'
  return config
}
const beforeRequestError = error => {
  return Promise.reject(error)
}

http.interceptors.request.use(beforeRequest, beforeRequestError)

// 响应拦截器
const responseSuccess = response => {
  const isOk = response.status >= 200 && response.status < 300
  return isOk ? Promise.resolve(response.data) : Promise.reject(response.data)
}
const handleError = res => {
  switch (res.status) {
    case 400:
      Message({ message: res.data.msg, type: 'error' })
      logInfo(res)
      break
    case 401:
      // 验证失败
      // 跳转页面、弹窗提示
      break
    case 403:
      // 服务其拒绝执行，一般是 token 过期
      // 提示登录、弹窗提示
      break
    case 404:
      // 资源不存在
      break
    case 500:
      Message({ message: res.data.msg, type: 'error' })
      logInfo(res)
      break

    default:
      break
  }
}

const responseFailed = error => {
  const { response } = error
  if (response) {
    handleError(response)
    // cons error = new Error(response.data.msg)
    return Promise.reject()
  } else if (!window.navigator.onLine) {
    redLog('没有网络')
    return Promise.reject(new Error('请检查网络连接'))
  }
  return Promise.reject(error)
}

http.interceptors.response.use(responseSuccess, responseFailed)

export const get = (url, params) => {
  return http.get(url, { params })
}

export const post = (url, params, confirm = false) => {
  // NOTE 不使用 { } 包裹
  return http.post(url, params)
}

export default {
  get,
  post,
}
