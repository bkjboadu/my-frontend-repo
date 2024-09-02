<script>
export default {
  name: 'ResetPassword',
  inject: ['isMobile'],
}
</script>

<template>
  <div :class="['w-full h-full overflow-y-auto bg-white flex flex-col gap-4 card-container', !isMobile ? 'px-24 py-14' : '']">
    <div>
      <h2>Reset Password</h2>
      <div :class="!isMobile ? 'flex gap-2' : ''">
        <h6>Provide a new password to allow you sign in</h6>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <app-input-field
        label="New Password"
        type="password"
        is-required
      ></app-input-field>
      <app-input-field
        label="Confirm Password"
        type="password"
        is-required
      ></app-input-field>
      <app-button class="bg-dark-primary text-white font-semibold">Reset Password</app-button>
    </div>
  </div>
</template>

<style scoped>

</style>