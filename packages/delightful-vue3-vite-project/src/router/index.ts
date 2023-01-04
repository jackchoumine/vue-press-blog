import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/hook',
    name: 'hook',
    component: () => import('../views/HookPage.vue'),
  },
  {
    path: '/WC-test',
    name: 'wc',
    component: () => import('../views/WCPage.vue'),
  },
  {
    path: '/http-test',
    name: 'http-test',
    component: () => import('../views/HttpPage.vue'),
  },
  {
    path: '/ant',
    name: 'ant',
    component: () => import('../views/AntDesignPage.vue'),
  },
  {
    path: '/jsx',
    name: 'jsx',
    component: () => import('../views/JSXPage.vue'),
  },
  {
    path: '/recursion',
    name: '递归',
    component: () => import('../views/RecursionPage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutPage.vue'),
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('../views/PiniaPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(/* import.meta.env.BASE_URL */),
  routes,
})

export default router
