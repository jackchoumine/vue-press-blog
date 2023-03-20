<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-03-10 16:51:52
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-03-20 15:16:08
 * @Description :  
-->
<script lang="ts" setup>
type Props = {
  angleStart?: number
  angleEnd?: number
  angleStep?: number
  strokeWidth?: number
  radius?: number
  color?: string
  lineType?: 'line' | 'arc'
}
const props = withDefaults(defineProps<Props>(), {
  angleStart: 0,
  angleEnd: 360,
  angleStep: 30,
  strokeWidth: 20,
  radius: 200,
  color: 'red',
  lineType: 'arc',
})

let timer = null
const path = ref()
function clearCircle() {
  timer && window.clearInterval(timer)
  const circle = path.value
  circle.setAttribute('d', 'M200,200')
}
function drawCircle() {
  let i = 0
  const circle = path.value
  const lineType = props.lineType

  const color = props.color
  const strokeWidth = props.strokeWidth
  const angleStart = props.angleStart
  let angle = angleStart
  const angleArc = props.angleEnd - props.angleStart
  const angleStep = props.angleStep
  const radius = props.radius
  const radiusWithStroke = radius - strokeWidth / 2

  circle.setAttribute('stroke', color)
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
  // convert to requestAnimationFrame soon:
  timer = window.setInterval(drawCircleArc, 60)
}

onMounted(drawCircle)
onBeforeUnmount(clearCircle)
</script>

<template>
  <div class="gridpaper inlineWrap">
    <svg viewBox="0 0 400 400" width="300">
      <!-- onclick="alert('clicked')" -->
      <a href="#">
        <!--  stroke="red" -->
        <path ref="path" d="M200,200" fill="none" />
      </a>
    </svg>
  </div>
</template>

<style scoped>
.gridpaper {
  display: inline-block;
  padding: 10px;
  border: 1px solid #ccc;

  /* background-color: linen; */
  background-image: linear-gradient(0deg, transparent 0, transparent 99px, #333 100px),
    linear-gradient(90deg, transparent 0, transparent 99px, #333 100px),
    linear-gradient(0deg, transparent 0, transparent 49px, #888 50px, transparent 50px),
    linear-gradient(90deg, transparent 0, transparent 49px, #888 50px, transparent 50px),
    linear-gradient(
      0deg,
      transparent 0,
      transparent 9px,
      #ccc 10px,
      transparent 10px,
      transparent 19px,
      #ccc 20px,
      transparent 20px,
      transparent 29px,
      #ccc 30px,
      transparent 30px,
      transparent 39px,
      #ccc 40px,
      transparent 40px,
      transparent 59px,
      #ccc 60px,
      transparent 60px,
      transparent 69px,
      #ccc 70px,
      transparent 70px,
      transparent 79px,
      #ccc 80px,
      transparent 80px,
      transparent 89px,
      #ccc 90px,
      transparent 90px
    ),
    linear-gradient(
      90deg,
      transparent 0,
      transparent 9px,
      #ccc 10px,
      transparent 10px,
      transparent 19px,
      #ccc 20px,
      transparent 20px,
      transparent 29px,
      #ccc 30px,
      transparent 30px,
      transparent 39px,
      #ccc 40px,
      transparent 40px,
      transparent 59px,
      #ccc 60px,
      transparent 60px,
      transparent 69px,
      #ccc 70px,
      transparent 70px,
      transparent 79px,
      #ccc 80px,
      transparent 80px,
      transparent 89px,
      #ccc 90px,
      transparent 90px
    );
  background-repeat: repeat;
  background-position: 10px 10px;
  background-size: 100px 100px;
}

.gridpaper > *:first-child {
  background: rgb(255 255 255 / 0.5);
  box-shadow: 0 0 5px;
}

svg {
  max-width: calc(100% - 40px); /* responsive stuff */
}

.inlineWrap {
  font-size: 0;
}
</style>
