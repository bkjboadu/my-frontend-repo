import { defineStore } from 'pinia'
import api from '@/utils/api.js'


const useOrderAndPaymentStore = defineStore("orderAndPayment", {
  state: () => ({
    order: null,
    payment: null,
    loading: false,
    stripeClientSecret: null,
    stripePaymentIntentId: null,
  }),
  getters: {
    isOrderPlaced: (state) => !!state.order,
    isPaymentDone: (state) => !!state.payment,
  },
  actions: {
    placeOrder(payload) {
      this.$patch({ loading: true });
      const commonStore = useCommonUtils();
      api.post('/orders/place/', payload)
        .then((response) => {
          commonStore.showAlert(response.data?.message || 'Order placed successfully.', 'success');
          this.setOrder(response.data?.order);
          setTimeout(() => {
            router.push({ name: 'home' });
          }, 3000);
        })
        .catch((error) => {
          commonStore.showAlert(error.response?.data?.message || 'An error occurred. Please try again.', 'error');
        })
        .finally(() => {
          this.$patch({ loading: false });
        });
    },
    makeStripePayment(payload) {
      return api.post('/payments/stripe-create-payment-intent/', payload);
    },
    initStripePayment(cart) {
      return api.post("/payments/stripe-create-payment-intent/", { cart })
        .then(response => {
          this.$patch({
            stripeClientSecret: response.data.clientSecret,
            stripePaymentIntentId: response.data.payment_intent_id
          });
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  persist: true,
})

export default useOrderAndPaymentStore