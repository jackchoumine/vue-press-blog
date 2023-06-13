# 除了 ref 和 reactive，还有哪些函数声明响应式数据？

## ref vs shallowRef

ref 包裹的变量，返回响应式对象，通过`.value`获取原来的变量。被包裹的变量是对象或者数组，`内部`也会变成响应式的数据。

```js
const books = ref([])
onMounted(() => {
  setTimeout(() => {
    books.value = [{ book: 'HelloWorld' }]
    books.value.map(item => {
      console.log('item')
      console.log(isProxy(item)) // true
      console.log(isRef(item)) // false
      console.log(item) // Proxy {}
    })
  }, 2000)
})
```

`shallowRef`只转化第一层属性。

```js
const books = shallowRef([])
onMounted(() => {
  setTimeout(() => {
    books.value = [{ book: 'HelloWorld' }]
    books.value.map(item => {
      console.log('item')
      console.log(isProxy(item)) // false
      console.log(isRef(item)) // false
      console.log(item) // {book:"HelloWorld"}
    })
  }, 2000)
})
```

## reactive vs shallowReactive

```js
const books = reactive([])
onMounted(() => {
  setTimeout(() => {
    books.value = [{ book: 'HelloWorld' }]
    books.value.map(item => {
      console.log('item')
      console.log(isProxy(item)) // true
      console.log(isRef(item)) // false
      console.log(item) // Proxy {book: 'HelloWorld'}
    })
  }, 2000)
})
// 子组件获取
watch(
  () => props.books,
  // NOTE value 和 oldValue 是原始值
  (value, oldValue) => {
    console.log('-----监听props')
    console.log(value) // { Proxy [{book: 'HelloWorld'}] }
    console.log(oldValue)
  }
)
// 或者监听对象返回 toRaw
watch(
  () => toRaw(props.books),
  // NOTE value 和 oldValue 是原始值
  (value, oldValue) => {
    console.log('-----监听props')
    console.log(value) // [{book: 'HelloWorld'}]
    console.log(oldValue)
  }
)
```

```js
const books = shallowReactive([])
onMounted(() => {
  setTimeout(() => {
    books.value = [{ book: 'HelloWorld' }]
    books.value.map(item => {
      console.log('item')
      console.log(isProxy(item)) // true
      console.log(isRef(item)) // false
      console.log(item) // Proxy {book: 'HelloWorld'}
    })
  }, 2000)
})
// 子组件获取
watch(
  () => props.books, // 不必调用 toRaw 简化了操作
  // NOTE value 和 oldValue 是原始值
  (value, oldValue) => {
    console.log('-----监听props')
    console.log(value) //  [{book: 'HelloWorld'}]
    console.log(oldValue)
  }
)
```

`shallowReactive` 和 `shallowRef` **可简化操作**，并提高性能，当只需要第一层属性是响应式数据时，使用它们。

> 注意

shallowRef、shallowReactive 包裹变量，父组件修改属性，在子组件中监听不到，但是模板会更新，希望在 watch 中监听到变化，可重置。
