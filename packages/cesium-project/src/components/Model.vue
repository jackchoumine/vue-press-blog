<template>
  <div class="cesium-container" ref="mapRef"></div>
  <q-select outlined v-model="model" :options="options" label="选择model" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as Cesium from 'cesium'
import { token } from '../config'

const mapRef = ref(null)
const model = ref()

const options = ref([
  { label: 'Aircraft', value: 'aircraft' },
  { label: 'Dron', value: 'dron' },
])
let viewer = null

watch(model, newModel => {
  console.log(newModel.value)
  createModel(newModel.value, 400)
})

Cesium.Ion.defaultAccessToken = token

onMounted(() => {
  viewer = new Cesium.Viewer(mapRef.value, {
    infoBox: false,
    selectionIndicator: false,
    shadows: true,
    shouldAnimate: true,
  })

  createModel(undefined, 5000.0)

  viewer.zoomTo(viewer.entities)
})

async function createModel(airPlane = 'aircraft', height) {
  viewer.entities.removeAll()

  const position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height)
  const heading = Cesium.Math.toRadians(135)
  const pitch = 0
  const roll = 0
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)

  const airplaneUri = await Cesium.IonResource.fromAssetId(airPlane === 'aircraft' ? '1289206' : '1277557')

  const entity = viewer.entities.add({
    name: 'airplaneUri',
    position: position,
    orientation: orientation,
    model: {
      uri: airplaneUri,
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
  })
  viewer.trackedEntity = entity
}
</script>
