/* eslint-disable no-fallthrough */
/* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */
/* eslint comma-dangle: 0 */
/*
 * @Description: 封装 axios，取消请求：只允许最新的请求发送，老的请求都取消
 * @Date: 2021-07-02 19:19:37 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-11-19 13:03:21 +0800
 * @LastEditors : JackChou
 */

import axios from 'axios'
import { generateReqKey } from './utils'
import { logInfo, redLog, blackLog } from '@/utils'
import { Message, MessageBox } from 'element-ui'
import clone from 'clone'

const message = ({ data }) => {
  Message({ message: data.msg, type: 'error' })
}

// { key:[] }
const refeatRequestsMap = {}

const http = axios.create({
  // timeout: 1000 * 4,
  withCredentials: true,
  // NOTE axios 默认使用 发送 json
  // 当 post 发送 key=value&key2=value2 的数据时，是 www-form 格式发送
  headers: {
    // 为何不使用？
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'content-type': 'application/json;charset=UTF-8',
  },
})

function addPendingRequest(config) {
  const requestKey = generateReqKey(clone(config))
  const controller = new AbortController()
  config.signal = controller.signal
  config.signal.addEventListener('abort', () => {
    Promise.reject(new Error('abort'))
  })
  if (!refeatRequestsMap[requestKey]) {
    refeatRequestsMap[requestKey] = []
  }
  // NOTE 在线才记录重复，离线时允许用户多次尝试
  window.navigator.onLine && refeatRequestsMap[requestKey].push(controller)
  return config
}

function cancelRepeatRequest(config) {
  const requestKey = generateReqKey(config)
  const needCancel = refeatRequestsMap[requestKey]?.length >= 2
  if (needCancel) {
    // 不改变原数组
    refeatRequestsMap[requestKey].slice(1).forEach(controller => {
      controller.abort()
    })
  }
  return config
}
function resetSuccessRequest(config) {
  console.log('resetSuccessRequest')
  const requestKey = generateReqKey(config)
  console.log(`${requestKey} 数量：${refeatRequestsMap[requestKey].length}`)
  refeatRequestsMap[requestKey] = []
  return config
}

// 请求拦截器
const beforeRequest = config => {
  console.log('beforeRequest 2')
  // 设置 token
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
  // NOTE  添加自定义头部
  config.headers['my-header'] = 'jack'
  // NOTE 记录当前请求
  const _config = addPendingRequest(config)
  return _config
}

const beforeRequestError = error => {
  return Promise.reject(error)
}

http.interceptors.request.use(
  config => {
    console.log('beforeRequest 1')
    // NOTE 取消后来的重复请求
    const _config = cancelRepeatRequest(config)
    return _config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
http.interceptors.request.use(beforeRequest, beforeRequestError)

// 响应拦截器
const responseSuccess = response => {
  // NOTE 成功后重置本次，才能让用户发起新的请求
  resetSuccessRequest(response.config)
  // eslint-disable-next-line yoda
  const isOk = 200 <= response.status && response.status < 300
  return isOk ? Promise.resolve(response.data) : Promise.reject(response.data)
}

const responseFailed = error => {
  const { response } = error
  if (axios.isCancel(error)) {
    // 取消请求
    return Promise.reject(error)
  }
  if (response) {
    // handleError(response)
    message(response)
    logInfo(response)
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
  return new Promise((resolve, reject) => {
    if (confirm || confirm.confirm) {
      MessageBox.confirm(confirm.confirm || '确认操作吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // NOTE 不要使用 {} 包裹 params
          resolve(http.post(url, params))
        })
        .catch(_ => {
          console.log('取消请求')
        })
    } else {
      resolve(http.post(url, params))
    }
  })
}

export default {
  get,
  post,
}

function handleError(res) {
  switch (res.status) {
    case 301:
    // Moved Permanently 永久移动  方法和消息主体不变
    // Location
    // GET 适用，请使用 308
    // break
    case 302:
    // found 暂时的移动  方法和消息主体不变
    // Location
    // GET 适用 请使用 307
    // break
    case 303:
    // see other 改变为 GET
    // 通常作为 POST PUT 的返回
    // break
    case 307:
    // 暂时重定向，重定向时方法和消息主体不变
    // break
    case 308:
      // 永久重定向，重定向时方法和消息主体不变
      message(res)
      logInfo(res)
      break
    case 400:
      // 参数错误
      message(res)
      logInfo(res)
      break
    case 401:
      // 认证失败
      // 跳转登录页面、弹窗提示
      message(res)
      break
    case 402:
      // 请求付费
      break
    case 403:
      // 服务其拒绝执行，一般是 token 过期，没权限
      // 提示登录、弹窗提示
      break
    case 404:
      // 资源不存在
      break
    case 405:
      // 请求方法不允许
      break
    case 406:
      // 不能接收 服务器端无法提供与  Accept-Charset 以及 Accept-Language 消息头指定的值相匹配的响应。
      // NOTE 极少使用
      break
    case 500:
      // 服务器内部错误
      message(res)
      logInfo(res)
      break
    case 503:
      // 处理不过来了
      message(res)
      logInfo(res)
      break
    case 504:
      // 网关超时
      message(res)
      logInfo(res)
      break

    default:
      break
  }
}
