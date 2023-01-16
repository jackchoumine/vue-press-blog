<template>
  <div class="cesium-container" ref="mapRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as Cesium from 'cesium'
import logo from '../assets/logo.png'
const mapRef = ref(null)
onMounted(() => {
  const viewer = new Cesium.Viewer(mapRef.value)
  const citizensBankPark = viewer.entities.add({
    id: 'point',
    name: 'Citizens Bank Park',
    position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
    // billboard: {
    //   image: logo,
    //   width: 32,
    //   height: 32,
    //   sizeInMeters: true,
    //   show: true, // 默认 true
    //   scale: 1, // 默认 1
    //   color: Cesium.Color.LIME.withAlpha(0.8), // default WHITE
    //   rotation: Cesium.Math.PI_OVER_FOUR, // default WHITE
    //   horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    //   VerticalOrigin: Cesium.VerticalOrigin.TOP,
    //   alignedAxis: Cesium.Cartesian3.ZERO,
    //   pixelOffset: new Cesium.Cartesian2(0, 0),
    //   eyeOffset: new Cesium.Cartesian3(5, 3, 0),
    // },
    point: {
      show: true,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE.withAlpha(0.5),
      pixelSize: 5,
      outlineWidth: 2,
    },
    label: {
      text: 'Citizens Bank Park',
      font: '14pt monospace',
      fillColor: Cesium.Color.SKYBLUE,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      outlineColor: Cesium.Color.RED,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      pixelOffset: new Cesium.Cartesian2(0, 32),
    },
  })
  viewer.zoomTo(citizensBankPark)
})
</script>
