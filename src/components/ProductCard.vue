<script>
import FullRatingStar from '@/assets/icons/FullRatingStar.vue'
import FastAndFreeDelivery from '@/assets/icons/FastAndFreeDelivery.vue'
import tvImage from '@/assets/tv.png'
import bagImage from '@/assets/bag.png'
import showImage from "@/assets/shoe.jfif"
import WhislistIcon from '@/assets/WhislistIcon.vue'

export default {
  name: 'ProductCard',
  components: { WhislistIcon, FastAndFreeDelivery, FullRatingStar },
  emits: ['add-to-cart', 'item-click'],
  props: {
    item: {
      type: Object,
      required: true
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
<div class="w-[149px] md:w-[250px] bg-white pb-2">
<div
  class="relative w-full h-[122px] md:h-[207px] bg-[#E8EDF5] flex items-center justify-center overflow-hidden cursor-pointer"
  @click="$emit('item-click', item)"
>
  <img :src="item.image" :alt="item.sku" class="w-full h-full object-contain">
  <WhislistIcon class="absolute top-3 right-3" />
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
      @click="$emit('add-to-cart', item)"
    >
      Add To Cart
    </app-button>
  </div>
</div>
</template>

<style scoped>

</style>