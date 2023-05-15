<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:44:23
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-05-15 16:55:34
 * @Description : 
-->
<script lang="ts" setup name="CreateGlobalState">
import { useGlobalCounter } from './store'

const { count } = useGlobalCounter()
function decrement() {
  count.value--
}
function increment() {
  count.value++
}
</script>

<template>
  <div class="create-global-state">
    <h4>修改全局状态</h4>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
    <p>count{{ count }}</p>
  </div>
</template>

<style scoped lang="scss">
.create-global-state {
  // scss code
}
</style>
