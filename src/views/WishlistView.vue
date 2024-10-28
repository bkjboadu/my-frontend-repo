<script>
import useCartStore from '@/stores/cartStore.js'
import ProductCard from '@/components/ProductCard.vue'
import EmptyWishlist from '@/assets/icons/EmptyWishlist.vue'

export default {
  name: 'WishlistView',
  components: { EmptyWishlist, ProductCard },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    cartStore() {
      return useCartStore()
    },
    wishlist() {
      return this.cartStore.wishlist
    }
  },
  mounted() {
    this.isLoading = true
    this.cartStore.getUserWishlistData()
      .then((response) => {
        this.$toast.add({severity: 'success', summary: 'Wishlist fetched', detail: response?.details || 'Wishlist data fetched successfully', life: 3000})
      })
      .catch((error) => {
        this.$toast.add({severity: 'error', summary: 'Error fetching wishlist data', detail: error?.response?.data?.detail || 'An error occurred', life: 3000})
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
</script>

<template>
  <div class="mb-10">
    <AppLoader v-if="isLoading"/>
    <div v-else>
      <h1 class="text-dark-primary font-bold text-2xl">Wishlist</h1>
      <div v-if="wishlist.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5 gap-4 w-max">
        <ProductCard v-for="item in wishlist" :key="item.id" :item="item?.product"/>
      </div>
      <div v-else class="w-full h-96 flex flex-col items-center justify-center">
        <EmptyWishlist class="text-gray-500" height="200" width="200" />
        <p class="text-xl text-gray-500">Sorry, no wishlist to display</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>