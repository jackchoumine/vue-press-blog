<!--
 * @Description:
 * @Date: 2021-06-17 02:24:45 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-01 05:35:15 +0800
 * @LastEditors: JackChou
-->
<template>
  <div class="app">
    <h2>my-router</h2>
    <div>
      <router-link to="/about">About</router-link>
      <br >
      <router-link to="/test">Test</router-link>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>
<style lang="less">
.app {
  min-height: 100vh;
}
</style>
