# web gis 学习笔记

## 介绍

### GIS

GIS: 地理信息系统(geographic information system)

在硬软件的支持下，对地理空间数据进行采集、存储、管理、处理、分析、显示、输出等一系列操作的计算机系统。

### GIS 的应用

- 行业应用

应用于国土资源、城市规划、环境保护、农业、林业、水利、地质、测绘、物流等领域，为这些领域的决策提供空间信息支持。

- 大众应用

地图导航、地图搜索、地图标注、地图分享、地图游戏等。

### web gis

GIS 和 web 服务相结合，将 GIS 功能发布到 web 上，用户可以通过 web 浏览器访问 GIS 服务，实现空间数据的共享和交换。

得益于 web 技术的发展，web gis 也在不断发展，从最初的静态地图，到现在的动态地图，web gis 的应用也越来越广泛。

web gis 的项目架构和传统 web 项目的架构几乎没有区别，都是前端(表现层)、后端、数据库，只是前端的展示形式不同，即 web gis 的前端展示的是地图，后台需要提供地图服务。

### 常见的 web gis 技术或者平台

### 传统的 web 开发者需要了解的 GIS 知识

GIS 最核心的是空间数据，空间数据的表现形式是**地图**，地图的表现形式是**图层**，图层的表现形式是**要素**，要素的表现形式是**几何图形**。

#### 计算机图形学

canvas API

webGL

> 学会使用常用的地图库

- leaflet --- 轻量的二维地图库，支持移动端

- openLayers --- 功能强大的二维地图库，支持移动端

- cesium --- 三维地图库

- mapbox --- 二维、三维地图库

#### 几何图形 (geometry)

#### 坐标系

地球时一个两级扁赤道突的椭球体，为了方便计算，将地球投影到一个平面上，这个平面就是地图，投影的方式有很多种，每种投影方式都有自己的坐标系。

- 地理坐标系 (GCS)

- 投影坐标系 (PCS)

投影坐标系 = 地理坐标系 + 投影方法

`(x,y) = F(lng,lat)`

莫卡托投影： 光源在地球中心，投影到平面上，保证了角度的不变性，但是面积会发生变化。

web mercator = WGS84 + 莫卡托投影

![坐标系比较](xy.png)

投影变换

[pro4js](https://github.com/proj4js/proj4js)

transform 函数源码学习

<!-- TODO  -->

> 地图坐标系和屏幕坐标的转化如何转换？

#### 数据格式

- 矢量数据

> 几何图形的表示 geojson

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [102.0, 0.5]
  },
  "properties": {
    "prop0": "value0"
  }
}
```

[生成几何图形](https://geojson.io)

矢量数据放大缩小不会失真，但或出现据此，和屏幕分辨率有关。

常见的矢量格式

svg

实操：使用 [qgis](https://qgis.org/) 软件作图，了解矢量数据的特点。

[B 站 qgis 软件操作教程](https://www.bilibili.com/video/BV1vg4y1B7Wa/?vd_source=9bbf149e26315d2edf55b034712e09d6)

- 栅格数据

栅格数据放大会失真

png jpg bmp

#### FeatureClass & FeatureLayer

（矢量）图层（FeatureLayer）：将具有同类特征的要素(Feature)归为一类要素类(FeatureClass)，通过一定的配置(标注、渲染符号等)渲染到地图上。

![](./%E7%9F%A2%E9%87%8F%E5%9B%BE%E5%B1%82-1.png)

![](./%E7%9F%A2%E9%87%8F%E5%9B%BE%E5%B1%82-2.png)

> 矢量图层数据源格式：

- esri shapeFile (.shp) 标准格式

- geojson -- 常见于 webGIS 数据交换

- esri geoDatabase (.pgdb .fgdb ) -- esri 公司的专有格式

- qgis geoPackage (.gpkg) -- qgis 公司的专有格式

#### 数据切片

矢量切片

栅格切片

#### 渲染方式

前端渲染

后端渲染

静态切片

## 参考教程

[湖南师范大学 -- GIS 原理及应用 视频课程](https://www.bilibili.com/video/BV1bV4y1M7aV/?spm_id_from=pageDriver&vd_source=9bbf149e26315d2edf55b034712e09d6)
