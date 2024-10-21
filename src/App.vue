<script>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    DashboardLayout,
    BlankLayout
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    Layout() {
      if (this.$route.meta.layout === 'dashboard') return 'dashboard-layout'
      if (this.$route.meta.layout === 'blank') return 'blank-layout'
      return null
    }
  },
  methods: {},
})
</script>

<template>
  <AppToast />
  <main class="w-screen overflow-x-hidden">
    <component :is="Layout"></component>
    <app-alert class="absolute"></app-alert>
  </main>
</template>

<style scoped>
</style>
