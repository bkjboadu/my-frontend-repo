<script>
import FullRatingStar from '@/assets/icons/FullRatingStar.vue'
import FastAndFreeDelivery from '@/assets/icons/FastAndFreeDelivery.vue'
import WarrantyIcon from '@/assets/icons/WarrantyIcon.vue'
import useProductStore from '@/stores/productsStore.js'
import MasterCard from '@/assets/icons/MasterCard.vue'
import VisaCard from '@/assets/icons/VisaCard.vue'
import ShopCard from '@/assets/icons/ShopCard.vue'
import ApplePay from '@/assets/icons/ApplePay.vue'
import GooglePay from '@/assets/icons/GooglePay.vue'
import BlueMasterCard from '@/assets/icons/BlueMasterCard.vue'
import Amex from '@/assets/icons/Amex.vue'


export default {
  name: 'SingleProduct',
  components: {
    Amex,
    BlueMasterCard,
    GooglePay,
    ApplePay,
    ShopCard,
    VisaCard,
    MasterCard, WarrantyIcon, FastAndFreeDelivery, FullRatingStar },
  data() {
    return {
      selectedDisplayImage: null
    }
  },
  computed: {
    productStore() {
      return useProductStore()
    },
    singleProduct() {
      return this.productStore.singleProduct
    }
  },
  mounted() {
    this.productStore.getSingleProduct()
  }
}
</script>

<template>
  <AppLoader v-if="productStore.loading"/>
<section v-else class="mb-10 mt-5">
  <div class="grid grid-cols-2 gap-3">
    <div class="w-full h-80 border px-5 flex items-center gap-4">
      <div class="flex flex-col gap-2 w-max">
        <div
          v-for="item in singleProduct?.product_images.slice(0, 4)"
          :key="item" class="w-16 h-16 border rounded-xl overflow-hidden cursor-pointer"
          @click="selectedDisplayImage = item.image"
        >
          <img :src="item.image" :alt="item.alt_text || 'product'" class="w-full h-full object-contain">
        </div>
      </div>
      <div class="w-full h-full">
        <img class="w-full h-full object-contain" :src="selectedDisplayImage" alt="display image">
      </div>
    </div>
    <div class="w-full h-max row-span-2 border border-gray-100">
      <h4 class="text-xl px-4 py-2 border-b">{{singleProduct?.name}}  -  256GB</h4>
      <div class="px-4 py-2 flex flex-col gap-4 border-b">
        <div class="flex gap-1 items-center text-sm text-gray-500">
          <FullRatingStar v-for="(rating, index) in 5" :key="index"/>
          (0 Reviews)
        </div>
        <div class="text-gray-700 font-bold text-lg flex gap-2">
          <span>GHS</span>
          <span>{{singleProduct?.price}}</span>
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
    <div class="w-full h-max p-4 border">
      <h3 class="text-lg text-gray-700 font-medium">Description</h3>
      <p v-if="singleProduct?.description" :class="singleProduct?.description?.length > 600 ? 'fade-text' : ''">{{
        singleProduct?.description?.length > 600 ? singleProduct?.description?.slice(0, 600) + '...' : singleProduct?.description
        }}</p>
      <p v-else class="text-sm text-gray-500">This product has no description</p>
    <app-button v-if="singleProduct?.description?.length > 600" class="!text-blue-primary w-max flex items-center gap-2 mt-2">
      <i class="pi pi-plus" style="font-size: 0.6rem; font-weight: 700"></i>
      View More
    </app-button>
    </div>
    <div class="p-4 border">
      <h3 class="text-lg text-gray-700 font-medium">Payment & Security</h3>
      <div class="flex items-center gap-2 mt-2">
        <Amex />
        <ApplePay/>
        <GooglePay/>
        <BlueMasterCard />
        <MasterCard />
        <ShopCard />
        <VisaCard />
      </div>
      <p class="text-sm text-gray-500 mt-2">Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.</p>
    </div>
    <div class="p-4 border col-span-2 flex">
      <div class="basis-2/4 w-full">
      <h3 class="text-lg text-gray-700 font-medium">Apple®  Warranty</h3>
      <p class="text-sm text-gray-500 mt-2">Your first 6 months will begin on the day you place your order,
        so you're covered straight away, register your device details
        to claim the rest of the 12 months.</p>
        <p class="text-sm text-gray-500 mt-4">What's covered by our FREE 12 Month Warranty?</p>
        <div class="mt-3">
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle text-blue-primary"></i>
            <p class="text-sm text-gray-500">Technical defects</p>
          </div>
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle text-blue-primary"></i>
            <p class="text-sm text-gray-500">Faults caused by improper workmanship or...</p>
          </div>
        </div>
        <app-button class="bg-dark-primary w-max px-4 mt-6">Read More</app-button>
      </div>
      <div class="basis-2/4 w-full h-20">
        <img class="w-full h-full object-contain" src="#" alt="Warranty Image">
      </div>
    </div>
  </div>

<!--  reviews-->
<!--  <div class="w-full h-max p-4 border mt-6">-->
<!--    <h3 class="text-lg text-gray-700 font-medium">Ratings & Reviews</h3>-->
<!--    <div class="flex items-center justify-between">-->
<!--      <div>-->
<!--        <p class="text-lg font-bold text-dark-primary">4.5</p>-->
<!--        <span class="text-gray-500 text-sm">Based on 10 reviews</span>-->
<!--      </div>-->
<!--      <app-button class="bg-dark-primary w-max px-4">Write Review</app-button>-->
<!--    </div>-->
<!--    <div>-->
<!--      <div>-->
<!--        <div>-->
<!--          <span>Sort</span>-->
<!--          <span></span>-->
<!--        </div>-->
<!--        <div></div>-->
<!--      </div>-->
<!--      <div></div>-->
<!--    </div>-->
<!--  </div>-->
</section>
</template>

<style scoped>
.fade-text {
  font-size: 16px;
  line-height: 1.5;
  color: transparent;
  background: linear-gradient(180deg, #677279 80%, rgba(0, 0, 0, 0) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>