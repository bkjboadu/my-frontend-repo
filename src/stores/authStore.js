import { defineStore } from 'pinia'
import api from '@/utils/api.js'
import { useCommonUtils } from '@/stores/commonStore.js'
import Cookies from 'js-cookie'
import router from '@/router/index.js'

const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    login(payload) {
      this.$patch({ loading: true });
      const commonStore = useCommonUtils();
      api.post('/accounts/login/', payload)
        .then((response) => {
          commonStore.showAlert(response.data?.message || 'Login successful.', 'success');
          this.setUser(response.data?.user);
          Cookies.set('authToken', response.data?.access);
          Cookies.set("refreshToken", response.data?.refresh);
          setTimeout(() => {
            router.push({ name: 'home' });
          }, 3000);
        })
        .catch((error) => {
          commonStore.showAlert(error.response?.data?.message || 'An error occurred. Please try again.', 'error');
        })
        .finally(() => {
          this.$patch({ loading: false });
        });

    },
    register(payload) {
      this.$patch({ loading: true });
      const commonStore = useCommonUtils();
      api.post('/accounts/signup/', payload)
        .then((response) => {
          commonStore.showAlert(response.data?.message || 'Account created successfully. Please login to continue.', 'success');
          setTimeout(() => {
            router.push({ name: 'login' });
          }, 3000);
        })
        .catch((error) => {
          commonStore.showAlert(error.response?.data?.message || 'An error occurred. Please try again.', 'error');
        })
        .finally(() => {
          this.$patch({ loading: false });
        });
    },
    loginWithGoogle(code) {
      api.post("/accounts/google-auth/", { code })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
  persist: true,
})

export default useAuthStore;