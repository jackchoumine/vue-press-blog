<script setup lang="ts">
import CounterContainer from './CounterContainer.vue'
</script>

<template>
  <CounterContainer :init-count="10">
    <template #default="{ count, add, reduce }">
      <div class="counter">
        {{ count }}
        <button @click="() => reduce()">-</button>
        <button @click="() => add()">+</button>
      </div>
    </template>
  </CounterContainer>
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
