<template>
	<div id="wrapper">
		<div class="header">
			<router-link
				to="/legacy"
				class="legacy-link"
				>← Legacy Demos</router-link
			>
			<router-link
				to="/"
				class="main-link"
				>Main App →</router-link
			>
		</div>
		<div class="map">
			<slot name="map"></slot>
			<div
				class="log"
				title="Event Log">
				<ul>
					<li
						v-for="(l, i) in logs"
						:key="i">
						{{ logs.length - i }}. {{ l }}
					</li>
				</ul>
			</div>
		</div>
		<div class="controls">
			<slot name="controls"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { logs } from '../store';
</script>

<style scoped>
#wrapper {
	display: flex;
	width: 100%;
	flex-direction: column;
}
.header {
	display: flex;
	justify-content: space-between;
	padding: 10px;
	margin-bottom: 10px;
}
.legacy-link,
.main-link {
	color: #4285f4;
	text-decoration: none;
	font-weight: bold;
}
.map {
	height: 500px;
	width: 100%;
	position: relative;
	margin-bottom: 20px;
	color: black;
}
.controls {
	flex-shrink: 1;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 10px;
}
.controls:first-child::before {
	margin: 0;
}
.controls > div {
	color: #bbb;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	border: #999 solid 1px;
	padding: 18px 5px 12px 5px;
	margin: 15px;
	min-width: 150px;
}
.control-label {
	position: absolute;
	top: -8px;
	left: 5px;
	background: #333;
	font-size: 0.9rem;
	color: #ccc;
	padding: 0 5px;
}
.control-label::after {
	content: ':';
}
.controls ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}
.controls button {
	display: block;
	margin: 5px 0;
}
.log {
	position: absolute;
	left: 10px;
	bottom: 10px;
	opacity: 0.7;
	overflow: scroll;
	height: 100px;
	width: 400px;
	min-width: 200px;
	max-width: 30%;
	color: #777;
	background-color: white;
	border: 2px ridge #ccc;
	transition: 0.3s opacity;
}
.log:hover {
	opacity: 1;
}
.log ul {
	margin: 5px;
	padding: 0;
	list-style-type: none;
	font-size: 0.9rem;
}
.log li {
	margin: 0;
	white-space: nowrap;
}
</style>
