<template>
	<nav>
		<div class="logo">
			<router-link
				to="/"
				exact>
				<img
					src="../assets/v3-gmaps.png"
					alt="V3 GMaps Logo" />
			</router-link>
		</div>
		<div class="links">
			<label for="navigation-select">Component:</label>
			<select
				id="navigation-select"
				@change="gotoRoute"
				:value="selRoute">
				<option
					v-for="route in allRoutes"
					:key="route.name"
					:value="route.path">
					{{ route.name }}
				</option>
			</select>
		</div>
		<div class="github">
			<a
				href="https://github.com/xon52/v3-gmaps"
				target="_blank"
				rel="noopener">
				<img
					src="../assets/github.png"
					alt="GitHub Logo" />
			</a>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { menuRoutes } from '../router';

// Get all routes with separate sections for modern and legacy demos
const modernRoutes = menuRoutes;
const legacyRoutes = [
	{ path: '/legacy', name: '--- Legacy Demos ---' },
	{ path: '/legacy/map', name: 'Legacy Map' },
	{ path: '/legacy/map2', name: 'Legacy Map2' },
	{ path: '/legacy/markers', name: 'Legacy Markers' },
	{ path: '/legacy/markers2', name: 'Legacy Markers2' },
	{ path: '/legacy/info-window', name: 'Legacy InfoWindow' },
	{ path: '/legacy/popup', name: 'Legacy Popup' },
	{ path: '/legacy/polylines', name: 'Legacy Polylines' },
	{ path: '/legacy/polylines2', name: 'Legacy Polylines2' },
	{ path: '/legacy/shapes', name: 'Legacy Shapes' },
	{ path: '/legacy/cluster', name: 'Legacy Cluster' },
	{ path: '/legacy/heatmap', name: 'Legacy Heatmap' },
];

// Combine all routes for navigation
const allRoutes = [...modernRoutes, ...legacyRoutes];

const router = useRouter();
const selRoute = computed(() => {
	const route = router.currentRoute.value.path;
	return allRoutes.some((e) => e.path === route) ? route : null;
});

const gotoRoute = (e: Event) => router.push((e.target as HTMLSelectElement).value);
</script>

<style scoped>
nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #444;
	border-bottom: 1px solid #999;
	padding: 0 20px;
	margin: 0;
}

.logo,
.github {
	margin: 5px;
	height: 35px;
}

.logo img,
.github img {
	height: 100%;
}

.links {
	font-size: larger;
	margin: 0 20px;
}

.links label {
	margin-right: 10px;
}

.links select {
	font-size: large;
	padding: 10px;
	color: #444;
	min-width: 300px;
	height: 100%;
}
</style>
