import type { DirectiveBinding } from 'vue'
import type { WaterMakerParams } from '@/utils'
import { addWaterMarker } from '@/utils'
function waterMarker(
  el: HTMLElement,
  binding: DirectiveBinding<Omit<WaterMakerParams, 'node'>>,
) {
  const value = binding.value
  addWaterMarker({ ...value, node: el })
}
export default waterMarker
