<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <div>
      <form @submit.prevent="handlePayment">
        <!-- Billing and Shipping Address -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Billing Address</label>
          <input
            v-model="billingAddress"
            type="text"
            placeholder="Billing Address"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Shipping Address</label>
          <input
            v-model="shippingAddress"
            type="text"
            placeholder="Shipping Address"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <!-- Card Element (Stripe) -->
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Card Details</label>
          <div ref="cardElement" id="card-element" class="p-4 border border-gray-300 rounded"></div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
        >
          Pay Now
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

export default {
  name: 'CheckoutView',

  data() {
    return {
      access_token: '',
      refresh_token: '',
      stripe: null,
      elements: null,
      card: null,
      clientSecret: null,
      loading: false,
      cart: [],
      billingAddress: '',
      shippingAddress: '',
    };
  },
  async mounted() {
    await this.loginBright();
    await this.getUserCart();
    // Load Stripe
    this.stripe = await loadStripe('pk_test_51QIfVHGKMeRUo53TSdjAn7vcMOjRPfJRsh54ge6UfY1p4Q8ax6ok1u1jCx5BbEQndIkxcDLAA1YP8dL2OLxEdppq00pVyMhTrM');
    this.elements = this.stripe.elements();

    this.$nextTick(() => {
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    });

    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  },
  methods: {
    async loginBright(){
      try {
        const payload = {
          "email":"brbojr@gmail.com",
          "password":"3tjppg6BB!"
        };

        const response = await axios.post('http://127.0.0.1:8000/accounts/login/',payload);
        this.access_token = response.data.access;
        this.refresh_token = response.data.refresh;
      } catch (error) {
        console.error(error);
      }
    },

    async getUserCart(){
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;

        const response = await axios.get('http://127.0.0.1:8000/carts/cart');
        this.cart = response.data;
        console.log(this.cart);
      } catch (error) {
        console.error(error);
      }
    },

    async handlePayment() {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;

      const response = await axios.get('http://127.0.0.1:8000/carts/cart');
      this.cart = response.data.items;
      console.log('items',response.data.items);
      if (!this.cart.length) {
        console.log('cart',this.cart)
        alert("Cart is empty");
        return;
      }

      this.loading = true;

      // Step 1: Create Payment Intent via your Django Backend
      try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;
        console.log(this.access_token);
        const formData = {
          "shipping_address": this.shippingAddress,
          "billing_address": this.billingAddress,
          "cart": this.cart
        }
        const response = await axios.post('http://127.0.0.1:8000/payments/stripe-create-payment-intent/', formData);

        console.log(response.data);

        // const data = await response.json();
        this.clientSecret = response.data.clientSecret;
        console.log('clientSecret',this.clientSecret);
        console.log('this card',this.card);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        this.loading = false;
        return;
      }

      if (!this.card) {
        console.error("Card element is not initialized");
        return;
      }
      // Step 2: Confirm the Card Payment
      const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card,
        },
      });

      if (error) {
        alert(error.message);
        this.loading = false;
        return;
      }

      console.log(paymentIntent);

      // // Step 3: Confirm Payment on Your Django Backend
      await this.confirmPaymentOnBackend(paymentIntent.client_secret);
    },

    async confirmPaymentOnBackend(clientSecret) {


      try {
        const formData = {
          "clientSecret":clientSecret,
          "cart":this.cart,
          "shipping_address": this.shippingAddress,
          "billing_address": this.billingAddress,
        }

        console.log(formData);

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;

        const response = await axios.post('http://127.0.0.1:8000/payments/stripe-confirm-payment/', formData);

        const data = await response.data

        if (data.status === 'success') {
          alert("Payment Successful! Order ID: " + data.order_id);
          localStorage.removeItem('cart');
        } else {
          alert("Payment Confirmation Failed");
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
#card-element {
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>
