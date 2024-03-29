import { createRouter, createWebHistory } from 'vue-router'
import { clearLogs, log } from './store'

export const menuRoutes = [
  { path: '/map', name: 'Map', component: () => import('./components/Map.vue') },
  { path: '/map-2', name: 'Map 2', component: () => import('./components/Map2.vue') },
  { path: '/cluster', name: 'Cluster', component: () => import('./components/Cluster.vue') },
  { path: '/info-window', name: 'InfoWindow', component: () => import('./components/InfoWindow.vue') },
  { path: '/heatmap', name: 'Heatmap', component: () => import('./components/Heatmap.vue') },
  { path: '/markers', name: 'Markers', component: () => import('./components/Markers.vue') },
  { path: '/markers-2', name: 'Markers 2', component: () => import('./components/Markers2.vue') },
  { path: '/polylines', name: 'Polylines', component: () => import('./components/Polylines.vue') },
  { path: '/polylines-2', name: 'Polylines 2', component: () => import('./components/Polylines2.vue') },
  { path: '/popup', name: 'Popup', component: () => import('./components/Popup.vue') },
  { path: '/shapes', name: 'Shapes', component: () => import('./components/Shapes.vue') },
  { path: '/throttle', name: 'Throttle', component: () => import('./components/Throttle.vue') },
]
const otherRoutes = [{ path: '/:catchAll(.*)', name: 'Home', component: () => import('./components/Index.vue') }]
const router = createRouter({
  history: createWebHistory(),
  routes: [...menuRoutes, ...otherRoutes],
})

router.afterEach((e) => {
  clearLogs()
  log(`** ${e.name?.toString()} Example **`)
})

export default router
