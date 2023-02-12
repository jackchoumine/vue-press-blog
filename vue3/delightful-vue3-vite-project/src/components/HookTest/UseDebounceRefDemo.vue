<script setup lang="ts">
import { MyInput } from '@/components'
import { useDebounceRef } from '@/hooks'

const input = useDebounceRef('', 2000)
const myInput = useDebounceRef('', 2000)
const elInput = useDebounceRef('', 2000)
const qInput = useDebounceRef('', 2000)
</script>

<template>
  <div class="use-debounce-ref">
    <input type="text" v-model="input" />
    <p>{{ input }}</p>
    <MyInput v-model="myInput" />
    <p>{{ myInput }}</p>
    <h5>el-input</h5>
    <ElInput v-model="elInput" />
    <p>{{ elInput }}</p>
    <h5>QInput</h5>
    <QInput v-model="qInput" type="text" label="qInput" />
    <p>{{ qInput }}</p>
  </div>
</template>

<style lang="scss">
.use-debounce-ref {
  background-color: azure;
}
</style>
