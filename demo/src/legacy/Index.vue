<template>
	<div class="legacy-index">
		<h1>Legacy Components (v2)</h1>
		<p>These demos showcase the backward compatibility layer for v2 components.</p>

		<div class="legacy-links">
			<router-link
				v-for="route in legacyRoutes"
				:key="route.path"
				:to="route.path"
				class="legacy-link-item">
				{{ route.displayName || route.name }}
			</router-link>
		</div>

		<div class="back-link">
			<router-link to="/">← Back to Main App</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
const legacyRoutes = [
	{ path: '/legacy/map', name: 'map', displayName: 'Basic Map' },
	{ path: '/legacy/map2', name: 'map2', displayName: 'Multiple Maps' },
	{ path: '/legacy/markers', name: 'markers', displayName: 'Markers' },
	{ path: '/legacy/markers2', name: 'markers2', displayName: 'Advanced Markers' },
	{ path: '/legacy/infowindow', name: 'infowindow', displayName: 'Info Window' },
	{ path: '/legacy/polylines', name: 'polylines', displayName: 'Polylines & Polygons' },
	{ path: '/legacy/polylines2', name: 'polylines2', displayName: 'Multiple Polygons' },
	{ path: '/legacy/shapes', name: 'shapes', displayName: 'Shapes (Circles & Rectangles)' },
	{ path: '/legacy/heatmap', name: 'heatmap', displayName: 'Heatmap' },
	{ path: '/legacy/cluster', name: 'cluster', displayName: 'Marker Clustering' },
];
</script>

<style scoped>
.legacy-index {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}

h1 {
	color: #4285f4;
	margin-bottom: 10px;
}

.legacy-links {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 15px;
	margin: 30px 0;
}

.legacy-link-item {
	display: block;
	padding: 15px;
	background-color: #f5f5f5;
	border-radius: 8px;
	color: #4285f4;
	text-decoration: none;
	font-weight: 500;
	text-align: center;
	transition: all 0.2s ease;
	border: 1px solid #e0e0e0;
}

.legacy-link-item:hover {
	background-color: #e8f0fe;
	transform: translateY(-2px);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.back-link {
	margin-top: 30px;
	text-align: center;
}

.back-link a {
	color: #4285f4;
	text-decoration: none;
	font-weight: bold;
}
</style>
