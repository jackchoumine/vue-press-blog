/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-14 20:25:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-14 20:57:31
 * @Description :
 */
import { useState, useEffect } from 'react'

function http(key) {
  return new Promise(resolve => {
    setTimeout(() => {
      let list = [{ name: 'http', age: 100 * Math.random() }, { name: 'vue' }]
      key && (list = list.filter(item => item.name.includes(key)))
      resolve(list)
    }, 100)
  })
}

function useHttpGet(key = '') {
  const [list, setList] = useState([])
  useEffect(() => {
    http(key).then(res => {
      setList(res as any)
    })
  }, [key])

  return { list }
}

export default useHttpGet
