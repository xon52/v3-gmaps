<template>
	<demo-wrapper>
		<!-- Component title -->
		<template #title>Shapes Demo</template>

		<!-- Map with shapes -->
		<template #map>
			<gm-map :options="options">
				<!-- Circle shape -->
				<gm-circle
					:center="circleCenter"
					:radius="circleRadius"
					:editable="circleEditable"
					:draggable="circleDraggable"
					:options="circleOptions"
					@center_changed="handleCircleCenterChanged"
					@radius_changed="handleCircleRadiusChanged"
					@click="handleCircleClick" />

				<!-- Rectangle shape -->
				<gm-rectangle
					:bounds="rectangleBounds"
					:editable="rectangleEditable"
					:draggable="rectangleDraggable"
					:options="rectangleOptions"
					@bounds_changed="handleRectangleBoundsChanged"
					@click="handleRectangleClick" />
			</gm-map>
		</template>

		<!-- Controls -->
		<template #controls>
			<control-section>
				<h3>Circle</h3>
				<demo-checkbox
					v-model="circleEditable"
					id="circle-editable-checkbox"
					label="Editable" />
				<demo-checkbox
					v-model="circleDraggable"
					id="circle-draggable-checkbox"
					label="Draggable" />

				<demo-color-picker
					v-model="circleOptions.fillColor"
					id="circle-fill-color"
					label="Fill Color" />

				<demo-color-picker
					v-model="circleOptions.strokeColor"
					id="circle-stroke-color"
					label="Stroke Color" />

				<demo-slider
					v-model="circleRadius"
					id="circle-radius-slider"
					label="Radius (km)"
					:min="100000"
					:max="1000000"
					:step="50000" />

				<demo-slider
					v-model="circleOptions.strokeWeight"
					id="circle-stroke-weight-slider"
					label="Stroke Weight"
					:min="1"
					:max="10" />

				<demo-slider
					v-model="circleOptions.fillOpacity"
					id="circle-fill-opacity-slider"
					label="Fill Opacity"
					:min="0"
					:max="1"
					:step="0.1" />

				<demo-button @click="resetCircle">Reset Circle</demo-button>
			</control-section>

			<control-section>
				<h3>Rectangle</h3>
				<demo-checkbox
					v-model="rectangleEditable"
					id="rectangle-editable-checkbox"
					label="Editable" />
				<demo-checkbox
					v-model="rectangleDraggable"
					id="rectangle-draggable-checkbox"
					label="Draggable" />

				<demo-color-picker
					v-model="rectangleOptions.fillColor"
					id="rectangle-fill-color"
					label="Fill Color" />

				<demo-color-picker
					v-model="rectangleOptions.strokeColor"
					id="rectangle-stroke-color"
					label="Stroke Color" />

				<demo-slider
					v-model="rectangleOptions.strokeWeight"
					id="rectangle-stroke-weight-slider"
					label="Stroke Weight"
					:min="1"
					:max="10" />

				<demo-slider
					v-model="rectangleOptions.fillOpacity"
					id="rectangle-fill-opacity-slider"
					label="Fill Opacity"
					:min="0"
					:max="1"
					:step="0.1" />

				<demo-button @click="resetRectangle">Reset Rectangle</demo-button>
			</control-section>
		</template>

		<!-- Description -->
		<template #description>
			<p>
				This demo shows how to use <code>gm-circle</code> and <code>gm-rectangle</code> components with a Google Map.
			</p>
			<pre><code>&lt;!-- Circle --&gt;
&lt;gm-circle
  :center="{ lat: -28, lng: 125 }"
  :radius="500000"
  :editable="true"
  :options="{
    fillColor: '#4285F4',
    fillOpacity: 0.35,
    strokeColor: '#4285F4',
    strokeWeight: 2
  }"
/&gt;

&lt;!-- Rectangle --&gt;
&lt;gm-rectangle
  :bounds="{
    north: -20,
    east: 145,
    south: -27,
    west: 132
  }"
  :editable="false"
  :options="{
    fillColor: '#34A853',
    fillOpacity: 0.35,
    strokeColor: '#34A853',
    strokeWeight: 2
  }"
/&gt;</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { DemoWrapper, DemoCheckbox, DemoButton, ControlSection, DemoColorPicker, DemoSlider } from '../controls';
import { gmMap, gmCircle, gmRectangle, type GmPosition, type GmBounds } from 'v3-gmaps';
import { log } from '../store';
import { createMapOptions } from './mapHelpers';

// Map configuration
const options = ref(createMapOptions({ center: { lat: -27, lng: 133 }, zoom: 4 }));

// Circle configuration
const initialCircleCenter = { lat: -28, lng: 125 };
const initialCircleRadius = 500000; // 500km
const circleCenter = ref<GmPosition>({ ...initialCircleCenter });
const circleRadius = ref(initialCircleRadius);
const circleEditable = ref(true);
const circleDraggable = ref(true);
const circleOptions = reactive({
	fillColor: '#4285F4',
	fillOpacity: 0.35,
	strokeColor: '#4285F4',
	strokeOpacity: 0.8,
	strokeWeight: 2,
});

// Rectangle configuration
const initialRectangleBounds = {
	north: -20,
	east: 145,
	south: -27,
	west: 132,
};
const rectangleBounds = ref<GmBounds>({ ...initialRectangleBounds });
const rectangleEditable = ref(false);
const rectangleDraggable = ref(true);
const rectangleOptions = reactive({
	fillColor: '#34A853',
	fillOpacity: 0.35,
	strokeColor: '#34A853',
	strokeOpacity: 0.8,
	strokeWeight: 2,
});

// Event handlers for Circle
const handleCircleCenterChanged = (newCenter: GmPosition | null) => {
	if (newCenter) {
		circleCenter.value = newCenter;
		log(`Circle center changed to: ${newCenter.lat.toFixed(2)}, ${newCenter.lng.toFixed(2)}`);
	}
};

const handleCircleRadiusChanged = (newRadius: number) => {
	circleRadius.value = newRadius;
	log(`Circle radius changed to ${(newRadius / 1000).toFixed(0)} km`);
};

const handleCircleClick = () => {
	log('Circle clicked');
};

// Event handlers for Rectangle
const handleRectangleBoundsChanged = (newBounds: GmBounds | null) => {
	if (newBounds) {
		rectangleBounds.value = newBounds;
		log(
			`Rectangle bounds changed to N:${newBounds.north.toFixed(2)}, E:${newBounds.east.toFixed(
				2
			)}, S:${newBounds.south.toFixed(2)}, W:${newBounds.west.toFixed(2)}`
		);
	}
};

const handleRectangleClick = () => {
	log('Rectangle clicked');
};

// Reset functions
const resetCircle = () => {
	circleCenter.value = { ...initialCircleCenter };
	circleRadius.value = initialCircleRadius;
	log('Circle reset to initial position and size');
};

const resetRectangle = () => {
	rectangleBounds.value = { ...initialRectangleBounds };
	log('Rectangle reset to initial bounds');
};
</script>
