<script>
import DownIcon from '@/assets/icons/DownIcon.vue'
import HamburgerClose from '@/assets/icons/HamburgerClose.vue'
import Drawer from 'primevue/drawer';
import Menubar from 'primevue/menubar';
import { useCommonUtils } from '@/stores/commonStore.js'
import useProductStore from '@/stores/productsStore.js'
import productsStore from '@/stores/productsStore.js'

export default {
  name: 'AppNavbar',
  components: { DownIcon, Drawer, Menubar },
  data() {
    return {
    }
  },
  computed: {
    commonUtilsStore() {
      return useCommonUtils()
    },
    productStore() {
      return useProductStore()
    },
    items() {
      return [
        { label: 'Categories', icon: 'pi pi-fw pi-th-large', items: this.productStore?.storeDetails?.categories?.map(category => {
          return {
            label: category.name,
            command: () => this.$router.push({name: "categories", params: {category: category.name} }),
          }
          }) || [] },
        { label: 'Deal For the Day', icon: 'pi pi-fw pi-calendar' },
        { label: 'Top Deals', icon: 'pi pi-fw pi-star' },
        { label: 'Fashion Finds', icon: 'pi pi-fw pi-shopping-cart' },
        { label: 'Discount Sales', icon: 'pi pi-fw pi-percent' },
        { label: 'Keep Fit', icon: 'pi pi-fw pi-heart' }
      ]
    }
  },
  mounted() {
    // console.log(this.productStore?.storeDetails)
  }
}
</script>

<template>
  <Menubar :model="items" class="!border-0"/>
<!--  <section class="flex relative gap-12 items-center pl-6 py-4 font-medium text-dark-primary nav-links">-->
<!--    <p id="category" class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100 flex items-center gap-3">-->
<!--      Categories-->
<!--      <DownIcon color="#262F3D" :class="['w-[20px] h-full mt-1 transition ease-in-out duration-300', isCategoryOpen ? 'rotate-180' : '']"/>-->
<!--    </p>-->
<!--    <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Deals For The Day</p>-->
<!--    <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Top Deals</p>-->
<!--    <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Fashion Finds</p>-->
<!--    <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Discount Sales</p>-->
<!--    <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Keep Fit</p>-->
<!--    <div v-if="isCategoryOpen" id="categories" class="categories fixed top-36 bg-white shadow-md gap-4 z-50">-->
<!--      <div v-for="(category, index) in categories" :key="index" class="text-dark-primary">-->
<!--        <h3 @click="goToLink(category?.link)" class="font-medium text-lg p-2 hover:bg-gray-100 transition-colors duration-700 ease-in-out cursor-pointer">{{category.title}}</h3>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
  <div class="card flex justify-center">
    <Drawer v-model:visible="commonUtilsStore.openNavMenu" header="Drawer" position="right">
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Deals For The Day</p>
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Top Deals</p>
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Fashion Finds</p>
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Discount Sales</p>
      <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Keep Fit</p>
    </Drawer>
    <Button icon="pi pi-arrow-right" @click="commonUtilsStore.toggleNav()" />
  </div>
<!--  <div :class="['hamburger-menu fixed top-0 bottom-0 right-0 bg-black bg-opacity-40 transition-all ease-in-out duration-700 z-50', openMenu ? 'left-0' : 'left-full']">-->
<!--    <HamburgerClose v-if="openMenu" class="absolute top-14 left-10 w-5 h-5 cursor-pointer" @click="openMenu = !openMenu" />-->
<!--    <div class="menu-content bg-white w-[80%] h-max ml-auto mt-14">-->
<!--      <div v-if="openMenu" class="p-6 font-medium flex flex-col gap-4">-->
<!--        <p @click="isCategoryOpen = !isCategoryOpen" class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100 flex items-center gap-3">-->
<!--          Categories-->
<!--          <DownIcon color="#262F3D" :class="['w-[20px] h-full mt-1 transition ease-in-out duration-300', isCategoryOpen ? 'rotate-180' : 'rotate-[270deg]']"/>-->
<!--        </p>-->
<!--        <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Deals For The Day</p>-->
<!--        <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Top Deals</p>-->
<!--        <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Fashion Finds</p>-->
<!--        <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Discount Sales</p>-->
<!--        <p class="cursor-pointer hover:text-blue-primary hover:underline transition ease-in duration-100">Keep Fit</p>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<style scoped>
@media (max-width: 768px) {
  .nav-links, .categories {
    display: none;
  }
}

@media (min-width: 768px) {
  .hamburger-menu {
    display: none;
  }
}
</style>