<script>
import useCartStore from '@/stores/cartStore.js'
import api from '@/utils/api.js'

export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      quantity: this.item?.quantity || 1,
      removing: false,
      increasing: false,
      decreasing: false
    }
  },
  computed: {
    cartStore() {
      return useCartStore()
    }
  },
  methods: {
    updateQuantity() {
      this.cartStore.updateCartItemQuantity(this.item.id, this.quantity)
    },
    removeItem() {
      this.removing = true
      this.cartStore.removeFromCart(this.item.id)
        .then((response) => {
          this.cartStore.getUserCartData()
          this.$toast.add({severity: 'success', summary: 'Item removed', detail: response?.details || 'Item removed successfully', life: 3000})
        })
        .catch((error) => {
          this.$toast.add({severity: 'error', summary: 'Error removing item', detail: error?.response?.data?.detail || 'An error occurred', life: 3000})
        })
        .finally(() => {
          this.removing = false
        })
    },
    increaseDecreaseQuantity(type) {
      if (type === 'increase') {
        this.increasing = true
      }
      if (type === 'decrease') {
        this.decreasing = true
      }
      api.put(`/carts/cart/item/${this.item.id}/`, { quantity: type === 'increase' ? this.quantity + 1 : this.quantity - 1 })
        .then((response) => {
          this.cartStore.getUserCartData()
            .then(() => {
              this.quantity = this.item.quantity
            })
          this.$toast.add({severity: 'success', summary: 'Item quantity updated', detail: response?.details || 'Item quantity updated successfully', life: 3000})
        })
        .catch((error) => {
          this.$toast.add({severity: 'error', summary: 'Error updating item quantity', detail: error?.response?.data?.detail || 'An error occurred', life: 3000})
        })
        .finally(() => {
          this.increasing = false
          this.decreasing = false
        })
    }
  }
}
</script>

<template>
  <div class="bg-[#FAFBFD] py-3 px-2 flex items-center gap-4">
    <div class="w-40 h-40 bg-[#E8EDF5] overflow-hidden basis-2/5">
      <img class="w-full h-full object-contain" src="#" alt="product">
    </div>
    <div class="w-full">
      <div class="flex items-center justify-between w-full">
        <p class="text-lg font-medium text-dark-primary">{{item?.product_name}}</p>
        <p class="text-dark-primary-light">Ghs {{item?.price_at_addition}}</p>
      </div>
      <p class="text-sm text-gray-500 mt-2">Capacity: </p>
      <p class="text-sm text-gray-500">color: </p>
      <p @click="removeItem" class="!text-red-500 w-max cursor-pointer hover:underline mt-2">
        <AppProgressSpinner v-if="removing" style="width: 20px; height: 20px" />
        <span v-else>Remove</span>
      </p>
      <div class="mt-2 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div>
            <AppProgressSpinner v-if="decreasing" style="width: 20px; height: 20px" />
            <i
              v-else
              class="pi pi-minus-circle cursor-pointer hover:text-gray-500"
              @click="increaseDecreaseQuantity('decrease')"
            ></i>
          </div>
<!--          <input-->
<!--            class="w-12 h-8 text-center border border-gray-300"-->
<!--            v-model="quantity"-->
<!--          >-->
          <p>{{quantity}}</p>
          <div>
            <AppProgressSpinner v-if="increasing" style="width: 20px; height: 20px" />
            <i
              v-else
              class="pi pi-plus-circle cursor-pointer hover:text-gray-500"
              @click="increaseDecreaseQuantity('increase')"
            ></i>
          </div>
        </div>
<!--        <i class="pi pi-heart"></i>-->
        <div>
          <span class="text-sm text-gray-500">Total price: Ghs {{item?.total_price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>