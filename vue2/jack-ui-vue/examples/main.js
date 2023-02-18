import Vue from 'vue'
import App from './App.vue'

// import '../components/Button/button.scss'
// import '../components/Toggle/toggle.scss'
// import '../components/Tabs/tabs.scss'
// import { JButton, JToggle } from '../components'
// Vue.use(JButton).use(JToggle) //.use(JTabs)
// import '../components/index.scss'
// import jackUI from '../components'

// 全局引入
// import '../dist/css/index.css'
// import jackUI from '../dist'
// Vue.use(jackUI)

// 按需引入
import '../dist/css/button.css'
import { JButton } from '../dist'
Vue.use(JButton)
import '../dist/css/toggle.css'
import { JToggle } from '../dist'
Vue.use(JToggle)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
