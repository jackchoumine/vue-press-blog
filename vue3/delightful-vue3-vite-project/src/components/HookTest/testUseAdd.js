import { useAdd } from './hooks'

let a = 10
const b = ref(20)
const c = useAdd(a, b)
console.log(c.value)
setTimeout(() => {
  a = 100
  b.value = 1000
  console.log('setTimeout')
  console.log(c.value)
}, 4000)
