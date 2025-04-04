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
					@click="removeMarker(i)"
					@mounted="handleMarkerMounted"
					@unmounted="handleMarkerUnmounted">
				</gmaps-marker>

				<!-- Example 2: Glyph image with scaling -->
				<gmaps-marker
					:position="glyphMarker.position"
					:pin="glyphMarkerPin"
					@click="handleGlyphMarkerClick"
					@mounted="handleGlyphMarkerMounted">
				</gmaps-marker>

				<!-- Example 3: Image as child for custom marker -->
				<gmaps-marker
					:position="imageMarker.position"
					:pin="MarkerPng"
					@click="handleImageMarkerClick"
					@mounted="handleImageMarkerMounted">
				</gmaps-marker>

				<!-- Example 4: Image in default slot with same pin -->
				<gmaps-marker
					:position="slotImageMarker.position"
					:key="'slot-marker'"
					@click="handleSlotImageMarkerClick"
					@mounted="handleSlotImageMarkerMounted">
					<img
						:src="Marker2Png"
						alt="Slot image marker"
						style="width: 30px; height: auto" />
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

			<h4>4. Slot Image Marker</h4>
			<p>This marker uses an image in its default slot. Click it to change the image scale.</p>

			<h4>5. Default Slot Marker</h4>
			<p>This marker uses the default slot for the image rather than the pin slot. Click it to increase its scale.</p>

			<pre>
&lt;!-- Example 1: Adding and removing markers --&gt;
&lt;gmaps-marker
  v-for="(m, i) in markers"
  :key="i"
  :position="m.position"
  :pin="{ background: m.background, scale: m.scale }"
  @click="removeMarker(i)"&gt;
&lt;/gmaps-marker&gt;

&lt;!-- Example 2: Glyph image with scaling --&gt;
&lt;gmaps-marker
  :position="{ lat: -30, lng: 138 }"
  :pin="{ glyph: Marker2Png, background: glyphMarker.background, scale: glyphMarker.scale }"
  @click="handleGlyphMarkerClick"&gt;
&lt;/gmaps-marker&gt;

&lt;!-- Example 3: Image as child for custom marker --&gt;
&lt;gmaps-marker
  :position="{ lat: -25, lng: 125 }"
  :pin="{ scale: imageMarker.scale }"
  @click="handleImageMarkerClick"&gt;
  &lt;img 
    :src="MarkerPng" 
    alt="Custom image marker"
    style="width: 30px; height: auto;" /&gt;
&lt;/gmaps-marker&gt;

&lt;!-- Example 4: Image in default slot with same pin --&gt;
&lt;gmaps-marker
  :position="{ lat: -28, lng: 130 }"
  :key="'slot-marker'"
  @click="handleSlotImageMarkerClick"&gt;
  &lt;img 
    :src="Marker2Png" 
    alt="Slot image marker"
    style="width: 30px; height: auto;" /&gt;
&lt;/gmaps-marker&gt;

&lt;!-- Example 5: Image in default slot (not pin slot) --&gt;
&lt;gmaps-marker
  :position="{ lat: -32, lng: 135 }"
  :key="'default-slot-marker'"
  @click="handleDefaultSlotMarkerClick"&gt;
  &lt;img 
    :src="Marker2Png" 
    alt="Default slot marker"
    style="width: 30px; height: auto;" /&gt;
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
import { computed, Ref, ref } from 'vue';
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

// Use computed property for the glyph marker pin
const glyphMarkerPin = computed(() => ({
	glyph: Marker2Png,
	background: glyphMarker.value.background,
	scale: glyphMarker.value.scale,
}));

// Marker with image as child
const imageMarker: Ref<MarkerOptions> = ref({
	position: { lat: -25, lng: 125 },
	title: 'Image Marker',
	scale: 1.2,
});

// Marker with image in slot
const slotImageMarker: Ref<MarkerOptions> = ref({
	position: { lat: -28, lng: 130 },
	title: 'Slot Image Marker',
	scale: 1.0,
});

// Marker with image in default slot (not pin slot)
const defaultSlotMarker: Ref<MarkerOptions> = ref({
	position: { lat: -32, lng: 135 },
	title: 'Default Slot Marker',
	scale: 1.0,
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
	log(`Image marker clicked`);
};

// Handler for slot image marker
const handleSlotImageMarkerClick = () => {
	log(`Slot image marker clicked`);
};

// Handler for default slot marker
const handleDefaultSlotMarkerClick = () => {
	const scale = defaultSlotMarker.value.scale || 1.0;
	const new_scale = Math.round((scale > 4 ? 2 : scale + 0.5) * 10) / 10;
	log(`Default slot marker scale changed to ${new_scale}`);
	defaultSlotMarker.value = { ...defaultSlotMarker.value, scale: new_scale };
};

// Log events
const handleGlyphMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) =>
	console.log('Glyph Marker Mounted', e);
const handleImageMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) =>
	console.log('Image Marker Mounted', e);
const handleSlotImageMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) =>
	console.log('Slot Image Marker Mounted', e);
const handleMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) => console.log('Regular Marker mounted', e);
const handleMarkerUnmounted = (e: google.maps.marker.AdvancedMarkerElement) =>
	console.log('Regular Marker unmounted', e);
const handleDefaultSlotMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) =>
	console.log('Default Slot Marker Mounted', e);

// Add a new marker at clicked position
const addMarker = (e: { lat: number | (() => number); lng: number | (() => number) } | null) => {
	if (e) {
		// Extract lat/lng values regardless of whether it's a LatLng object or LatLngLiteral
		const lat = typeof e.lat === 'function' ? e.lat() : e.lat;
		const lng = typeof e.lng === 'function' ? e.lng() : e.lng;

		const newMarker: MarkerOptions = {
			position: { lat, lng },
			scale: 1.0,
			background: '#EA4335',
		};
		markers.value.push(newMarker);
		log(`New marker added at lat: ${lat.toFixed(4)}, lng: ${lng.toFixed(4)}`);
	}
};

// Remove marker at specified index
const removeMarker = (index: number) => {
	log(`Marker removed: ${index}`);
	markers.value.splice(index, 1);
};
</script>
