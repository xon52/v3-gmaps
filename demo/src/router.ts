import { createRouter, createWebHistory } from 'vue-router'
import IndexVue from './components/Index.vue'
import MapVue from './components/Map.vue'
import MapOptionsVue from './components/MapAdv.vue'
import MarkersVue from './components/Markers.vue'
import ShapesVue from './components/Shapes.vue'
import PolylinesVue from './components/Polylines.vue'
import { clearLogs, log } from './store'

export const routes = [
  { path: '/', name: 'Home', component: IndexVue },
  { path: '/map', name: 'Map', component: MapVue },
  { path: '/map-options', name: 'Map (Adv)', component: MapOptionsVue },
  { path: '/markers', name: 'Markers', component: MarkersVue },
  { path: '/shapes', name: 'Shapes', component: ShapesVue },
  { path: '/polylines', name: 'Polylines', component: PolylinesVue },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((e) => {
  clearLogs()
  log(`${e.name?.toString()} Example Mounted`)
})

export default router
