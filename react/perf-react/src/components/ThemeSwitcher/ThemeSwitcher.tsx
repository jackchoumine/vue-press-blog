/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-29 10:20:35
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-29 11:12:06
 * @Description :
 */
import { useMemo, useState } from 'react'
import { useMount } from '../../hooks'
import './ThemeSwitcher.scss'

type Theme = 'light' | 'dark'

function ThemeSwitcher() {
  const [darkTheme, setDarkTheme] = useState(false)

  useMount(initTheme)

  function initTheme() {
    const currentTheme = localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : null

    if (currentTheme) {
      setRootTheme(currentTheme as Theme)
      if (currentTheme === 'dark') {
        setDarkTheme(true)
      }
    }
  }

  function switchTheme(e: any) {
    if (e.target.checked) {
      setRootTheme('dark')
      localStorage.setItem('theme', 'dark')
      setDarkTheme(true)
    } else {
      setRootTheme('light')
      localStorage.setItem('theme', 'light')
      setDarkTheme(false)
    }
  }
  // 类似计算属性
  const themeText = useMemo(() => (darkTheme ? 'dark' : 'light'), [darkTheme])

  return (
    <div className='theme-switch-wrapper'>
      <label className='theme-switch' htmlFor='checkbox'>
        <input type='checkbox' id='checkbox' onChange={switchTheme} checked={darkTheme} />
        <div className='slider round'></div>
      </label>
      <em>{themeText}</em>
    </div>
  )
}

function setRootTheme(currentTheme: Theme) {
  document.documentElement.setAttribute('data-theme', currentTheme)
}

export default ThemeSwitcher
