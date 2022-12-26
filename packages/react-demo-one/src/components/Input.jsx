/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 10:42:05
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-26 10:58:34
 * @Description :
 */
import { useInput } from '../hooks'

export default function Input(props) {
  const [value, onChange] = useInput()
  return <input {...props} value={value} onChange={onChange} />
}
