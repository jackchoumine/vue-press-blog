<!--
 * @Description: 手写router
 * @Date: 2021-07-01 00:29:56 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-04 00:04:47 +0800
 * @LastEditors: JackChou
-->
<template>
  <div>
    <h1>axios</h1>
    <button @click="axiosGet">axiosGet 请求</button>
    <button @click="cancelAxiosGet">取消 axiosGet 请求</button>
    <br />
    <button @click="get1">Get 请求</button>
    <button @click="cancelSignal">signal 取消请求</button>
    <br />
    <button @click="axiosPost">axiosPost 请求</button>
    <button @click="cancelAxiosPost">取消 axiosPost 请求</button>
    <hr />
    <button @click="httpPost">post 请求 设置请求拦截器</button>
    <button @click="cancelHttp">取消请求（在请求拦截器中记录请求）</button>
    <hr />
    <h2>二次封装axios</h2>
    <button @click="getHttp">get请求</button>
    <button @click="postHttp">post请求,二次确认</button>
    <button @click="postHttp2">post请求2，模拟错误</button>
    <button @click="postHttp3">post请求3</button>
    <a href="http://localhost:3000">代码</a>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
const CancelToken = axios.CancelToken
const controller = new AbortController()
const signal = controller.signal
export default {
  name: 'MyRouter',
  data() {
    return {
      cancel: '',
      source: CancelToken.source(),
      cancelInterceptor: '',
      httpMap: new Map()
    }
  },
  methods: {
    getHttp() {
      this.$http
        .get('admin/test', { name: 'jack' })
        .then(console.log)
        .catch(error => {
          console.log(error)
        })
    },
    async postHttp() {
      try {
        const res = await this.$http.post('admin/test', { name: 'jack', age: 24 }, { confirm: '确定发送吗？' })
        console.log(res)
      } catch (error) {}
    },
    async postHttp2() {
      try {
        const res = await this.$http.post('admin/test', `{ name: 'jack', age: 24 }`)
        console.log(res)
      } catch (error) {}
    },
    async postHttp3() {
      try {
        const res = await this.$http.post('admin/test', { name: 'jack', age: 24 })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    axiosGet() {
      axios
        .get('admin/test', {
          cancelToken: new CancelToken(c => {
            this.cancel = c
          })
        })
        .then(res => {
          console.log(res.data)
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('取消请求')
          } else {
            console.log(error)
          }
        })
        .finally(() => {
          this.cancel = null
        })
    },
    cancelAxiosGet() {
      this.cancel && this.cancel('取消请求')
    },
    axiosPost() {
      axios
        .post(
          'admin/test',
          {},
          {
            cancelToken: this.source.token
          }
        )
        .then(res => {
          console.log(res.data)
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('取消请求')
          } else {
            console.log(error)
          }
        })
        .finally(() => {
          // this.source = null
        })
    },
    cancelAxiosPost() {
      console.log(this.source)
      this.source.cancel('取消请求')
    },
    httpPost() {
      const http = axios.create()
      http.interceptors.request.use(
        options => {
          options.headers['Content-Type'] = 'application/json;charset=utf-8'
          options.cancelToken = new CancelToken(c => {
            this.httpMap['this.createHttpKey(options)'] = c
          })
          return options
        },
        error => {
          console.log(error)
          return Promise.reject(error)
        }
      )
      http.interceptors.response.use(
        res => {
          console.log(res)
          console.log(Object.keys(this.httpMap).length)
          return res
          // return Promise.resolve(res)
        },
        error => {
          console.log(error)
          return Promise.reject(error)
        }
      )
      http
        .post('admin/test', { name: 'jack', age: 24 })
        .then(res => {
          console.log('成功返回')
          console.log(res.data)
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('取消请求')
          } else {
            console.log(error)
          }
        })
        .finally(() => {
          this.cancelInterceptor = null
        })
    },
    cancelHttp() {
      this.cancelInterceptor && this.cancelInterceptor('取消请求')
    },
    createHttpKey(options) {
      const { data, url, method, headers } = options
      return [url, method, qs.stringify(data), headers['Content-Type']].join('-')
    },
    get1() {
      axios
        .get('admin/test', {}, { signal })
        .then(res => {
          console.log(res.data)
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('取消请求')
          } else {
            console.log(error)
          }
        })
        .finally(() => {
          this.cancel = null
        })
    },
    cancelSignal() {
      console.log(22)
      // this.cancel && this.cancel('取消请求')
      controller.abort()
    }
  }
}
</script>

<style></style>
