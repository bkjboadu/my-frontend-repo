import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      redirect: "/home",
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Products.vue'),
      meta: {
        layout: 'dashboard'
      },
    },
    {
      path: '/:category',
      name: 'categories',
      component: () => import('@/views/Products.vue'),
      meta: {
        layout: 'dashboard'
      },
      // children: [
      //   {
      //     path: "/categories/:category/:product",
      //     name: "categories-product",
      //     component: () => import('@/views/SingleCategoryProducts.vue'),
      //   }
      // ]
    },
    {
      path: '/:category/products',
      name: 'CategoryProducts',
      component: () => import('@/views/SingleCategoryProducts.vue'),
      meta: {
        layout: 'dashboard'
      },
    },
    {
      path: "/products/:productName",
      name: "productDetails",
      component: () => import('@/views/SingleProduct.vue'),
      meta: {
        layout: 'dashboard'
      },
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import('@/views/CartView.vue'),
      meta: {
        layout: 'dashboard'
      },
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
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import('@/views/ForgotPassword.vue'),
      meta: {
        layout: 'blank'
      }
    },
    {
      path: "/reset-password/:token",
      name: "reset-password",
      component: () => import('@/views/ResetPassword.vue'),
      meta: {
        layout: 'blank'
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      redirect: "/home"
    },
    {
      path: "/accounts/google/login",
      name: "oauth",
      component: () => import('@/views/OAuth.vue'),
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
