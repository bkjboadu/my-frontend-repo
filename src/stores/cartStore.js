import { defineStore } from 'pinia'
import api from '@/utils/api.js'


const useCartStore = defineStore("cart", {
  state() {
    return {
      cart: null,
      cartTotal: 0,
      wishlist: [],
      wishlistTotal: 0,
    }
  },
  actions: {
    async getUserCartData() {
      return api.get('/carts/cart/')
        .then(response => {
          this.$patch({
            cart: response.data
          })
        })
    },
    async getUserWishlistData() {
      return api.get('/carts/wishlist/')
        .then(response => {
          this.$patch({
            wishlist: response.data
          })
        })
    },
    async addToCart(productId, quantity = 1) {
      return api.post(`/carts/cart/add/${productId}/`, {
        quantity
      })
    },
    async removeFromCart(id) {
      return api.delete(`/carts/cart/item/${id}/`)
    },
    async addToWishlist(id) {
      return api.post(`/carts/wishlist/add/${id}/`)
    },
    removeFromWishlist(id) {
      return api.delete(`/carts/wishlist/remove/${id}/`)
    },
    checkout() {
      return api.post('/carts/cart/checkout/')
    },
    applyPromoCode(code) {
      return api.post('/carts/cart/apply-code/', { code })
    }
  },
  getters: {
    cartCount() {
      return this.cart.length
    },
    wishlistCount() {
      return this.wishlist.length
    }
  }
})

export default useCartStore