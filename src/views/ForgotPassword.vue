<script>
export default {
  name: 'ForgotPassword',
  inject: ['isMobile'],
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
      ></app-input-field>
      <app-button class="bg-dark-primary text-white font-semibold">Send link to email</app-button>
    </div>
    <p>Didn’t receive link? <router-link to="" class="text-blue-primary underline cursor-pointer">Resend link</router-link></p>
  </div>
</template>

<style scoped>

</style>