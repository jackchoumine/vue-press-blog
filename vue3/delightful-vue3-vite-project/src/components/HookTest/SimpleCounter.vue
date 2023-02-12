<script setup lang="ts">
import useCounter from './useCounter'

const { count, add, reduce } = useCounter()
</script>

<template>
  <div class="counter">
    <button @click="() => reduce()">-</button>
    {{ count }}
    <button @click="() => add()">+</button>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  button {
    background-color: aliceblue;
    width: 25px;
    border-radius: 5px;
    border: none;
    &:hover {
      border: 1px solid rgb(100, 108, 255);
    }
  }
}
</style>
