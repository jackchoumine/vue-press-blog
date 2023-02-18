<!--
 * @Description : JToggle
 * @Date        : 2023-02-18 21:29:10 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-19 07:41:40 +0800
 * @LastEditors : JackChou
-->
<template>
  <span
    class="j-toggle"
    tabindex="0"
    role="checkbox"
    :aria-checked="modelValue"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
  </span>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>
