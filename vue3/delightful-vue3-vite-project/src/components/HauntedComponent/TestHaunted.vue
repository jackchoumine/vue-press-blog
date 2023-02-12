<!--
 * @Date        : 2022-11-10 09:03:19
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-11-10 09:58:12
 * @Description : 
-->
<template>
  <div>
    <my-counter
      ref="counter"
      @hello="onCustomEvent"
      :init-count="10"
      :testArray.prop="frameworks"
      :obj.prop="person"></my-counter>
    <ElButton type="primary" @click="changeArray">修改array</ElButton>
    <p>{{ frameworks }}</p>
  </div>
</template>

<script setup lang="ts">
const counter = ref(null)
const frameworks = shallowRef([{ name: 'vue3' }, { name: 'react' }])
const person = ref({ name: 'jack', age: 20 })
function changeArray() {
  // NOTE 无法触发组件更新，和 react类似，需要你传递一个全新的值
  // frameworks.value.push(...[{ name: 'angular' }])
  frameworks.value = frameworks.value.concat([{ name: 'angular' }])
  person.value = { name: 'Tom', age: 40 }
  console.log(person.value)
}
function onCustomEvent(event) {
  console.log(event.type)
}
</script>

<style lang="scss"></style>
