<script setup lang="ts">
import { ref } from 'vue'
const toggle = ref(false)
</script>

<template>
  <JButton>
    <span>测试按钮</span>
  </JButton>
  <hr />
  <j-toggle v-model="toggle" />
  <p>toggle 开启了吗?{{ toggle ? '是' : '否' }}</p>
  <hr />
</template>

<style scoped></style>
