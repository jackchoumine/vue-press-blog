/*
 * @Author      : ZhouQiJun
 * @Date        : 2022-12-26 17:02:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-28 10:49:18
 * @Description :
 */
import { Button } from 'antd'
// import 'antd/dist/antd.css'
import './App.css'
import {
  MockMemo,
  ScrollDemo,
  UseCreationDemo,
  UseMountDemo,
  UseUpdateDemo,
  UseReactiveDemo,
  UseOnDemo,
  UseHoverDemo,
} from './components'

function App() {
  function onClick() {
    import('antd/es/modal').then(({ default: Modal }) => {
      Modal.info({
        title: 'Hello Modal',
        onOk() {},
      })
    })
  }
  return (
    <div className='App'>
      <UseHoverDemo />
      <UseOnDemo />
      <UseReactiveDemo />
      <UseUpdateDemo />
      <UseMountDemo />
      <UseCreationDemo />
      <ScrollDemo />
      <MockMemo />
      <Button style={{ margin: '20px' }} onClick={onClick}>
        hello antd
      </Button>
    </div>
  )
}

export default App
