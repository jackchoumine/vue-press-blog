<!--
 * @Description : 
 * @Date        : 2023-01-07 17:59:40 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-07 18:14:38 +0800
 * @LastEditors : JackChou
-->
<script setup lang="ts">
import { useSignupStore } from '@/stores'

const store = useSignupStore()
function submit(event) {
  // console.log(event.target)
  // console.log(JSON.stringify(evet.target))
}
</script>

<template>
  <form @submit="store.signup" novalidate>
    <div class="field">
      <input placeholder="Name" v-model="store.name" />
      <span v-if="!store.name">{{ store.errors.name }}</span>
    </div>

    <div class="field">
      <input type="email" placeholder="Email" v-model="store.email" />
      <span v-if="!store.email">{{ store.errors.email }}</span>
    </div>

    <div class="field">
      <input type="password" placeholder="Password" v-model="store.password" />
      <span v-if="!store.password">{{ store.errors.password }}</span>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
