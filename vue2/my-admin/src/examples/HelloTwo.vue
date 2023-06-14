<!--
 * @Description : 
 * @Date        : 2022-09-19 18:00:21 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-09-25 03:37:35 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <p>lazy load img</p>
    <ul>
      <li v-for="(i, index) in 10" :key="index">
        <!-- src="https://fakeimg.pl/400x300" -->
        <img src="https://fakeimg.pl/400x300" data-src="https://fakeimg.pl/400x300?text=hello" />
      </li>
    </ul>
  </div>
</template>
<script>
import { isElementVisible, debounce } from '@/utils'
export default {
  name: 'HelloTwo',
  mounted() {
    this.observeImg()
  },
  methods: {
    loadRealImg(item) {
      const img = item.target
      const realSrc = img.dataset.src
      // 隐藏或者已经加载了图片, 不加载图片
      if (item.intersectionRatio <= 0 && !realSrc) return
      console.log(item.intersectionRatio)
      if (realSrc) {
        img.src = realSrc
        delete img.dataset.src // 删除 dataset src
      }
    },
    observeImg() {
      const io = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            this.loadRealImg(entry)
          })
        },
        {
          threshold: [0.8],
        }
      )
      const imgList = document.querySelectorAll('img[data-src]')
      imgList.forEach(item => {
        io.observe(item)
      })
      this.$once('hook:beforeDestroy', () => {
        // 关闭观察器
        io.disconnect()
      })
    },
  },
}
</script>

<style scoped>
ul > li {
  margin: 10px;
}
</style>
