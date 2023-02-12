<template>
  <div class="cesium-container" ref="mapRef"></div>
  <button id="toggle-building">Toggle new building</button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as Cesium from 'cesium'
import { token } from '../config'
const mapRef = ref(null)
Cesium.Ion.defaultAccessToken = token
onMounted(() => {
  if (mapRef.value) {
    const viewer = new Cesium.Viewer(mapRef.value, {
      terrainProvider: Cesium.createWorldTerrain(),
    })
    // 隐藏版权水印
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    const osmBuilding = viewer.scene.primitives.add(Cesium.createOsmBuildings())
    // viewer.camera.flyTo({
    //   destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000),
    // })
    addBuildingGeoJSON(viewer)
    osmBuilding.style = new Cesium.Cesium3DTileStyle({
      // Create a style rule to control each building's "show" property.
      show: {
        conditions: [
          // Any building that has this elementId will have `show = false`.
          ['${elementId} === 532245203', false],
          ['${elementId} === 332469316', false],
          ['${elementId} === 332469317', false],
          ['${elementId} === 235368665', false],
          ['${elementId} === 530288180', false],
          ['${elementId} === 530288179', false],
          // If a building does not have one of these elementIds, set `show = true`.
          [true, true],
        ],
      },
      // Set the default color style for this particular 3D Tileset.
      // For any building that has a `cesium#color` property, use that color, otherwise make it white.
      color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')",
    })
    const newBuildingTileset = viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId('1280971'),
      })
    )
    // Move the camera to the new building.
    viewer.flyTo(newBuildingTileset)
  }
})
async function addBuildingGeoJSON(viewer) {
  // Load the GeoJSON file from Cesium ion.
  const geoJSONURL = await Cesium.IonResource.fromAssetId('1280965')
  // Create the geometry from the GeoJSON, and clamp it to the ground.
  const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true })
  // Add it to the scene.
  const dataSource = await viewer.dataSources.add(geoJSON)
  // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
  // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
  for (const entity of dataSource.entities.values) {
    entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN
  }
  // Move the camera so that the polygon is in view.
  viewer.flyTo(dataSource)
}
</script>

<style>
#toggle-building {
  z-index: 1;
  position: fixed;
  top: 5px;
  left: 5px;
}
</style>
