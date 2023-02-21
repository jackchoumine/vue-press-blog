<!--
 * @Description : 
 * @Date        : 2023-02-18 20:47:26 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-21 21:14:36 +0800
 * @LastEditors : JackChou
-->
<template>
  <div class="j-button" @click="onClick">
    <button><slot></slot></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Emit = {
  (e: 'click', value: any): void
}
const emit = defineEmits<Emit>()

const value1 = ref('Hello')
const value2 = ref('World')
function onClick() {
  emit('click', { str: 'hello' })
}
</script>
