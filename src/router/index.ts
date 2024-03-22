import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
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
    path: '/matchCompare',
    name: 'matchCompare',
    component: () => import('../views/Match/Compare/index.vue')
  },
  {
    path: '/matchVersus',
    name: 'matchVersus',
    component: () => import('../views/Match/Versus/index.vue')
  },
  {
    path: '/playerDetail',
    name: 'playerDetail',
    component: () => import('../views/Player/Detail/index.vue')
  },
  {
    path: '/heroDetail',
    name: 'heroDetail',
    component: () => import('../views/Hero/Detail/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
