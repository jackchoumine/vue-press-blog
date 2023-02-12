<template>
  <div class="cesium-container" ref="mapRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as Cesium from 'cesium'

const mapRef = ref(null)
onMounted(() => {
  const viewer = new Cesium.Viewer(mapRef.value)
  viewer.entities.suspendEvents()
  // NOTE 实体集合相关的事件
  // FIXME  还有哪些事件？
  function onChanged(collection, added, removed, changed) {
    var msg = 'Added ids'
    for (var i = 0; i < added.length; i++) {
      msg += '\n' + added[i].id
    }
    console.log(msg)
  }
  viewer.entities.collectionChanged.addEventListener(onChanged)
  // 创建一个实体
  const description = `<img\
  width="50%"\
  style="float:left; margin: 0 1em 1em 0;"\
  src="/docs/tutorials/creating-entities/Flag_of_Wyoming.svg"/>\
<p>\
  Wyoming is a state in the mountain region of the Western \
  United States.\
</p>\
<p>\
  Wyoming is the 10th most extensive, but the least populous \
  and the second least densely populated of the 50 United \
  States. The western two thirds of the state is covered mostly \
  with the mountain ranges and rangelands in the foothills of \
  the eastern Rocky Mountains, while the eastern third of the \
  state is high elevation prairie known as the High Plains. \
  Cheyenne is the capital and the most populous city in Wyoming, \
  with a population estimate of 63,624 in 2017.\
</p>\
<p>\
  Source: \
  <a style="color: WHITE"\
    target="_blank"\
    href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>\
</p>`
  const entity = viewer.entities.add({
    // 多边形
    name: '多边形',
    description: description,
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArray([
        109.080842, 45.002073, 105.91517, 45.002073, 104.058488, 44.996596, 104.053011, 43.002989, 104.053011,
        41.003906, 105.728954, 40.998429, 107.919731, 41.003906, 109.04798, 40.998429, 111.047063, 40.998429,
        111.047063, 42.000709, 111.047063, 44.476286, 111.05254, 45.002073,
      ]),
      height: 890000,
      extrudedHeight: 450000,
      material: Cesium.Color.RED.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
    },
  })
  // const redBox = viewer.entities.add({
  //   name: 'Red box with black outline',
  //   position: Cesium.Cartesian3.fromDegrees(-115.0, 40.0, 300000.0),
  //   box: {
  //     dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
  //     material: Cesium.Color.RED.withAlpha(0.5),
  //     outline: true,
  //     outlineColor: Cesium.Color.BLACK,
  //   },
  // })
  const entities = viewer.entities.add({
    id: 'entityId',
    name: 'HelloWorld',
    position: Cesium.Cartesian3.fromDegrees(125.0, 35),
    ellipse: {
      semiMinorAxis: 250000,
      semiMajorAxis: 400000,
      // 材料，可使用颜色、图片填充
      // material:
      // 'https://images.prismic.io/cesium/tutorials-creating-entities-materialImage.jpg?auto=compress%2Cformat&w=768', // Cesium.Color.RED.withAlpha(0.5),
      // 黑白棋盘
      // material: new Cesium.CheckerboardMaterialProperty({
      //   evenColor: Cesium.Color.WHITE,
      //   oddColor: Cesium.Color.BLACK,
      //   repeat: new Cesium.Cartesian2(4, 4),
      // }),
      // stripe 条纹
      // material: new Cesium.StripeMaterialProperty({
      //   evenColor: Cesium.Color.WHITE,
      //   oddColor: Cesium.Color.BLACK,
      //   repeat: 32,
      // }),
      // 网络
      material: new Cesium.GridMaterialProperty({
        color: Cesium.Color.YELLOW,
        cellAlpha: 0.2,
        lineCount: new Cesium.Cartesian2(8, 8),
        lineThickness: new Cesium.Cartesian2(2.0, 2.0),
      }),
    },
  })
  // NOTE 根据id 获取实体
  console.log(entities)
  const shiti = viewer.entities.getById('entityId')
  console.log(shiti)
  // NOTE
  // viewer.entities.getOrCreateEntity('entityId') 创建或者创建一个实体
  /**
   * 手动创建一个实体，添加到实体集合中
   */
  // var entity = new Entity({
  //   id: 'uniqueId',
  // })
  // viewer.entities.add(entity)

  // viewer.trackedEntity = entities

  const polyline = viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([110, 38, 120.1, 38]),
      width: 5,
      material: Cesium.Color.RED,
    },
  })
  viewer.entities.resumeEvents()
  // NOTE
  // 放缩到实体 可调整视角
  const heading = Cesium.Math.toRadians(90) // 0 度 平行于经线，顺时针旋转镜头，为正
  const pitch = Cesium.Math.toRadians(-10) // 30 度俯视
  // zoomTo flyTo 是异步执行的，需要知道是否视角是否调整到指定的地方，需要在 then 回调里
  viewer.zoomTo(viewer.entities, new Cesium.HeadingPitchRange(heading, pitch)).then(arrived => {
    if (arrived) {
      console.log('相机到达指定地方了！')
      // 可选中某个实体了
      viewer.selectedEntity = entity
    }
  })
})
</script>
