<template>
  <div>
    <Follower>
      <div class="follower-content">I follow your mouse</div>
    </Follower>
    <pre>x: {{ x }}, y: {{ y }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { useMouse } from './hooks'
import { useMouseFollower } from './useMouseFollower'

const { x, y } = useMouse()
const Follower = useMouseFollower(() => ({ x: x.value, y: y.value }))
</script>

<style scoped lang="css">
.follower-content {
  background-color: antiquewhite;
  padding: 10px 12px;
  border: 1px solid lightblue;
  border-radius: 6px;
  font-size: 14px;
  color: black;
}
</style>
