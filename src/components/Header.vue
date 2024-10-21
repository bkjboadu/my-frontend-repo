<script>
import whiteLogo from '@/assets/dropShopWhite.svg'
import LocationIcon from '@/assets/icons/LocationIcon.vue'
import HeartIcon from '@/assets/icons/HeartIcon.vue'
import BagIcon from '@/assets/icons/BagIcon.vue'
import useAuthStore from '@/stores/authStore.js'
import Hamburger from '@/assets/icons/Hamburger.vue'
import { categories } from '@/utils/staticFields.js'
import { useCommonUtils } from '@/stores/commonStore.js'
import Avatar from 'primevue/avatar';
import OverlayBadge from 'primevue/overlaybadge';
export default {
  name: 'AppHeader',
  components: { Hamburger, BagIcon, HeartIcon, LocationIcon, Avatar, OverlayBadge },
  data() {
    return {
      whiteLogo,
      isCategoryOpen: false,
      openMenu: false,
      categories
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    },
    isLoggedIn() {
      return this.authStore.isLoggedIn
    },
    commonUtilsStore() {
      return useCommonUtils()
    },
    userDetails() {
      return this.authStore?.user
    },
    userInitials() {
      return this.userDetails?.first_name[0] + this.userDetails?.last_name[0]
    }
  },
  methods: {
    goToLink(link) {
      this.$router.push(`/home${link}`)
    },
    goToCart() {
      this.$router.push({ name: 'Cart' })
    },
    // toggleCategory(event) {
    //   const categoryBtn = this.$el.querySelector("#category")
    //   const currentTarget = event.target
    //
    //   if (categoryBtn.contains(currentTarget) || currentTarget.classList.contains('categories')) {
    //     this.isCategoryOpen = !this.isCategoryOpen
    //   } else {
    //     this.isCategoryOpen = false
    //   }
    // }
  },
  // mounted() {
  //   document.addEventListener('click', this.toggleCategory)
  // },
  // beforeUnmount() {
  //   document.removeEventListener('click', this.toggleCategory)
  // }
}
</script>

<template>
  <div class="w-screen overflow-x-hidden">
    <nav class="bg-dark-primary py-6 px-5 flex gap-12">
      <router-link to="/home" class="w-24 h-7 md:w-40 md:h-10 cursor-pointer">
        <img class="w-full h-full" :src="whiteLogo" alt="Dropshop">
      </router-link>
      <div class="flex location items-center gap-3">
        <location-icon></location-icon>
        <div>
          <p class="text-xs text-gray-300">Deliver to</p>
          <p class="font-semibold text-white">Sacramento, CA 95829</p>
        </div>
      </div>
      <div class="w-[447px] h-10 search">
        <input
          type="text"
          placeholder="Search"
          class="w-full h-full bg-dark-primary-light text-white text-sm px-3 focus:bg-white focus:text-dark-primary-light outline-none transition-background duration-300 ease-linear"
        >
        <!--      <close-icon></close-icon>-->
      </div>
      <div class="flex items-center gap-5 ml-auto">
<!--        <OverlayBadge value="2">-->
<!--          <i class="pi pi-bell" style="font-size: 1.5rem" />-->
<!--        </OverlayBadge>-->
        <heart-icon @click="goToCart()" class="cursor-pointer"></heart-icon>
        <bag-icon class="cursor-pointer"></bag-icon>
        <div v-if="isLoggedIn" class="flex items-center gap-2 user">
          <div>
            <p class="text-xs text-gray-200">Hi there,</p>
            <p class="text-white font-semibold">{{userDetails?.first_name}}</p>
          </div>
          <Avatar
            :label="userInitials"
            size=""
            :icon="userInitials"
            style="background-color: #dee9fc; color: #1a2551" shape="circle"
            :image="userDetails?.avatar"
          />
<!--          <div class="w-8 h-8 rounded-full overflow-hidden">-->
<!--            <img class="w-full h-full object-cover" src="" alt="profile">-->
<!--          </div>-->
        </div>
        <router-link to="/login" v-else class="font-semibold text-white login">Login</router-link>
        <Hamburger class="hamburger" @click="commonUtilsStore.toggleNav()" />
      </div>
    </nav>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .search, .location, .user, .login {
    display: none;
  }
}

@media (min-width: 768px) {
  .hamburger {
    display: none;
  }
}
</style>