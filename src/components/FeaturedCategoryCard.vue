<script>
import electronicsImage from '@/assets/electronics.png'
export default {
  name: 'FeaturedCategoryCard',
  data() {
    return {
      electronicsImage
    }
  }
}
</script>

<template>
<div class="w-[202px] md:w-[375px]">
  <div class="relative w-full h-[202px] md:h-[375px] bg-[#D9D9D9] rounded-full overflow-hidden hover:shadow-lg cursor-pointer transition-shadow duration-200 ease-in">
    <img :src="electronicsImage" alt="" class="w-full h-full object-contain relative z-10">
  </div>
  <h3 class="text-center mt-2 text-gray-700 font-medium text-base md:text-2xl">Electronics</h3>
</div>
</template>

<style scoped>
</style>