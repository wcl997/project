import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'
import Hot from '../views/Hot.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',//路由默认匹配首页
    name: 'Recommend',
    component: Recommend,
    meta:{showNav:true}
  },
  {
    path: '/hot',//路由默认匹配首页
    name: 'Hot',
    component: Hot,
    meta:{showNav:true}
  },
  {
    path: '/hot/:num',//路由默认匹配首页
    name: 'Hot',
    component:()=> import('../views/Hot'),
    meta:{showNav:true}
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta:{showNav:true}
  },
  {
    path: '/musiclist/:musicid',
    name: 'MusicList',
    component: () => import('../views/MusicList'),
    meta:{showNav:false}
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
