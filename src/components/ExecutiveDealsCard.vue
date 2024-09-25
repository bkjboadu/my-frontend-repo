<script>
import FullRatingStar from '@/assets/icons/FullRatingStar.vue'
import FastAndFreeDelivery from '@/assets/icons/FastAndFreeDelivery.vue'
import tvImage from '@/assets/tv.png'
import bagImage from '@/assets/bag.png'
import showImage from "@/assets/shoe.jfif"
import WhislistIcon from '@/assets/WhislistIcon.vue'

export default {
  name: 'ExecutiveDealsCard',
  components: { WhislistIcon, FastAndFreeDelivery, FullRatingStar },
  props: {
    image: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    ratings: {
      type: Number,
      default: 5
    },
    price: {
      type: Number,
      default: 0
    },
    delivery: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tvImage,
      bagImage,
      showImage
    }
  },
}
</script>

<template>
<div class="w-[169px] md:w-[270px]">
<div class="relative w-full h-[142px] md:h-[227px] bg-[#E8EDF5] flex items-center justify-center overflow-hidden">
  <img :src="bagImage" class="w-full h-full object-contain" alt="">
  <WhislistIcon class="absolute top-3 right-3" />
</div>
  <div class="flex flex-col gap-2 mt-2 ml-3">
    <h5 class=" text-sm md:text-lg text-gray-700 font-light">Michael Kors Jet Set Large Leather Tote</h5>
    <div class="flex gap-1 items-center text-[#0456A3] text-xs md:text-sm font-light">
      <FullRatingStar v-for="(rating, index) in ratings" :key="index"/>
      (0)
    </div>
    <div class="text-gray-700 font-bold text-sm md:text-2xl flex gap-2">
      <span>$</span>
      <span>1499.99</span>
    </div>
    <div class="text-gray-700 text-xs md:text-base font-light flex gap-2 items-center">
      <FastAndFreeDelivery/>
      <span>Fast and Free Delivery</span>
    </div>
    <app-button class="text-xs md:text-base text-gray-800 bg-gray-100 w-[72px] md:w-[115px] hover:text-white hover:bg-dark-primary transition-colors ease-in duration-300">Add To Cart</app-button>
  </div>
</div>
</template>

<style scoped>

</style>