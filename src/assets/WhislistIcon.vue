<script>
export default {
  name: 'WhislistIcon',
  data() {
    return {
      isWhislisted: false,
      isHovered: false
    }
  }
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 39 39"
    :fill="isWhislisted || isHovered ? '#262F3D' : 'none'"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    class="transition-fill duration-300 ease-in-out cursor-pointer"
    @click="isWhislisted = !isWhislisted"
  >
    <circle
      cx="19.6719"
      cy="19.1216"
      r="19"
      :fill="isWhislisted || isHovered ? 'none' : 'white'"/>
    <path d="M19.6719 29.3784C19.6366 29.3784 19.6017 29.3693 19.5704 29.3513L19.5702 29.3511C19.4634 29.2895 16.6878 27.6782 13.8756 25.2528C12.2108 23.8169 10.8953 22.4041 9.95645 21.056C8.74094 19.3107 8.16267 17.6786 8.17199 16.198C8.18315 14.436 8.81383 12.7892 9.93715 11.555C11.0779 10.3017 12.5884 9.62158 14.1927 9.62158C16.2451 9.62158 18.1419 10.7717 19.2419 12.6265L19.6719 13.3518L20.102 12.6265C21.2019 10.7717 23.0988 9.62158 25.1512 9.62158C26.6674 9.62158 28.1204 10.2362 29.243 11.366L29.5977 11.0135L29.243 11.366C30.4757 12.6065 31.1833 14.3685 31.1718 16.2006C31.1624 17.6807 30.5718 19.3123 29.3528 21.0563C28.4105 22.4044 27.0964 23.817 25.438 25.2526C22.6359 27.6779 19.8801 29.2892 19.7741 29.3509C19.7424 29.3693 19.7071 29.3784 19.6719 29.3784Z" stroke="#262F3D"/>
  </svg>
</template>

<style scoped>
@media (max-width: 768px) {
  svg {
    width: 22px;
    height: 22px;
  }
}
@media (min-width: 768px) {
  svg {
    width: 39px;
    height: 39px;
  }
}
</style>