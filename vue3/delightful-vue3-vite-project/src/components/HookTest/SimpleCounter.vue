<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-13 09:04:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-03-10 12:24:07
 * @Description : 
-->
<script setup lang="ts">
import useCounter from './useCounter'
import useCounter2 from './useCounter2'

const { count, add, reduce } = useCounter(10)
const doubleCount = computed(() => {
  return count.value * 2
})
const { obj, addAge } = useCounter2()
const jack = computed(() => {
  return {
    age: obj.value?.jack?.age,
  }
})
</script>

<template>
  <div class="counter">
    <button @click="() => reduce()">-</button>
    {{ count }}
    <button @click="() => add()">+</button>
  </div>
  <p>{{ doubleCount }}</p>
  <p>{{ obj }}</p>
  <p>{{ jack }}</p>
  <button @click="() => addAge()">岁数加1</button>
</template>

<style lang="scss" scoped>
.counter {
  button {
    width: 25px;
    border: none;
    background-color: aliceblue;
    border-radius: 5px;

    &:hover {
      border: 1px solid rgb(100 108 255);
    }
  }
}
</style>
