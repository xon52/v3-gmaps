<template>
	<ControlWrapper
		:label="label"
		:info="info">
		<div class="slider-content">
			<input
				:value="modelValue"
				:id="id"
				type="range"
				:min="min"
				:max="max"
				:step="step"
				class="scale-slider"
				@input="(e) => $emit('update:modelValue', Number((e.target as HTMLInputElement).value))" />
			<div class="scale-value">{{ modelValue }}</div>
		</div>
	</ControlWrapper>
</template>

<script setup lang="ts">
import ControlWrapper from './ControlWrapper.vue';

defineProps<{
	modelValue: number;
	id: string;
	label: string;
	info?: string;
	min?: number;
	max?: number;
	step?: number;
}>();

defineEmits<{
	(e: 'update:modelValue', value: number): void;
}>();
</script>

<style scoped>
.slider-content {
	display: flex;
	align-items: center;
	flex: 1;
}

.scale-slider {
	flex: 1;
	-webkit-appearance: none;
	appearance: none;
	height: 6px;
	background: #444;
	border-radius: 3px;
	outline: none;
}

.scale-slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: #4285f4;
	cursor: pointer;
}

.scale-slider::-moz-range-thumb {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: #4285f4;
	cursor: pointer;
	border: none;
}

.scale-value {
	margin-left: 10px;
	min-width: 36px;
	font-size: 0.9rem;
	color: #ddd;
	font-family: monospace;
}
</style>
