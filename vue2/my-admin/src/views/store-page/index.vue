<!--
 * @Description: store 测试页面
 * @Date: 2021-06-30 11:29:14 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-30 21:05:53 +0800
 * @LastEditors: JackChou
-->
<template>
  <div>
    <div>vuex</div>
    <p>{{ $store.state.age }}</p>
    <p>{{ $store.getters.myAge }}</p>
    <button @click="syncChange">同步更改</button>
    <button @click="asyncChange">异步更改</button>
    <p>模块a:{{ $store.state.a.age }}</p>
    <p>模块c:{{ $store.state.b.c }}</p>
    <p>模块d:{{ $store.state.d.age }}</p>
  </div>
</template>

<script>
export default {
  name: 'VuexPage',
  beforeCreate() {
    // 注入自定义属性
    this.$city = '北京'
  },
  mounted() {
    console.log(this.$store.state)
  },
  methods: {
    syncChange() {
      // this.$store.state.age = 100
      this.$store.commit('syncChangeAge', 100)
    },
    asyncChange() {
      this.$store.dispatch('asyncChangeAge', -10)
    },
  },
}
</script>

<style></style>
