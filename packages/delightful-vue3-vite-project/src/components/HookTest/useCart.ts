import { readonly } from 'vue'

export type Cart = {
  id: number
  name: string
  number: number
}

const items = ref<Cart[]>([])
const totalBooks = computed(() =>
  items.value.reduce((preToal, current) => {
    preToal += current.number
    return preToal
  }, 0)
)

export default function useCart() {
  function addCart(item) {
    const exist = items.value.find(el => el.id === item.id)
    if (exist) exist.number += 1
    else items.value.push({ id: item.id, name: item.name, number: 1 })
  }
  function removeCart(id: number) {
    const index = items.value.findIndex(el => el.id === id)
    if (index !== -1) {
      const number = items.value[index].number
      number === 1 && items.value.splice(index, 1)
      number >= 2 && (items.value[index].number -= 1)
    }
  }
  // NOTE 导出的 items 是内部的 items 的只读副本
  // 防止在外部意外更改状态
  return { items: readonly(items), totalBooks: readonly(totalBooks), addCart, removeCart }
  // return { items: items, totalBooks, addCart, removeCart }
}
