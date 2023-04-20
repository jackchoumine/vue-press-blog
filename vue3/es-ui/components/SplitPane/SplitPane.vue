<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-20 05:44:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-20 06:43:09
 * @Description : 分割面板
-->
<template>
  <div ref="outer" class="j-split-pane">
    <div
      class="pane pane-left"
      :style="{ width: leftOffsetPre, paddingRight: `${this.triggerWidth / 2}px` }">
      <slot name="left"></slot>
    </div>
    <div
      class="pane-trigger-con"
      :style="{ left: triggerLeft, width: `${triggerWidth}px` }"
      @mousedown="mouseDown"></div>
    <div
      class="pane pane-right"
      :style="{ left: leftOffsetPre, paddingLeft: `${this.triggerWidth / 2}px` }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JSplitPane',
  model: {
    prop: 'value', //绑定的值，通过父组件传递
    event: 'update', //自定义时间名
  },
  props: {
    value: {
      type: Number,
      default: 0.5,
    },
    triggerWidth: {
      type: Number,
      default: 8,
    },
    min: {
      type: Number,
      default: 0.1,
    },
    max: {
      type: Number,
      default: 0.9,
    },
  },
  data() {
    return {
      canMove: false,
      initOffSet: 0,
    }
  },
  computed: {
    leftOffsetPre() {
      return `${this.value * 100}%`
    },
    triggerLeft() {
      const left = `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`
      return left
    },
  },
  methods: {
    mouseDown(event) {
      // 将鼠标移动绑定在 document 上，外框外移动，也能改变大小
      document.addEventListener('mousemove', this.moveTrigger)
      document.addEventListener('mouseup', this.handleMouseup)
      // 条的初始偏移量 = 鼠标按下时到左侧的距离 - 条到左侧的距离
      this.initOffSet = event.pageX - event.srcElement.getBoundingClientRect().left
      this.canMove = true // 鼠标按下，可移动
    },
    moveTrigger(event) {
      if (!this.canMove) return
      const outer = this.$refs.outer.getBoundingClientRect()
      const offSet = event.pageX - outer.left - this.initOffSet + this.triggerWidth / 2
      // 鼠标距离左边的距离 - 容器距离左侧的距离 = 滑动条距离容器左边的距离
      let offSetPre = offSet / outer.width
      if (offSetPre < this.min) offSetPre = this.min
      if (offSetPre > this.max) offSetPre = this.max
      // this.leftOffset = offSetPre;// 左侧框距离容器左侧的距离
      this.$emit('update', +offSetPre.toFixed(4))
    },
    handleMouseup() {
      // 鼠标抬起，不可移动
      this.canMove = false
    },
  },
}
</script>
<!-- 
<style lang="scss">
@import './SplitPan.scss';
</style> -->
