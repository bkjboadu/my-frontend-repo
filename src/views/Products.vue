<script>
import useProductStore from '@/stores/productsStore.js'
import electronics from '@/assets/electronics.png'
import ForwardIcon from '@/assets/icons/ForwardIcon.vue'
import mac from '@/assets/mac.png'
import tv from '@/assets/tv.png'
import fridge from '@/assets/fridge.png'
import Carousel from 'primevue/carousel';

export default {
  name: 'ProductsPage',
  components: { ForwardIcon, Carousel },
  data() {
    return {
      electronics,
      topCategories: [
        {
          name: 'Laptops & Computers',
          image: mac
        },
        {
          name: 'TV & Home Theatres',
          image: tv
        },
        {
          name: 'Fridges & Freezers',
          image: fridge
        }
      ],
      subCategories: [
        {
          name: 'Laptops & Computers',
          image: mac
        },
        {
          name: 'TV & Home Theatres',
          image: tv
        },
        {
          name: 'Fridges & Freezers',
          image: fridge
        },{
          name: 'Laptops & Computers',
          image: mac
        },
        {
          name: 'TV & Home Theatres',
          image: tv
        },
        {
          name: 'Fridges & Freezers',
          image: fridge
        },{
          name: 'Laptops & Computers',
          image: mac
        },
        {
          name: 'TV & Home Theatres',
          image: tv
        },
        {
          name: 'Fridges & Freezers',
          image: fridge
        }
      ],
      responsiveOptions: [
        {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
        },
        {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
        }
      ]
    }
  },
  computed: {
    productsStore() {
      return useProductStore()
    }
  },
}
</script>

<template>
  <router-view v-if="productsStore.singleCategory"></router-view>
  <div class="px-6 py-4" v-else>
<!--    top card-->
    <div class="bg-primary-gray rounded-lg shadow-md py-6 px-8 flex items-center justify-between">
      <h3 class="card-header">Delve into the world of tech and electronics</h3>
      <div class="w-full h-[318px] ">
        <img class="w-full h-full object-contain" :src="electronics" alt="">
      </div>
    </div>

<!--    subcategories-->
    <div class="my-6">
      <h3 class="text-3xl text-dark-primary font-medium mb-6">Top Categories</h3>
      <div class="grid grid-cols-2 gap-10">
        <div
          v-for="(topCategory, index) in topCategories"
          :key="index"
          :class="[
          'bg-dark-primary cursor-pointer w-full hover:bg-blue-primary transition-colors duration-700 ease-in-out rounded-md',
          index === 0 ? 'row-span-2' : 'row-span-1'
          ]"
        >
          <div class="flex items-center justify-between p-6">
            <h4 class="text-white text-3xl font-medium max-w-[300px]">{{topCategory.name}}</h4>
            <ForwardIcon fill="white" width="40"/>
          </div>
          <div :class="[index !== 0 ? 'w-2/4 ml-auto' : '']">
            <img :class="['w-full h-full object-cover', index !== 0 ? 'max-h-[330px]' : '']" :src="topCategory.image" alt="">
          </div>
        </div>
      </div>
    </div>

<!--    other categories-->
    <Carousel
      :value="subCategories"
      :numVisible="3" :numScroll="3"
      :responsive-options="responsiveOptions"
      class="flex justify-center"
    >
      <template #item="{data}">
        <div class="w-[362px] text-center">
          <div class="bg-primary-gray w-full h-[362px] flex items-end">
            <img class="w-full h-4/6 object-contain" :src="data.image" :alt="data.name">
          </div>
          <h4 class="text-lg my-4">{{data.name}}</h4>
        </div>
<!--        <div class="border border-surface-200 dark:border-surface-700 rounded m-2  p-4">-->
<!--          <div class="mb-4">-->
<!--            <div class="relative mx-auto">-->
<!--              <img :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image" :alt="slotProps.data.name" class="w-full rounded" />-->
<!--              <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left:5px; top: 5px"/>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>-->
<!--          <div class="flex justify-between items-center">-->
<!--            <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>-->
<!--            <span>-->
<!--                    <Button icon="pi pi-heart" severity="secondary" outlined />-->
<!--                    <Button icon="pi pi-shopping-cart" class="ml-2"/>-->
<!--                </span>-->
<!--          </div>-->
<!--        </div>-->
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.card-header {
  color: #262F3D;
  font-size: 75.64px;
  font-style: normal;
  font-weight: 700;
  line-height: 83px; /* 109.73% */
  letter-spacing: -3.782px;
  max-width: 641px;
}
</style>