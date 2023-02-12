<script setup lang="ts">
import { useCounter } from './hooks'

const { count, add, reduce } = useCounter(10)
</script>

<template>
  <div class="counter">
    {{ count }}
    <button @click="() => reduce()">-</button>
    <button @click="() => add()">+</button>
  </div>
</template>

<style lang="scss" scoped>
.counter {
  button {
    background-color: lightpink;
    width: 25px;
    border-radius: 50%;
    border: none;
    &:hover {
      border: 1px solid lightgreen;
    }
  }
}
</style>
