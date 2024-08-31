import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        layout: 'dashboard'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'blank'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Signup.vue'),
      meta: {
        layout: 'blank'
      }
    }
  ]
})

export default router
