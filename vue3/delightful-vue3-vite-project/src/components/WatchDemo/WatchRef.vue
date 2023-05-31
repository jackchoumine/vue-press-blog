<!--
 * @Date        : 2022-11-04 09:38:33
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-05-25 14:27:43
 * @Description : 简单组合监听
-->
<template>
  <div>
    <h2>监听ref</h2>
    <button @click="changeName">修改name</button>
    <button @click="changeAge">修改age</button>
    <button @click="changePerson">修改person</button>
    <button @click="changeArray">修改Array</button>
  </div>
</template>

<script setup lang="ts">
const name = ref('')
const age = ref()
const person = ref(null)
const arrayRef = ref([])

function changeName() {
  name.value = Math.random().toString(16)
}

function changeAge() {
  age.value = Math.random() * 100
}

function changePerson() {
  person.value = { name: 'jack', age: Math.random() }
}
watch(
  () => name.value,
  value => {
    alert(`新name: ${value}`)
  }
)
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

// 监听 ref(obj)
watch(person, p => {
  console.log(p, 'person')
})
// 监听不到
watch(
  () => ({ ...person }),
  p => {
    console.log(p, '() => person')
  }
)
// 监听不到
watch(person?.name, p => {
  console.log(p, 'person?.name')
})
// 监听不到
watch(
  () => person?.name,
  p => {
    console.log(p, 'person?.name')
  }
)

function changeArray() {
  // arrayRef.value = Math.random().toString(16).split('')
  // const arr = [Math.random().toString(16).split('')]
  arrayRef.value.splice(0, 0, ...Math.random().toString(16).split(''))
}
// 监听不到
// push 不会触发监听
// arrayRef.value.push(Math.random().toString(16))
watch(
  () => arrayRef.value,
  arr => {
    console.log(toRaw(arr), 'arrayRef')
    console.log(isReactive(arr), 'arrayRef')
    console.log(isProxy(arr), 'arrayRef')
  }
)

watch([() => [...arrayRef.value]], arr => {
  console.log(arr, 'arrayRef')
})
// 重置和push都会触发监听
// watch(
//   () => [...arrayRef.value],
//   arr => {
//     console.log(arr, 'arrayRef')
//   }
// )
// NOTE最佳实践
// 监听整个 ref watch(ref, () => {})
// 基础类型的 ref
// 监听多个 ref，使用数组  watch([()=>ref.value], () => {})
// 数组类型的 ref
// watch(
//   () => [...arrayRef.value],
//   arr => {
//     console.log(arr, 'arrayRef')
//   }
// )
</script>

<style lang="scss"></style>
