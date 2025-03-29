<template>
	<div
		class="gmaps-error"
		role="alert"
		aria-live="assertive">
		<slot></slot>
	</div>
</template>

<style lang="scss">
.gmaps-error {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 90%;
	max-width: 600px;
	transform: translate(-50%, -50%);
	color: #af0000;
	font-size: 1.5rem;
	background-color: #eee;
	padding: 0.75rem 1rem;
	border: 2px dashed #af0000;
	text-align: center;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
