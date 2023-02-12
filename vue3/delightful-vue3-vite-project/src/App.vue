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
  line-height: 1.5;
  max-height: 100vh;
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
