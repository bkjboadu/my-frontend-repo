<script>
import Toast from 'primevue/toast'
import useCartStore from '@/stores/cartStore.js'
import EmptyCart from '@/assets/icons/EmptyCart.vue'
import CartItem from '@/components/CartItem.vue'

export default {
  name: 'CartView',
  components: { CartItem, EmptyCart, Toast },
  data() {
    return {
      isLoading: false,
      quantity: 1,
      checkingOut: false,
      promo_code: '',
      applyingPromo: false
    }
  },
  computed: {
    cartStore() {
      return useCartStore()
    },
    cart() {
      return this.cartStore?.cart?.items || []
    },
    subTotal() {
      return this.cart?.reduce((acc, item) => acc + item.total_price, 0)
    },
    overallTotal() {
      return this.cart?.reduce((acc, item) => acc + item.total_price, 0)
    }
  },
  methods: {
    checkout() {
      this.$router.push({ name: 'Checkout' })
      // this.checkingOut = true
      // this.cartStore.checkout()
      //   .then((response) => {
      //     this.$toast.add({
      //       severity: 'success',
      //       summary: 'Checkout successful',
      //       detail: response?.details || 'Checkout successful',
      //       life: 3000
      //     })
      //     this.cartStore.getUserCartData()
      //   })
      //   .catch((error) => {
      //     this.$toast.add({
      //       severity: 'error',
      //       summary: 'Error checking out',
      //       detail: error?.response?.data?.detail || 'An error occurred',
      //       life: 3000
      //     })
      //   })
      //   .finally(() => {
      //     this.checkingOut = false
      //   })
    },
    applyCode() {
      this.applyingPromo = true
      this.cartStore.applyPromoCode(this.promo_code)
        .then((response) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Promo code applied',
            detail: response?.details || 'Promo code applied successfully',
            life: 3000
          })
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error applying promo code',
            detail: error?.response?.data?.detail || 'An error occurred',
            life: 3000
          })
        })
        .finally(() => {
          this.applyingPromo = false
        })
    }
  },
  mounted() {
    this.isLoading = true
    this.cartStore.getUserCartData()
      .then((response) => {
        this.$toast.add({
          severity: 'success',
          summary: 'Cart data fetched',
          detail: response?.details || 'Cart data fetched successfully',
          life: 3000
        })
      })
      .catch((error) => {
        this.$toast.add({
          severity: 'error',
          summary: 'Error fetching cart data',
          detail: error?.response?.data?.detail || 'An error occurred',
          life: 3000
        })
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
</script>

<template>
  <AppLoader v-if="isLoading" />

  <div v-else>
    <div v-if="cart?.length" class="flex gap-3 mb-10">
      <div class="w-full h-max flex flex-col gap-4">
        <CartItem v-for="item in cart" :key="item.id" :item="item" />
      </div>
      <div class="w-full h-max bg-[#FAFBFD] p-3">
        <h3 class="font-bold text-lg text-dark-primary">Summary</h3>
        <p class="mt-3 text-gray-500 text-sm">Do you have a Promo Code?</p>
        <div class="flex items-center justify-between gap-4">
          <app-input-field
            class="w-full"
            label="Discount code or gift card"
            v-model="promo_code"
          ></app-input-field>
<!--          <input class="border bg-transparent p-2 text-sm w-full focus:outline-none"-->
<!--                 placeholder="Discount code or gift card"-->
<!--                 type="text">-->
          <app-button @click="applyCode()" class="!text-dark-primary w-max bg-gray-200 px-4 hover:opacity-30">
            <AppProgressSpinner v-if="applyingPromo" style="width: 20px; height: 20px" />
            <span v-else>Apply</span>
          </app-button>
        </div>
        <div class="border-y py-4 mt-4">
          <div class="flex items-center justify-between py-1">
            <p class="text-sm text-gray-500">Subtotal</p>
            <p class="text-sm text-dark-primary">Ghs {{ subTotal }}</p>
          </div>
          <div class="flex items center justify-between py-1">
            <p class="text-sm text-gray-500">Estimated Shipping & Handling</p>
            <p class="text-sm text-dark-primary">Ghs 0</p>
          </div>
          <div class="flex items center justify-between py-1">
            <p class="text-sm text-gray-500">Estimated Tax</p>
            <p class="text-sm text-dark-primary">-</p>
          </div>
        </div>
        <div class="flex items-center justify-between py-4 text-lg font-bold text-dark-primary pb-4 border-b">
          <p>Total</p>
          <p>Ghs {{ overallTotal }}</p>
        </div>
        <app-button
          class="!text-white w-full bg-blue-primary mt-4 hover:opacity-70 transition-opacity ease-in-out duration-700"
          @click="checkout()">
          <AppProgressSpinner v-if="checkingOut" style="width: 20px; height: 20px" />
          <span v-else>Proceed to Checkout</span>
        </app-button>
      </div>
    </div>
    <div v-else class="w-full h-96 flex flex-col items-center justify-center">
      <EmptyCart class="text-gray-500" height="200" width="200" />
      <p class="text-xl text-gray-500">Sorry, no cart to display</p>
    </div>
  </div>
</template>

<style scoped>

</style>