<script>
import FullRatingStar from '@/assets/icons/FullRatingStar.vue'
import FastAndFreeDelivery from '@/assets/icons/FastAndFreeDelivery.vue'
import WhislistIcon from '@/assets/WhislistIcon.vue'
import useCartStore from '@/stores/cartStore.js'
import useProductStore from '@/stores/productsStore.js'

export default {
  name: 'ProductCard',
  components: { WhislistIcon, FastAndFreeDelivery, FullRatingStar },
  emits: ['add-to-cart', 'item-click'],
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isLoading: false,
      isWhislisted: this.item?.is_in_wishlist	 || false,
      addingToWishlist: false
    }
  },
  computed: {
    cartStore() {
      return useCartStore()
    },
    productStore() {
      return useProductStore()
    },
    mainImage() {
      return this.item?.product_images?.find(image => image.is_main)?.image || this.item?.product_images?.[0]?.image || ''
    }
  },
  methods: {
    goToProduct() {
      this.productStore.setSingleProductId(this.item.id)
      this.$router.push({name: 'productDetails', params: {productName: this.item.name}})
    },
    addToCart() {
      this.isLoading = true
      this.cartStore.addToCart(this.item?.id)
        .then((response) => {
          this.isLoading = false
          this.$toast.add({ severity: 'success', summary: 'Item added to cart', detail: response?.details, life: 3000 })
        })
        .catch((error) => {
          this.isLoading = false
          this.$toast.add({
            severity: 'error',
            summary: 'Error adding item to cart',
            detail: error?.response?.data?.detail || 'An error occurred',
            life: 3000
          })
        })
    },
    addRemoveWishlist(event) {
      event.stopPropagation()
      this.addingToWishlist = true
      let apiResponse = this.isWhislisted ? this.cartStore.removeFromWishlist(this.item?.id) : this.cartStore.addToWishlist(this.item?.id)
      apiResponse
        .then((response) => {
          this.addingToWishlist = false
          this.isWhislisted = !this.isWhislisted
          this.$toast.add({ severity: 'success', summary: 'Item added to wishlist', detail: response?.details, life: 3000 })
        })
        .catch((error) => {
          this.addingToWishlist = false
          this.$toast.add({
            severity: 'error',
            summary: 'Error adding item to wishlist',
            detail: error?.response?.data?.detail || 'An error occurred',
            life: 3000
          })
        })
    }
  }
}
</script>

<template>
<div class="w-[149px] md:w-[250px] bg-white pb-2">
<div
  class="relative w-full h-[122px] md:h-[207px] bg-[#E8EDF5] flex items-center justify-center overflow-hidden cursor-pointer"
  @click="goToProduct()"
>
  <img :src="mainImage" :alt="item.sku" class="w-full h-full object-contain">
  <div v-if="addingToWishlist" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center">
    <AppProgressSpinner style="width: 20px; height: 20px" />
  </div>
  <WhislistIcon
    v-else
    @click="addRemoveWishlist"
    class="absolute top-3 right-3 hover:fill-dark-primary transition-all ease-in-out duration-700"
    :fill="isWhislisted ? '#262F3D' : 'none'"
  />
</div>
  <div class="flex flex-col gap-1 md:gap-2 p-2 md:pl-3  bg-[#FCFCFC]">
    <h5 class="text-sm md:text-lg text-gray-700 font-light">{{item.name}}</h5>
    <div class="flex gap-1 items-center text-[#0456A3] text-xs md:text-sm font-light">
      <FullRatingStar v-for="(rating, index) in item?.ratings" :key="index"/>
      (0)
    </div>
    <div class="text-gray-700 font-bold text-sm md:text-xl flex gap-2">
      <span>GHS</span>
      <span>{{item.price}}</span>
    </div>
    <div class="text-gray-700 text-xs md:text-base font-light flex gap-2 items-center">
      <FastAndFreeDelivery/>
      <span>Fast and Free Delivery</span>
    </div>
    <app-button
      class="text-xs md:text-sm !text-dark-primary bg-[#EFEFEF] md:w-[95px] hover:!text-white hover:bg-dark-primary"
      @click="addToCart"
    >
      <AppProgressSpinner style="width: 20px; height: 20px" v-if="isLoading" />
      <span v-else>Add To Cart</span>
    </app-button>
  </div>
</div>
</template>

<style scoped>

</style>