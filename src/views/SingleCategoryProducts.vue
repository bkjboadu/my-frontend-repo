<script>
import Checkbox from 'primevue/checkbox';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import useProductStore from '@/stores/productsStore.js'
import ProductCard from '@/components/ProductCard.vue'
import AppLoader from '@/components/shared/AppLoader.vue'


export default {
  name: 'SingleCategoryProducts',
  components: { AppLoader, Checkbox, Accordion, AccordionPanel, AccordionHeader, AccordionContent, ProductCard },
  data() {
    return {
      nodes: [
        {
          key: "price",
          label: 'Price',
          filters: [
            {text: "Under Ghs 200", value: "price_max=200", isChecked: false},
            {text: "Ghs 200 - Ghs 500", value: "price_min=200&price_max=500", isChecked: false},
            {text: "Ghs 500 - Ghs 1000", value: "price_min=500&price_max=1000", isChecked: false},
            {text: "Above Ghs 1000", value: "price_min=1000", isChecked: false},
          ]
        },
        {
          key: "ratings",
          label: 'Ratings',
          filters: [
            {text: "5 Stars", value: "5 Stars"},
            {text: "4 Stars & Up", value: "4 Stars & Up", isChecked: false},
            {text: "3 Stars & Up", value: "3 Stars & Up", isChecked: false},
            {text: "2 Stars & Up", value: "2 Stars & Up", isChecked: false},
            {text: "1 Star & Up", value: "1 Star & Up", isChecked: false},
          ]
        },
        {
          key: "capacity",
          label: 'Capacity',
          filters: [
            {text: "1TB", value: "1TB", isChecked: false},
            {text: "500GB", value: "500GB", isChecked: false},
            {text: "256GB", value: "256GB", isChecked: false},
            {text: "128GB", value: "128GB", isChecked: false},
          ]
        },
        {
          key: "brand",
          label: 'Brand',
          filters: [
            {text: "Apple", value: "Apple", isChecked: false},
            {text: "Samsung", value: "Samsung", isChecked: false},
            {text: "Sony", value: "Sony", isChecked: false},
            {text: "Microsoft", value: "Microsoft", isChecked: false},
            {text: "HP", value: "HP", isChecked: false},
            {text: "Dell", value: "Dell", isChecked: false},
            {text: "Others", value: "Others", isChecked: false},
          ]
        },
      ],
      selectedKeys: [],
      isFiltered: false
    };
  },
  computed: {
    selectedFilters() {
      return this.nodes.map(node => {
        return {
          key: node.key,
          filters: node.filters.filter(filter => filter.isChecked)
        }
      })
    },
    productStore() {
      return useProductStore()
    },
    singleCategory() {
      return this.productStore.singleCategory
    },
    filteredProducts() {
      return this.productStore.filteredProducts
    },
    products() {
      return this.isFiltered ? this.filteredProducts : this.singleCategory?.products
    }
  },
  methods: {
    onSelectionChange(e) {
      console.log(e);
    },
    goToProduct(item) {
      this.productStore.setSingleProductId(item.id)
      this.$router.push({name: 'productDetails', params: {productName: item.name}})
    },
    handleCheckFilter(value, nodeIndex, filterIndex) {
      this.nodes[nodeIndex].filters.forEach((filter, index) => {
        if (index === filterIndex) {
          filter.isChecked = value
        } else {
          filter.isChecked = false
        }
      })
    }
  },
  watch: {
    $route(to, from) {
      this.productStore.setSingleCategory(null)
      this.productStore.updateFilteredProducts([])
      this.productStore.getCategoryDetails()
    },
    nodes: {
      handler(newVal) {
        const query = newVal.map(node => {
          return node.filters.filter(filter => filter.isChecked).map(filter => filter.value)
        }).reduce((acc, curr) => acc.concat(curr), []).join('&')

        if(query) {
          this.isFiltered = true
          this.productStore.filterProducts(query + `&category=${this.singleCategory?.id}`)
        } else {
          this.isFiltered = false
          this.productStore.updateFilteredProducts([])
        }


        // const selectedFilters = newVal.map(node => {
        //   return {
        //     key: node.key,
        //     filters: node.filters.filter(filter => filter.isChecked)
        //   }
        // })
      },
      deep: true
    }
  },
  mounted() {
    this.productStore.getCategoryDetails()
  },
  beforeUnmount() {
    this.productStore.setSingleCategory(null)
    this.productStore.updateFilteredProducts([])
  },
}
</script>

<template>
  <div class="w-full h-full px-6 py-6">
    <div class="w-full h-full flex gap-10">
      <aside class="w-3/12 border border-gray-100 rounded-md px-4 py-6 filters">
        <h4 class="text-blue-primary font-medium text-lg border-b pb-1">Filters</h4>
        <Accordion :value="['price']" multiple>
          <AccordionPanel
            v-for="(node, nodeIndex) in nodes"
            :key="nodeIndex"
            class="!border-0"
            :value="node.key"
          >
            <AccordionHeader class="!p-2">{{node.label}}</AccordionHeader>
            <AccordionContent>
              <ul>
                <li
                  v-for="(filter, filterIndex) in node.filters"
                  :key="filterIndex"
                  class="!p-2 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors duration-700 ease-in-out rounded-md"
                >
                  <Checkbox
                    v-model="filter.isChecked"
                    :inputId="filter.text"
                    binary
                    @update:modelValue="handleCheckFilter($event, nodeIndex, filterIndex)"
                  />
                  <label class="cursor-pointer" :for="filter.text">{{filter.text}}</label>
                </li>
              </ul>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </aside>
      <section class=" md:basis-9/12 w-full h-max py-4">
        <div class="flex items-center justify-between sort-pagination">
          <span>Showing 1 - 12 of  12</span>
          <span>Sort By: Featured</span>
        </div>
        <AppLoader v-if="productStore.loading" />
        <div class="flex items-center justify-center w-full" v-else>
          <div v-if="products?.length" class="grid grid-cols-2 md:grid-cols-3 gap-4 w-max">
            <ProductCard
              v-for="(product, index) in products"
              :key="index"
              :item="product"
              @item-click="goToProduct"
            />
          </div>
          <p class="text-dark-primary text-lg font-medium mt-40" v-else>No Products Found</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-tree-node-selectable) {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .filters, .sort-pagination {
    display: none;
  }
}
</style>