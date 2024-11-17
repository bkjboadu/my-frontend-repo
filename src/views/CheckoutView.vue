<script>
import Checkbox from 'primevue/checkbox'
import VisaCard from '@/assets/icons/VisaCard.vue'
import MasterCard from '@/assets/icons/MasterCard.vue'
import GooglePay from '@/assets/icons/GooglePay.vue'
import ApplePay from '@/assets/icons/ApplePay.vue'
import Amex from '@/assets/icons/Amex.vue'
import BlueMasterCard from '@/assets/icons/BlueMasterCard.vue'
import ShopCard from '@/assets/icons/ShopCard.vue'
import AppSelect from 'primevue/select'
import RadioButton from 'primevue/radiobutton'
import OverlayBadge from 'primevue/overlaybadge'
import useCartStore from '@/stores/cartStore.js'
import api from '@/utils/api.js'
import useOrderAndPaymentStore from '@/stores/orderAndPaymentStore.js'
import { loadStripe } from '@stripe/stripe-js'


export default {
  name: 'CheckoutView',
  components: {
    ShopCard,
    BlueMasterCard,
    Amex,
    ApplePay,
    GooglePay,
    MasterCard,
    VisaCard,
    Checkbox,
    AppSelect,
    RadioButton,
    OverlayBadge
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      billing_address: '',
      shipping_address: '',
      city: '',
      country: '',
      state: '',
      zip_code: '',
      card_number: '',
      expire_date: '',
      cvv: '',
      saveInfo: false,
      expressCheckoutOptions: [
        { name: 'Apple Pay', image: ApplePay },
        { name: 'Paypal', image: Amex },
        { name: 'Shop', image: ShopCard },
        { name: 'Google pay', image: GooglePay }
      ],
      expressCheckout: '',
      placingOrder: false,
      promo_code: '',
      applyingPromo: false,
      card: null,
      elements: null,
      stripe: null
    }
  },
  computed: {
    selectedCheckoutMethod() {
      return this.expressCheckoutOptions.find(option => option.name === this.expressCheckout.name)?.name || ''
    },
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
    },
    orderStore() {
      return useOrderAndPaymentStore()
    },
    paymentIntentId() {
      return this.orderStore?.stripePaymentIntentId || ''
    },
    clientSecret() {
      return this.orderStore?.stripeClientSecret || ''
    }
  },
  methods: {
    async placeOrder() {
      this.placingOrder = true
      const { error } = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card,
        },
      });

      if(error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error placing order',
          detail: error?.message || 'An error occurred',
          life: 3000
        })
        this.placingOrder = false
        return;
      }

      const payload = {
        clientSecret: this.clientSecret,
        cart: this.cart,
        shipping_address: this.shipping_address,
        billing_address: this.billing_address,
      }
      api
        .post("/payments/stripe-confirm-payment/", payload)
        .then(response => {
          this.$toast.add({
            severity: 'success',
            summary: 'Order placed',
            detail: response?.message || 'Order placed successfully',
            life: 3000
          })
          this.cartStore.getUserCartData()
        })
        .catch(error => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error placing order',
            detail: error?.response?.data?.details || 'An error occurred',
            life: 3000
          })
        })
        .finally(() => {
          this.placingOrder = false
        })
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
            detail: error?.response?.data?.details || 'An error occurred',
            life: 3000
          })
        })
        .finally(() => {
          this.applyingPromo = false
        })
    }
  },
  async mounted() {
    await this.cartStore.getUserCartData()
    this.stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
    this.card = this.stripe.elements({
      fonts: [
        {
          cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
        },
      ],
      currency: "ghs"
    }).create('card');

    // this.$nextTick(() => {
    // });
      this.card.mount('#card-element');

      this.card.on("change", (event) => {
        console.log(event)
      })
    // this.card = (await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)).elements("card")
    // this.card.mount("#card-element")
    //
    // console.log(this.card)
  }
}
</script>

<template>
  <div class="flex gap-10 mb-10 w-full">
    <div class="basis-3/5 w-full">
      <h1 class="text-dark-primary font-bold text-2xl">Billing Information</h1>
      <div class="grid grid-cols-2 gap-y-4 gap-x-6 mt-4">
<!--        <app-input-field v-model="first_name" label="First Name"></app-input-field>-->
<!--        <app-input-field v-model="last_name" label="Last Name"></app-input-field>-->
        <app-input-field v-model="billing_address" label="Billing Address"></app-input-field>
        <app-input-field v-model="shipping_address" label="Shipping Address"></app-input-field>
<!--        <app-input-field v-model="city" label="City"></app-input-field>-->
<!--        <app-input-field v-model="country" label="Country"></app-input-field>-->
<!--        <div class="flex items-center gap-4">-->
<!--          <app-input-field v-model="state" class="w-full" label="State"></app-input-field>-->
<!--          <app-input-field v-model="zip_code" class="w-full" label="Zip code"></app-input-field>-->
<!--        </div>-->
      </div>
      <div class="mt-4 flex items-center gap-2">
        <Checkbox v-model="saveInfo" binary="true" inputId="binary"></Checkbox>
        <label class="text-gray-500" for="binary">Save this information for next time</label>
      </div>
      <p class="text-gray-500 mt-4">By continuing, you agree with dropshop’s <span
        class="text-blue-primary cursor-pointer hover:underline">Payment</span> and <span
        class="text-blue-primary cursor-pointer hover:underline">Privacy Policy</span>.</p>

      <!--      payment details-->
      <div class="mt-10 w-full">
<!--        <h1 class="text-dark-primary font-bold text-2xl">Payment Details</h1>-->
<!--        <div class="w-full flex items-center gap-3">-->
<!--          <div class="border border-[#9CA3AF] py-2 w-max flex items-center justify-center basis-2/4 gap-2 ">-->
<!--            <Amex />-->
<!--            &lt;!&ndash;            <ApplePay/>&ndash;&gt;-->
<!--            &lt;!&ndash;            <GooglePay/>&ndash;&gt;-->
<!--            <BlueMasterCard />-->
<!--            <MasterCard />-->
<!--            &lt;!&ndash;            <ShopCard />&ndash;&gt;-->
<!--            <VisaCard />-->
<!--          </div>-->
<!--          <app-select-->
<!--            v-model="expressCheckout"-->
<!--            :options="expressCheckoutOptions"-->
<!--            class="w-full md:w-56 basis-2/4"-->
<!--            optionLabel="name"-->
<!--            placeholder="Express checkout"-->
<!--          >-->
<!--            <template #option="{option}">-->
<!--              <div class="flex items-center gap-2">-->
<!--                <RadioButton v-model="selectedCheckoutMethod" :value="option.name" />-->
<!--                <component :is="option.image" />-->
<!--              </div>-->
<!--            </template>-->
<!--          </app-select>-->
<!--        </div>-->
<!--        <h3 class="mt-6 mb-3">Credit Card Information</h3>-->
<!--        <div class="w-full flex items-center gap-4">-->
<!--          <app-input-field-->
<!--            v-model="card_number"-->
<!--            class="basis-3/5"-->
<!--            label="Card Number"-->
<!--          ></app-input-field>-->
<!--          <app-input-field-->
<!--            v-model="expire_date"-->
<!--            class="basis-1/5"-->
<!--            label="Expires(mm/yy)"-->
<!--          ></app-input-field>-->
<!--          <app-input-field-->
<!--            v-model="cvv"-->
<!--            class="basis-1/5"-->
<!--            label="CVV"-->
<!--          ></app-input-field>-->
<!--        </div>-->
        <div class="mt-6">
          <label class="block text-gray-700 mb-2">Card Details</label>
          <div ref="cardElement" id="card-element" class="p-4 border border-gray-300 rounded"></div>
        </div>
      </div>
    </div>
    <div class="basis-2/5 bg-gray-50 p-4">
      <h3 class="font-semibold">Order Summary</h3>
      <div class="mt-4">
        <div v-for="item in cart" :key="item.id" class="flex items-center gap-3">
          <div class="w-max basis-1/6">
            <OverlayBadge :value="item.quantity" severity="info" size="small">
              <div class="w-full h-14 bg-gray-100 flex items-center">
                <img class="h-[90%] w-full object-contain" :src="item?.image" alt="">
              </div>
            </OverlayBadge>
          </div>
          <div class="basis-4/6">
            <p>{{item?.product_name }}</p>
            <p class="flex items-center gap-2 text-gray-500 text-sm">
            <span>Capcity: {{item?.capacity || "N/A"}}</span>
            <span>Color: {{item?.color || "N/A"}}</span>
            </p>
          </div>
          <p class="basis-1/6 text-sm">Ghs {{item?.price_at_addition || "N/A"}}</p>
        </div>
      </div>

      <div class="text-gray-500 mt-10">
        <p>Estimated Ship Date Begin: {{item?.extimated_shipping_date || "N/A"}}</p>
        <p>Estimated Delivery Date: Sept 01 - {{item?.extimated_delivery_date|| "N/A"}}</p>
      </div>

      <div class="flex items-center gap-4 mt-10">
        <app-input-field
          class="w-full"
          label="Discount code or gift card"
          v-model="promo_code"
        ></app-input-field>
        <app-button @click="applyCode()" class="!text-dark-primary w-max border border-dark-primary px-4 min-w-20">
          <AppProgressSpinner v-if="applyingPromo" style="width: 20px; height: 20px" />
          <span v-else>Apply</span>
        </app-button>
      </div>
      <div class="mt-4 border-t pt-3">
        <p class="flex items-center justify-between text-sm mt-1">
          <span>Subtotal</span>
          <span>Ghs {{subTotal}}</span>
        </p>
        <p class="flex items-center justify-between text-sm mt-1">
          <span>Shipping</span>
          <span>N/A</span>
        </p>
        <p class="flex items-center justify-between text-sm font-medium mt-1">
          <span>Total</span>
          <span>Ghs {{overallTotal}}</span>
        </p>
      </div>
      <app-button
        class="bg-blue-primary mt-3 hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="placeOrder"
        :disabled="cart?.length === 0 || placingOrder"
      >
        <AppProgressSpinner style="width: 20px; height: 20px" v-if="placingOrder" />
        <span v-else>Place order</span>
      </app-button>
    </div>
  </div>
</template>

<style scoped>

</style>