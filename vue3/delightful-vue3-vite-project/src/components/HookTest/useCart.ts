/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-12 18:41:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-20 01:11:56
 * @Description :
 */
import { readonly } from 'vue'

export type Cart = {
  id: number
  name: string
  number: number
  price: number
}

// const items = ref<Cart[]>([])

// const totalBooks = computed(() =>
//   items.value.reduce((preTotal, current) => {
//     preTotal += current.number
//     return preTotal
//   }, 0)
// )

export default function useCart() {
  const items = ref<Cart[]>([])

  const totalBooks = computed(() =>
    items.value.reduce((preTotal, current) => {
      preTotal += current.number
      return preTotal
    }, 0)
  )
  function addCart(item) {
    const exist = items.value.find(el => el.id === item.id)
    if (exist) exist.number += 1
    else items.value.push({ id: item.id, name: item.name, number: 1, price: item.price })
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
