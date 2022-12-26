<template>
  <div class="test-slot">
    <h3>使用:slotted 修改插槽样式</h3>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
:global(.slot) {
  background-color: red;
}
</style>
