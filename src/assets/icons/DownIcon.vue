<script>
export default {
  name: 'DownIcon',
  props: {
    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
    <path d="M4 6.5L8 10.5L12 6.5" :stroke="color" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</template>

<style scoped>

</style>