<script>
import useAuthStore from '@/stores/authStore.js'

export default {
  name: 'OAuth',
  data() {
    return {
      loading: true
    }
  },
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
    this.authStore.loginWithGoogle(this.authorizationToken)
      .then((response) => {
        this.$toast.add({ severity: 'success', summary: 'Login successful', detail: response?.details || 'Login successful', life: 3000 })
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 1000)
      })
      .catch((error) => {
        this.$toast.add({
          severity: 'error',
          summary: 'Error logging in',
          detail: error?.response?.data?.detail || 'An error occurred',
          life: 3000
        })
        setTimeout(() => {
          this.$router.push({ name: 'login' })
        }, 1000)
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<template>
  <div>
    <AppProgressSpinner v-if="loading"/>
    <p class="text-2xl text-white font-medium" v-else>Redirecting...</p>
  </div>
</template>

<style scoped>

</style>