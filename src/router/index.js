import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  // 去除井号
  mode: 'history',
  routes
})

export default router
