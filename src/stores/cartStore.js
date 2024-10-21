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
      return api.get('/carts/cart/user/')
        .then(response => {
          this.$patch({
            cart: response.data
          })
        })
    },
    async addToCart(productId, quantity = 1) {
      return api.post(`/carts/cart/add/${productId}/`, {
        quantity
      })
    },
    async removeFromCart(id) {
      return api.delete(`/carts/cart/remove/${id}/`)
    },
    addToWishlist(product) {
      this.wishlist.push(product)
      this.wishlistTotal += product.price
    },
    removeFromWishlist(id) {
      const index = this.wishlist.findIndex(product => product.id === id)
      this.wishlistTotal -= this.wishlist[index].price
      this.wishlist.splice(index, 1)
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