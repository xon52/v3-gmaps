<template>
	<wrapper-vue>
		<!-- Code -->
		<template v-slot:map>
			<gmaps-map
				:options="mapOptions"
				@click="addMarker">
				<!-- Example 1: Adding and removing markers -->
				<gmaps-marker
					v-for="(m, i) in markers"
					:key="i"
					:position="m.position"
					:background="m.background"
					:scale="m.scale"
					@click="removeMarker(i)"
					@mounted="handleMarkerMounted"
					@unmounted="handleMarkerUnmounted">
				</gmaps-marker>

				<!-- Example 2: Glyph image with scaling -->
				<gmaps-marker
					:position="glyphMarker.position"
					:scale="glyphMarker.scale"
					:background="glyphMarker.background"
					:glyph="Marker2Png"
					@click="handleGlyphMarkerClick"
					@mounted="handleGlyphMarkerMounted">
				</gmaps-marker>

				<!-- Example 3: Image as child for custom marker -->
				<gmaps-marker
					:position="imageMarker.position"
					:scale="imageMarker.scale"
					:background="imageMarker.background"
					@click="handleImageMarkerClick"
					@mounted="handleImageMarkerMounted">
					<img
						:src="MarkerPng"
						alt="Custom image marker" />
				</gmaps-marker>
			</gmaps-map>
		</template>
		<!-- Description -->
		<template v-slot:description>
			<h3>Three Ways to Use Markers</h3>
			<h4>1. Basic Markers (Add/Remove)</h4>
			<p>Click on the map to add a marker. Click on any added marker to remove it.</p>

			<h4>2. Glyph Image Marker</h4>
			<p>The blue marker uses an image as a glyph property. Click it to increase its scale.</p>

			<h4>3. Child Image Marker</h4>
			<p>The red marker uses an image child element. Click it to increase its scale.</p>

			<pre>
&lt;!-- Example 1: Adding and removing markers --&gt;
&lt;gmaps-marker
  v-for="(m, i) in markers"
  :key="i"
  :position="m.position"
  :background="m.background"
  :scale="m.scale"
  @click="removeMarker(i)"&gt;
&lt;/gmaps-marker&gt;

&lt;!-- Example 2: Glyph image with scaling --&gt;
&lt;gmaps-marker
  :position="{ lat: -30, lng: 138 }"
  :scale="1.0"
  :background="#4285F4"
  :glyph="Marker2Png"
  @click="handleGlyphMarkerClick"&gt;
&lt;/gmaps-marker&gt;

&lt;!-- Example 3: Image as child for custom marker --&gt;
&lt;gmaps-marker
  :position="{ lat: -25, lng: 125 }"
  :scale="1.0"
  @click="handleImageMarkerClick"&gt;
  &lt;img :src="MarkerPng" alt="Custom image marker" /&gt;
&lt;/gmaps-marker&gt;
      </pre>
		</template>
		<!-- Controls -->
		<template v-slot:controls> </template>
	</wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue';
import { gmapsMap, gmapsMarker, GmapsPosition } from 'v3-gmaps';
import { mapOptions } from './helpers';
import { Ref, ref } from 'vue';
import { log } from '../store';
import MarkerPng from '../assets/marker.png';
import Marker2Png from '../assets/marker2.png';

// Define marker options interface that matches our component props
interface MarkerOptions {
	position: GmapsPosition;
	title?: string;
	background?: string;
	scale?: number;
	visible?: boolean;
}

// Marker with glyph image
const glyphMarker: Ref<MarkerOptions> = ref({
	position: { lat: -30, lng: 138 },
	title: 'Glyph Marker',
	scale: 3,
	background: '#4285F4',
});

// Marker with image as child
const imageMarker: Ref<MarkerOptions> = ref({
	position: { lat: -25, lng: 125 },
	title: 'Image Marker',
});

// Regular markers added by clicking
const markers: Ref<MarkerOptions[]> = ref([]);

// Handler for glyph marker
const handleGlyphMarkerClick = () => {
	const scale = glyphMarker.value.scale || 1.0;
	const new_scale = Math.round((scale > 4 ? 2 : scale + 0.5) * 10) / 10;
	log(`Glyph marker scale changed to ${new_scale}`);
	glyphMarker.value = { ...glyphMarker.value, scale: new_scale };
};

// Handler for image marker
const handleImageMarkerClick = () => {
	log(`Image marker clicked.`);
};

// Log events
const handleGlyphMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) =>
	console.log('Glyph Marker Mounted', e);
const handleImageMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) =>
	console.log('Image Marker Mounted', e);
const handleMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) => console.log('Regular Marker mounted', e);
const handleMarkerUnmounted = (e: google.maps.marker.AdvancedMarkerElement) =>
	console.log('Regular Marker unmounted', e);

// Add a new marker at clicked position
const addMarker = (e: GmapsPosition | null) => {
	if (e) {
		const newMarker: MarkerOptions = {
			position: e,
			scale: 1.0,
			background: '#EA4335',
		};
		markers.value.push(newMarker);
		log(`New marker added at lat: ${e.lat.toFixed(4)}, lng: ${e.lng.toFixed(4)}`);
	}
};

// Remove marker at specified index
const removeMarker = (index: number) => {
	log(`Marker removed: ${index}`);
	markers.value.splice(index, 1);
};
</script>
