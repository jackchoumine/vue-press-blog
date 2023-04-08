<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 20:29:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-08 21:42:02
 * @Description : leaflet 学习
-->
<script setup>
import { InitMap } from '#c'

const tab = ref('init')
</script>

<template>
  <div class="q-pa-md h-full">
    <div class="q-gutter-y-md h-full">
      <QCard class="h-full">
        <QTabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator>
          <QTab name="init" label="初始化" />
          <!-- <QTab name="alarms" label="Alarms" /> -->
          <!-- <QTab name="movies" label="Movies" /> -->
        </QTabs>

        <QSeparator />

        <QTabPanels v-model="tab" animated class="h-full">
          <QTabPanel name="init">
            <InitMap />
            <!-- <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas animi
              repellendus quaerat, iusto esse reiciendis iste at consequuntur unde
              commodi, voluptas ullam amet dolorem, odio veniam minus? Temporibus, fugiat
              eveniet!
            </p> -->
          </QTabPanel>

          <QTabPanel name="alarms"> </QTabPanel>

          <QTabPanel name="movies"> </QTabPanel>
        </QTabPanels>
      </QCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.q-tab-panels {
  height: calc(100% - 38px);
}
</style>
