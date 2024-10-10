import { defineStore } from 'pinia'


export const useCommonUtils = defineStore("common-utils", {
  state() {
    return {
      isDarkMode: false,
      toast: {
        show: false,
        message: "",
        type: "success",
      },
      toastTimeoutId: null,
      openNavMenu: false
    }
  },
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    showAlert(message, type = "success", duration = 3000) {
      if (this.toastTimeoutId) {
        clearTimeout(this.toastTimeoutId)
      }
      this.toast.show = true
      this.toast.message = message
      this.toast.type = type

      this.toastTimeoutId = setTimeout(() => {
        this.hideToast()
      }, duration)
    },
    hideToast() {
      this.toast.show = false

      if (this.toastTimeoutId) {
        clearTimeout(this.toastTimeoutId)
      }
    },
    toggleNav() {
      this.openNavMenu = !this.open
    }
  },
  persist: true
})