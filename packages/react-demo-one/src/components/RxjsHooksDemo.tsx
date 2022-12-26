// @ts-nocheck
/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-21 10:53:54
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-21 11:01:22
 * @Description : 测试 rxjs-hooks
 */
import React from 'react'
import { useEventCallback } from 'rxjs-hooks'
import { fromEvent } from 'rxjs'
import { map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators'
import './RxjsHooksDemo.css'

function RxjsHook() {
  const [onMouseDown, [x, y]] = useEventCallback(
    (event$, state$) =>
      event$.pipe(
        withLatestFrom(state$),
        map(([e, prevPos]) => [e.clientX, e.clientY, prevPos]),
        switchMap(([startX, startY, prevPos]) => {
          return fromEvent(window, 'mousemove').pipe(
            map(moveEvent => {
              return [
                moveEvent.clientX - startX + prevPos[0],
                moveEvent.clientY - startY + prevPos[1],
              ]
            }),
            takeUntil(fromEvent(window, 'mouseup'))
          )
        })
      ),
    [0, 0]
  )

  const style = { left: x, top: y }

  return (
    <div className='App'>
      <div className='box' onMouseDown={onMouseDown} style={style}>
        drag me
      </div>
    </div>
  )
}

export default RxjsHook
