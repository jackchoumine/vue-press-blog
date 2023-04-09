<template>
  <div>
    <button
      ref="btn"
      @mouseover="onMouseover"
      @mouseout="onMouseout"
      style="width: 100px; height: 40px; background-color: lightgreen">
      按钮
    </button>
    <div
      v-show="isOver"
      ref="tooltip"
      style="width: 150px; height: 20px; background-color: lightyellow">
      tool tip
    </div>
    <button type="button" @click="placement = 'top'">修改位置</button>
  </div>
</template>

<script lang="ts" setup>
import { createPopper } from '@popperjs/core'
import type { Placement } from '@popperjs/core'

const isOver = ref(false)
function onMouseover() {
  isOver.value = true
}
function onMouseout() {
  isOver.value = false
}
const btn = ref()
const tooltip = ref()

const placement = ref<Placement>('right')

watchEffect(
  () => {
    console.log('watchEffect')
    createPopper(btn.value, tooltip.value, {
      placement: placement.value,
    })
  },
  {
    flush: 'post',
  }
)
</script>
