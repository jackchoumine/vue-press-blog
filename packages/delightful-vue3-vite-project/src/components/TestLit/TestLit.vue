<template>
  <div>
    <h4>测试 lit component</h4>
    <hello-lit name="hello-lit" :array="arrayT" @my-click="myClick"></hello-lit>
    <!-- Lit wc 没问题 -->
    <my-element :count="count" :array="array" ref="my" @my-click="myClick"></my-element>
    <button type="button" @click="changeArray">修改</button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'TestLit',
  components: {},
  setup() {
    const count = ref(12)
    const array = ref(['vue'])
    const arrayT = ref([{ name: 'vue3' }, { name: 'lit-element' }])
    function myClick(event) {
      console.log('myClick')
      console.log(event.type)
      arrayT.value = [{ name: 'vue' }]
    }
    function changeArray() {
      array.value = ['lit', 'stencil']
    }
    onMounted(() => {
      const my = document.querySelector('my-element')
      const hello = document.querySelector('hello-lit')
      // hello.addEventListener('my-click', myClick)
      console.log(my)
      console.log(hello)
      // myElement.value.addEventListener('my-click', myClick)
    })
    return { count, array, changeArray, arrayT, myClick }
  },
})
</script>

<style scoped lang="scss"></style>
