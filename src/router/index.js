import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import Personal from '@/views/Personal.vue'
import UserUpdate from '@/views/UserUpdate.vue'
import Register from '@/views/Register.vue'
import MyFocus from '@/views/MyFocus.vue'
import Search from '@/views/Search.vue'
import Category from '@/views/Category.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import SearchList from '@/views/SearchList.vue'
import Error from '@/components/hm_Error.vue'
import MyCollect from '@/views/MyCollect.vue'
import MyKeeps from '@/views/MyKeeps.vue'
import test from '@/views/test.vue'

/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '*',
    name: 'Error',
    component: Error
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/category',
        name: 'Category',
        component: Category
      }
    ]
  },
  {
    path: '/personal/:id',
    name: 'Personal',
    component: Personal
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/searchList',
    name: 'SearchList',
    component: SearchList
  },
  {
    path: '/userUpdate/:id',
    name: 'UserUpdate',
    component: UserUpdate
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/articleDetail/:id',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/myFocus',
    name: 'MyFocus',
    component: MyFocus
  },
  {
    path: '/myCollect',
    name: 'MyCollect',
    component: MyCollect
  },
  {
    path: '/myKeeps',
    name: 'MyKeeps',
    component: MyKeeps
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
