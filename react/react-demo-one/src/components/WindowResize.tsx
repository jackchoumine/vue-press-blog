/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 18:14:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-26 11:16:29
 * @Description :
 */
import { useEffect } from 'react'
import {
  useWindowResize,
  useMouse,
  useMouseFollower,
  useNetworkStatus,
  useStorage,
  useTitle,
} from '../hooks'
import Input from './Input'

export default function WindowResize() {
  const { height, width } = useWindowResize()
  const position = useMouse()
  const Follower = useMouseFollower(position)
  const isOnline = useNetworkStatus(isOnline => {
    console.log('网络状态改变', isOnline)
  })
  const { title, setTitle } = useTitle('react hooks')

  const [jack, setJack] = useStorage('jack')
  // setJack({ name: 'JackChou', age: 24 }) //NOTE 不能这样调用
  useEffect(() => {
    setJack({ name: 'JackChou', age: 24 })
  }, [])
  return (
    <div>
      <p>
        窗口大小：width---{width},height---{height}
      </p>
      <p>
        鼠标位置：X--{position.x},Y--{position.y}
      </p>
      {/* <Follower>
        <div
          style={{
            backgroundColor: 'antiquewhite',
            padding: '10px 12px',
            border: '1px solid lightblue',
            borderRadius: '6px',
            fontSize: '14px',
            color: 'black',
          }}
        >
          mouse follower
        </div>
      </Follower> */}
      <p>是否有网络：{isOnline ? '是' : '否'}</p>
      <p>
        jack's name {jack?.name}, age {jack?.age}
      </p>
      <button onClick={() => setJack({ name: 'JACK', age: 10 })}>修改jack</button>
      <h3>{title}</h3>
      <button onClick={() => setTitle('hello')}>修改title</button>
      <hr />
      <Input placeholder='email' />
    </div>
  )
}
