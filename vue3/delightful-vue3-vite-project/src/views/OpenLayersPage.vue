<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-08 20:29:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-14 20:48:53
 * @Description : leaflet 学习
-->
<script setup>
import {
  OLInitMap,
  /* GeoJSON, InitMap, LayerControl, MarkerDemo */
} from '@/components/OpenLayersDemos'

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
          <QTab name="tile-layer" label="瓦片图层" />
          <QTab name="marker" label="标记" />
          <QTab name="layer-control" label="图层控制" />
          <QTab name="geo-json" label="geoJson" />
          <QTab name="event" label="事件" />
          <QTab name="style-custom" label="修改组件样式" />
        </QTabs>
        <QSeparator />
        <QTabPanels v-model="tab" animated>
          <QTabPanel name="init">
            <OLInitMap />
          </QTabPanel>
          <QTabPanel name="tile-layer"> </QTabPanel>
          <QTabPanel name="marker">
            <!-- <MarkerDemo /> -->
          </QTabPanel>
          <QTabPanel name="layer-control">
            <!-- <LayerControl /> -->
          </QTabPanel>
          <QTabPanel name="geo-json">
            <!-- <GeoJSON />  -->
          </QTabPanel>
          <QTabPanel name="event"> </QTabPanel>
          <QTabPanel name="style-custom"> </QTabPanel>
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
