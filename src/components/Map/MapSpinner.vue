<template>
	<div
		style="
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 40px;
			height: 40px;
			display: flex;
			justify-content: center;
			align-items: center;
		">
		<svg
			width="38"
			height="38"
			viewBox="0 0 38 38"
			xmlns="http://www.w3.org/2000/svg"
			style="stroke: #aaa">
			<g
				fill="none"
				fill-rule="evenodd">
				<g
					transform="translate(1 1)"
					stroke-width="2">
					<circle
						stroke-opacity=".3"
						cx="18"
						cy="18"
						r="18" />
					<path d="M36 18c0-9.94-8.06-18-18-18"></path>
				</g>
			</g>
		</svg>
	</div>
</template>

<script>
export default {
	name: 'MapSpinner',
	mounted() {
		// Add keyframes for the animation
		if (!document.getElementById('gmaps-spin-keyframes')) {
			const style = document.createElement('style');
			style.id = 'gmaps-spin-keyframes';
			style.textContent = `
				@keyframes gmaps-spin {
					to { transform: rotate(360deg); }
				}
			`;
			document.head.appendChild(style);
		}
	},
};
</script>
