<script setup lang="ts" name="Demos">
import RecursionComponent from './RecursionComponent.vue'

const list = ['Jack', 'John', 'Tom']
</script>

<template>
  <div>
    <h4>递归组件</h4>
    <RecursionComponent :list="list">
      <template v-slot:default="{ item }">
        <strong style="color: red; background-color: beige"> {{ item }}</strong>
      </template>
    </RecursionComponent>
  </div>
</template>
