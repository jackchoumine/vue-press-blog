<!--
 * @Description : 
 * @Date        : 2023-02-02 00:20:44 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-08 01:33:53 +0800
 * @LastEditors : JackChou
-->
<script setup>
import { ref, watch } from 'vue'
import { useDebounceRef } from './useDebounceRef'
import MyInput from './MyInput.vue'
const input = useDebounceRef('', 3000)

watch(input, value => {
  http(value)
})
function http(params) {
  console.log(params)
}
</script>

<template>
  <div>
    <MyInput v-model="input" />
  </div>
</template>
