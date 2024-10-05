<script>
import Tree from 'primevue/tree';

export default {
  name: 'SingleProduct',
  components: { Tree },
  data() {
    return {
      nodes: [
        {
          key: "price",
          label: 'Price',
          children: [
            {
              key: 2,
              label: 'Electronics',
            },
            {
              key: 6,
              label: 'Clothing',
            },
          ],
        },
        {
          key: "ratings",
          label: 'Ratings',
          children: [
            {
              key: 2,
              label: 'Electronics',
            },
            {
              key: 6,
              label: 'Clothing',
            },
          ],
        },
        {
          key: "capacity",
          label: 'Capacity',
          children: [
            {
              key: 2,
              label: 'Electronics',
            },
            {
              key: 6,
              label: 'Clothing',
            },
          ],
        },
        {
          key: "brand",
          label: 'Brand',
          children: [
            {
              key: 2,
              label: 'Electronics',
            },
            {
              key: 6,
              label: 'Clothing',
            },
          ],
        },
      ],
    };
  },
  methods: {
    onSelectionChange(e) {
      console.log(e);
    },
  },
}
</script>

<template>
  <div class="w-full flex items-center gap-10 mx-6 my-6">
    <aside class="w-3/12 border border-gray-100 rounded-md px-4 py-6">
      <h4 class="text-blue-primary font-medium text-lg border-b pb-1">Filters</h4>
      <Tree
          :value="nodes"
          selection-mode="checkbox"
          @selection-change="onSelectionChange"
      />
    </aside>
    <section class="basis-9/12">Products</section>
  </div>
</template>

<style scoped>
:deep(.p-tree-node-content) {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
</style>