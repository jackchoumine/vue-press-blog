/*
 * @Description: 状态管理
 * @Date: 2021-06-30 11:21:16 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-10-13 22:30:52 +0800
 * @LastEditors : JackChou
 */
import Vue from 'vue'
// import Vuex from 'vuex'
// import Vuex from '../_vuex'
import Vuex from '../vuex'

Vue.use(Vuex)

const moduleA = {
  state: {
    age: 'a100',
  },
  mutations: {
    syncChangeAge(state, payload) {
      state.age += payload
    },
  },
}
const moduleC = {
  state: {
    age: 'c100',
  },
  mutations: {
    syncChangeAge(state, payload) {
      state.age += payload
    },
  },
}
const moduleB = {
  state: {
    age: 'c100',
  },
  // this.$store.state.b.c
  modules: {
    c: moduleC,
  },
}

const store = new Vuex.Store({
  // 这样获取 模块的状态
  // this.$store.state.a.age
  modules: {
    a: moduleA,
    b: moduleB,
  },
  state: {
    age: 12,
  },
  strict: true, // 严格模式，mutations 更改状态会报错
  // 类似计算属性
  getters: {
    myAge(state) {
      return state.age + '岁'
    },
  },
  mutations: {
    syncChangeAge(state, payload) {
      state.age += payload
    },
  },
  actions: {
    asyncChangeAge({ commit }, payload) {
      setTimeout(() => {
        commit('syncChangeAge', payload)
      }, 1000)
    },
  },
})

store.registerModule('d', {
  state: { age: '50' },
})

export default store
