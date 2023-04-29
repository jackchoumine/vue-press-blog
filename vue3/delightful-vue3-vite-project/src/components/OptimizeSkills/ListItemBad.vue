<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-20 18:56:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-20 18:59:14
 * @Description : props 不稳定
-->
<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    default: undefined,
  },
  name: String,
  activeId: Number,
})
onUpdated(() => {
  console.log('updating ListItemBad ' + props.id)
})
</script>

<template>
  <li class="item" :class="{ active: activeId === id }">
    <span v-if="activeId === id">--></span>
    {{ name }}
  </li>
</template>

<style lang="scss">
.item {
  background-color: azure;
}

.active {
  color: black;
  background-color: red;
}
</style>
