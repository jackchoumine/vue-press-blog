<script lang="ts" setup>
import { biCameraReelsFill, biSignStopFill } from '@quasar/extras/bootstrap-icons'
</script>

<template>
  <div class="mx-1">
    <div class="bg-info">
      <p class="text-center text-h3">quasar 布局</p>
    </div>
    <p class="text-center text-h3">icon 的使用</p>
    <p>支持多种icon</p>
    <p>bs 图标</p>
    <q-icon name="font_download" color="primary" left size="32px" />
    <q-icon name="bi-activity" :color="'primary'" left size="small" />
    <q-icon name="bi-camera-reels-fill" :color="'primary'" left size="lg" />
    <br />
    <p>svg图标</p>
    <q-icon :name="biCameraReelsFill" size="medium" style="color: var(--q-secondary)" />
    <q-icon :name="biSignStopFill" size="2rem" right style="color: var(--q-primary)" />
    <br />
    <div class="text-purple q-gutter-md">
      <q-icon
        v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']"
        :key="size"
        :size="size"
        name="font_download" />
    </div>
    <q-btn type="a">详情</q-btn>
    <q-btn type="a" color="primary">详情</q-btn>
    <q-btn type="a" color="primary">详情</q-btn>
    <q-btn type="reset" color="secondary" :rounded="true">详情</q-btn>
  </div>
</template>
