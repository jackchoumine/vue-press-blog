import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

import '../components/index.scss'
// @ts-ignore
import ESUI from '../components'

const app = createApp(App)

app.use(ESUI)

app.mount('#app')
