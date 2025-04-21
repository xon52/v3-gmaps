<template>
	<ControlWrapper
		:label="label"
		:info="info">
		<div class="button-group">
			<button
				v-for="(option, index) in options"
				:key="option.value"
				class="option-button"
				:class="{
					active: modelValue === option.value,
					'first-button': index === 0,
					'last-button': index === options.length - 1,
				}"
				@click="$emit('update:modelValue', option.value)">
				{{ option.label }}
			</button>
		</div>
	</ControlWrapper>
</template>

<script setup lang="ts">
import ControlWrapper from './ControlWrapper.vue';

interface Option {
	value: string;
	label: string;
}

defineProps<{
	modelValue: string;
	options: Option[];
	label?: string;
	info?: string;
}>();

defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<style scoped>
.button-group {
	display: flex;
}

.option-button {
	padding: 4px 8px;
	border: 1px solid #555;
	background: #444;
	color: #ddd;
	cursor: pointer;
	margin: 0;
	transition: background-color 0.2s;
	border-radius: 0;
}

.option-button:not(:first-child) {
	border-left: none;
}

.first-button {
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}

.last-button {
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}

.option-button:hover:not(.active) {
	background: #555;
}

.option-button.active {
	background: #4285f4;
	border-color: #4285f4;
	z-index: 1;
}
</style>
