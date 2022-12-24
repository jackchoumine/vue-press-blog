import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { MyButton } from '@jack/components'

const app = createApp(App)
// @ts-ignore // TODO: 如何设置类型？
app.use(MyButton)

app.mount('#app')
