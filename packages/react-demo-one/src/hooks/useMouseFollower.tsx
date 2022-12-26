/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 18:11:56
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 21:04:01
 * @Description :
 */
import type { CSSProperties, PropsWithChildren } from 'react'

type Props = {}
function useMouseFollower(position: Record<'x' | 'y', number>) {
  const style: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    transform: `translate3d(${position.x + 15}px, ${position.y + 15}px, 0)`,
  }
  const Follower = (props: PropsWithChildren<Props>) => {
    return <div style={style}>{props.children}</div>
  }
  return Follower
}

export default useMouseFollower
