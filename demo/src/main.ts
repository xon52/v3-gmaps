import gmaps from '../../src'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(gmaps, { key: import.meta.env.VITE_GOOGLE_KEY, libraries: ['visualization'] })
  .mount('#app')
