<template>
	<demo-wrapper>
		<!-- Component title -->
		<template #title>Markers Demo</template>

		<!-- Map with markers -->
		<template #map>
			<gm-map :options="options">
				<!-- Basic Marker with properties -->
				<gm-marker
					:position="markerPosition"
					:clickable="true"
					:draggable="draggable"
					:visible="visible"
					:title="markerTitle"
					@click="handleMarkerClick"
					@dragend="handleMarkerDragEnd" />

				<!-- Marker with a custom image in slot -->
				<gm-marker
					:position="slotMarkerPosition"
					:clickable="true"
					:title="'Click the image to change its size'"
					@click="handleSlotMarkerClick">
					<div
						class="custom-marker-container"
						@click.stop="toggleMarkerSize">
						<img
							:src="markerImageSrc"
							:style="{ width: `${markerImageSize}px`, height: 'auto', transition: 'all 0.3s ease' }"
							alt="Custom marker image" />
						<div class="marker-label">{{ markerImageSize }}px</div>
					</div>
				</gm-marker>
			</gm-map>
		</template>

		<!-- Controls -->
		<template #controls>
			<control-section>
				<h3>Basic Marker Properties</h3>
				<demo-input
					v-model="markerTitle"
					id="marker-title"
					label="Title" />
				<demo-checkbox
					v-model="visible"
					id="visible-checkbox"
					label="Visible" />
				<demo-checkbox
					v-model="draggable"
					id="draggable-checkbox"
					label="Draggable" />
				<demo-button @click="resetMarkerPosition">Reset Position</demo-button>
				<div class="position-display">
					Position: {{ markerPosition.lat.toFixed(4) }}, {{ markerPosition.lng.toFixed(4) }}
				</div>
			</control-section>

			<control-section>
				<h3>Slot Marker</h3>
				<p class="helper-text">
					This marker uses a custom image in its default slot. Click directly on the image to change its size.
				</p>
				<demo-button @click="toggleMarkerImage">Change Image</demo-button>
				<div class="position-display">Current size: {{ markerImageSize }}px</div>
			</control-section>
		</template>

		<!-- Description -->
		<template #description>
			<p>This demo shows how to use <code>gm-marker</code> components with a Google Map.</p>
			<pre><code>&lt;!-- Basic Marker --&gt;
&lt;gm-marker
  :position="{ lat: -33.8, lng: 150.9 }"
  :clickable="true"
  :draggable="true"
  :visible="true"
  :title="'Hover text appears here'"
  @click="handleMarkerClick"
  @dragend="handleMarkerDragEnd" /&gt;

&lt;!-- Marker with custom content --&gt;
&lt;gm-marker :position="{ lat: -33.9, lng: 151.1 }"&gt;
  &lt;div class="custom-marker-container"&gt;
    &lt;img src="/path/to/image.png" alt="Custom marker" /&gt;
    &lt;div class="marker-label"&gt;My Label&lt;/div&gt;
  &lt;/div&gt;
&lt;/gm-marker&gt;</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { gmMap, gmMarker, type GmPosition } from 'v3-gmaps';
import { log } from '../store';
import { DemoWrapper, DemoCheckbox, DemoInput, DemoButton, ControlSection } from '../controls';
import MarkerPng from '../assets/marker.png';
import Marker2Png from '../assets/marker2.png';
import { createMapOptions } from './mapHelpers';

// Map configuration
const options = ref(createMapOptions({ center: { lat: -33.8, lng: 150.9 }, zoom: 10 }));

// Basic marker properties
const initialMarkerPosition = { lat: -33.8, lng: 150.9 };
const markerPosition = ref<GmPosition>({ ...initialMarkerPosition });
const markerTitle = ref('Drag me or click me');
const draggable = ref(true);
const visible = ref(true);

// Slot marker with custom image
const slotMarkerPosition = ref<GmPosition>({ lat: -33.9, lng: 151.1 });
const markerImageSize = ref(40);
const markerImageIndex = ref(0);
const markerImages = [MarkerPng, Marker2Png];
const markerImageSrc = computed(() => markerImages[markerImageIndex.value]);

// Event handlers for basic marker
const handleMarkerClick = () => {
	log('Basic marker clicked');
};

const handleMarkerDragEnd = (position: GmPosition) => {
	markerPosition.value = position;
	log(`Marker dragged to: ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`);
};

const resetMarkerPosition = () => {
	markerPosition.value = { ...initialMarkerPosition };
	log('Marker position reset');
};

// Event handlers for slot marker
const handleSlotMarkerClick = () => {
	log('Slot marker clicked (container)');
};

const toggleMarkerSize = (e: Event) => {
	e.stopPropagation(); // Prevent triggering the marker's click event
	markerImageSize.value = markerImageSize.value === 40 ? 60 : 40;
	log(`Image size changed to ${markerImageSize.value}px`);
};

const toggleMarkerImage = () => {
	markerImageIndex.value = (markerImageIndex.value + 1) % markerImages.length;
	log('Marker image changed');
};
</script>

<style scoped>
.position-display {
	margin-top: 10px;
	font-family: monospace;
	font-size: 0.9rem;
	color: #ddd;
}

.helper-text {
	font-size: 0.9rem;
	color: #aaa;
	margin-bottom: 10px;
}

.custom-marker-container {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
}

.marker-label {
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
	padding: 2px 6px;
	border-radius: 10px;
	font-size: 0.7rem;
	margin-top: 4px;
}
</style>
