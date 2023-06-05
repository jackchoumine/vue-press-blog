<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-02 09:31:16
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-05 14:31:38
 * @Description : 初始化 ol 地图
-->
<script lang="ts" setup>
onMounted(initMap)

function initMap() {
  const key = 'vWhISZ4E9RttLWtmRiyw'

  const attribution = new ol.control.Attribution({
    collapsible: false,
  })

  const source = new ol.source.TileJSON({
    url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`, // source URL
    tileSize: 512,
    crossOrigin: 'anonymous',
  })

  const map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source,
      }),
    ],
    controls: ol.control.defaults.defaults({ attribution: false }).extend([attribution]),
    target: 'ol-map-init',
    view: new ol.View({
      constrainResolution: true,
      center: ol.proj.fromLonLat([106.675271, 26.579508]),
      // center: ol.proj.fromLonLat([16.62662018, 49.2125578]), // starting position [lng, lat]
      zoom: 12, // starting zoom
    }),
  })
}
</script>

<template>
  <div class="init-map" id="ol-map-init"></div>
</template>

<style scoped lang="scss">
.init-map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
