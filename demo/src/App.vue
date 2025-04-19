<template>
	<div>
		<demo-navigation />
		<div class="page-view">
			<router-view v-slot="{ Component }">
				<transition
					name="fade"
					mode="out-in">
					<component :is="Component" />
				</transition>
				<!-- Show welcome content when on home route -->
				<div v-if="isHome">
					<h1 class="instructions">↑↑↑ Select a component ↑↑↑</h1>
					<div class="logo">
						<img src="./assets/v3-gmaps.png" />
						<h1>v3-gmaps demo</h1>
					</div>
				</div>
			</router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import DemoNavigation from './controls/DemoNavigation.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isHome = computed(() => route.name === 'Home');
</script>

<style>
body {
	background-color: #333;
	color: #ddd;
	padding: 0;
	margin: 0;
}
.component-name {
	color: darkorange;
	font-weight: bolder;
}
.page-view {
	width: 100%;
	min-height: 500px;
}
.fade-enter-active {
	animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.instructions {
	text-align: center;
}
.logo {
	margin-top: 100px;
	font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	text-align: center;
}
.logo img {
	max-width: 300px;
}
</style>
