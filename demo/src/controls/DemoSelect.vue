<template>
	<div class="demo-select">
		<label :for="id">{{ label }}</label>
		<select
			:id="id"
			:value="modelValue"
			@change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
			<option
				v-for="option in options"
				:key="option"
				:value="option">
				{{ option }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	modelValue: string;
	options: string[];
	label: string;
	id: string;
}>();

const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
.demo-select {
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
}

label {
	margin-bottom: 0.5rem;
}

select {
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
}
</style>
