import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/personal/:id',
    name: 'Personal',
    component: Personal
  }
]

const router = new VueRouter({
  // 去除井号
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('hm_token')
  // console.log(to)
  if (to.path.startsWith('/personal')) {
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router
