<script>
import RedCloseIconWithCircle from '@/assets/icons/RedCloseIconWithCircle.vue'
import GreenCheckWithCircle from '@/assets/icons/GreenCheckWithCircle.vue'
import { useCommonUtils } from '@/stores/commonStore.js'

export default {
  name: 'AppAlert',
  components: { GreenCheckWithCircle, RedCloseIconWithCircle },
  // props: {
  //   type: {
  //     type: String,
  //     default: 'success',
  //   },
  //   modelValue: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   message: {
  //     type: String,
  //     default: 'This is an alert message top-8 right-8 z-50 tra nsform transition duration-300 ease-linear top-8 right-8 z-50 trans form transition duration-300 ease-linear top-8 right-8 z-50 transform transition duration-300 ease-linear',
  //   },
  // },
  data() {
    return {}
  },
  computed: {
    utilsStore() {
      return useCommonUtils()
    }
  },
  // watch: {
  //   modelValue(value) {
  //     this.show = value;
  //   }
  // },
}
</script>

<template>
  <div
    v-bind="$attrs"
    class="fixed w-full max-w-[500px] top-8 right-8 z-50 transform transition duration-300 ease-linear"
    :class="{
      'translate-x-[120%]': !utilsStore.toast.show,
      'translate-x-0': utilsStore.toast.show,
    }"
  >
    <div
      class="border px-4 py-3 rounded relative"
      role="alert"
      :class="{
        'bg-red-100 border-red-400 text-red-700': utilsStore.toast.type === 'error',
        'bg-blue-100 border-blue-400 text-blue-700': utilsStore.toast.type === 'info',
        'bg-green-100 border-green-400 text-green-700': utilsStore.toast.type === 'success',
      }"
    >
      <div class="flex gap-2 items-center">
        <div>
          <RedCloseIconWithCircle v-if="utilsStore.toast.type === 'error'"/>
          <GreenCheckWithCircle v-if="utilsStore.toast.type === 'success'"/>
        </div>
        <span class="block sm:inline">{{utilsStore.toast.message}}</span>
      </div>
      <span @click="utilsStore.hideToast()" class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg class="fill-dark-primary h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 5.652a.5.5 0 0 1 0 .707L10.707 10l3.64 3.64a.5.5 0 0 1-.708.708L10 10.707l-3.64 3.64a.5.5 0 0 1-.708-.708L9.293 10 5.652 6.36a.5.5 0 0 1 .708-.708L10 9.293l3.64-3.64a.5.5 0 0 1 .708 0z"/>
        </svg>
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>