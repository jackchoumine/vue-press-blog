<script lang="ts" setup>
import { biCameraReelsFill, biSignStopFill } from '@quasar/extras/bootstrap-icons'
</script>

<template>
  <div>
    <div class="bg-info">
      <p class="text-center text-h3">quasar 布局</p>
    </div>
    <p class="text-center text-h3">icon 的使用</p>
    <p>支持多种icon</p>
    <p>bs 图标</p>
    <q-icon name="font_download" color="primary" size="32px" />
    <q-icon name="bi-activity" :color="'primary'" size="small" />
    <q-icon name="bi-camera-reels-fill" :color="'primary'" size="lg" />
    <br />
    <p>使用 svg</p>
    <q-icon :name="biCameraReelsFill" size="medium" style="color: var(--q-secondary)" />
    <q-icon :name="biSignStopFill" size="2rem" style="color: var(--q-primary)" />
  </div>
</template>
