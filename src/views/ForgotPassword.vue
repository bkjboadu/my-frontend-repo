<script>
import useAuthStore from '@/stores/authStore.js'

export default {
  name: 'ForgotPassword',
  inject: ['isMobile'],
  data() {
    return {
      email: "",
      loading: false
    }
  },
  computed: {
    authStore() {
      return useAuthStore()
    }
  },
  methods: {
    sendLink() {
      this.loading = true
      this.authStore.sendPasswordResetEmail(this.email)
        .then((response) => {
          this.$toast.add({ severity: 'success', summary: 'Link sent', detail: response?.details || 'Email sent successfully', life: 3000 })
        })
        .catch((error) => {
          this.$toast.add({ severity: 'error', summary: 'Error sending link', detail: error?.response?.data?.detail || 'Cannot send email now, please try again later', life: 3000 })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<template>
  <div :class="['w-full h-full overflow-y-auto bg-white flex flex-col gap-4 card-container', !isMobile ? 'px-24 py-14' : '']">
    <div>
      <h2>Reset password</h2>
      <div :class="!isMobile ? 'flex gap-2' : ''">
        <h6>Enter your email and we’ll send you a link to reset your password</h6>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <app-input-field
        label="Email"
        type="email"
        is-required
        v-model="email"
      ></app-input-field>
      <app-button :disabled="!email" @click="sendLink" class="bg-dark-primary text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed">
        <AppProgressSpinner v-if="loading" style="width: 20px; height: 20px" />
        <span v-else>Send link to email</span>
      </app-button>
    </div>
    <p>Didn’t receive link? <span @click="sendLink" class="text-blue-primary underline cursor-pointer">Resend link</span></p>
  </div>
</template>

<style scoped>

</style>