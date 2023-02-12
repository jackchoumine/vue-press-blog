import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage as Message } from 'element-plus'

export const handleChangeRequestHeader = (config: AxiosRequestConfig) => {
  // @ts-ignore // TODO 使用时可再次添加请求头
  config.xxxx = 'xxx'
  return config
}

export const handleConfigureAuth = (config: AxiosRequestConfig) => {
  config.headers.token = localStorage.getItem('token') || ''
  return config
}

export const handleNetworkError = (res: AxiosResponse): void => {
  const codeMap: Record<string, string> = {
    '400': '错误的请求', // token 失效
    '401': '未授权，请重新登录',
    '403': '拒绝访问',
    '404': '请求路径不存在，请检查',
    '405': '请求方法未允许',
    '408': '请求超时',
    '500': '服务器端出错',
    '501': '网络未实现',
    '502': '网络错误',
    '503': '服务不可用',
    '504': '网络超时',
    '505': 'http版本不支持该请求',
  }
  logInfo(res)
  if (res.status) {
    Message.error(codeMap[res.status] ?? `其他连接错误 --${res.status}`)
    return
  }

  Message.error('无法连接到服务器！')
}

export const handleAuthError = (errno: string): boolean => {
  const authErrMap: any = {
    '10031': '登录失效，需要重新登录', // token 失效
    '10032': '您太久没登录，请重新登录~', // token 过期
    '10033': '账户未绑定角色，请联系管理员绑定角色',
    '10034': '该用户未注册，请联系管理员注册用户',
    '10035': 'code 无法获取对应第三方平台用户',
    '10036': '该账户未关联员工，请联系管理员做关联',
    '10037': '账号已无效',
    '10038': '账号未找到',
  }

  //   if (authErrMap.hasOwnProperty(errno)) {
  if (authErrMap.errno) {
    Message.error(authErrMap[errno])
    // 授权错误，登出账户
    // logout();
    return false
  }

  return true
}

export const handleGeneralError = (errno: string, errMsg: string): boolean => {
  if (errno !== '0') {
    Message.error(errMsg)
    return false
  }
  return true
}

/**
 * 柯里化
 * @param {Fn} fn 需要柯里化的函数
 * @returns Fn
 */
export const curry = fn => {
  if (typeof fn !== 'function') {
    throw new Error('no function provided!')
  }
  // 因为要递归，使用箭头函数会不方便
  return function curriedFn(...args) {
    // 递归出口放在前面，更加好理解
    if (args.length === fn.length) {
      return fn(...args)
    }
    // 箭头函数没有 arguments 需要显示给出参数
    return (...params) => {
      return curriedFn(...args.concat(params))
    }
  }
}

const log = (size, color, info) => {
  console.log(`%c${info}`, `color:${color};font-size:${size}px`)
}
export const blueLog = curry(log)(20)('#44cef6')
export const redLog = curry(log)(20)('red')
export const blackLog = curry(log)(18)('#161823')

export function logInfo({ status, statusText, config }) {
  redLog(`${status}，${statusText}`)
  // blackLog(`method：${config.method}`)
  blueLog(`${config.method}：${config.url}`)
  blackLog('请求参数 params：')
  blueLog(JSON.stringify(config.params))
  blackLog('请求body data：')
  blueLog(JSON.stringify(config.data))
}
