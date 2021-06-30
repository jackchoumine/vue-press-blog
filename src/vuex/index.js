/* eslint-disable vue/require-name-property */
/*
 * @Description: vuex 手写
 * @Date: 2021-06-30 13:22:00 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-30 15:25:43 +0800
 * @LastEditors: JackChou
 */
class Store {
  constructor(options) {
    // this.state = options.state
    // NOTE 为何把 state 放在 vm 实例上，因为希望利用 vue 的响应式
    // 当 this.$store.state.age = value 时，页面会刷新
    this.vm = new Vue({
      data: {
        state: options.state
      }
      // data() {
      //   return {
      //     state: options.state
      //   }
      // }
    })
    this.getters = {}
    const getters = options.getters
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }

  // this.$store.state, this.state 会执 get
  get state() {
    // NOTE vm 实例上有 $store 属性，因为会执行全局的 mixin，但是因为  new Vue 时，没传递 store，它的只为 undefined
    return this.vm.state
  }
}
let Vue = null
// 希望传递 vue 的构造函数
const install = _Vue => {
  Vue = _Vue
  // NOTE 为何不放在原型上？会导致每个 new Vue() 都有该属性，污染了
  // 我们希望只在所有组件实例上有 store 属性
  Vue.mixin({
    // NOTE 这个钩子可以做什么？

    // 全局混入，会先于组件自身的生命周期执行
    beforeCreate() {
      // 从根组件 Root 开始，给所有子组件注册 store
      // 父子组件生命周期
      // 挂载：父beforeCreate->父created->父beforeMount->【子beforeCreate->子created->子beforeMount->子mounted】->父mounted
      // 子组件更新：父beforeUpdate->【子beforeUpdate->子updated】->父updated
      // 父组件更新：父beforeUpdate->父updated
      // 销毁：父beforeDestroy->【子beforeDestroy->子destroyed】->父destroyed
      // https://www.jianshu.com/p/e480baa9e39f
      // NOTE $options 是组件选项
      // 从根组件实例开始，给每个组件实例都注入 $store
      if (this.$options.store) {
        // 根实例
        this.$store = this.$options.store
      } else {
        // 根组件的后代组件
        // 组件创建过程是先父后子
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}
export default {
  install,
  Store
}
