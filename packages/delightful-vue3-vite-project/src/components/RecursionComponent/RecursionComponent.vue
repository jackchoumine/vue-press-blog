<script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <ul>
    <!-- 带插槽的递归组件 -->
    <li><slot v-bind:item="list[0]"></slot></li>
    <RecursionComponent v-if="list.length > 1" :list="list.slice(1)">
      <template v-slot="{ item }">
        <slot v-bind:item="item"></slot>
      </template>
    </RecursionComponent>
  </ul>
</template>

<style lang="scss" scoped></style>
<!-- NOTE 递归组件 -->
<!-- <script setup>
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <ul>
    <li>{{ list[0] }}</li>
    <RecursionComponent v-if="list.length > 1" :list="list.slice(1)" />
  </ul>
</template>

<style lang="scss" scoped></style> -->
