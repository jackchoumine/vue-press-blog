/*
 * @Description: 状态管理
 * @Date: 2021-06-30 11:21:16 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-06-30 14:27:38 +0800
 * @LastEditors: JackChou
 */
import Vue from 'vue'
// import Vuex from 'vuex'
// import Vuex from '../_vuex'
import Vuex from '../vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    age: 12
  },
  strict: true, // 严格模式,mutations 更改状态会报错
  // 类似计算属性
  getters: {
    myAge(state) {
      return state.age + '岁'
    }
  },
  mutations: {
    syncChangeAge(state, payload) {
      state.age += payload
    }
  },
  actions: {
    asyncChangeAge({ commit }, payload) {
      setTimeout(() => {
        commit('syncChangeAge', payload)
      }, 1000)
    }
  }
})
