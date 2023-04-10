<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-03-10 16:51:52
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-03-20 18:00:58
 * @Description : 颜色渐变色环
 * 参考实现: https://codepen.io/pixelthing/pen/RGKJaV
 * https://stackoverflow.com/questions/14633363/can-i-apply-a-gradient-along-an-svg-path
-->
<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  angleStart: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      if (!(value >= 0 && value <= 360)) {
        console.warn('开始角度在 0 -- 360 之间，默认 0')
        return false
      }
      return true
    },
  },
  angleEnd: {
    type: Number,
    default: 360,
    // validator: (value: number) => {
    //   if (!(value >= 0 && value <= 360)) {
    //     console.warn('结束角度在 0 -- 360 之间，默认 360')
    //     return false
    //   }
    //   return true
    // },
  },
  angleStep: {
    type: Number,
    default: 6,
    validator: (value: number) => {
      if (!(value >= 0 && value <= 360)) {
        console.warn('角度变化在 0 -- 360 之间，默认 6')
        return false
      }
      return true
    },
  },
  /**
   * 改变一个变化幅度的时间，默认 1/60 毫秒
   */
  timePreStep: {
    type: Number,
    default: 1 / 60,
    validator: (value: number) => {
      if (!(value > 0)) {
        console.warn('改变一个变化幅度的时间，不能为负数，默认 1/60 毫秒')
        return false
      }
      return true
    },
  },
  strokeWidth: {
    type: Number,
    default: 6,
  },
  radius: {
    type: Number,
    default: 45,
  },
  // color 的优先级比 gradColors 高
  color: {
    type: String,
    default: undefined,
  },
  gradColors: {
    type: Array as PropType<string[]>,
    default: () => ['#dd1713', '#f95f41'],
    validator: (value: string[]) => {
      if (value.length > 2) {
        console.warn('目前组件只支持两种颜色渐变，多于两个，取前两个')
        return true
      }
      return true
    },
  },
  lineType: {
    type: String as PropType<'arc' | 'line'>,
    default: 'arc',
    validator: (value: string) => {
      if (!['arc', 'line'].includes(value)) {
        console.warn('line-type 只支持 arc 和 line')
        return false
      }
      return true
    },
  },
})

let timer = null

const path = ref()

onMounted(drawCircle)
onBeforeUnmount(clearCircle)

function drawCircle() {
  let i = 0
  const circle = path.value
  const lineType = props.lineType

  const strokeWidth = props.strokeWidth
  const angleStart = props.angleStart
  let angle = angleStart
  let angleArc = props.angleEnd - props.angleStart
  // 加 1 度，解决圆环有空隙的问题
  angleArc = angleArc === 360 ? 361 : angleArc
  const angleStep = props.angleStep
  const radius = props.radius
  const radiusWithStroke = radius - strokeWidth / 2
  // CHECKME 未来知识传递插槽实现渐变
  // const id = 'id_' + Math.random().toString(16).slice(2)
  // const linearGradient = svg.value.querySelector('defs linearGradient')
  // if (linearGradient) {
  //   linearGradient.setAttribute('id', id)
  //   circle.setAttribute('stroke', `url(#${id})`)
  // } else {
  //   const color = props.color
  //   circle.setAttribute('stroke', color)
  // }
  const color = props.color
  color && circle.setAttribute('stroke', color)
  circle.setAttribute('stroke-width', '' + strokeWidth)
  const drawCircleArc = function () {
    const e = circle.getAttribute('d')
    let d = ''
    // on first beat, we just move to the correct position
    if (i === 0) {
      const radians = (angleStart / 180) * Math.PI
      const x = radius + Math.cos(radians) * radiusWithStroke
      const y = radius + Math.sin(radians) * radiusWithStroke
      d = e + '\n M ' + x + ' ' + y
      // if we've finished the entire arc, exit
    } else if (angle >= angleStart + angleArc && i !== 0) {
      window.clearInterval(timer)
      return
      // draw a frame of the arc
    } else {
      // if the final position is not a multiple of the angleStep
      if (angle + angleStep > angleStart + angleArc) {
        angle = angleStart + angleArc
        // add angleStep
      } else {
        angle += angleStep
      }
      // calc final stroke position
      const radians = (angle / 180) * Math.PI
      const x = radius + Math.cos(radians) * radiusWithStroke
      const y = radius + Math.sin(radians) * radiusWithStroke
      // decide between straight line and arc
      if (lineType !== 'arc') {
        // 直线
        d = e + '\n L ' + x + ' ' + y
      } else {
        // 画圆弧
        d = e + '\n A ' + radius + ' ' + radius + ' 0 0 1 ' + x + ' ' + y // arc
      }
    }
    // console.log(d)
    // draw it
    circle.setAttribute('d', d)
    i++
  }
  // CHECKME convert to requestAnimationFrame soon:
  timer = window.setInterval(drawCircleArc, props.timePreStep)
}

function clearCircle() {
  timer && window.clearInterval(timer)
  const circle = path.value
  circle.setAttribute('d', 'M200,200')
}
const id = ref('id_' + Math.random().toString(16).slice(2))
</script>

<template>
  <svg :viewBox="`0 0 ${radius * 2}  ${radius * 2}`" :width="radius * 2" ref="svg">
    <defs>
      <linearGradient :id="id">
        <!-- CHECKME  未来更多渐变 -->
        <stop offset="0%" :stop-color="gradColors[0]" />
        <stop offset="100%" :stop-color="gradColors[1]" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path ref="path" d="M200,200" fill="none" :stroke="`url(#${id})`" />
  </svg>
</template>

<style scoped></style>
