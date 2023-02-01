<script setup name="MyInput">
import { useVModel } from './hooks'

const props = defineProps({
  modelValue: {
    type: String,
  },
})
const value = useVModel(props, 'modelValue')
</script>

<template>
  <input type="text" v-model="value" placeholder="请输入" />
</template>
