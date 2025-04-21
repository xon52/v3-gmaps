<template>
	<demo-wrapper>
		<!-- Component title -->
		<template #title>Map Component Demo</template>

		<!-- Map slot -->
		<template #map>
			<gm-map
				:center="center"
				:zoom="zoom"
				:map-type-id="type"
				:options="options"
				@zoom_changed="handleMapZoomChange"
				@center_changed="handleCenterChange"
				@bounds_changed="handleBoundsChange"
				@maptypeid_changed="handleMapTypeChange"
				@mounted="handleMounted" />
		</template>

		<!-- Controls slot -->
		<template #controls>
			<control-section>
				<h3>Center</h3>
				<div class="coordinates">
					<ul>
						<li>Lat: {{ center?.lat.toFixed(2) }}</li>
						<li>Lng: {{ center?.lng.toFixed(2) }}</li>
					</ul>
				</div>

				<h3>Bounds</h3>
				<div class="coordinates">
					<ul>
						<li>North: {{ bounds?.north.toFixed(2) }}</li>
						<li>West: {{ bounds?.west.toFixed(2) }}</li>
						<li>South: {{ bounds?.south.toFixed(2) }}</li>
						<li>East: {{ bounds?.east.toFixed(2) }}</li>
					</ul>
				</div>

				<demo-button
					id="reset-center"
					size="small"
					@click="handleReset">
					Reset
				</demo-button>
			</control-section>

			<control-section>
				<h3>Controls</h3>
				<demo-checkbox
					id="fullscreenControl"
					v-model="controls.fullscreenControl"
					label="Fullscreen Control"
					@update:model-value="updateMapControls" />

				<demo-checkbox
					id="zoomControl"
					v-model="controls.zoomControl"
					label="Zoom Control"
					@update:model-value="updateMapControls" />

				<demo-checkbox
					id="scaleControl"
					v-model="controls.scaleControl"
					label="Scale Control"
					@update:model-value="updateMapControls" />

				<demo-checkbox
					id="streetViewControl"
					v-model="controls.streetViewControl"
					label="Street View Control"
					@update:model-value="updateMapControls" />

				<demo-checkbox
					id="mapTypeControl"
					v-model="controls.mapTypeControl"
					label="Map Type Control"
					@update:model-value="updateMapControls" />

				<h3>Map Interaction</h3>

				<demo-checkbox
					id="disableDefaultUI"
					v-model="controls.disableDefaultUI"
					label="Disable Default UI"
					@update:model-value="updateMapControls" />

				<demo-checkbox
					id="scrollwheel"
					v-model="controls.scrollwheel"
					label="Allow Scrollwheel"
					@update:model-value="updateMapControls" />

				<demo-checkbox
					id="clickableIcons"
					v-model="controls.clickableIcons"
					label="Clickable Icons"
					@update:model-value="updateMapControls" />
			</control-section>

			<control-section>
				<h3>Map Type</h3>
				<demo-select
					v-model="type"
					id="map-type-select"
					label="Type"
					:options="['hybrid', 'roadmap', 'satellite', 'terrain']"
					@update:model-value="handleTypeChange" />

				<h3>Zoom Level</h3>
				<demo-slider
					id="zoom-level-slider"
					v-model="zoom"
					label="Zoom"
					:min="0"
					:max="20"
					@update:model-value="handleZoomChange" />
			</control-section>
		</template>

		<!-- Description slot -->
		<template #description>
			<p>This demo shows a basic Google Maps implementation using <code>gm-map</code> with various props and events.</p>
			<pre><code>&lt;gm-map
  :center="{ lat: 20, lng: 0 }"
  :zoom="2"
  :map-type-id="'roadmap'"
  :options="{
    fullscreenControl: false,
    zoomControl: true,
    scaleControl: false,
    streetViewControl: false,
    mapTypeControl: true,
    scrollwheel: true
  }"
  @zoom_changed="handleMapZoomChange"
  @center_changed="handleCenterChange"
/&gt;</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { DemoWrapper, DemoCheckbox, DemoButton, ControlSection, DemoSlider, DemoSelect } from '../controls';
import { gmMap, type GmPosition, type GmBounds, type GmMapTypeId } from 'v3-gmaps';
import { log } from '../store';
import { createMapOptions } from './mapHelpers';

const defaultCenter = { lat: 20, lng: 0 };
const defaultZoom = 2;

// Map configuration
const zoom = ref(defaultZoom);
const center = ref<GmPosition>(defaultCenter);
const options = ref(createMapOptions({ center: defaultCenter, zoom: defaultZoom }));
const bounds = ref<GmBounds | undefined>();
const type = ref<GmMapTypeId>('roadmap');

// Map control configuration
const controls = reactive({
	fullscreenControl: false,
	zoomControl: true,
	scaleControl: false,
	streetViewControl: false,
	mapTypeControl: true,
	disableDefaultUI: false,
	scrollwheel: true,
	clickableIcons: true,
});

// Update map options when controls change
const updateMapControls = () => {
	options.value = {
		...options.value,
		...controls,
	};
	log(`Map controls updated`);
};

// Event handlers
const handleMounted = (map: google.maps.Map) => {
	log('Map component mounted');
	// Initialize controls from current map options
	controls.fullscreenControl = !!options.value.fullscreenControl;
	controls.zoomControl = !!options.value.zoomControl;
	controls.scaleControl = !!options.value.scaleControl;
	controls.streetViewControl = !!options.value.streetViewControl;
	controls.mapTypeControl = !!options.value.mapTypeControl;
	controls.disableDefaultUI = !!options.value.disableDefaultUI;
	controls.scrollwheel = options.value.scrollwheel !== false;
	controls.clickableIcons = options.value.clickableIcons !== false;
};

const handleBoundsChange = (newBounds: GmBounds | null | undefined) => {
	if (newBounds) bounds.value = newBounds;
};

const handleZoomChange = () => {
	log(`Zoom changed to ${zoom.value}`);
};

const handleTypeChange = () => {
	log(`Map type changed to "${type.value}"`);
};

const handleCenterChange = (newCenter: GmPosition | null) => {
	if (newCenter) center.value = newCenter;
	log(`Center changed to ${newCenter?.lat.toFixed(2)}, ${newCenter?.lng.toFixed(2)}`);
};

const handleMapTypeChange = (newType: string | null) => {
	if (newType && (newType === 'hybrid' || newType === 'roadmap' || newType === 'satellite' || newType === 'terrain')) {
		type.value = newType as GmMapTypeId;
	}
	log(`Map type changed to "${type.value}"`);
};

const handleMapZoomChange = (newZoom: number | null) => {
	if (newZoom) zoom.value = +newZoom;
	log(`Zoom changed to ${zoom.value}`);
};

const handleReset = () => {
	center.value = defaultCenter;
	log(`Center reset to ${defaultCenter.lat.toFixed(2)}, ${defaultCenter.lng.toFixed(2)}`);
};
</script>

<style scoped>
.coordinates {
	font-family: monospace;
	font-size: 0.9rem;
	color: #ddd;
	margin-bottom: 12px;
}
</style>
