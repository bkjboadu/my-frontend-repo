<script>
import whiteLogo from '@/assets/dropShopWhite.svg'
import Amex from '@/assets/icons/Amex.vue'
import ApplePay from '@/assets/icons/ApplePay.vue'
import GooglePay from '@/assets/icons/GooglePay.vue'
import BlueMasterCard from '@/assets/icons/BlueMasterCard.vue'
import MasterCard from '@/assets/icons/MasterCard.vue'
import ShopCard from '@/assets/icons/ShopCard.vue'
import VisaCard from '@/assets/icons/VisaCard.vue'

export default {
  name: 'AppFooter',
  components: { VisaCard, ShopCard, MasterCard, BlueMasterCard, GooglePay, ApplePay, Amex },
  data() {
    return {
      whiteLogo
    }
  }
}
</script>

<template>
  <footer class="absolute bottom-0 bg-dark-primary w-full text-white py-6 px-5 flex">
    <div class="w-[410px] flex flex-col gap-10">
      <div>
        <div class="w-24 h-7 md:w-40 md:h-10">
          <img class="w-full h-full" :src="whiteLogo" alt="Dropshop">
        </div>
        <p class="mt-2">Discover Incredible Finds at DropShop – Your Trusted One-Stop Shop for Amazing Products!</p>
      </div>
      <div>
        <p>We Accept</p>
        <div class="flex items-center gap-2 mt-2">
          <Amex />
          <ApplePay/>
          <GooglePay/>
          <BlueMasterCard />
          <MasterCard />
          <ShopCard />
          <VisaCard />
        </div>
      </div>
      <div>
        <p>Subscribe to our newsletter and get access to VIP discounts and special offers.</p>
        <div class="flex items-center h-12 mt-4">
          <input class="w-full h-full px-2 text-dark-primary" type="text" placeholder="Your email">
          <app-button class="bg-blue-primary h-full w-40">Subscribe</app-button>
        </div>
      </div>
    </div>
    <div></div>
  </footer>
</template>

<style scoped>

</style>