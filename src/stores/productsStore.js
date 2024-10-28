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
      filteredProducts: [],
      singleProduct: null,
      singleProductId: null,
      singleCategoryId: null,
      loading: true
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
    },
    getCategoryDetails() {
      this.$patch({
        loading: true
      })
      Api.get(`/inventory/categories/${this.singleCategoryId}/`)
        .then((response) => {
          this.$patch({
            singleCategory: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$patch({
            loading: false
          })
        })
    },
    setSingleCategory(category) {
      this.$patch({
        singleCategory: category
      })
    },
    setSingleCategoryId(id) {
      this.$patch({
        singleCategoryId: id
      })
    },
    setSingleProductId(id) {
      this.$patch({
        singleProductId: id
      })
    },
    getSingleProduct() {
      this.$patch({
        loading: true
      })
      Api.get(`/inventory/products/${this.singleProductId}/`)
        .then((response) => {
          this.$patch({
            singleProduct: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$patch({
            loading: false
          })
        })
    },
    filterProducts(query) {
      this.$patch({
        loading: true
      })
      Api.get(`/inventory/products/?${query}`)
        .then((response) => {
          this.$patch({
            filteredProducts: response.data
          })
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$patch({
            loading: false
          })
        })
    },
    updateFilteredProducts(products) {
      this.$patch({
        filteredProducts: products
      })
    }
  },
  persist: true
})

export default useProductStore;