import gmaps from 'v3-gmaps'
import 'v3-gmaps/dist/style.css'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(gmaps, { key: import.meta.env.VITE_GOOGLE_KEY, libraries: ['visualization'] })
  .mount('#app')
