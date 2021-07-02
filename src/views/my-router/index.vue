<!--
 * @Description: 手写router
 * @Date: 2021-07-01 00:29:56 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-03 00:34:23 +0800
 * @LastEditors: JackChou
-->
<template>
  <div>
    <h1>http</h1>
    <button @click="getHttp">get请求</button>
    <button @click="postHttp">post请求</button>
    <button @click="postHttp2">post请求2</button>
  </div>
</template>

<script>
export default {
  name: 'MyRouter',
  methods: {
    getHttp() {
      this.$http.get('admin/test', { name: 'jack' }).then(console.log)
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
  },
}
</script>

<style></style>
