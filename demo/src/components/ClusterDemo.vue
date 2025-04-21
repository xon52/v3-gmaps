<template>
	<demo-wrapper>
		<!-- Component title -->
		<template #title>Cluster Demo</template>

		<!-- Map with cluster markers -->
		<template #map>
			<gm-map :options="options">
				<gm-cluster
					:items="items"
					:max-zoom="maxZoom"
					:pin="pin"
					:key="JSON.stringify(pin)"
					@click="handleClusterClick"
					@mounted="handleClusteringBegin"
					@unmounted="handleClusteringEnd" />
			</gm-map>
		</template>

		<!-- Controls -->
		<template #controls>
			<control-section>
				<h3>Cluster Properties</h3>
				<demo-slider
					v-model="count"
					id="count-slider"
					label="Count"
					:min="50"
					:max="2000"
					:step="50" />
				<demo-slider
					v-model="maxZoom"
					id="max-zoom-slider"
					label="Max Zoom"
					:min="0"
					:max="20" />
			</control-section>
			<control-section>
				<h3>Pin Properties</h3>
				<demo-select
					v-model="pinStyle"
					id="pin-style-select"
					label="Pin Style"
					:options="['default', 'custom']" />
				<template v-if="pinStyle === 'custom'">
					<demo-color-picker
						v-model="customPin.background"
						id="pin-background"
						label="Background Color" />
					<demo-color-picker
						v-model="customPin.borderColor"
						id="pin-border-color"
						label="Border Color" />
					<demo-slider
						v-model="customPin.scale"
						id="pin-scale-slider"
						label="Scale"
						:min="0.5"
						:max="2"
						:step="0.1" />
					<demo-input
						v-model="customPin.glyph"
						id="pin-glyph"
						label="Glyph"
						placeholder="{count}" />
					<demo-color-picker
						v-model="customPin.glyphColor"
						id="pin-glyph-color"
						label="Glyph Color" />
				</template>
			</control-section>
		</template>

		<!-- Description -->
		<template #description>
			<p>This demo showcases the clustering capabilities of the <code>gm-cluster</code> component.</p>
			<p>The <code>gm-cluster</code> component groups markers based on zoom level and map bounds.</p>
			<h4>Component Example</h4>
			<pre><code>&lt;gm-cluster
  :items="items"
  :max-zoom="16"
  :pin="{
    background: '#4285F4',
    borderColor: '#ffffff',
    scale: 1,
    glyph: '{count}',
    glyphColor: '#ffffff'
  }"
/&gt;</code></pre>
			<h4>Items Structure Example</h4>
			<pre><code>// Basic items array example
const items = [
  { lat: 37.7749, lng: -122.4194 },
  { lat: 34.0522, lng: -118.2437 },
  // ...more items
];

// Items with custom properties
const itemsWithOptions = [
  { 
    lat: 37.7749, 
    lng: -122.4194,
    title: "San Francisco",
    clickable: true,
    pin: { 
      background: "red",
      glyph: "SF"
    },
    onClick: (item) => console.log("Clicked:", item)
  }
];
</code></pre>
		</template>
	</demo-wrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { gmMap, gmCluster, type GmClusterItem } from 'v3-gmaps';
import { DemoWrapper, ControlSection, DemoSlider, DemoColorPicker, DemoInput, DemoSelect } from '../controls';
import { log } from '../store';
import { createMapOptions } from './mapHelpers';

// Map configuration
const options = ref(createMapOptions());

// Cluster properties
const count = ref(600);
const maxZoom = ref(16);
const pinStyle = ref<'default' | 'custom'>('default');
const customPin = ref({
	background: '#4285F4',
	borderColor: '#ffffff',
	scale: 1,
	glyph: '{count}',
	glyphColor: '#ffffff',
});

// Use computed property for pin to dynamically switch between default and custom
const pin = computed(() => {
	if (pinStyle.value === 'default') {
		return {
			background: '#4285F4',
			borderColor: '#ffffff',
			scale: 1,
			glyph: '{count}',
			glyphColor: '#ffffff',
		};
	} else {
		return customPin.value;
	}
});

// Generate random markers
const items = computed<GmClusterItem[]>(() => {
	const result: GmClusterItem[] = [];
	for (let i = 0; i < count.value; i++) {
		const lat = Math.random() * 170 - 85;
		const lng = Math.random() * 360 - 180;
		result.push({ lat, lng });
	}
	return result;
});

// Event handlers
const handleClusterClick = (position: { lat: number; lng: number } | null) => {
	if (position) {
		log(`Cluster clicked at ${position.lat.toFixed(2)}, ${position.lng.toFixed(2)}`);
	}
};

const handleClusteringBegin = (clusters: Record<string, any>) => {
	log(`Clustering process started with ${Object.keys(clusters).length} clusters`);
};

const handleClusteringEnd = (clusters: Record<string, any>) => {
	log(`Clustering process completed with ${Object.keys(clusters).length} clusters`);
};
</script>
