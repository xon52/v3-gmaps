<template>
	<span class="gmaps-spinner"></span>
</template>

<style>
.gmaps-spinner {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50px;
	height: 50px;
	border: 5px solid #ccc;
	border-radius: 50%;
	border-top-color: #aaa;
	animation: gmaps-spin 1s linear infinite;
}
.gmaps-spinner::after {
	content: '';
	display: inline-block;
	max-width: 200px;
	max-height: 200px;
	border: 20px solid #ccc;
	border-radius: 50%;
	border-top-color: #aaa;
	animation: gmaps-spin 1s ease-in-out infinite;
}
@keyframes gmaps-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
