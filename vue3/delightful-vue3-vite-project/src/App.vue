<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-03-13 20:21:08
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-03-13 20:21:38
 * @Description : 
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'

import { routes } from './routers'
import { USER_KEY } from './utils/injectionKey'

provide(USER_KEY, { id: 1234, name: 'JackChou' })
</script>

<template>
  <header>
    <QTabs no-caps class="bg-primary text-white shadow-2">
      <QRouteTab
        v-for="item in routes"
        :label="item.name"
        :to="item.path"
        :key="item.path"
        exact />
    </QTabs>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  max-height: 100vh;
  line-height: 1.5;
}

.q-tabs {
  min-width: 100%;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
