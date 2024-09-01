<script>
import GoogleIcon from '@/assets/icons/GoogleIcon.vue'
import AppleIcon from '@/assets/icons/AppleIcon.vue'
import FacebookIcon from '@/assets/icons/FacebookIcon.vue'

export default {
  name: "LoginPage",
  components: {FacebookIcon, AppleIcon, GoogleIcon },
  inject: ["isMobile"],
  data() {
    return {
      email: "",
      password: "",
    };
  },
}
</script>

<template>
  <div :class="['w-full h-full bg-white flex flex-col gap-8', !isMobile ? 'px-24 py-14' : '']">
    <div>
      <h2>Hello There!</h2>
      <div :class="!isMobile ? 'flex gap-2' : ''">
        <h6>Sign In with these options or </h6>
        <p class="text-blue-primary underline cursor-pointer">create a new account</p>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <app-button class="bg-[#EEEEEE] text-[#2C3647] font-semibold flex items-center justify-center gap-3">
        <google-icon></google-icon>
        Google
      </app-button>
      <app-button class="bg-[#272828] font-semibold flex items-center justify-center gap-3">
        <apple-icon></apple-icon>
        Apple
      </app-button>
      <app-button class="bg-[#0456A3] font-semibold flex items-center justify-center gap-3">
        <facebook-icon></facebook-icon>
        Facebook
      </app-button>
      <div class="flex gap-2 items-center text-[#828282]">
        <hr class="border w-full">
        <span class="text-nowrap">or sign in with</span>
        <hr class="border w-full">
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <app-input-field
        label="Email"
        type="email"
        v-model="email"
      ></app-input-field>
      <app-input-field
        label="Password"
        type="password"
        v-model="password"
      ></app-input-field>
      <app-button class="bg-dark-primary text-white font-semibold">Sign In</app-button>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-sm text-blue-primary underline cursor-pointer">Forgot password?</p>
      <p>By clicking sign in, you agree to our <span class="text-blue-primary cursor-pointer">Terms of Service</span> and <span class="text-blue-primary cursor-pointer">Privacy Policy</span></p>
    </div>
  </div>
</template>

<style scoped>

</style>