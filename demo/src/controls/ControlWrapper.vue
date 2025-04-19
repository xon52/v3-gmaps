<template>
	<div class="control-wrapper">
		<label
			v-if="label"
			class="control-label">
			<span
				v-if="info"
				class="info-icon"
				:title="info">
				ⓘ
			</span>
			{{ label }}:
		</label>
		<div class="control-content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	label?: string;
	info?: string;
}>();
</script>

<style scoped>
.control-wrapper {
	display: flex;
	align-items: center;
	margin-bottom: 12px;
}

.control-label {
	min-width: 100px;
	flex: 0;
	font-size: 0.9rem;
	color: #ddd;
	padding-right: 10px;
	display: flex;
	align-items: center;
	gap: 4px;
}

.info-icon {
	cursor: help;
	font-size: 0.8rem;
	color: #999;
}

.control-content {
	flex: 1;
	display: flex;
}
</style>
