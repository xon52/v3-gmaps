import { createRouter, createWebHistory } from 'vue-router'
import IndexVue from './components/Index.vue'
import MapVue from './components/Map.vue'
import Map2Vue from './components/Map2.vue'
import MarkersVue from './components/Markers.vue'
import Markers2Vue from './components/Markers2.vue'
import ShapesVue from './components/Shapes.vue'
import PolylinesVue from './components/Polylines.vue'
import Polylines2Vue from './components/Polylines2.vue'
import ThrottleVue from './components/Throttle.vue'
import { clearLogs, log } from './store'

export const routes = [
  { path: '/', name: 'Home', component: IndexVue },
  { path: '/map', name: 'Map', component: MapVue },
  { path: '/map-adv', name: 'Map (Adv)', component: Map2Vue },
  { path: '/markers', name: 'Markers', component: MarkersVue },
  { path: '/markers-adv', name: 'Markers (Adv)', component: Markers2Vue },
  { path: '/shapes', name: 'Shapes', component: ShapesVue },
  { path: '/polylines', name: 'Polylines', component: PolylinesVue },
  { path: '/polylines-adv', name: 'Polylines (Adv)', component: Polylines2Vue },
  { path: '/throttle', name: 'Throttle', component: ThrottleVue },
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
