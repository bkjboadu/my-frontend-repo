<script>
export default {
  name: 'AppButton'
}
</script>

<template>
  <button v-bind="$attrs" class="w-full text-white py-2 rounded-sm font-medium">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>