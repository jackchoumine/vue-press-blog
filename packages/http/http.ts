/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-13 09:04:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-02-16 09:11:43
 * @Description : 封装 http 请求
 */
import type { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'
import axios from 'axios'

import {
  handleChangeRequestHeader,
  handleConfigureAuth,
  handleAuthError,
  handleGeneralError,
  handleNetworkError,
} from './tools'

const defaultConfig: AxiosRequestConfig = {
  // timeout: 1000 * 4,
  withCredentials: true,
  // headers: {
  //   'content-type': 'application/json;charset=UTF-8',
  // },
}

const http: AxiosInstance = axios.create(defaultConfig)

http.interceptors.request.use(config => {
  config = handleChangeRequestHeader(config)
  config = handleConfigureAuth(config)
  return config
})

http.interceptors.response.use(
  res => {
    if (200 <= res.status && res.status <= 299) return Promise.resolve(res.data)
    handleAuthError(res.data.errno)
    handleGeneralError(res.data.errno, res.data.errMsg)
    return Promise.resolve(res)
  },
  err => {
    handleNetworkError(err.response)
    return Promise.reject(err.response)
  }
)

async function get<R = any>(url: string, params?: Record<string, unknown>) {
  try {
    const data = await http.get<void, R>(url, { params })
    return Promise.resolve([null, data] as [null, R])
  } catch (err) {
    return Promise.resolve([err, null] as [AxiosError, null])
  }
}

export default { get }
