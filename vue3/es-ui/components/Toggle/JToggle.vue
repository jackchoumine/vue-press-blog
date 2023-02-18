<!--
 * @Description : JToggle
 * @Date        : 2023-02-18 21:29:10 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-18 21:57:06 +0800
 * @LastEditors : JackChou
-->
<template>
  <span
    class="j-toggle"
    tabindex="0"
    role="checkbox"
    :aria-checked="inToggle"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
  </span>
</template>

<script>
export default {
  name: 'JToggle',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inToggle: this.modelValue,
    }
  },
  methods: {
    toggle() {
      this.inToggle = !this.inToggle
      this.$emit('update:modelValue', this.inToggle)
    },
  },
}
</script>
