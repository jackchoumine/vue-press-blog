<template>
  <div style="margin: 100px">
    <button
      :ref="reference"
      @click="onClick"
      style="width: 100px; height: 40px; background-color: lightgreen">
      use hook
    </button>
    <div
      v-show="isOpen"
      :ref="tooltip"
      style="width: 150px; height: 20px; background-color: lightyellow">
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
