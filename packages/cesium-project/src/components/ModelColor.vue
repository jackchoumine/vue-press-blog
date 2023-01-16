<template>
  <div class="cesium-container" ref="mapRef"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { ref, onMounted } from 'vue'
const mapRef = ref(null)
onMounted(() => {
  if (mapRef.value) {
    const viewer = new Cesium.Viewer(mapRef.value, {
      fullscreenButton: false,
      timeline: false,
    })
    // 删除图层
    viewer.imageryLayers.remove(viewer.imageryLayers.get(0))
    // 添加图层
    viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3954 }))
  }
})

function getColorBlendMode(colorBlendMode) {
  return Cesium.ColorBlendMode[colorBlendMode.toUpperCase()]
}

function getColor(colorName, alpha) {
  const color = Cesium.Color[colorName.toUpperCase()]
  return Cesium.Color.fromAlpha(color, parseFloat(alpha))
}
</script>
