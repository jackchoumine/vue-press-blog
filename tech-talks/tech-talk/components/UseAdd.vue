<!--
 * @Description : 
 * @Date        : 2023-02-01 22:28:22 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-02 01:46:31 +0800
 * @LastEditors : JackChou
-->
<script>
import { useAdd } from './hooks'
import { ref } from 'vue'
export default {
  setup() {
    const a = 1
    const b = ref(10)
    const c = useAdd(a, b)
    return { b, c }
  },
}
</script>

<template>
  <p>c:{{ c }}</p>
  <p>b:{{ b }}</p>
  <button type="button" @click="++b">修改b</button>
</template>

<style lang="scss" scoped>
button {
  background-color: lightgreen;
  width: fit-content;
  border-radius: 5px;
  border-color: bisque;
  &:hover {
    border: 1px solid rgb(100, 108, 255);
  }
}
</style>
