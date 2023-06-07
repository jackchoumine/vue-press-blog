/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-05 22:24:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-05 23:30:46
 * @Description :
 */
import { useContext, memo } from 'react'
import { useSingleton } from '../hooks'
function SonDemoFn({ callback }) {
  const theme = useContext('ThemeContext')
  useSingleton(() => {
    console.log('useSingleton before render')
  })
  return (
    <>
      <p style={{ backgroundColor: '#' + Math.random().toString(16).slice(2, 8) }}>
        callback
      </p>
      {/* <button style={{ backgroundColor: theme.background, color: theme.foreground }}>
        I am styled by theme context!
      </button> */}
    </>
  )
}

export const SonDemo = memo(SonDemoFn)
