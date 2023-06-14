<template>
  <div><LineDemoOne /></div>
</template>
<script>
import { LineDemoOne } from '@m/canvas'
export default {
  name: 'index',
  components: { LineDemoOne },
  setup(props, { emit, attrs, slots }) {
    return {}
  },
}
</script>
<style scoped lang="scss"></style>
