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

// Legacy demos for testing backward compatibility
const legacyRoutes = [
	{ path: '/legacy', name: 'Legacy Home', component: () => import('./legacy/Index.vue') },
	{ path: '/legacy/map', name: 'Legacy Map', component: () => import('./legacy/Map.vue') },
	{ path: '/legacy/map2', name: 'Legacy Map2', component: () => import('./legacy/Map2.vue') },
	{ path: '/legacy/markers', name: 'Legacy Markers', component: () => import('./legacy/Markers.vue') },
	{ path: '/legacy/markers2', name: 'Legacy Markers2', component: () => import('./legacy/Markers2.vue') },
	{ path: '/legacy/info-window', name: 'Legacy InfoWindow', component: () => import('./legacy/InfoWindow.vue') },
	{ path: '/legacy/popup', name: 'Legacy Popup', component: () => import('./legacy/Popup.vue') },
	{ path: '/legacy/polylines', name: 'Legacy Polylines', component: () => import('./legacy/Polylines.vue') },
	{ path: '/legacy/polylines2', name: 'Legacy Polylines2', component: () => import('./legacy/Polylines2.vue') },
	{ path: '/legacy/shapes', name: 'Legacy Shapes', component: () => import('./legacy/Shapes.vue') },
	{ path: '/legacy/cluster', name: 'Legacy Cluster', component: () => import('./legacy/Cluster.vue') },
	{ path: '/legacy/heatmap', name: 'Legacy Heatmap', component: () => import('./legacy/Heatmap.vue') },
];

const otherRoutes = [
	{ path: '/:catchAll(.*)', name: 'Home', component: () => import('./controls/EmptyComponent.vue') },
];

const router = createRouter({
	history: createWebHistory(),
	routes: [...menuRoutes, ...legacyRoutes, ...otherRoutes],
});

router.afterEach((e) => {
	clearLogs();
	log(`** ${e.name?.toString()} Example **`);
});

export default router;
