import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      redirect: "/login",
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        layout: 'dashboard'
      },
      beforeEnter: isLoggedIn
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

function isLoggedIn (to, from, next) {
  const accessToken = Cookies.get("authToken");
  if(!accessToken) {
    next({ name: 'login' });
  }
  next();
}

export default router
