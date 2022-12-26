/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 20:46:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 21:02:13
 * @Description :
 */
import { useEffect, useState } from 'react'

function useTitle(initTitle = '') {
  const [title, setTitle] = useState<string>(initTitle ?? document.title)
  useEffect(() => {
    setTitle(title)
    document.title = title
  }, [])

  return { title, setTitle }
}

export default useTitle
