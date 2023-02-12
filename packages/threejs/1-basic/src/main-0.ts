/*
 * @Description :
 * @Date        : 2023-02-13 00:45:57 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-02-13 00:45:58 +0800
 * @LastEditors : JackChou
 */
import * as Three from 'three'

const { innerHeight, innerWidth } = window
// 新建场景
const scene = new Three.Scene()

// 创建相机
const camera = new Three.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)

camera.position.set(0, 0, 10)

scene.add(camera)

// 添加物体
// 创建几何体
const cuebGeometry = new Three.BoxGeometry()

// 设置材质
const cubeMaterial = new Three.MeshBasicMaterial({ color: 0xffff00 })

const cube = new Three.Mesh(cuebGeometry, cubeMaterial)

// 将几何体添加到场景中
scene.add(cube)

// 初始化渲染器
const renderer = new Three.WebGL1Renderer()

// 设置渲染的尺寸大小
renderer.setSize(innerWidth, innerHeight)

// 将渲染内容添加到body
document.body.appendChild(renderer.domElement)

// 渲染相机 场景
renderer.render(scene, camera)
