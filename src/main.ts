import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import './style.css'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#6B5BFF',
          secondary: '#FF6B54',
          success: '#17D7A6',
          warning: '#FFA500',
          error: '#FF4757',
          info: '#00D4FF'
        }
      }
    }
  }
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
