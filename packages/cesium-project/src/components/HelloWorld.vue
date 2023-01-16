<template>
  <div class="cesium-container" ref="mapRef"></div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { token } from '../config'
/**
 * You can also import Cesium Object like this
 *
 * import * as Cesium from 'cesium';
 * const viewer = new Cesium.Viewer('cesiumContainer');
 */
import * as Cesium from 'cesium'
export default defineComponent({
  name: 'HelloWorld',
  setup: () => {
    const mapRef = ref<HTMLDivElement | null>(null)
    Cesium.Ion.defaultAccessToken = token // 设置 token 隐藏版权声明，使用token才能使用 cesium Ion 的服务
    // 将默认视角对准中国
    // TODO 对准某一个省份呢？
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2)
    onMounted(() => {
      const viewer = new Cesium.Viewer(mapRef.value!, {
        geocoder: true, // 位置搜索框，支持关注点（POI）和经纬度坐标搜索，
        // TODO 坐标如何输入呢？
        homeButton: true, // 主页按钮，将视角设到默认视角：俯视美洲大陆。
        // sceneModePicker: false, // 场景切换:3D，2.5D，2D
        // baseLayerPicker: false, // 图层选择去器：切换地图图层
        // navigationHelpButton: false, // 导航按钮：帮助信息
        animation: false, // 左下角 动画设置按钮
        timeline: false, // 时间线按钮，类似于视频进度条
        fullscreenButton: true, // 全屏按钮
        fullscreenElement: document.body, //
        // selectionIndicator: false,// 选择指示器
        scene3DOnly: true, //
        // clock: new Cesium.Clock(),
        baseLayerPicker: false, // 图层选择去器
        imageryProvider: Cesium.createWorldImagery({
          style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
        }),
        // terrainProvider: // 地形图层,设置 baseLayerPicker 为 false 才有效
      })
      // NOTE 隐藏 cesium Ion 的服务声明
      // @ts-ignore
      viewer._cesiumWidget._creditContainer.style.display = 'none'
      // TODO 设置视角
      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(100.07, 30.05, 4000000),
      })
      // TODO 取消默认双击行为
      // 不取消会有什么行为
      viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
      // viewer
      // const layer = viewer.scene.imageryLayers
      // const blackMarble = layer.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3812 }))
    })
    return { mapRef }
  },
})
</script>
