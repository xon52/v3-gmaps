<template>
	<button-group
		:model-value="modelValue"
		:options="options"
		:label="label"
		:info="info"
		@update:model-value="$emit('update:modelValue', $event)" />
</template>

<script setup lang="ts">
import { ButtonGroup } from './';

interface Props {
	modelValue: string;
	label?: string;
	info?: string;
	options?: { value: string; label: string }[];
}

const props = withDefaults(defineProps<Props>(), {
	options: () => [
		{ value: 'open', label: 'Open' },
		{ value: 'closed', label: 'Closed' },
	],
});

defineEmits<{
	'update:modelValue': [value: string];
}>();
</script>

<style scoped></style>
