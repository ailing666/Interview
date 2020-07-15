// 1.导入vue-router
import VueRouter from 'vue-router'
import Vue from 'vue'

// 2.注册
Vue.use(VueRouter)

// 4.导入子组件
import Login from '@/views/login/Login.vue';
// 3.实例化
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Login
    }
  ]
})

// 5.导出
export default router
