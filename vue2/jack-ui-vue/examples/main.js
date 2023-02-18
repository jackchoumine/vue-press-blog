import Vue from 'vue'
import App from './App.vue'

import '../components/button/button.scss'
import { JButton } from '../components'

Vue.use(JButton)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
