<script>

import { useCommonUtils } from '@/stores/commonStore.js'

export default {
  name: 'HomePage',
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
<div class="w-screen h-screen">
  <h1>Home</h1>
</div>
</template>

<style scoped>

</style>