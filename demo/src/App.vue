<template>
	<div>
		<navigation-vue />
		<div class="page-view">
			<router-view v-slot="{ Component }">
				<transition
					name="fade"
					mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import NavigationVue from './components/Navigation.vue';
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
</style>
