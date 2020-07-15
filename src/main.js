import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入路由
import router from '@/router/index.js';
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
