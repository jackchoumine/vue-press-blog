<!--
 * @Description : 
 * @Date        : 2022-01-16 22:03:59 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-01-16 22:05:59 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <my-name />
    <!-- eslint-disable-next-line vue/html-self-closing vue/max-attributes-per-line -->
    <hello-stencil
      ref="hs"
      :name="name"
      :array.prop="array"
      :attrArray.prop="attrArray"
      :attr-person.prop="attrPerson"
      :person.prop="person"
      @myclick="myClick"
    ></hello-stencil>
  </div>
</template>
<script>
export default {
  name: 'MyVueName',
  data() {
    return {
      name: '测试stencil 的事件和复杂数据',
      attrArray: [{ name: 'JackChou' }],
      array: [{ name: 'JackChou' }],
      attrPerson: { name: 'success' },
      person: { name: 'jack' },
    }
  },
  mounted() {
    const dom = this.$refs.hs
    console.log(dom)
    setTimeout(() => {
      dom.array = [{ name: 'hellman' }]
      // dom.setAttribute('array', this.array)
      dom.person = this.person
      // dom.attrPerson = this.person
    }, 100)
    // dom.addEventListener('myClick', event => {
    //   console.log('myClick: ')
    //   console.log(event.detail)
    // })
    // dom.addEventListener('my-click', event => {
    //   console.log('my-click: ')
    //   console.log(event.detail)
    // })
    // dom.addEventListener('myclick', event => {
    //   console.log('myclick: ')
    //   console.log(event.detail)
    // })
  },
  methods: {
    // NOTE 事件可可以监听
    myClick({ type }) {
      console.log(type)
      this.name = '触发了' + type
    },
  },
}
</script>
<style></style>
