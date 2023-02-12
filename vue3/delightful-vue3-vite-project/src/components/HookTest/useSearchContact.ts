import type { MaybeRef } from '@vueuse/core'

export type Item = Record<'id' | 'name' | 'phone', string>
type Params = {
  items: MaybeRef<Item[]>
  filterKey: MaybeRef<string>
  searchableProps: MaybeRef<string[]>
}

export function useSearchContactList({ items, filterKey, searchableProps }: Params) {
  const key = ref(filterKey)
  const innerItems = ref(items)
  const innerSearchProps = ref(searchableProps)
  const list = computed(() => {
    if (!key.value) return innerItems.value
    const regex = new RegExp(key.value, 'i')
    return innerItems.value.filter(item => {
      return innerSearchProps.value.some(prop => regex.test(String(item[prop])))
    })
  })
  return list
}
