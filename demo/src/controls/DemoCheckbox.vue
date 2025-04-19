<template>
	<ControlWrapper
		:label="label"
		:info="info">
		<div class="demo-checkbox">
			<input
				type="checkbox"
				:id="id"
				:name="name"
				:value="value"
				:checked="modelValue"
				@change="updateModelValue"
				class="demo-checkbox-input" />
			<label
				:for="id"
				class="demo-checkbox-label">
				<slot></slot>
			</label>
		</div>
	</ControlWrapper>
</template>

<script setup lang="ts">
import ControlWrapper from './ControlWrapper.vue';

defineProps<{
	modelValue: boolean;
	label?: string;
	info?: string;
	id: string;
	name?: string;
	value?: string | number | boolean;
}>();

const emit = defineEmits<{
	'update:modelValue': [value: boolean];
}>();

const updateModelValue = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.checked);
};
</script>

<style scoped>
.demo-checkbox {
	display: flex;
	align-items: center;
}

.demo-checkbox-input {
	cursor: pointer;
	margin: 0;
	/* Fix size issue for checkbox */
	height: 16px;
	width: 16px;
}

.demo-checkbox-label {
	margin-left: 8px;
	cursor: pointer;
	user-select: none;
	color: #ddd;
}
</style>
