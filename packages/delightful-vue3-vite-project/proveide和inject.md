# provide 和 inject

## 基础使用

`App.vue`

```js
const user = reactive({
  id: 1,
  name: 'JackChou',
})
// provide(key, value)
provide('USER', user)
```

在任何 App 的后台组件中使用：

```js
// inject(key,defaultValue)
const user = inject('USER')
```

使用字面量提供 key，容易写错，且容易冲突。

解决办法：key 集中管理，且使用 symbol 类型。

`injectKey.ts`

```js
export const USER_KEY = Symbol('User')
```

在 provide 和 inject 中使用

`App.vue`

```js
import { USER_KEY } from './utils/injectionKey'
const user = reactive({
  id: 1,
  name: 'JackChou',
})
provide(USER_KEY, user)
```

使用 inject

```js
import { USER_KEY } from '@/utils/injectionKey'
const user = inject(USER_KEY)
```

## 类型安全的 inject

上面 inject 之后，user 的类型为 unknown。

为了解决这一问题，vue 提供`InjectionKey`，给 key 添加上类型。

```ts
import type { InjectionKey } from 'vue'
export type User = { id: number; name: string }
export const USER_KEY: InjectionKey<User> = Symbol('User')
```

> 需要类型支持，又得引入新的接口，从这点可看出，vue 对类型支持，还是不够好。

> inject 之后，还是提示类型为 unknown，很奇怪。

问题：使用了路径别名导入模块，编辑器解析不到，其他使用别名导入的模块，也存在这个问题。

解决办法 1： 不使用路径别名。

解决办法 2：配置正确的路径别名。

```js
{
  "baseUrl": "src",
  "paths": {
    // /* 配路径
    "@/*": ["./*"],
    // 没有 /* 配置具体的文件
    "#c": ["./components/index"]
  }
}
```

配置正确，编辑器会提示：

![](./QQ%E6%88%AA%E5%9B%BE20221210175356.png)

且能点击导出，能正确跳转目录。

> 注意 vite 路径别名和 tsconfig 路径别名的对应关系。

## 参考

[The new Provide and Inject in Vue 3](https://vuedose.tips/the-new-provide-inject-in-vue-3)

[provide and inject](https://logaretm.com/blog/making-the-most-out-of-vuejs-injections/)

[provide and inject](https://logaretm.com/blog/type-safe-provide-inject/)
