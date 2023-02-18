<template>
  <div id="app">
    <JButton>
      <span>测试按钮</span>
    </JButton>
    <hr />
    <j-toggle v-model="toggle" />
    <p>toggle 开启了吗?{{ toggle ? '是' : '否' }}</p>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      toggle: true,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
