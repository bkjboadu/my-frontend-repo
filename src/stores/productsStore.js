import { defineStore } from 'pinia'
import Api from '@/utils/api.js'


const useProductStore = defineStore("products", {
  state() {
    return {
      storeId: 1,
      storeName: "My Store",
      allCategories: ["All", "Electronics", "Clothing", "Books"],
      singleCategory: null,
      products: [],
      singleProduct: null,
    }
  },
  actions: {
    getAllCategories() {
      Api.get('/inventory/stores/1')
        .then((response) => {
          this.allCategories = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  persist: true
})

export default useProductStore;