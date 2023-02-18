import Vue from 'vue'
import App from './App.vue'

import '../components/Button/button.scss'
import '../components/Toggle/toggle.scss'
// import '../components/Tabs/tabs.scss'
import { JButton, JToggle } from '../components'

Vue.use(JButton).use(JToggle) //.use(JTabs)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
