<script setup lang="ts" name="VideoPlayer">
import 'video.js/dist/video-js.min.css'

import { useVideoPlayer } from './useVideoPlayer'

const src = 'https://vjs.zencdn.net/v/oceans.mp4'
const { player } = useVideoPlayer(src)
</script>

<template>
  <div class="video-preview fill">
    <video :ref="player" class="video-js fill"></video>
  </div>
</template>

<style lang="scss"></style>
