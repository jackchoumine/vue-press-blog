<!--
 * @Description : 绘制线条
 * @Date        : 2022-10-11 00:34:53 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-10-11 01:12:22 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <h2>canvas 绘制线条</h2>
    <canvas id="line-demo" width="400" height="400"></canvas>
  </div>
</template>
<script>
export default {
  name: 'LineDemoOne',
  mounted() {
    this.drawReact()
  },
  methods: {
    drawReact() {
      const canvas = document.getElementById('line-demo')
      const ctx = canvas.getContext('2d')

      ctx.beginPath()
      ctx.moveTo(25, 25)
      ctx.lineTo(105, 25)
      ctx.lineTo(25, 105)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(10, 10)
      ctx.lineTo(200, 200)
      ctx.lineTo(200, 10)
      // ctx.lineTo(0, 200)
      // 设置样式
      ctx.strokeStyle = 'red'
      ctx.width = 0.5
      ctx.closePath()
      ctx.stroke()
    },
  },
}
</script>
<style lang="scss" scoped>
canvas {
  /* NOTE 和属性不同 */
  /* 
  width: 400px;
  height: 400px; 
  */
  background: #ccc;
}
</style>
