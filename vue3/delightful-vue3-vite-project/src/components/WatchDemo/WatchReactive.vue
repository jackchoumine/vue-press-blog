<!--
 * @Date        : 2022-11-04 10:05:28
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-05-25 14:19:00
 * @Description : 监听 reactive
-->
<template>
  <div>
    <h2>监听 reactive</h2>
    <button @click="changeName">修改name</button>
    <button @click="changeAge">修改age</button>
    <button @click="changeCity">修改city</button>
    <p>{{ person }}</p>
  </div>
</template>

<script setup>
const person = reactive({
  name: 'jack',
  age: '',
  deep: {
    city: 'GuiYang',
  },
})

function changeName() {
  person.name = Math.random().toString(16)
}

function changeAge() {
  person.age = Math.random() * 100
}
function changeCity() {
  person.deep.city = Math.random() * 100
}

// getter 返回整个对象，监听不到
// 如何解决：添加 {deep: true}，嵌套属性修改后，可以监听到
watch(
  () => person,
  newPerson => {
    console.log('watch reactive ()=> person ', newPerson)
    alert(
      `person.name = ${person.name};person.age = ${person.age};person.deep.city = ${person.deep.city}`
    )
  }
  //   // {
  //   //   deep: true,
  //   // }
)

// NOTE 监听不到嵌套属性 city
// 如何监听到嵌套属性呢？ 添加 {deep:true}
watch(
  () => ({ ...person }),
  newPerson => {
    console.log('watch reactive ()=> ({ ...person })', newPerson)
    alert(
      `person.name = ${newPerson.name};person.age = ${newPerson.age};person.deep.city = ${newPerson.deep.city}`
    )
  }
  // {
  //   deep: true,
  // }
)

// 监听单个属性 ok
// watch(
//   () => person.name,
//   name => {
//     alert(
//       `person.name = ${person.name};person.age = ${person.age};person.deep.city = ${person.deep.city}`
//     )
//   }
// )

// 监听整个 reactive ok
// reactive,所有属性都是响应式的，嵌套属性修改依然可监听到。不需要 deep
// shallowReactive, 只有第一层属性是响应式的，嵌套属性修 vue 检测不到，即是添加 {deep: true} 也不行
watch(person, newPerson => {
  console.log(newPerson, 'watch(person, zqj log')
  alert(
    `person.name = ${person.name};person.age = ${person.age};person.deep.city = ${person.deep.city}`
  )
})
//  NOTE 这样监听不到
// watch(person.name, name => {
//   alert(
//     `person.name = ${person.name};person.age = ${person.age};person.deep.city = ${person.deep.city}`
//   )
// })
// 监听多个属性 ok
// watch([() => person.name, () => person.age], ([newName, newAge]) => {
//   console.log(newName, newAge)
//   alert(
//     `person.name = ${person.name};person.age = ${person.age};person.deep.city = ${person.deep.city}`
//   )
// })
// NOTE 最佳实践：
// 监听整个 reactive，直接写，不添加 {deep: true}
// watch(person)
// 使用函数返回整个 reactive  watch(()=>({..person}))
// 监听 reactive 的单个属性，使用函数返回，监听多个属性，使用数组
// watch(person.age) watch([()=>person.age,()=>person.name])
</script>

<style lang="scss"></style>
