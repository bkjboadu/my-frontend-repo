<script setup>

import {computed, ref, watch} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Label'
  },
  type: {
    type: String,
    default: 'text'
  },
  isError: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  large: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)
const hasError = ref(props.isError)
const showPassword = ref(false)
// const value = ref('')

const spanStyles = computed(() => {
  if(hasError.value) return 'translate-y-[-10%] scale-[0.80] text-[#EF4444]'
  if(isFocused.value) return 'translate-y-[-10%] scale-[0.80] text-[#9CA3AF]'
  return 'translate-y-[18%] scale-100 text-[#9CA3AF]'
})
const containerHeight = computed(() => {
  if(props.large) return 'h-28'
  return 'h-11'
})

const containerStyles = computed(() => {
  if(hasError.value) return 'border-[#EF4444]'
  if(isFocused.value) return 'border-[#2C3647]'
  return 'border-[#9CA3AF]'
})

const handleUnFocus = () => {
  if(props.modelValue.trim() === '') {
    isFocused.value = false
  }
}

const handleUpdate = (event) => {
  emit('update:modelValue', event.target.value)
  if(props.isRequired) {
    hasError.value = event.target.value.trim() === ''
  } else {
    hasError.value = false
  }
}

// watch(value, (newValue) => {
//   if (props.label === 'Points' && /\D/.test(newValue)) {
//     value.value = newValue.replace(/\D/g, '')
//   }
//   emit('update:value', {name: props.label.toLowerCase(), value: newValue})
// })

</script>

<template>
  <div>
    <div class="w-full relative px-3 border" :class="[containerStyles, containerHeight]">
      <p class="absolute left-2 top-0 bottom-0 transition duration-300 ease-linear text-sm" :class="spanStyles">
        {{label}}
        <span class="text-red-500" v-if="isRequired">*</span>
      </p>
      <textarea
        v-if="large"
        :value="modelValue"
        @focus="isFocused = true"
        @blur="handleUnFocus"
        name="largeInput"
        id="largeInput"
        class="input resize-none px-3 pt-3"
        @input="handleUpdate"
        v-bind="$attrs"
      ></textarea>
      <input
        v-else
        :value="modelValue"
        @focus="isFocused = true"
        @blur="handleUnFocus"
        class="input px-3"
        :type="type === 'password' && showPassword ? 'text' : type"
        @input="handleUpdate"
        v-bind="$attrs"
      />
      <p
        v-if="type === 'password'"
        class="absolute right-2 top-0 bottom-0 text-xs h-max w-max my-auto underline cursor-pointer text-gray-400"
        @click="showPassword = !showPassword"
      >
        {{ showPassword ? 'Hide' : 'Show' }}
      </p>
    </div>
    <p v-if="hasError" class="text-xs text-red-500">{{label}} can't be empty</p>
  </div>
</template>

<style scoped>

.input {
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 14px;
}

.input:focus {
  outline: none;
}

</style>