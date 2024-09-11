<script>
import AppNavbar from '@/components/Navbar.vue'
import AppFooter from '@/components/Footer.vue'

export default {
  name: 'DashboardLayout',
  components: { AppFooter, AppNavbar }
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