<!--
 * @Description : 
 * @Date        : 2023-02-02 00:20:44 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-09 11:10:33 +0800
 * @LastEditors : JackChou
-->
<script setup>
import { ref, watch } from 'vue'
import { debounce } from 'lodash-es'
import MyInput from './MyInput.vue'
const input = ref('')
const debounceHttp = debounce(args => http(args), 3000)
watch(
  input,
  value => {
    console.log('lodash triger', value)
    debounceHttp(value)
  },
  {
    onTrack() {
      console.log('lodash track')
    },
    onTrigger(params) {
      console.log('lodash trigger')
    },
  },
)
function http(params) {
  console.log(params)
}
</script>

<template>
  <div>
    <MyInput v-model="input" />
  </div>
</template>
