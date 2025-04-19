import { createRouter, createWebHistory } from 'vue-router';
import { clearLogs, log } from './store';

export const menuRoutes = [
	{ path: '/map', name: 'Map', component: () => import('./components/MapDemo.vue') },
	{ path: '/markers', name: 'Markers', component: () => import('./components/MarkersDemo.vue') },
	{ path: '/marker-pins', name: 'Marker Pins', component: () => import('./components/MarkerPins.vue') },
	{ path: '/info-window', name: 'Info Window', component: () => import('./components/InfoWindowDemo.vue') },
	{ path: '/polylines', name: 'Polylines', component: () => import('./components/PolylinesDemo.vue') },
	{ path: '/shapes', name: 'Shapes', component: () => import('./components/ShapesDemo.vue') },
	{ path: '/popup', name: 'Popup', component: () => import('./components/PopupDemo.vue') },
	{ path: '/heatmap', name: 'Heatmap', component: () => import('./components/HeatmapDemo.vue') },
	{ path: '/cluster', name: 'Cluster', component: () => import('./components/ClusterDemo.vue') },
	{ path: '/throttle', name: 'Throttle', component: () => import('./components/ThrottleDemo.vue') },
];
const otherRoutes = [
	{ path: '/:catchAll(.*)', name: 'Home', component: () => import('./controls/EmptyComponent.vue') },
];
const router = createRouter({
	history: createWebHistory(),
	routes: [...menuRoutes, ...otherRoutes],
});

router.afterEach((e) => {
	clearLogs();
	log(`** ${e.name?.toString()} Example **`);
});

export default router;
