<script>
import AppNavbar from '@/components/shared/Navbar.vue'
import AppFooter from '@/components/Footer.vue'
import AppHeader from '@/components/Header.vue'
import useProductStore from '@/stores/productsStore.js'

export default {
  name: 'DashboardLayout',
  components: { AppHeader, AppFooter, AppNavbar },
  data() {
    return {
      openMenu: true,
      isCategoryOpen: false,
    }
  },
  mounted() {
    useProductStore().getStoreDetails()
  }
}
</script>

<template>
  <div>
    <AppHeader />
    <div class="max-w-[1200px] mx-auto">
      <AppNavbar />
      <RouterView />
    </div>
    <app-footer></app-footer>
  </div>
</template>

<style scoped>

</style>