<template>
	<ControlWrapper
		:label="label"
		:info="info">
		<div class="color-input-container">
			<input
				type="color"
				:id="id"
				:name="name"
				:value="modelValue"
				@input="updateModelValue"
				class="color-input"
				:disabled="disabled" />
			<div class="color-value">{{ modelValue }}</div>
		</div>
	</ControlWrapper>
</template>

<script setup lang="ts">
import ControlWrapper from './ControlWrapper.vue';

defineProps<{
	modelValue: string;
	label?: string;
	info?: string;
	id: string;
	name?: string;
	disabled?: boolean;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: string];
}>();

const updateModelValue = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};
</script>

<style scoped>
.color-input-container {
	display: flex;
	align-items: center;
}

.color-input {
	width: 50px;
	height: 30px;
	border: none;
	border-radius: 4px;
	padding: 0;
	cursor: pointer;
	margin-right: 10px;
}

.color-input:focus {
	outline: 1px solid #666;
}

.color-value {
	font-size: 0.9rem;
	color: #ddd;
	font-family: monospace;
}
</style>
