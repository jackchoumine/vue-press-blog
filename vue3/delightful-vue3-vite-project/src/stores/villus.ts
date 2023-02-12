/*
 * @Description : pinia 和第三方插件结合
 * @Date        : 2023-01-07 17:47:39 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 17:47:41 +0800
 * @LastEditors : JackChou
 */
import { defineStore } from 'pinia'
import { useQuery } from 'villus'
import { computed } from 'vue'

export const usePetsStore = defineStore('pets', () => {
  const { data, isFetching, execute } = useQuery({
    query: `
    query AllPets {
      allPets {
        id
        name
        category
        photo {
          thumb
          full
        }
      }
    }
  `,
  })

  const pets = computed(() => data.value?.allPets || [])

  return {
    pets,
    isFetching,
    fetch: execute,
  }
})
