import { Button } from 'antd'
// import 'antd/dist/antd.css'
import './App.css'

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
      <Button style={{ margin: '20px' }} onClick={onClick}>
        hello antd
      </Button>
    </div>
  )
}

export default App
