import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import './assets/common.scss'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
createApp(App).use(Quasar, { plugins: {} }).mount('#app')
