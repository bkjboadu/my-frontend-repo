<script>

import { useCommonUtils } from '@/stores/commonStore.js'
import ExecutiveDealsCard from '@/components/ExecutiveDealsCard.vue'
import FeaturedCategoryCard from '@/components/FeaturedCategoryCard.vue'

export default {
  name: 'HomePage',
  components: { FeaturedCategoryCard, ExecutiveDealsCard },
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
  <ExecutiveDealsCard/>
  <FeaturedCategoryCard/>
</div>
</template>

<style scoped>

</style>