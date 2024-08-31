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
      socket: null,
      listenMessage: null
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
  <component :is="Layout"></component>
</template>

<style scoped>
</style>
