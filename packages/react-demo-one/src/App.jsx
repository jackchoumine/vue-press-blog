/*
 * @Date        : 2022-09-01 15:09:07
 * @Author      : ZhouQijun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2022-12-26 11:30:47
 * @Description :
 */
import './App.css'
import {
  PrimeApp,
  KnowUseRef,
  TimeInterval,
  RememberLastState,
  SimpleCounter,
  WindowResize,
  UseHttpGetDemo,
  PopperDemo,
  UseAddDemo,
  // RxjsHooksDemo,
} from './components'
function App() {
  return (
    <div className='App'>
      <UseAddDemo />
      <PopperDemo />
      <UseHttpGetDemo />
      <h4>useWindowResize</h4>
      <WindowResize />
      <hr />
      <h4>useCounter</h4>
      <SimpleCounter />
      <hr />
      <KnowUseRef />
      <TimeInterval />
      <RememberLastState />
      <hr />
      <PrimeApp />
    </div>
  )
}

export default App
