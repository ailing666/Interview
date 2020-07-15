import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
// 引入路由
import router from '@/router/index.js';
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
