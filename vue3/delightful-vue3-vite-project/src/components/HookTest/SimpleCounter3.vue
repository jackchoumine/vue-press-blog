<script setup lang="ts">
import CounterContainer from './CounterContainer.vue'
</script>

<template>
  <CounterContainer :init-count="10">
    <template v-slot:default="{ count, add, reduce }">
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
    width: 25px;
    border: none;
    background-color: lightpink;
    border-radius: 50%;

    &:hover {
      border: 1px solid lightgreen;
    }
  }
}
</style>
