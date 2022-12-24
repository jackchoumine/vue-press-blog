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
    if (res.status <= 299 && res.status >= 200) return Promise.resolve(res.data)
    handleAuthError(res.data.errno)
    handleGeneralError(res.data.errno, res.data.errMsg)
    return Promise.resolve(res)
  },
  err => {
    handleNetworkError(err.response)
    return Promise.reject(err.response)
  },
)

function get<R = any>(url: string, params?: Record<string, unknown>) {
  return http
    .get<void, R>(url, { params })
    .then(data => {
      // TODO 可以直接返回一个 PromiseResolve 类型吗？
      return Promise.resolve([null, data] as [null, R])
    })
    .catch((err: AxiosError) => {
      return Promise.resolve([err, null] as [AxiosError, null])
    })
}

export default { get }
