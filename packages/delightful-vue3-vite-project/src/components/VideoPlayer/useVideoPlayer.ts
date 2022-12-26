/*
 * @Date        : 2022-11-12 15:00:57
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-11-12 15:42:19
 * @Description :
 */
import { MaybeRef } from '@vueuse/shared'
import video from 'video.js'

type Options = {
  autoplay: boolean
  controls: boolean
  muted: boolean
}
export function useVideoPlayer(
  src: MaybeRef<string>,
  options?: MaybeRef<Partial<Options>>
) {
  const videoDOM = ref<HTMLVideoElement>(null)
  let player: ReturnType<typeof video> = null
  // watchEffect(
  //   () => {
  //     player = initPlayer(videoDOM.value, unref(src), unref(options))
  //   },
  //   { flush: 'post' }
  // )
  onMounted(() => {
    player = initPlayer(videoDOM.value, unref(src), unref(options))
  })
  onBeforeUnmount(() => {
    player && player.dispose()
  })

  function initPlayer(el: HTMLVideoElement, src: string, options: Partial<Options>) {
    const _options = { ...options, source: { src, type: 'video/mp4' } }
    const loadedCallback = () => {
      console.log('video loaded')
    }
    player = video(el, _options, loadedCallback)
  }
  return {
    player(el: HTMLVideoElement) {
      videoDOM.value = el
    },
  }
}
