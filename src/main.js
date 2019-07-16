import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/glocal.css'
import './plugins/element'
import { PUBLICURL } from './constants'
Vue.prototype.$publicUrl = PUBLICURL
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
