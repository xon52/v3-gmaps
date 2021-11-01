import { createRouter, createWebHistory } from 'vue-router'
import IndexVue from './components/Index.vue'
import MarkersVue from './components/Markers.vue'
import ShapeVue from './components/Shape.vue'

const routes = [
  { path: '/', component: IndexVue },
  { path: '/markers', component: MarkersVue },
  { path: '/shapes', component: ShapeVue },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((e) => {
//   console.log(e)
// })

export default router
