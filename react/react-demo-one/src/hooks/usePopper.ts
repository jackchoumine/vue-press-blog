/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 21:06:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 21:36:36
 * @Description :
 */
import type { Placement } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import { useEffect, useRef } from 'react'

function usePopper(placement: Placement = 'right') {
  let refDom = useRef<HTMLElement>(null)
  let tooltipDom = useRef<HTMLElement>(null)
  useEffect(() => {
    const existDom = refDom.current && tooltipDom.current
    if (existDom) {
      createPopper(refDom.current, tooltipDom.current, {
        placement,
      })
    }
  }, [placement, refDom, tooltipDom])
  return {
    reference(el: HTMLElement) {
      refDom.current = el
    },
    tooltip(el: HTMLElement) {
      tooltipDom.current = el
    },
  }
}

export default usePopper
