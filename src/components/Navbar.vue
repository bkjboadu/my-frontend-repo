<script>
import whiteLogo from '@/assets/dropShopWhite.svg'
import LocationIcon from '@/assets/icons/LocationIcon.vue'
import CloseIcon from '@/assets/icons/CloseIcon.vue'
import HeartIcon from '@/assets/icons/HeartIcon.vue'
import BagIcon from '@/assets/icons/BagIcon.vue'
import useAuthStore from '@/stores/authStore.js'
import authStore from '@/stores/authStore.js'
import DownIcon from '@/assets/icons/DownIcon.vue'
import Hamburger from '@/assets/icons/Hamburger.vue'
import HamburgerClose from '@/assets/icons/HamburgerClose.vue'
import { categories } from '@/utils/staticFields.js'
export default {
  name: 'AppNavbar',
  components: { HamburgerClose, Hamburger, DownIcon, BagIcon, HeartIcon, CloseIcon, LocationIcon },
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
    }
  }
}
</script>

<template>
  <div>
    <nav class="bg-dark-primary py-6 px-5 flex gap-12">
      <div class="w-24 h-7 md:w-40 md:h-10">
        <img class="w-full h-full" :src="whiteLogo" alt="Dropshop">
      </div>
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
        <heart-icon class="cursor-pointer"></heart-icon>
        <bag-icon class="cursor-pointer"></bag-icon>
        <div v-if="isLoggedIn" class="flex items-center gap-2 user">
          <div>
            <p class="text-xs text-gray-200">Hi there,</p>
            <p class="text-white font-semibold">Ellen</p>
          </div>
          <div class="w-8 h-8 rounded-full overflow-hidden">
            <img class="w-full h-full object-cover" src="" alt="profile">
          </div>
        </div>
        <router-link to="/login" v-else class="font-semibold text-white login">Login</router-link>
        <Hamburger class="hamburger" @click="openMenu = !openMenu" />
      </div>
    </nav>
    <section class="flex relative gap-12 items-center pl-6 py-4 shadow-md font-medium text-dark-primary nav-links">
      <p @click="isCategoryOpen = !isCategoryOpen" class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100 flex items-center gap-3">
        Categories
        <DownIcon color="#262F3D" :class="['w-[20px] h-full mt-1 transition ease-in-out duration-300', isCategoryOpen ? 'rotate-180' : '']"/>
      </p>
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Deals For The Day</p>
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Top Deals</p>
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Fashion Finds</p>
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Discount Sales</p>
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Keep Fit</p>
      <div v-if="isCategoryOpen" class="categories absolute top-full p-6 bg-white grid grid-cols-4 shadow-md gap-4">
        <div v-for="(category, index) in categories" :key="index" class="text-dark-primary">
          <h3 class="font-semibold text-lg">{{category.title}}</h3>
          <ul v-for="subCategory in category.subCategories" class="ml-3">
            <li class="font-light mt-1 hover:text-blue-primary hover:underline cursor-pointer">{{subCategory.title}}</li>
          </ul>
        </div>
      </div>
    </section>
    <div :class="['hamburger-menu absolute top-0 bottom-0 right-0 bg-black bg-opacity-40 transition-all ease-in-out duration-700', openMenu ? 'left-0' : 'left-full']">
      <HamburgerClose class="absolute top-14 left-10 w-5 h-5 cursor-pointer" @click="openMenu = !openMenu" />
      <div class="menu-content bg-white w-[80%] h-max ml-auto mt-14">
        <div v-if="openMenu" class="p-6 font-medium flex flex-col gap-4">
          <p @click="isCategoryOpen = !isCategoryOpen" class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100 flex items-center gap-3">
            Categories
            <DownIcon color="#262F3D" :class="['w-[20px] h-full mt-1 transition ease-in-out duration-300', isCategoryOpen ? 'rotate-180' : 'rotate-[270deg]']"/>
          </p>
          <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Deals For The Day</p>
          <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Top Deals</p>
          <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Fashion Finds</p>
          <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Discount Sales</p>
          <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Keep Fit</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .search, .location, .user, .nav-links, .login, .categories {
    display: none;
  }
}

@media (min-width: 768px) {
  .hamburger-menu, .hamburger {
    display: none;
  }
}
</style>