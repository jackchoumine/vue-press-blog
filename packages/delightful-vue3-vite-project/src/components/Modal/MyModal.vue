<!--
 * @Date        : 2022-11-02 14:19:48
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-11-02 14:37:00
 * @Description : 
-->
<template>
  <Teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
        <slot>this is a modal</slot>
      </h2>
      <button @click="buttonClick">Close</button>
    </div>
  </Teleport>
</template>
<script lang="ts">
export default {
  props: {
    isOpen: Boolean,
  },
  emits: {
    'close-modal': null,
  },
  setup(props, context) {
    // 在页面上添加一个div，用来挂载弹窗
    const modalContainer = document.createElement('div')
    modalContainer.id = 'modal'
    document.body.appendChild(modalContainer)

    const buttonClick = () => {
      context.emit('close-modal')
    }
    return {
      buttonClick,
    }
  },
}
</script>
<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
