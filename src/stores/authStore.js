import { defineStore } from 'pinia'


const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  }
})

export default useAuthStore;