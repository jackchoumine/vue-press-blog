/*
 * @Description : 导出全局状态
 * @Date        : 2023-01-05 01:19:05 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 17:20:40 +0800
 * @LastEditors : JackChou
 */
import type { PiniaPluginContext } from 'pinia'
import { createPinia } from 'pinia'

export { useCounter } from './counter'
export { useTodosStore } from './todos'
export { useCartStore } from './cart'

const piniaStore = createPinia()

// NOTE pinia 插件
// 在安装此插件后创建的每个 store 中都会添加一个名为 `secret` 的属性。
// 插件可以保存在不同的文档中
function piniaPlugin(context: PiniaPluginContext) {
  // const { options, store, pinia } = context
  // console.log(app)
  // console.log(options)
  // console.log(store)
  // console.log(pinia)
  const name = ref('JackChou')
  return { secret: 'the cake is a lie', name }
}

// 在 store 中添加属性，不会被 dev-tool 追踪
function piniaPlugin2({ store }: PiniaPluginContext) {
  // NOTE store 被 reactive 包装过
  console.log(store)
  store.pluginVar = 'hello world'
  // NOTE 可使用这个设置，开启 dev-tool 追踪
  if (process.env.NODE_ENV === 'development') {
    // 添加你在 store 中设置的键值
    store._customProperties.add('pluginVar')
  }
}

// 订阅 state 变化和监听 actions 调用
function piniaPlugin3({ store }) {
  // 响应 store 变化
  // 比起普通的 watch()，使用 $subscribe() 的好处是 subscriptions 在 patch 后只触发一次
  store.$subscribe((mutation, state) => {
    console.log('订阅 state 变化')
    console.log(mutation)
    console.log(state)
  })

  store.$onAction(
    ({
      name, // action 名称
      store, // store 实例，类似 `someStore`
      args, // 传递给 action 的参数数组
      after, // 在 action 返回或解决后的钩子
      onError, // action 抛出或拒绝的钩子
    }) => {
      console.log(store.$id)
      // 为这个特定的 action 调用提供一个共享变量
      const startTime = Date.now()
      // 这将在执行 "store "的 action 之前触发。
      console.log(`Start "${name}" with params [${args.join(', ')}].`)

      // 这将在 action 成功并完全运行后触发。
      // 它等待着任何返回的 promise
      after(result => {
        console.log(
          `Finished "${name}" after ${Date.now() - startTime}ms.\nResult: ${result}.`
        )
      })

      // 如果 action 抛出或返回一个拒绝的 promise，这将触发
      onError(error => {
        console.warn(
          `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
        )
      })
    }
  )
}
// 将该插件交给 Pinia
piniaStore.use(piniaPlugin).use(piniaPlugin2).use(piniaPlugin3)

export default piniaStore
