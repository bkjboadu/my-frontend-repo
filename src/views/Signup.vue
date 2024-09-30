<script>
import GoogleIcon from '@/assets/icons/GoogleIcon.vue'
import AppleIcon from '@/assets/icons/AppleIcon.vue'
import FacebookIcon from '@/assets/icons/FacebookIcon.vue'
import GreenCheckWithCircle from '@/assets/icons/GreenCheckWithCircle.vue'
import RedCloseIconWithCircle from '@/assets/icons/RedCloseIconWithCircle.vue'
import { useCommonUtils } from '@/stores/commonStore.js'
import useAuthStore from '@/stores/authStore.js'

export default {
  name: "UserAuth",
  components: { RedCloseIconWithCircle, GreenCheckWithCircle, FacebookIcon, AppleIcon, GoogleIcon },
  inject: ["isMobile"],
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      passwordChecker: false,
    };
  },
  computed: {
    includesLowerCase() {
      return /[a-z]/.test(this.password);
    },
    includesUpperCase() {
      return /[A-Z]/.test(this.password);
    },
    includesSpecialCharacter() {
      return /[&@#!]/.test(this.password);
    },
    utilStore() {
      return useCommonUtils()
    },
    authStore() {
      return useAuthStore()
    },
    isValid() {
      return this.email && this.password && this.includesSpecialCharacter && this.includesUpperCase && this.includesLowerCase && this.password.length >= 8
    },
    isPasswordsMatch() {
      if(!this.confirmPassword) {
        return true
      }
      return this.password === this.confirmPassword
    },
  },
  methods: {
    showPasswordChecker() {
      if(!this.passwordChecker) {
        this.passwordChecker = true
      }
    },
    handleSubmit() {
      if(this.isValid && this.isPasswordsMatch) {
        this.authStore.register({
          email: this.email,
          password: this.password,
          confirm_password: this.confirmPassword
        })
      }
      // this.utilStore.showAlert('test', 'success')
    }
  },
}
</script>

<template>
  <div :class="['w-full h-full overflow-y-auto bg-white flex flex-col gap-8 card-container', !isMobile ? 'px-24 py-14' : '']">
    <div>
      <h2>Create an account</h2>
      <div :class="!isMobile ? 'flex gap-2' : ''">
        <h6>Use these options for quick sign up or</h6>
        <router-link
          class="text-blue-primary underline cursor-pointer"
          to="/login"
        >
          Sign in
        </router-link>
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
    <form class="flex flex-col gap-4">
      <app-input-field
        label="Email"
        type="email"
        v-model="email"
        is-required
      ></app-input-field>
      <app-input-field
        label="Password"
        type="password"
        v-model="password"
        is-required
        @input="showPasswordChecker"
      ></app-input-field>
      <div v-if="passwordChecker" class="text-xs -mt-3">
        <p :class="['flex items-center gap-2', password.length >= 8 ? 'text-green-500' : 'text-red-500']">
          <green-check-with-circle v-if="password.length >= 8"></green-check-with-circle>
          <red-close-icon-with-circle v-else></red-close-icon-with-circle>
          Password should be at least 8 characters
        </p>
        <p :class="['flex items-center gap-2', includesLowerCase ? 'text-green-500' : 'text-red-500']">
          <green-check-with-circle v-if="includesLowerCase"></green-check-with-circle>
          <red-close-icon-with-circle v-else></red-close-icon-with-circle>
          Include at least one lowercase
        </p>
        <p :class="['flex items-center gap-2', includesUpperCase ? 'text-green-500' : 'text-red-500']">
          <green-check-with-circle v-if="includesUpperCase"></green-check-with-circle>
          <red-close-icon-with-circle v-else></red-close-icon-with-circle>
          Include at least one uppercase
        </p>
        <p :class="['flex items-center gap-2', includesSpecialCharacter ? 'text-green-500' : 'text-red-500']">
          <green-check-with-circle v-if="includesSpecialCharacter"></green-check-with-circle>
          <red-close-icon-with-circle v-else></red-close-icon-with-circle>
          Include at least one special character (&@#!)
        </p>
      </div>
      <app-input-field
        label="Confirm Password"
        type="password"
        v-model="confirmPassword"
        :is-error="!isPasswordsMatch"
        error-message="Passwords do not match"
        is-required
      ></app-input-field>
      <app-button
        type="submit"
        @click.prevent="handleSubmit"
        class="bg-dark-primary text-white font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed"
        :disabled="!isValid || !isPasswordsMatch || authStore.loading"
      >{{authStore.loading ? 'loading...' : 'Sign Up' }}</app-button>
    </form>
    <div class="flex flex-col gap-2">
      <p>By clicking sign in, you agree to our <span class="text-blue-primary cursor-pointer">Terms of Service</span> and <span class="text-blue-primary cursor-pointer">Privacy Policy</span></p>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .card-container {
    max-height: 700px;
  }
}
@media (min-width: 1550px) {
  .card-container {
    max-height: 900px;
  }
}
</style>