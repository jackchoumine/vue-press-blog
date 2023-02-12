<!--
 * @Date        : 2022-10-17 09:27:13
 * @Author      : ZhouQiJun
 * @LastEditors : JackChou
 * @LastEditTime: 2023-02-01 21:42:09 +0800
 * @Description : 
-->
<script>
import Modal from './Modal/MyModal.vue'

const st = 'hekkio'
export default {
  components: {
    Modal,
  },
  directives: {
    focus: {
      mounted(el) {
        // 获取input，并调用其focus()方法
        el.focus()
      },
    },
  },
  // NOTE 暴露属性
  // expose: ['modalIsOpen'],
  setup(_, { expose }) {
    // console.log(context)
    // console.log('setup')
    // onBeforeMount(() => {
    //   console.log('com onBeforeMount')
    // })
    // onMounted(() => {
    //   console.log('com onMounted')
    // })
    // onBeforeUpdate(() => {
    //   console.log('com onBeforeUpdate')
    // })
    // onUpdated(() => {
    //   console.log('com onUpdated')
    // })
    // onBeforeUnmount(() => {
    //   console.log('com onBeforeUnmount')
    // })
    // onUnmounted(() => {
    //   console.log('com onUnmounted')
    // })
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    // make the instance "closed" -
    // i.e. do not expose anything to the parent
    // expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // selectively expose local state
    expose({ count: publicCount, exposeVar: '暴露的变量' })
    return { modalIsOpen, openModal, onModalClose }
  },
}
</script>

<template>
  <!-- v-clickOutside v-title -->
  <div class="hello-world" v-copy="'核力量'">
    <input v-focus />
    <br />
    <button v-auth:disabled="'li'" class="button">无权限禁用</button>
    <br />
    <button v-auth="'li'">无权限删除</button>
    <br />
    <button @click="openModal">Open Modal</button>
    <br />
    <ElButton type="primary" v-auth="'hello'">el按钮</ElButton>
    <Modal :isOpen="modalIsOpen" @close-modal="onModalClose"> My Modal !!!! </Modal>
  </div>
</template>

<style>
.hello-world {
  /* width: 100px; */
  /* height: 100px; */
  background-color: aliceblue;
}

.hello-world .button {
  color: red;
}
</style>
