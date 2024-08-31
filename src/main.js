
import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './styles.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const components = {
  AppInputField: () => import('@/components/shared/AppInputField.vue'),
  AppButton: () => import('@/components/shared/AppButton.vue'),
  AppAlert: () => import('@/components/shared/AppAlert.vue'),
  AppSelect: () => import('@/components/shared/AppSelect.vue'),
}

Object.keys(components).forEach(key => {
  app.component(key, defineAsyncComponent(components[key]))
})

// app.component('app-input-field', defineAsyncComponent(() => import('@/components/shared/AppInputField.vue')))

app.mount('#app')
