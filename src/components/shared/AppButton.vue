<script>
import AppSpinner from '@/components/shared/Spinner.vue'

export default {
  name: 'AppButton',
  components: { AppSpinner }
}
</script>

<template>
  <button v-bind="$attrs" class="w-full text-white py-2 rounded-sm font-medium">
    <slot>
      <AppSpinner/>
    </slot>
  </button>
</template>

<style scoped>

</style>