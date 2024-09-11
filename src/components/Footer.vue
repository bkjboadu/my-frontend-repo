<script>
import whiteLogo from '@/assets/dropShopWhite.svg'
import Amex from '@/assets/icons/Amex.vue'
import ApplePay from '@/assets/icons/ApplePay.vue'
import GooglePay from '@/assets/icons/GooglePay.vue'
import BlueMasterCard from '@/assets/icons/BlueMasterCard.vue'
import MasterCard from '@/assets/icons/MasterCard.vue'
import ShopCard from '@/assets/icons/ShopCard.vue'
import VisaCard from '@/assets/icons/VisaCard.vue'
import FacebookFooterIcon from '@/assets/icons/FacebookFooterIcon.vue'
import TwitterFooterIcon from '@/assets/icons/TwitterFooterIcon.vue'
import InstagramFooterIcon from '@/assets/icons/InstagramFooterIcon.vue'
import YoutubeFooterIcon from '@/assets/icons/YoutubeFooterIcon.vue'
import LinkedInFooterIcon from '@/assets/icons/LinkedInFooterIcon.vue'
import DownIcon from '@/assets/icons/DownIcon.vue'

export default {
  name: 'AppFooter',
  components: { DownIcon, LinkedInFooterIcon, YoutubeFooterIcon, InstagramFooterIcon, TwitterFooterIcon, FacebookFooterIcon, VisaCard, ShopCard, MasterCard, BlueMasterCard, GooglePay, ApplePay, Amex },
  data() {
    return {
      whiteLogo,
      footerLinks: [
        {
          title: 'Resources',
          links: ['Gift Card', "Find Store", "Site Feedback"]
        },
        {
          title: "Support",
          links: ["Get Help", "Order Status", "Shipping & Delivery", "Returns", "FAQ", "Privacy Policy", "Cookie Policy", "Order Cancellation", "Payment Options", "Gift Card Balance", "Contact Us",]
        },
        {
          title: "Company",
          links: ["About Dropshop", "News", "Careers", "Purpose", "Sustainability"]
        },
        {
          title: "Promotion & Discounts",
          links: ["Student", "Teacher", "Military", "First Responders & Medical Professionals", "Birthday", "Sustainability"]
        }
      ],
      selectedFooterLink: null
    }
  },
  methods: {
    toggleFooterLink(index) {
      if (this.selectedFooterLink === index) {
        this.selectedFooterLink = null
      } else {
        this.selectedFooterLink = index
      }
    }
  }
}
</script>

<template>
  <footer class="bg-dark-primary w-full text-white p-3 md:py-6 md:px-5 text-sm md:text-base">
    <div class=" flex gap-10 md:gap-24">
      <div class="w-[510px] flex flex-col gap-5 md:gap-10">
        <div>
          <div class="w-24 h-7 md:w-40 md:h-10">
            <img class="w-full h-full" :src="whiteLogo" alt="Dropshop">
          </div>
          <p class="mt-2">Discover Incredible Finds at DropShop – Your Trusted One-Stop Shop for Amazing Products!</p>
        </div>
        <div class="footer-links-dropdown flex flex-col gap-3">
          <div v-for="(linkGroup, index) in footerLinks" :key="index">
            <div @click="toggleFooterLink(index)" class="flex justify-between cursor-pointer">
              <h3 class="font-semibold">{{linkGroup.title}}</h3>
              <DownIcon :class="['transition duration-300',{
                'transform rotate-180': selectedFooterLink === index
              }]"/>
            </div>
            <ul v-if="selectedFooterLink === index" class="ml-4">
              <li v-for="(link, linkIndex) in linkGroup.links" class="mt-2" :key="`link_${linkIndex}`">{{link}}</li>
            </ul>
          </div>
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
            <input class="w-full h-full px-2 text-dark-primary outline-none" type="text" placeholder="Your email">
            <app-button class="bg-blue-primary h-full w-40">Subscribe</app-button>
          </div>
        </div>
      </div>
      <div class="footer-links flex justify-between w-full">
        <div v-for="(linkGroup, index) in footerLinks" :key="index">
          <h3 class="font-semibold">{{linkGroup.title}}</h3>
          <ul>
            <li v-for="(link, linkIndex) in linkGroup.links" class="mt-2" :key="`link_${linkIndex}`">{{link}}</li>
          </ul>
        </div>
      </div>
    </div>
    <hr class=" mt-8 md:mt-16 mb-4 h-[1px] border-0 bg-gray-300"/>
    <div class="md:flex justify-between">
      <p>© 2024 Dropshop. All rights reserved.</p>
      <div class="mt-2 md:mt-0 flex gap-2 items-center">
        <FacebookFooterIcon class="cursor-pointer" />
        <TwitterFooterIcon class="cursor-pointer" />
        <InstagramFooterIcon class="cursor-pointer" />
        <YoutubeFooterIcon class="cursor-pointer" />
        <LinkedInFooterIcon class="cursor-pointer" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
@media (max-width: 768px) {
  .footer-links {
    display: none;
  }
  .footer-links-dropdown {
    display: flex;
  }
}
@media (min-width: 768px) {
  .footer-links-dropdown {
    display: none;
  }
}
</style>