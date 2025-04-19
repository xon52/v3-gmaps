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
					v-for="route in menuRoutes"
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

const router = useRouter();
const selRoute = computed(() => {
	const route = router.currentRoute.value.path;
	return menuRoutes.some((e) => e.path === route) ? route : null;
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
