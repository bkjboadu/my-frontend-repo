<script>
import FullRatingStar from '@/assets/icons/FullRatingStar.vue'
import FastAndFreeDelivery from '@/assets/icons/FastAndFreeDelivery.vue'
import WarrantyIcon from '@/assets/icons/WarrantyIcon.vue'
import useProductStore from '@/stores/productsStore.js'

export default {
  name: 'SingleProduct',
  components: { WarrantyIcon, FastAndFreeDelivery, FullRatingStar },
  computed: {
    productStore() {
      return useProductStore()
    }
  },
  mounted() {
    this.productStore.getSingleProduct()
  }
}
</script>

<template>
<section>
  <div class="grid grid-cols-2 gap-3">
    <div class="w-full h-80 border px-5 flex items-center gap-4">
      <div class="flex flex-col gap-2 w-max bg-blue-400">
        <div v-for="item in 4" :key="item" class="w-16 h-16 border rounded-xl">
          <img src="" alt="iphone" class="w-full h-full object-contain">
        </div>
      </div>
      <div class="w-full bg-green-300 h-full"></div>
    </div>
    <div class="w-full h-max row-span-2 border border-gray-100">
      <h4 class="text-xl px-4 py-2 border-b">iPhone 15 Pro Max  -  256GB</h4>
      <div class="px-4 py-2 flex flex-col gap-4 border-b">
        <div class="flex gap-1 items-center text-sm text-gray-500">
          <FullRatingStar v-for="(rating, index) in 5" :key="index"/>
          (0 Reviews)
        </div>
        <div class="text-gray-700 font-bold text-lg flex gap-2">
          <span>GHS</span>
          <span>2,500</span>
        </div>
        <app-button class="bg-dark-primary hover:bg-opacity-50 transition-all ease-in duration-300">Add To Cart</app-button>
      </div>
      <div class="px-4 py-2 border-b flex gap-4">
        <div class="text-gray-700 text-xs md:text-base font-light flex gap-2 items-center">
          <FastAndFreeDelivery/>
          <span>Free next day delivery on orders over $500</span>
        </div>
        <div class="text-gray-700 text-xs md:text-base font-light flex gap-2 items-center">
          <WarrantyIcon />
          <span>Free next day delivery on orders over $500</span>
        </div>
      </div>
      <div class="px-4 py-2">
        <div>
          <h4 class="font-semibold text-gray-500">Capacity</h4>
          <div class="mt-2">
            <app-button class="border max-w-[132px] py-3 !rounded-lg !text-gray-500 hover:bg-[#D5CAFF] hover:border-[#5429FF] hover:!text-[#5429FF] transition-colors ease-in duration-300">500GB</app-button>
          </div>
        </div>
        <div>
          <h4 class="font-semibold text-gray-500">Color</h4>
          <div class="mt-2">
            <app-button class="border max-w-[132px] py-3 !rounded-lg !text-gray-500 hover:bg-[#D5CAFF] hover:border-[#5429FF] hover:!text-[#5429FF] transition-colors ease-in duration-300">
              Black Titanium
            </app-button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-60 bg-green-400">Description</div>
  </div>
</section>
</template>

<style scoped>

</style>