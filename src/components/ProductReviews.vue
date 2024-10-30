<script>
import Avatar from 'primevue/avatar'
export default {
  name: 'ProductReviews',
  components: { Avatar },
  props: {
    reviews: {
      type: Array,
      required: true
    },
    productName: {
      type: String,
      required: true
    }
  },
  methods: {
    timeAgo(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        return '1 day ago';
      }
      return `${diffDays} days ago`;
    }
  }
}
</script>

<template>
  <div>
    <div v-if="reviews?.length">
      <div v-for="review in reviews" :key="review.id" class="flex gap-6 px-4 py-6 border-b">
        <div class="basis-2/6 border-r">
          <Avatar label="MA" size="large"/>
          <p class="mt-3 mb-1 flex items-center gap-2">
            <i class="pi pi-verified text-blue-primary"></i>
            <span class="text-dark-primary">Verified Customer</span>
          </p>
          <p class="font-bold text-lg mb-4">Michael Adams</p>
          <p class="flex items-center gap-2">
            <i class="pi pi-heart text-blue-primary"></i>
            <span>I recommend this product</span>
          </p>
        </div>
        <div class="w-full flex flex-col justify-center gap-3">
          <p class="text-dark-primary font-bold">{{productName}}</p>
          <p>{{review?.comment}}</p>
          <p class="font-semibold text-blue-primary">Was this review helpful?</p>
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-center gap-4 text-blue-primary">
              <i class="pi pi-thumbs-up"></i>
              <i class="pi pi-thumbs-down"></i>
            </div>
            <p>{{timeAgo(review?.created_at)}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-500">No reviews yet</p>
    </div>
  </div>
</template>

<style scoped>

</style>