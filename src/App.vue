<!--
 * @Description:
 * @Date: 2021-06-17 02:24:45 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-07-01 15:41:17 +0800
 * @LastEditors: JackChou
-->
<template>
  <div class="app">
    <router-view />
    <!-- <h2>my-router</h2>
    <div>
      <router-link to="/about">About</router-link>
      <br >
      <router-link to="/test">Test</router-link>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
}
</script>
<style lang="less">
.app {
  min-height: 100vh;
}
</style>
