<script>
import GoogleIcon from '@/assets/icons/GoogleIcon.vue'
import AppleIcon from '@/assets/icons/AppleIcon.vue'
import FacebookIcon from '@/assets/icons/FacebookIcon.vue'
import { useCommonUtils } from '@/stores/commonStore.js'
import useAuthStore from '@/stores/authStore.js'

export default {
  name: "LoginPage",
  components: { FacebookIcon, AppleIcon, GoogleIcon },
  inject: ["isMobile"],
  data() {
    return {
      email: "",
      password: "",
      passwordChecker: false,
    };
  },
  computed: {
    commonStore() {
      return useCommonUtils();
    },
    authStore() {
      return useAuthStore();
    },
    isValid() {
      return this.email && this.password
    },
  },
  methods: {
    showPasswordChecker() {
      if(!this.passwordChecker) {
        this.passwordChecker = true
      }
    },
    login() {
      if(!this.isValid) {
        this.commonStore.showAlert('Please fill in all fields', 'error')
      }
      const payload = {
        email: this.email,
        password: this.password
      }
      this.authStore.login(payload)
    }
  },
}
</script>

<template>
  <div :class="['w-full h-full overflow-y-auto bg-white flex flex-col gap-8 card-container', !isMobile ? 'px-24 py-14' : '']">
    <div>
      <h2>Hello There!</h2>
      <div :class="!isMobile ? 'flex gap-2' : ''">
        <h6>Sign In with these options or</h6>
        <router-link
          class="text-blue-primary underline cursor-pointer"
          to="/register"
        >
          create a new account
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
        <span class="text-nowrap text-xs md:text-sm">or sign in with</span>
        <hr class="border w-full">
      </div>
    </div>
    <div class="flex flex-col gap-4">
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
<!--      <div v-if="passwordChecker" class="text-xs -mt-3">-->
<!--        <p :class="['flex items-center gap-2', password.length >= 8 ? 'text-green-500' : 'text-red-500']">-->
<!--          <green-check-with-circle v-if="password.length >= 8"></green-check-with-circle>-->
<!--          <red-close-icon-with-circle v-else></red-close-icon-with-circle>-->
<!--          Password should be at least 8 characters-->
<!--        </p>-->
<!--        <p :class="['flex items-center gap-2', includesLowerCase ? 'text-green-500' : 'text-red-500']">-->
<!--          <green-check-with-circle v-if="includesLowerCase"></green-check-with-circle>-->
<!--          <red-close-icon-with-circle v-else></red-close-icon-with-circle>-->
<!--          Include at least one lowercase-->
<!--        </p>-->
<!--        <p :class="['flex items-center gap-2', includesUpperCase ? 'text-green-500' : 'text-red-500']">-->
<!--          <green-check-with-circle v-if="includesUpperCase"></green-check-with-circle>-->
<!--          <red-close-icon-with-circle v-else></red-close-icon-with-circle>-->
<!--          Include at least one uppercase-->
<!--        </p>-->
<!--        <p :class="['flex items-center gap-2', includesSpecialCharacter ? 'text-green-500' : 'text-red-500']">-->
<!--          <green-check-with-circle v-if="includesSpecialCharacter"></green-check-with-circle>-->
<!--          <red-close-icon-with-circle v-else></red-close-icon-with-circle>-->
<!--          Include at least one special character (&@#!)-->
<!--        </p>-->
<!--      </div>-->
      <app-button
        class="bg-dark-primary text-white font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed"
        @click="login()"
      >Sign In</app-button>
    </div>
    <div class="flex flex-col gap-2">
      <router-link :to="{name: 'forgot-password'}" class="text-sm text-blue-primary underline cursor-pointer">Forgot password?</router-link>
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