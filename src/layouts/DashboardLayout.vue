<script>
import AppNavbar from '@/components/Navbar.vue'
import AppFooter from '@/components/Footer.vue'
import HamburgerClose from '@/assets/icons/HamburgerClose.vue'
import DownIcon from '@/assets/icons/DownIcon.vue'

export default {
  name: 'DashboardLayout',
  components: { DownIcon, HamburgerClose, AppFooter, AppNavbar },
  data() {
    return {
      openMenu: true,
      isCategoryOpen: false,
    }
  }
}
</script>

<template>
  <div>
    <app-navbar></app-navbar>
    <RouterView />
    <app-footer></app-footer>
  </div>
</template>

<style scoped>

</style>