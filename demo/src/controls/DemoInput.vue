<template>
	<ControlWrapper
		:label="label"
		:info="info">
		<div class="demo-input-container">
			<input
				:type="type"
				:id="id"
				:name="name"
				:value="modelValue"
				@input="updateModelValue"
				class="demo-input-field"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxLength"
				:minlength="minLength" />
		</div>
	</ControlWrapper>
</template>

<script setup lang="ts">
import ControlWrapper from './ControlWrapper.vue';

defineProps<{
	modelValue: string | number;
	label?: string;
	info?: string;
	id: string;
	name?: string;
	type?: string;
	placeholder?: string;
	disabled?: boolean;
	maxLength?: number;
	minLength?: number;
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
.demo-input-container {
	flex: 1;
	position: relative;
}

.demo-input-field {
	width: 100%;
	padding: 8px 10px;
	border-radius: 4px;
	border: 1px solid #555;
	background-color: #444;
	color: #ddd;
	font-size: 0.9rem;
	box-sizing: border-box;
	transition: border-color 0.2s;
}

.demo-input-field:focus {
	outline: none;
	border-color: #666;
	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.demo-input-field::placeholder {
	color: #888;
}

.demo-input-field:disabled {
	background-color: #333;
	cursor: not-allowed;
	opacity: 0.7;
}
</style>
