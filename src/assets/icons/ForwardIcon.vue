<script>
export default {
  name: 'ForwardIcon',
  props: {
    fill: {
      type: String,
      default: '#262F3D'
    },
    width: {
      type: String,
      default: '77'
    },
    height: {
      type: String,
      default: '41'
    }
  }
}
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 77 41" fill="none">
    <path d="M55.8818 0L52.452 3.32959L67.7147 18.1457H0V22.8545H67.7147L52.452 37.6704L55.8818 41L77 20.4999L55.8818 0Z" :fill="fill"/>
  </svg>
</template>

<style scoped>

</style>