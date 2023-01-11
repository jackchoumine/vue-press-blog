<script setup name="MyInput">
import { useVModel } from '@/hooks'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
  },
})
const value = useVModel(props, 'modelValue')
</script>

<template>
  <h4>useVModel</h4>
  <input type="text" v-model="value" />
</template>

<!-- <style lang="scss">
.my-input {
  // TODO
}
</style> -->
