<script>
import loginBackground from '@/assets/loginBackground.webp'
import whiteLogo from '@/assets/dropShopWhite.svg'
import blackLogo from '@/assets/dropShopBlack.svg'
import { computed } from 'vue'
export default {
  name: 'BlankLayout',
  provide() {
    return {
      isMobile: computed(() => this.isMobile)
    }
  },
  data() {
    return {
      loginBackground,
      pageSize: window.innerWidth
    }
  },
  computed: {
    isMobile() {
      return this.pageSize < 768
    },
    logo() {
      return this.isMobile ? blackLogo : whiteLogo
    }
  },
  methods: {
    updatePageSize() {
      this.pageSize = window.innerWidth
    }
  },
  mounted() {
    window.addEventListener('resize', this.updatePageSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updatePageSize)
  }
}
</script>

<template>
  <main :class="['relative flex items-center page-container w-full', isMobile ? 'flex-col p-9 overflow-x-hidden gap-9' : 'h-screen overflow-hidden justify-center gap-32']">
    <div>
      <img :class="['', isMobile ? 'w-[188px]' : 'w-[532px]']" :src="logo" alt="Logo">
    </div>
    <div :class="[isMobile ? 'w-full' : 'w-[640px]']"><RouterView /></div>
  </main>
  <div v-if="isMobile" class="border-t pt-1">
    <p class="mx-9 text-center text-[9px] text-dark-primary">Copyright © 2024 Dropshop. All Rights Reserved. Accessibility, User Agreement, Privacy, Consumer Health Data, Payments Terms of Use, Cookies, CA Privacy Notice, Your Privacy Choices and AdChoice</p>
  </div>
</template>

<style scoped>
:deep(h2) {
  color: #2C3647;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 150%; /* 36px */
  letter-spacing: -0.24px;
}

:deep(h6) {
  color: #626263;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
}

.page-container {
  background-image: url("@/assets/loginBackground.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

@media (max-width: 768px) {
  .page-container {
    background-image: none;
  }
}
</style>