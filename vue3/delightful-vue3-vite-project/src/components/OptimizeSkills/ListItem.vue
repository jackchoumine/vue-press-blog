<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    default: undefined,
  },
  name: String,
  // activeId: Number,
  active: Boolean,
})
onUpdated(() => {
  console.log('updating ' + props.id)
})
</script>

<template>
  <li class="item" :class="{ active: active }">
    <span v-if="active">--></span>
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
