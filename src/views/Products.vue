<script>
import useProductStore from '@/stores/productsStore.js'
import electronics from '@/assets/electronics.png'
import ForwardIcon from '@/assets/icons/ForwardIcon.vue'
import mac from '@/assets/mac.png'
import tv from '@/assets/tv.png'
import fridge from '@/assets/fridge.png'
import Carousel from 'primevue/carousel';
import Breadcrumb from 'primevue/breadcrumb';
import apple from '@/assets/appleBrand.png'
import beats from '@/assets/beats.png'
import nintendo from '@/assets/Nintendo.png'
import samsung from '@/assets/Samsung.png'
import playstation from '@/assets/playstation.png'
import xbox from '@/assets/xbox.png'

export default {
  name: 'ProductsPage',
  components: { ForwardIcon, Carousel, Breadcrumb },
  data() {
    return {
      electronics,
      // topCategories: [
      //   {
      //     name: 'Laptops & Computers',
      //     image: mac
      //   },
      //   {
      //     name: 'TV & Home Theatres',
      //     image: tv
      //   },
      //   {
      //     name: 'Fridges & Freezers',
      //     image: fridge
      //   }
      // ],
      // subCategories: [
      //   {
      //     name: 'Laptops & Computers',
      //     image: mac
      //   },
      //   {
      //     name: 'TV & Home Theatres',
      //     image: tv
      //   },
      //   {
      //     name: 'Fridges & Freezers',
      //     image: fridge
      //   },{
      //     name: 'Laptops & Computers',
      //     image: mac
      //   },
      //   {
      //     name: 'TV & Home Theatres',
      //     image: tv
      //   },
      //   {
      //     name: 'Fridges & Freezers',
      //     image: fridge
      //   },{
      //     name: 'Laptops & Computers',
      //     image: mac
      //   },
      //   {
      //     name: 'TV & Home Theatres',
      //     image: tv
      //   },
      //   {
      //     name: 'Fridges & Freezers',
      //     image: fridge
      //   }
      // ],
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
      ],
      breadcrumbItems: [
        { label: 'Electronics' },
        { label: 'Computer' },
        { label: 'Accessories' },
        { label: 'Keyboard' },
        { label: 'Wireless' }
      ],
      home: {
        icon: 'pi pi-home'
      },
      popularBrands: [
        {
          name: 'Apple',
          image: apple
        },
        {
          name: 'Beats',
          image: beats
        },
        {
          name: 'Nintendo',
          image: nintendo
        },
        {
          name: 'Playstation',
          image: playstation
        },
        {
          name: 'Samsung',
          image: samsung
        },
        {
          name: 'Xbox',
          image: xbox
        }
      ]
    }
  },
  computed: {
    productStore() {
      return useProductStore()
    },
    storeDetails() {
      return this.productStore.storeDetails
    },
    topCategories() {
      return this.productStore.storeDetails.categories?.slice(0, 3) || []
    },
    subCategories() {
      return this.productStore.storeDetails.categories || []
    }
  },
  methods: {
    goToCategoryProduct(category) {
      const routeParam = category.name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and')
      this.productStore.setSingleCategoryId(category.id)
      this.$router.push({name: "CategoryProducts", params: {category: routeParam} })
    }
  }
}
</script>

<template>
<!--  <Breadcrumb class="text-gray-500 ml-6" :model="breadcrumbItems" />-->
  <div class="px-6 py-4">
<!--    top card-->
    <div class="bg-primary-gray rounded-lg shadow-md py-6 px-8 flex items-center justify-between">
      <h3 class="card-header">{{storeDetails?.description || "Welcome To DropShop"}}</h3>
      <div class="w-full h-[318px] ">
        <img class="w-full h-full object-contain" :src="electronics" alt="">
      </div>
    </div>

<!--    subcategories-->
    <div class="my-6">
      <h3 class="text-3xl text-dark-primary font-medium mb-6">Top Categories</h3>
      <div v-if="topCategories.length" class="grid grid-cols-2 gap-10">
        <div
          v-for="(topCategory, index) in topCategories"
          :key="index"
          :class="[
          'bg-dark-primary cursor-pointer w-full hover:bg-blue-primary transition-colors duration-700 ease-in-out rounded-md',
          index === 0 ? 'row-span-2' : 'row-span-1'
          ]"
          @click="goToCategoryProduct(topCategory)"
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
      <div v-else class="w-full h-80 flex items-center justify-center">
        <p class="text-dark-primary text-lg font-medium">No Categories Found</p>
      </div>
    </div>

<!--    other categories-->
    <div class="my-6">
      <h3 class="text-3xl text-dark-primary font-medium mb-6">Other Categories</h3>
      <Carousel
        v-if="subCategories.length"
      :value="subCategories"
      :numVisible="3" :numScroll="3"
      :responsive-options="responsiveOptions"
      class="flex justify-center"
    >
      <template #item="{data}">
        <div @click="goToCategoryProduct(data)" class="w-[280px] text-center">
          <div class="bg-primary-gray w-full h-[280px] flex items-end cursor-pointer hover:shadow-md transition-all duration-700 ease-in-out">
            <img class="w-full h-4/6 object-contain" :src="data.image" :alt="data.name">
          </div>
          <h4 class="text-lg my-4">{{data.name}}</h4>
        </div>
      </template>
    </Carousel>
    <div v-else class="w-full h-80 flex items-center justify-center">
      <p class="text-dark-primary text-lg font-medium">No Categories Found</p>
    </div>
    </div>

<!--    Popular brands-->
    <div class="my-6">
      <h3 class="text-3xl text-dark-primary font-medium mb-6">Popular Brands</h3>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 justify-between gap-y-6">
        <div class="w-[280px] text-center" v-for="(brand, index) in popularBrands" :key="index">
          <div class="bg-primary-gray w-full h-[280px] shadow-md cursor-pointer hover:shadow-lg transition-all duration-700 ease-in-out rounded-md">
            <img class="w-full h-full object-contain" :src="brand.image" :alt="brand.name">
          </div>
          <h4 class="text-lg my-4">{{brand.name}}</h4>
        </div>
      </div>
    </div>
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