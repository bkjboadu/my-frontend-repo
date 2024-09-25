<script>

import { useCommonUtils } from '@/stores/commonStore.js'

export default {
  name: 'HomePage',
  components: {},
  data() {
    return {
      email: "",
      show: false,
      selected: ""
    }
  },
  computed: {
    utilsStore() {
      return useCommonUtils()
    },
    toast() {
      return this.utilsStore.toast
    }
  }
}
</script>

<template>
<div class="w-screen">
  <router-view></router-view>
</div>
</template>

<style scoped>

</style>