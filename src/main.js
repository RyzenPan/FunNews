import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局重置样式
import '@/styles/reset.css'

import './plugins/vant.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
