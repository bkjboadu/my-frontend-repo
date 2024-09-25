import { defineStore } from 'pinia'
import api from '@/utils/api.js'


const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    login(payload) {
      api.post('auth_user/login/', payload)
        .then((response) => {
          console.log(response)
          // this.setUser(response.data.user);
        })
        .catch((error) => {
          console.error(error);
        });

    },
    register(payload) {
      api.post('auth_user/signup/', payload)
        .then((response) => {
          this.setUser(response.data.user);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  }
})

export default useAuthStore;