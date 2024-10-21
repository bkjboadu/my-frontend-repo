
import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner';
// import Aura from '@primevue/themes/aura';

import App from './App.vue'
import router from './router'
import './styles.css'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';



const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedState))
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(ToastService)

app.component('AppToast', Toast)
app.component('AppProgressSpinner', ProgressSpinner)

const components = {
  AppInputField: () => import('@/components/shared/AppInputField.vue'),
  AppButton: () => import('@/components/shared/AppButton.vue'),
  AppAlert: () => import('@/components/shared/AppAlert.vue'),
  AppSelect: () => import('@/components/shared/AppSelect.vue'),
  AppLoader: () => import('@/components/shared/AppLoader.vue'),
}

Object.keys(components).forEach(key => {
  app.component(key, defineAsyncComponent(components[key]))
})

// app.component('app-input-field', defineAsyncComponent(() => import('@/components/shared/AppInputField.vue')))

app.mount('#app')
