<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-13 09:04:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-03-10 12:06:48
 * @Description :  
-->
<script lang="ts" setup>
import { useMouse, useMouseFollower } from '../../hooks'

const { x, y } = useMouse()
const double = computed(() => {
  return x.value * 2
})
const Follower = useMouseFollower(() => ({ x: x.value, y: y.value }))
</script>

<template>
  <div>
    <!-- <Follower>
      <div class="follower-content">I follow your mouse</div>
    </Follower> -->
    <pre>x: {{ x }}, y: {{ y }}</pre>
    <p>{{ double }}</p>
  </div>
</template>

<style scoped lang="css">
.follower-content {
  padding: 10px 12px;
  border: 1px solid lightblue;
  font-size: 14px;
  color: black;
  background-color: antiquewhite;
  border-radius: 6px;
}
</style>
