<template>
	<div class="control-section">
		<div class="control-section-content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
// No props needed
</script>

<style scoped>
.control-section {
	background-color: #383838;
	border-radius: 8px;
	padding: 16px;
	min-width: 180px;
	flex: 1;
	color: #ddd;
	margin-bottom: 16px;
}

.control-section-content {
	display: flex;
	flex-direction: column;
	gap: 8px;
}
</style>
