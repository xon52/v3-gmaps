import gmaps from '../../src'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(gmaps, { key: import.meta.env.VITE_GOOGLE_KEY })
  .mount('#app')
