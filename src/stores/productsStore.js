import { defineStore } from 'pinia'
import Api from '@/utils/api.js'


const useProductStore = defineStore("products", {
  state() {
    return {
      storeId: 34,
      storeName: "My Store",
      storeDetails: {},
      allCategories: ["All", "Electronics", "Clothing", "Books"],
      singleCategory: null,
      products: [],
      singleProduct: null,
    }
  },
  actions: {
    getStoreDetails() {
      Api.get('/inventory/stores/34/')
        .then((response) => {
          this.$patch({
            storeDetails: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  persist: true
})

export default useProductStore;