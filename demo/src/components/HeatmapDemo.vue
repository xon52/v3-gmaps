<template>
	<demo-wrapper>
		<!-- Component title -->
		<template #title>Heatmap Demo</template>

		<!-- Map with heatmap -->
		<template #map>
			<gm-map :options="options">
				<gm-heatmap
					:items="items"
					:opacity="opacity"
					:radius="radius"
					:dissipating="dissipating"
					:maxIntensity="maxIntensity"
					:gradient="gradientColors"
					@mounted="handleMounted" />
			</gm-map>
		</template>

		<!-- Controls -->
		<template #controls>
			<control-section>
				<h3>Heatmap Data</h3>
				<demo-slider
					v-model="count"
					id="count-slider"
					label="Point Count"
					:min="1"
					:max="1000" />

				<demo-checkbox
					v-model="weights"
					id="weights-checkbox"
					label="Include Weights"
					info="Enable weighted data points for intensity variation" />

				<demo-button @click="regeneratePoints">Regenerate All Points</demo-button>
			</control-section>

			<control-section>
				<h3>Appearance</h3>
				<demo-slider
					v-model="opacity"
					id="opacity-slider"
					label="Opacity"
					:min="0.1"
					:max="1"
					:step="0.1" />

				<demo-slider
					v-model="radius"
					id="radius-slider"
					label="Radius"
					:min="5"
					:max="50"
					:step="5" />

				<demo-slider
					v-model="maxIntensity"
					id="intensity-slider"
					label="Max Intensity"
					:min="1"
					:max="10"
					:step="1" />

				<demo-checkbox
					v-model="dissipating"
					id="dissipating-checkbox"
					label="Dissipating"
					info="Whether the intensity should dissipate with zoom level" />

				<demo-checkbox
					v-model="gradientOn"
					id="gradient-checkbox"
					label="Custom Gradient"
					info="Use a custom color gradient instead of the default" />
			</control-section>
		</template>

		<!-- Description -->
		<template #description>
			<p>
				This demo shows how to use the <code>gm-heatmap</code> component to create a heatmap visualization on Google
				Maps.
			</p>
			<pre><code>&lt;gm-heatmap
  :items="items"
  :opacity="0.8"
  :radius="20"
  :dissipating="true"
  :maxIntensity="3"
  :gradient="['transparent', '#CC0000', '#FF6600', '#660099']"
/&gt;</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { DemoWrapper, DemoCheckbox, DemoButton, ControlSection, DemoSlider } from '../controls';
import { gmMap, gmHeatmap, type GmWeightedPosition } from 'v3-gmaps';
import { log } from '../store';
import { createMapOptions } from './mapHelpers';

// Map configuration
const options = ref(createMapOptions({ center: { lat: -27, lng: 133 }, zoom: 4 }));

// Heatmap data controls
const count = ref(50);
const weights = ref(true);

// Heatmap appearance options
const opacity = ref(0.8);
const radius = ref(20);
const maxIntensity = ref(3);
const dissipating = ref(true);
const gradientOn = ref(false);
const colors = ['transparent', '#CC0000', '#FF6600', '#660099'];
const gradientColors = computed(() => (gradientOn.value ? colors : undefined));

// Generate random points for the heatmap
const items = ref<GmWeightedPosition[]>([]);
const allPoints = ref<GmWeightedPosition[]>([]);

// Function to generate random data points
const generateData = (count: number) => {
	const result: GmWeightedPosition[] = [];
	for (let i = 0; i < count; i++) {
		const lat = Math.random() * 30 - 43; // Range for Australia
		const lng = Math.random() * 40 + 115;
		const weight = Math.round(Math.random() * 3);
		result.push({ lat, lng, weight });
	}
	return result;
};

// Initialize data with 1000 points
allPoints.value = generateData(1000);

// Function to update visible points based on count
const updateVisiblePoints = () => {
	if (!weights.value) {
		items.value = allPoints.value.slice(0, count.value).map((point) => ({
			lat: point.lat,
			lng: point.lng,
			weight: 1,
		}));
	} else {
		items.value = allPoints.value.slice(0, count.value);
	}
	log(`Showing ${count.value} data points${weights.value ? ' with weights' : ' with weight=1'}`);
};

// Initialize visible points
updateVisiblePoints();

// Watch for count changes to update visible points
watch(count, updateVisiblePoints);

// Watch for weights changes to update visible points
watch(weights, () => {
	updateVisiblePoints();
	// Force a reactive update by creating a new array
	items.value = [...items.value];
});

// Event handlers
const handleMounted = () => {
	log('Heatmap component mounted');
};

const regeneratePoints = () => {
	allPoints.value = generateData(1000);
	updateVisiblePoints();
	log('Generated new random points');
};
</script>

<style scoped>
.slider-container {
	display: flex;
	align-items: center;
	margin-bottom: 12px;
}

.slider-label {
	flex: 0 0 35%;
	font-size: 0.9rem;
	color: #ddd;
	padding-right: 10px;
}

.scale-slider {
	flex: 1;
	-webkit-appearance: none;
	appearance: none;
	height: 6px;
	background: #444;
	border-radius: 3px;
	outline: none;
}

.scale-slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: #4285f4;
	cursor: pointer;
}

.scale-slider::-moz-range-thumb {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: #4285f4;
	cursor: pointer;
	border: none;
}

.scale-value {
	margin-left: 10px;
	min-width: 36px;
	font-size: 0.9rem;
	color: #ddd;
	font-family: monospace;
}
</style>
