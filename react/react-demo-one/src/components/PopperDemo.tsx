/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 21:17:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-26 11:01:44
 * @Description :
 */
import type { Placement } from '@popperjs/core'
import { useState } from 'react'
import { usePopper } from '../hooks'
function PopperDemo() {
  const [placement, setPlacement] = useState<Placement>('auto')
  const { reference, tooltip } = usePopper(placement)
  const [showToolTip, setShowTooltip] = useState(false)
  return (
    <div style={{ margin: `100px` }}>
      <button
        ref={reference}
        onMouseOver={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
        style={{ backgroundColor: 'lightgreen', height: '40px', width: '200px' }}
      >
        use hook
      </button>
      <div
        ref={tooltip}
        style={{
          backgroundColor: 'lightyellow',
          height: '20px',
          width: '100px',
          display: showToolTip ? 'block' : 'none',
        }}
      >
        tool tip
      </div>
      <br />
      <button onClick={() => setPlacement('top')}>修改tooltip位置</button>
    </div>
  )
}

export default PopperDemo
