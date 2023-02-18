import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
const app = createApp(App)

import '../components/index.scss'
// @ts-ignore
import ESUI from '../dist/es-ui'
app.use(ESUI)

// import '../components/Button/button.scss'
// // @ts-ignore
// import { JButton } from '../dist/es-ui'
// app.use(JButton)

// import '../components/Toggle/toggle.scss'
// // // @ts-ignore
// import { JToggle } from '../dist/es-ui'
// app.use(JToggle)

app.mount('#app')
