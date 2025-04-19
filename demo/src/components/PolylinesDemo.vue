<template>
	<demo-wrapper>
		<!-- Component title -->
		<template #title>Polylines Demo</template>

		<!-- Map with polylines -->
		<template #map>
			<gm-map :options="options">
				<!-- Basic Polyline -->
				<gm-polyline
					:path="polylinePath"
					:editable="editable"
					:draggable="draggable"
					:options="polylineOptions"
					@path_changed="handlePathChanged"
					@click="handlePolylineClick" />

				<!-- Polygon (closed shape) -->
				<gm-polygon
					:paths="polygonPaths"
					:options="fullPolygonOptions"
					:editable="polygonEditable"
					:draggable="polygonDraggable"
					@click="handlePolygonClick"
					@paths_changed="handlePolygonPathsChanged" />
			</gm-map>
		</template>

		<!-- Controls -->
		<template #controls>
			<control-section>
				<h3>Polyline</h3>
				<demo-checkbox
					v-model="editable"
					id="editable-checkbox"
					label="Editable" />
				<demo-checkbox
					v-model="draggable"
					id="draggable-checkbox"
					label="Draggable" />

				<demo-color-picker
					v-model="polylineOptions.strokeColor"
					id="polyline-color"
					label="Stroke Color" />

				<demo-slider
					v-model="polylineOptions.strokeWeight"
					id="stroke-weight-slider"
					label="Stroke Weight"
					:min="1"
					:max="10" />

				<demo-button @click="resetPolylinePath">Reset Path</demo-button>
			</control-section>

			<control-section>
				<h3>Polygon</h3>
				<demo-checkbox
					v-model="polygonEditable"
					id="polygon-editable-checkbox"
					label="Editable" />
				<demo-checkbox
					v-model="polygonDraggable"
					id="polygon-draggable-checkbox"
					label="Draggable" />

				<demo-color-picker
					v-model="polygonOptions.fillColor"
					id="polygon-fill-color"
					label="Fill Color" />

				<demo-color-picker
					v-model="polygonOptions.strokeColor"
					id="polygon-stroke-color"
					label="Stroke Color" />

				<demo-slider
					v-model="polygonOptions.strokeWeight"
					id="polygon-stroke-weight-slider"
					label="Stroke Weight"
					:min="1"
					:max="10" />

				<button-group
					v-model="polygonStrokePosition"
					label="Stroke Position"
					:options="[
						{ value: 'CENTER', label: 'Center' },
						{ value: 'INSIDE', label: 'Inside' },
						{ value: 'OUTSIDE', label: 'Outside' },
					]" />

				<demo-slider
					v-model="polygonOptions.fillOpacity"
					id="fill-opacity-slider"
					label="Fill Opacity"
					:min="0"
					:max="1"
					:step="0.1" />
			</control-section>
		</template>

		<!-- Description -->
		<template #description>
			<p>
				This demo shows how to use <code>gm-polyline</code> and <code>gm-polygon</code> components with a Google Map.
			</p>
			<pre><code>&lt;!-- Polyline --&gt;
&lt;gm-polyline
  :path="[
    { lat: -34.397, lng: 150.644 },
    { lat: -34.38, lng: 150.67 },
    { lat: -34.36, lng: 150.645 }
  ]"
  :editable="true"
  :options="{
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  }"
/&gt;

&lt;!-- Polygon --&gt;
&lt;gm-polygon
  :paths="[
    { lat: -34.41, lng: 150.63 },
    { lat: -34.4, lng: 150.67 },
    { lat: -34.38, lng: 150.65 },
    { lat: -34.39, lng: 150.62 }
  ]"
  :options="{
    strokeColor: '#0000FF',
    fillColor: '#0000FF',
    fillOpacity: 0.5
  }"
/&gt;</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import {
	DemoWrapper,
	DemoCheckbox,
	DemoButton,
	ControlSection,
	DemoColorPicker,
	ButtonGroup,
	DemoSlider,
} from '../controls';
import { gmMap, gmPolyline, gmPolygon, type GmPosition, type GmStrokePosition } from 'v3-gmaps';
import { log } from '../store';
import { createMapOptions } from './mapHelpers';

// Map configuration
const options = ref(createMapOptions({ center: { lat: -34.383, lng: 150.65 }, zoom: 13 }));

// Polyline configuration
const initialPolylinePath = [
	{ lat: -34.397, lng: 150.644 },
	{ lat: -34.38, lng: 150.67 },
	{ lat: -34.36, lng: 150.645 },
	{ lat: -34.37, lng: 150.62 },
];
const polylinePath = ref<GmPosition[]>([...initialPolylinePath]);
const editable = ref(true);
const draggable = ref(true);
const polylineOptions = reactive({
	strokeColor: '#FF0000',
	strokeOpacity: 1.0,
	strokeWeight: 3,
});

// Polygon configuration
const polygonEditable = ref(false);
const polygonDraggable = ref(false);
const polygonPaths = ref<GmPosition[]>([
	{ lat: -34.41, lng: 150.63 },
	{ lat: -34.4, lng: 150.67 },
	{ lat: -34.38, lng: 150.65 },
	{ lat: -34.39, lng: 150.62 },
]);
const polygonOptions = reactive({
	strokeColor: '#0000FF',
	strokeOpacity: 0.8,
	strokeWeight: 2,
	fillColor: '#0000FF',
	fillOpacity: 0.5,
});

// Separate state for stroke position
const polygonStrokePosition = ref<GmStrokePosition>('CENTER');

// Computed property for full polygon options including strokePosition
const fullPolygonOptions = computed(() => {
	const options: any = {
		...polygonOptions,
		strokePosition: polygonStrokePosition.value,
	};
	return options;
});

// Event handlers
const handlePolylineClick = () => {
	log('Polyline clicked');
};

const handlePolygonClick = () => {
	log('Polygon clicked');
};

const handlePathChanged = (newPath: GmPosition[] | GmPosition[][]) => {
	if (Array.isArray(newPath) && newPath.length > 0) {
		// Handle single path array (most common case)
		if ('lat' in newPath[0] && 'lng' in newPath[0]) {
			polylinePath.value = newPath as GmPosition[];
			log(`Polyline path changed (${newPath.length} points)`);
		}
		// Handle multi-path array (rare case)
		else {
			const flattened = (newPath as GmPosition[][]).flat();
			polylinePath.value = flattened;
			log(`Polyline multi-path changed (${flattened.length} total points)`);
		}
	}
};

const resetPolylinePath = () => {
	polylinePath.value = [...initialPolylinePath];
	log('Polyline path reset');
};

const handlePolygonPathsChanged = (newPaths: GmPosition[] | GmPosition[][]) => {
	if (Array.isArray(newPaths) && newPaths.length > 0) {
		// Handle single path array (most common case)
		if ('lat' in newPaths[0] && 'lng' in newPaths[0]) {
			polygonPaths.value = newPaths as GmPosition[];
			log(`Polygon paths changed (${newPaths.length} points)`);
		}
		// Handle multi-path array (rare case)
		else {
			const flattened = (newPaths as GmPosition[][]).flat();
			polygonPaths.value = flattened;
			log(`Polygon multi-paths changed (${flattened.length} total points)`);
		}
	}
};
</script>
