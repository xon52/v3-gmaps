<template>
	<wrapper-vue ref="wrapper">
		<!-- Code -->
		<template v-slot:map>
			<gmaps-map
				:options="mapOptionsBase"
				@zoom_changed="handleZoomChange">
				<gmaps-cluster
					:items="items"
					:max-zoom="maxZoom"
					:tile-size="tileSize"
					:pin="pin"
					@click="handleClusterClick"
					@mounted="handleClusteringBegin"
					@unmounted="handleClusteringEnd" />
			</gmaps-map>
		</template>
		<!-- Description -->
		<template v-slot:description>
			<p>
				The Cluster component groups markers together based on zoom level and map bounds. It uses Google Maps Advanced
				Markers for better performance and supports both base styles and custom styling options.
			</p>
			<pre>
&lt;gmaps-map&gt;
  &lt;gmaps-cluster
    :items="items"
    :max-zoom="16"
    :tile-size="256"
    :pin="pin"
    @click="handleClick"
    @mounted="handleMounted"
    @unmounted="handleUnmounted"
  /&gt;
&lt;/gmaps-map&gt;
      </pre>
		</template>
		<!-- Controls -->
		<template v-slot:controls>
			<div>
				<label class="control-label">Count ({{ count }})</label>
				<input
					type="range"
					v-model="count"
					min="50"
					max="2000"
					step="50"
					@change="handleCountChange" />
			</div>
			<div>
				<label class="control-label">Max Zoom ({{ maxZoom }})</label>
				<input
					type="range"
					v-model="maxZoom"
					min="0"
					max="20"
					@change="handleMaxZoomChange" />
			</div>
			<div>
				<label class="control-label">Tile Size ({{ tileSize }})</label>
				<input
					type="range"
					v-model="tileSize"
					min="128"
					max="512"
					step="64"
					@change="handleTileSizeChange" />
			</div>
			<div>
				<label class="control-label">Pin Style</label>
				<select v-model="pinStyle">
					<option value="default">Default</option>
					<option value="custom">Custom</option>
				</select>
			</div>
			<template v-if="pinStyle === 'custom'">
				<div>
					<label class="control-label">Background Color</label>
					<input
						type="color"
						v-model="pin.background" />
				</div>
				<div>
					<label class="control-label">Border Color</label>
					<input
						type="color"
						v-model="pin.borderColor" />
				</div>
				<div>
					<label class="control-label">Scale</label>
					<input
						type="range"
						:value="pin.scale"
						@input="(e) => pin.scale = Number((e.target as HTMLInputElement).value)"
						min="0.5"
						max="2"
						step="0.1" />
				</div>
				<div>
					<label class="control-label">Glyph</label>
					<input
						type="text"
						v-model="pin.glyph"
						placeholder="{count}" />
				</div>
				<div>
					<label class="control-label">Glyph Color</label>
					<input
						type="color"
						v-model="pin.glyphColor" />
				</div>
			</template>
		</template>
	</wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue';
import { gmapsMap, gmapsCluster } from 'v3-gmaps';
import { mapOptionsBase } from './helpers';
import { ref, computed } from 'vue';
import { log } from '../store';
import type { Pin, PinStyle } from '../../../src/components/Pin/types';

// Configuration
const count = ref(600);
const maxZoom = ref(16);
const tileSize = ref(256);
const pinStyle = ref<'default' | 'custom'>('default');
const pin = ref<PinStyle>({
	background: '#4285F4',
	borderColor: '#ffffff',
	scale: 1,
	glyph: '{count}',
	glyphColor: '#ffffff',
});

// Generate random markers
const items = computed(() => {
	const result = [];
	for (let i = 0; i < count.value; i++) {
		const lat: number = Math.random() * 170 - 85;
		const lng: number = Math.random() * 360 - 180;
		result.push({ lat, lng });
	}
	return result;
});

// Event handlers
const handleZoomChange = (e: number | null) => log(`Zoomed to level ${e}`);
const handleCountChange = () => log(`Updated count to ${count.value}`);
const handleMaxZoomChange = () => log(`Updated maxZoom to ${maxZoom.value}`);
const handleTileSizeChange = () => log(`Updated tileSize to ${tileSize.value}`);

// Cluster event handlers
const handleClusterClick = (position: google.maps.LatLngLiteral | null) => {
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
