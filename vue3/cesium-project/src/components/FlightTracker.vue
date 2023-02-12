<template>
  <div class="cesium-container" ref="mapRef"></div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { ref, onMounted } from 'vue'
import { points } from './points'
const mapRef = ref(null)
onMounted(() => {
  if (mapRef.value) {
    const viewer = new Cesium.Viewer(mapRef.value, {
      terrainProvider: Cesium.createWorldTerrain(),
      homeButton: false, // 主页按钮
      navigationHelpButton: false, // 导航按钮
      baseLayerPicker: false, // 图层选择去器
      geocoder: false, // 搜索框
      animation: false, // 左下角 动画设置按钮
      //   timeline: false, // 时间线按钮
      fullscreenButton: false, // 全屏按钮
      sceneModePicker: false, // 场景切换
      selectionIndicator: false,
    })
    // 隐藏版权水印
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    const osmBuilding = viewer.scene.primitives.add(Cesium.createOsmBuildings())
    createFlyLine(viewer, points)
  }
})

function createFlyLine(viewer, points) {
  /*
  假设雷达样本相隔30秒，然后根据该假设计算整个飞行持续时间。
        获取航班的开始和结束日期时间，其中开始时间是已知的航班起飞时间（从PST转换为
        到UTC），停靠点就是起点加上计算出的持续时间。 （请注意，cesium使用的日期是JulianDate)
        通过将观看者的开始和停止时间设置为我们刚刚计算的飞行开始和停止时间来初始化观看者的时钟。
        另外，将查看者的当前时间设置为开始时间，然后将用户带到该时间。
        */

  const timeStepInSeconds = 30
  const totalSeconds = timeStepInSeconds * (points.length - 1)
  const start = Cesium.JulianDate.fromIso8601('2020-03-09T23:10:00Z')
  const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate())
  viewer.clock.startTime = start.clone()
  viewer.clock.stopTime = stop.clone()
  viewer.clock.currentTime = start.clone()
  viewer.timeline.zoomTo(start, stop)
  // 加快播放速度50倍
  viewer.clock.multiplier = 50
  // 开始播放场景
  viewer.clock.shouldAnimate = true
  // SampledPositionedProperty 存储沿雷达样本系列的每个样本的位置和时间戳
  const positionProperty = new Cesium.SampledPositionProperty()

  for (let i = 0; i < points.length; i++) {
    const dataPoint = points[i]
    // 声明此单个样本的时间，并将其存储在新的JulianDate实例中
    const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate())
    const position = Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height)
    // 存储位置及其时间戳.
    // 在这里，我们将所有位置都预先添加，但是可以在运行时添加这些位置，因为这些示例是从服务器接收到的。.
    positionProperty.addSample(time, position)

    // viewer.entities.add({
    //   description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
    //   position: position,
    //   point: { pixelSize: 10, color: Cesium.Color.RED },
    // })

    loadModel()
  }

  // STEP 6 CODE (airplane entity)
  async function loadModel() {
    // Load the glTF model from Cesium ion.
    const airplaneUri = await Cesium.IonResource.fromAssetId('1277557')
    const airplaneEntity = viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start: start, stop: stop })]),
      position: positionProperty,
      // Attach the 3D model instead of the green point.
      model: { uri: airplaneUri },
      // Automatically compute the orientation from the position.
      orientation: new Cesium.VelocityOrientationProperty(positionProperty),
      path: new Cesium.PathGraphics({ width: 3 }),
    })

    viewer.trackedEntity = airplaneEntity
  }
}

// 参考教程
// https://cesium.com/learn/cesiumjs-learn/cesiumjs-flight-tracker/

// https://blog.csdn.net/weixin_45970617/article/details/114121116
</script>
