<template>
  <div style="margin: 100px">
    <button
      :ref="reference"
      @click="onClick"
      style="background-color: lightgreen; height: 40px; width: 100px">
      use hook
    </button>
    <div
      v-show="isOpen"
      :ref="tooltip"
      style="background-color: lightyellow; height: 20px; width: 150px">
      tool tip
    </div>
    <button @click="placement = 'top'">修改tooltip位置</button>
  </div>
</template>

<script lang="ts" setup>
import { usePopper } from './usePopper'
const isOpen = ref(false)
function onClick() {
  isOpen.value = !isOpen.value
}
const placement = ref('right')
const { reference, tooltip } = usePopper(placement)
</script>
