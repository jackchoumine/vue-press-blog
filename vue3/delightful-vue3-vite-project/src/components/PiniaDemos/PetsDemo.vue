<!--
 * @Description : 
 * @Date        : 2023-01-07 17:49:32 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-17 20:14:00 +0800
 * @LastEditors : JackChou
-->
<script setup>
import { useClient } from 'villus'

import { usePetsStore } from '@/stores'

useClient()

const petsStore = usePetsStore()

const icons = {
  CAT: '🐱',
  DOG: '🐶',
  RABBIT: '🐰',
  STINGRAY: '🐟',
}
</script>

<template>
  <ul v-if="petsStore.pets">
    <li v-for="pet in petsStore.pets" :key="pet.id">
      <span>{{ pet.name }}</span>
      <span> {{ icons[pet.category] }}</span>
    </li>
  </ul>

  <div v-if="petsStore.isFetching">Loading...</div>
</template>
