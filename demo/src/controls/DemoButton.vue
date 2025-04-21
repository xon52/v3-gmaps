<template>
	<button
		:type="type"
		class="demo-button"
		:class="[
			size && `demo-button--${size}`,
			variant && `demo-button--${variant}`,
			{ 'demo-button--disabled': disabled },
		]"
		:disabled="disabled"
		@click="onClick">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'danger';

const props = defineProps<{
	type?: ButtonType;
	size?: ButtonSize;
	variant?: ButtonVariant;
	disabled?: boolean;
}>();

const emit = defineEmits<{
	click: [event: MouseEvent];
}>();

const onClick = (event: MouseEvent) => {
	if (!props.disabled) {
		emit('click', event);
	}
};
</script>

<style scoped>
.demo-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 4px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s;
	border: none;
	outline: none;
	white-space: nowrap;
	max-width: 200px;
}

/* Sizes */
.demo-button--small {
	font-size: 0.75rem;
	padding: 4px 8px;
}

.demo-button--medium {
	font-size: 0.875rem;
	padding: 8px 12px;
}

.demo-button--large {
	font-size: 0.975rem;
	padding: 10px 16px;
}

/* Variants */
.demo-button--primary {
	background-color: #4c6ef5;
	color: white;
}

.demo-button--primary:hover:not(:disabled) {
	background-color: #3b5bdb;
}

.demo-button--secondary {
	background-color: #555;
	color: white;
}

.demo-button--secondary:hover:not(:disabled) {
	background-color: #666;
}

.demo-button--danger {
	background-color: #e03131;
	color: white;
}

.demo-button--danger:hover:not(:disabled) {
	background-color: #c92a2a;
}

/* Disabled state */
.demo-button--disabled,
.demo-button:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
</style>
