<!--
 * @Date        : 2022-11-04 09:38:33
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-11-04 10:44:02
 * @Description : 简单组合监听
-->
<template>
  <div>
    <h2>监听ref</h2>
    <button @click="changeName">修改name</button>
    <button @click="changeAge">修改age</button>
  </div>
</template>

<script setup lang="ts">
const name = ref('')
const age = ref()

function changeName() {
  name.value = Math.random().toString(16)
}

function changeAge() {
  age.value = Math.random() * 100
}

//   watch(name, value => {
//     alert(`新name: ${name.value}`)
//   })
//   watch(age, value => {
//     alert(`新age: ${age.value}`)
//   })
//   NOTE 监听不到
watch(
  () => [name, age],
  ([name, age]) => {
    alert(`name: ${name.value}, age: ${age.value}`)
  }
)
// ok
//   watch([name, age], ([newName, newAge]) => {
//     alert(`name: ${newName}, age: ${newAge}`)
//   })
// NOTE
// ()=> name.value 实际上是计算属性，不要这么监听
watch([() => name.value, age], ([newName, newAge], [oldName, oldAge]) => {
  console.log('watch ref')
  console.log(newName, newAge)
  console.log(oldName, oldAge)
  alert(`name: ${newName}, age: ${newAge}`)
})
// NOTE最佳实践
// 监听单个 ref 直接写，监听多个 ref，使用数组
</script>

<style lang="scss"></style>
