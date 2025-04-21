<template>
	<div class="demo-wrapper">
		<!-- Instructions at the top (if provided) -->
		<div
			class="instructions-container"
			v-if="hasInstructions">
			<slot name="instructions"></slot>
		</div>

		<!-- Map Section -->
		<div class="map-container">
			<slot name="map"></slot>

			<!-- Event Log Panel (if enabled) -->
			<div
				class="event-log"
				:class="{ expanded: isLogExpanded }"
				@click="isLogExpanded = !isLogExpanded"
				v-if="showEventLog">
				<div class="event-log-header">
					<span>Event Log</span>
					<button
						class="log-button clear"
						title="Clear Log"
						@click.stop="clearLogs">
						<span class="icon">🗑️</span>
					</button>
					<button
						class="log-button expand"
						title="Toggle Expand"
						@click.stop="isLogExpanded = !isLogExpanded">
						<span class="icon">{{ isLogExpanded ? '▼' : '▲' }}</span>
					</button>
				</div>
				<div class="event-log-content">
					<ul>
						<li
							v-for="(logEntry, i) in logs"
							:key="i"
							:class="getLogClass(logEntry)">
							{{ logs.length - i }}. {{ logEntry }}
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Controls Section -->
		<div
			class="controls-container"
			v-if="hasControls">
			<div class="controls-header">
				<h3>Controls</h3>
				<button
					@click="isControlsCollapsed = !isControlsCollapsed"
					class="collapse-button">
					{{ isControlsCollapsed ? 'Show Controls' : 'Hide Controls' }}
				</button>
			</div>
			<div
				class="controls"
				:class="{ collapsed: isControlsCollapsed }">
				<slot name="controls"></slot>
			</div>
		</div>

		<!-- Description Section -->
		<div class="description-container">
			<div class="description-header">
				<h3>
					<slot name="title">Demo Component</slot>
				</h3>
				<button
					@click="isDescriptionCollapsed = !isDescriptionCollapsed"
					class="collapse-button">
					{{ isDescriptionCollapsed ? 'Show Description' : 'Hide Description' }}
				</button>
			</div>
			<div
				class="description"
				:class="{ collapsed: isDescriptionCollapsed }">
				<slot name="description">
					<p>No description available for this demo.</p>
				</slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots } from 'vue';
import { logs, clearLogs } from '../store';

const props = defineProps({
	showEventLog: {
		type: Boolean,
		default: true,
	},
});

const slots = useSlots();
const hasControls = computed(() => !!slots.controls);
const hasInstructions = computed(() => !!slots.instructions);

const isLogExpanded = ref(false);
const isControlsCollapsed = ref(false);
const isDescriptionCollapsed = ref(false);

// Function to determine log entry class
const getLogClass = (logText: string) => {
	if (logText.includes('error') || logText.includes('Error')) return 'error';
	if (logText.includes('warning') || logText.includes('Warning')) return 'warning';
	if (logText.includes('**')) return 'header';
	return '';
};
</script>

<style>
.demo-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	gap: 20px;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

/* Instructions container */
.instructions-container {
	background-color: #3c3c3c;
	color: #fff;
	padding: 15px 20px;
	border-radius: 8px;
	margin-top: 10px;
	font-size: 1.1rem;
	line-height: 1.5;
	text-align: center;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Map container */
.map-container {
	position: relative;
	height: 500px;
	width: 100%;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	margin-top: 20px;
	/* Standard resets for map container */
	color: black;
	background-color: white;
	box-sizing: border-box;
	padding: 0;
	margin: 20px 0 0 0;
	line-height: normal;
	font-size: 16px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;
}

/* Event Log */
.event-log {
	position: absolute;
	left: 10px;
	bottom: 10px;
	width: 350px;
	max-width: 40%;
	background-color: rgba(30, 30, 30, 0.8);
	color: #eee;
	border-radius: 8px;
	transition: all 0.3s ease;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	z-index: 10;
	max-height: 150px;
	overflow: hidden;
	backdrop-filter: blur(4px);
	cursor: pointer;
	display: flex;
	flex-direction: column;
}

.event-log.expanded {
	max-height: 80%;
	width: 450px;
	cursor: default;
}

.event-log-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 12px;
	background-color: rgba(50, 50, 50, 0.8);
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	flex-shrink: 0;
}

.event-log-content {
	overflow-y: auto;
	height: 100%;
	min-height: 50px;
	scrollbar-width: thin;
	scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.2);
}

.event-log ul {
	margin: 0;
	padding: 8px 12px;
	list-style-type: none;
}

.event-log li {
	margin: 4px 0;
	font-size: 0.9rem;
	line-height: 1.4;
}

.event-log li.error {
	color: #ff5252;
}

.event-log li.warning {
	color: #ffca28;
}

.event-log li.header {
	color: #81d4fa;
	font-weight: bold;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	padding-bottom: 4px;
	margin-bottom: 8px;
}

.log-button {
	background: none;
	border: none;
	color: #fff;
	cursor: pointer;
	padding: 2px 6px;
	margin-left: 8px;
	border-radius: 4px;
	transition: background-color 0.2s;
}

.log-button:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

.log-button .icon {
	font-size: 14px;
}

/* Controls section */
.controls-container,
.description-container {
	background-color: #2c2c2c;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
}

.controls-header,
.description-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 20px;
	background-color: #3c3c3c;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.controls-header h3,
.description-header h3 {
	margin: 0;
	font-size: 1.1rem;
	font-weight: 500;
}

.collapse-button {
	background-color: #555;
	color: #fff;
	border: none;
	padding: 6px 12px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.85rem;
	transition: background-color 0.2s;
}

.collapse-button:hover {
	background-color: #666;
}

.controls,
.description {
	padding: 16px;
	overflow: hidden;
	transition: max-height 0.3s ease;
}

.controls.collapsed,
.description.collapsed {
	max-height: 0;
	padding: 0 16px;
}

.controls {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
}

.controls > div {
	position: relative;
	background-color: #383838;
	border-radius: 8px;
	padding: 24px 16px 16px;
	min-width: 180px;
	flex: 1;
	color: #ddd;
}

.control-section-content > h3 {
	margin: 0;
	margin-bottom: 8px;
	margin-top: 32px;
	font-size: 1.1rem;
	color: #eee;
	border-bottom: 1px solid #555;
	padding-bottom: 8px;
}

.control-section-content > h3:first-of-type {
	margin-top: 0;
}

.controls ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
}

.controls li {
	margin: 8px 0;
}

.controls button {
	background-color: #555;
	color: #fff;
	border: none;
	padding: 8px 12px;
	border-radius: 4px;
	cursor: pointer;
	margin: 5px 0;
	transition: background-color 0.2s;
}

.controls button:hover {
	background-color: #666;
}

.controls select,
.controls input {
	background-color: #444;
	color: #ddd;
	border: 1px solid #555;
	padding: 8px;
	border-radius: 4px;
	width: 100%;
}

/* Description section */
.description {
	color: #ddd;
	line-height: 1.6;
}

.description pre {
	background-color: #383838;
	padding: 16px;
	border-radius: 8px;
	overflow-x: auto;
	font-family: monospace;
	margin: 16px 0;
	border: 1px solid #444;
}

.description code {
	background-color: #383838;
	padding: 2px 5px;
	border-radius: 4px;
	font-family: monospace;
}

@media screen and (max-width: 768px) {
	.event-log {
		max-width: 80%;
		width: 300px;
	}

	.event-log.expanded {
		width: 90%;
	}

	.controls {
		flex-direction: column;
	}

	.controls > div {
		width: 100%;
	}
}
</style>
