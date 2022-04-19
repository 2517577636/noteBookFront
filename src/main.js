import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

const instanceAxios = axios.create({
  baseURL: "http://localhost:3000"
})
Vue.prototype.$axiosInstance = instanceAxios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
