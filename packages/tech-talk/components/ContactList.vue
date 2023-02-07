<script setup lang="ts">
import { Item, useSearchContactList } from './useSearchContact'
import { ref } from "vue";

type Props = {
  searchable?: boolean
}
const { searchable = false } = defineProps<Props>()

const items = [
  {
    id: '1',
    name: 'Jack',
    phone: '1234567',
  },
  {
    id: '2',
    name: 'Tom',
    phone: '12345613138',
  },
  {
    id: '3',
    name: '小明',
    phone: '18530245493',
  },
]

let result = ref<Item[]>(items)
const filterKey = ref('')

if (searchable) {
  const searchableProps = ['name', 'phone']
  // NOTE useSearchContactList 返回计算属性 不用 result.value 重置
  result = useSearchContactList({ items, filterKey, searchableProps })
}
</script>

<template>
  <div class="vue-component">
    <input v-model="filterKey" v-if="searchable" placeholder="请输入关键字" />
    <ul>
      <li v-for="(item, index) in result" :key="index">
        <p>{{ item?.name }}</p>
        <p>{{ item?.phone }}</p>
      </li>
    </ul>
  </div>
</template>
