<script>
import useAuthStore from '@/stores/authStore.js'

export default {
  name: 'OAuth',
  computed: {
    authorizationToken() {
      return new URL(window.location.href).searchParams.get('code')
    },
    authStore() {
      return useAuthStore()
    }
    // getUserDetails
  },
  mounted() {
    console.log(this.authorizationToken)
    this.authStore.loginWithGoogle(this.authorizationToken)
  }
}
</script>

<template>
  <div>
    <h1>OAuth</h1>
  </div>
</template>

<style scoped>

</style>