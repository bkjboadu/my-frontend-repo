<script>
import { computed } from 'vue'

export default {
  name: 'AppSelect',
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: 'Select'
    },
    options: {
      type: Array,
      default: () => []
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    showCheck: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasError: false,
      isFocused: false,
      isOpen: false
    }
  },
  computed: {
    spanStyles() {
      if(this.hasError) return 'translate-y-[-10%] scale-[0.80] text-[#EF4444]'
      if(this.isFocused) return 'translate-y-[-10%] scale-[0.80] text-[#9CA3AF]'
      return 'translate-y-[18%] scale-100 text-[#9CA3AF]'
    }
  },
  methods: {
    toggleOptions(event) {
      const selectItem = event.target.closest("[data-element]")
      if(selectItem && selectItem.dataset.element === 'single-select') {
        this.isFocused = this.modelValue ? true : !this.isFocused
        this.isOpen = !this.isOpen
      } else if(selectItem && selectItem.dataset.element === 'options') {
        this.isOpen = true
      } else {
        if(!this.modelValue) {
          this.isFocused = false
        }
        this.isOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.toggleOptions)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.toggleOptions)
  }
}
</script>

<template>
  <div data-element="single-select" class="relative w-full h-10 border border-[#9CA3AF] cursor-pointer">
    <p class="absolute left-2 top-0 bottom-0 transition duration-300 ease-linear text-sm" :class="spanStyles">
      {{label}}
      <span class="text-red-500" v-if="isRequired">*</span>
    </p>
    <p class="ml-3 mt-3">{{modelValue ? modelValue : ""}}</p>
    <div v-if="isOpen" data-element="options" class="options absolute top-full right-0 left-0 bg-white shadow-md px-4 py-3">
      <div v-if="options.length">
        <div v-for="option in options" :key="option.key" class="border-b p-2 flex items-center">
          <input
            @change="$emit('update:modelValue', $event.target.value)"
            type="radio"
            name="option"
            :value="option.key"
            :id="option.key"
            :checked="option.key === modelValue"
          >
          <label :for="option.key" :class="['cursor-pointer pl-3', option?.type === 'icon' ? 'w-12 h-8' : 'w-max']">
            <img v-if="option?.type === 'icon'" class="w-full h-full object-contain" :src="option.image" alt="">
            <span v-else>{{option.value}}</span>
          </label>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-500">No options available</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>