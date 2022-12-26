<!--
 * @Date        : 2022-11-07 11:48:36
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-11-07 12:06:47
 * @Description : 
-->
<template>
  <div>
    <hello-stencil
      :key="key"
      ref="hs"
      :name="name"
      :attr-array.prop="attrArray"
      :array.prop="array"
      :person.prop="person"
      :attr-person.prop="attrPerson"
      @my-click="myClick"
      @myClick="myClick"
      @myclick="myClick">
    </hello-stencil>
    <hr />
    <my-rating :max-value="10" :person.prop="person" :personArray.prop="[person]">
    </my-rating>
    <button type="button" @click="changePerson">修改person</button>
    <hr />
    <count-to v-if="show" :end-value="endValue" :precision="3">
      <span slot="left">工资：</span>
      <span slot="right">$</span>
    </count-to>
    <button @click="toggle">toggle</button>
  </div>
</template>

<script setup>
const name = ref('测试stencilComponent')
const attrArray = ref([{ name: 'vue3' }])
const array = ref([{ name: 'vue3' }])
const person = ref({ name: 'jack' })
const attrPerson = ref({ name: 'jack' })
const key = ref('')
function myClick({ type }) {
  console.log(type)
  name.value = type
  // attrArray.value = [{ name: 'jack' }]
  // array.value = [{ name: 'jack' }]
  // person.value = { name: 'jack' }
  // Object.assign(person, { name: 'hello' })
  person.value = { name: Math.random().toString(16) }
  attrPerson.value = { name: Math.random().toString(16) }
  attrArray.value = [{ name: Math.random().toString(16) }]
  array.value = [{ name: Math.random().toString(16) }]
}
function changePerson(params) {
  person.name = 'HELLO_WORLD'
}

const show = ref(true)
const endValue = ref(2000)
function toggle() {
  show.value = !show.value
  endValue.value = Math.random() * 10000
}
function updated({ detail }) {
  console.log('on-end**********')
  console.log(detail)
}
const hs = ref()
onMounted(() => {
  const countTo = document.querySelector('count-to')
  // console.log(countTo)
  // countTo.addEventListener('on-end', updated)
  console.log(hs.value)
  const he = document.querySelector('hello-stencil')
  // hs.value.person = person.value
  // hs.value.setAttribute('person', person.value)
  hs.value.attrPerson = attrPerson.value
  he.person = person.value
  he.array = array.value
  hs.value.attrArray = attrArray.value
})
</script>

<style lang="scss"></style>
