<script>
import ProgressSpinner from 'primevue/progressspinner';
export default {
  name: 'AppLoader',
  components: { ProgressSpinner }
}
</script>

<template>
  <div class="h-96 w-full flex items-center justify-center">
    <ProgressSpinner
      style="width:50px; height: 50px"
      strokeWidth="8"
      fill="transparent"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />
  </div>
</template>

<style scoped>

</style>