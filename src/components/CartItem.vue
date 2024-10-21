<script>
import useCartStore from '@/stores/cartStore.js'

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
      removing: false
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
          <i class="pi pi-minus-circle cursor-pointer hover:text-gray-500"></i>
          <input
            class="w-12 h-8 text-center border border-gray-300"
            v-model="quantity"
          >
          <i class="pi pi-plus-circle cursor-pointer hover:text-gray-500"></i>
        </div>
        <i class="pi pi-heart"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>