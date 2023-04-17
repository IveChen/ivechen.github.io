import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/matchList',
    name: 'matchList',
    component: () => import('../views/Match/List/index.vue')
  },
  {
    path: '/matchDetail',
    name: 'matchDetail',
    component: () => import('../views/Match/Detail/index.vue')
  },
  {
    path: '/matchEdit',
    name: 'matchEdit',
    component: () => import('../views/Match/Edit/index.vue')
  },
  {
    path: '/playerDetail',
    name: 'playerDetail',
    component: () => import('../views/Player/Detail/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
