/* eslint-disable vue/require-name-property */

/*
 * @Description: vuex 手写
 * @Date: 2021-06-30 13:22:00 +0800
 * @Author: JackChou
 * @LastEditTime: 2022-10-13 22:26:07 +0800
 * @LastEditors : JackChou
 */
function forEach(obj, callback) {
  Object.keys(obj).forEach(key => {
    callback(key, obj[key])
  })
}
function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}
function isFunction(value) {
  return typeof value === 'function'
}
/**
 * root = {
 *  _raw:rootModule,
 *  state:rootModule.state,
 *  _children: {
 *      a:{
 *        _raw:aModule,
 *        state:aModule.state,
 *        _children:{}
 *       }
 *      },
 *      b:{
 *        _raw:bModule,
 *        state:bModule.state,
 *        _children:{
 *            c: {
 *                _raw:aModule,
 *                state:cModule.state,
 *                _children:{}
 *             }
 *          }
 *       }
 *    }
 *  }
 * }
 */
class ModuleCollection {
  constructor(options) {
    this.register([], options)
  }

  register(path, rootModule) {
    const rawModule = {
      _raw: rootModule,
      state: rootModule.state,
      _children: {},
    }
    if (!this.root) {
      this.root = rawModule
    } else {
      // NOTE 关键
      const parentModule = path.slice(0, -1).reduce((root, current) => {
        return root._children[current]
      }, this.root)
      parentModule._children[path[path.length - 1]] = rawModule
    }
    if (rootModule.modules) {
      forEach(rootModule.modules, (moduleName, module) => {
        this.register(path.concat(moduleName), module)
      })
    }
    // console.log(this.root)
  }
}

function installModule(store, state, path, rawModule) {
  if (path.length > 0) {
    // 安装模块
    const parentState = path.slice(0, -1).reduce((root, current) => {
      return state[current]
    }, state)
    Vue.set(parentState, path[path.length - 1], rawModule.state)
  }
  const getters = rawModule.getters
  if (getters) {
    forEach(getters, (getterName, value) => {
      Object.defineProperty(store.getters, getterName, {
        get: () => {
          return value(rawModule.state)
        },
      })
    })
  }

  const mutations = rawModule._raw.mutations
  if (mutations) {
    // 订阅
    forEach(mutations, (mutationName, mutation) => {
      const arr = store.mutations[mutationName] || (store.mutations[mutationName] = [])
      arr.push(payload => {
        mutation(rawModule.state, payload)
      })
    })
  }

  // actions
  const actions = rawModule._raw.actions
  if (actions) {
    forEach(actions, (actionName, action) => {
      const arr = store.actions[actionName] || (store.actions[actionName] = [])
      arr.push(payload => {
        action(store, payload)
      })
    })
  }
  forEach(rawModule._children, (moduleName, module) => {
    installModule(store, state, path.concat(moduleName), module)
  })
}
class Store {
  constructor(options) {
    // this.state = options.state
    // NOTE 为何把 state 放在 vm 实例上，因为希望利用 vue 的响应式
    // 当 this.$store.state.age = value 时，页面会刷新
    this.vm = new Vue({
      data: {
        state: options.state,
      },
      // data() {
      //   return {
      //     state: options.state
      //   }
      // }
    })

    this.getters = {}
    this.mutations = {}
    this.actions = {}
    // 格式化配置
    this.modules = new ModuleCollection(options)
    // 安装模块
    installModule(this, this.state, [], this.modules.root)
    console.log(this.modules.root)
    // const getters = options.getters
    // forEach(getters, (key, value) => {
    //   Object.defineProperty(this.getters, key, {
    //     get: () => {
    //       return value(this.state)
    //     }
    //   })
    // })
    // // mutations
    // const mutations = options.mutations
    // forEach(mutations, (mutationName, value) => {
    //   this.mutations[mutationName] = payload => {
    //     value(this.state, payload)
    //   }
    // })
    // // actions
    // const actions = options.actions
    // forEach(actions, (actionName, value) => {
    //   this.actions[actionName] = payload => {
    //     // NOTE 传递 this
    //     value(this, payload)
    //   }
    // })
  }

  // this.$store.state, this.state 会执 get
  get state() {
    // NOTE vm 实例上有 $store 属性，因为会执行全局的 mixin，但是因为 new Vue 时，没传递 store，它的只为 undefined
    return this.vm.state
  }

  // commit
  commit = (mutationName, payload) => {
    this.mutations[mutationName].forEach(fn => fn(payload))
  }

  // dispatch
  dispatch = (actionName, payload) => {
    this.actions[actionName].forEach(fn => fn(payload))
  }

  registerModule(moduleName, module) {
    let path = moduleName
    if (!Array.isArray(moduleName)) {
      path = [moduleName]
    }

    this.modules.register(path, module)
    installModule(this, this.state, path, this.modules.root)
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
    },
  })
}
export default {
  install,
  Store,
}
