<template>
	<wrapper-vue>
		<!-- Code -->
		<template v-slot:map>
			<gmaps-map
				:options="mapOptions"
				@click="addMarker">
				<gmaps-marker
					:options="optionsB"
					@click="handleMarkerBClick"
					@mounted="handleMarkerBMounted" />
				<gmaps-marker
					v-for="(m, i) in markers"
					:key="i"
					:options="m"
					@click="removeMarker(i)"
					@mounted="handleMarkerMounted"
					@unmounted="handleMarkerUnmounted" />
			</gmaps-map>
		</template>
		<!-- Description -->
		<template v-slot:description>
			<ol>
				<li>Click on the flag to increase its scale</li>
				<li>Click on the map to drop a new marker</li>
				<li>Click on a dropped marker to remove it</li>
			</ol>
			<pre>
&lt;gmaps-map @click="addMarker"&gt;
  &lt;gmaps-marker
    :options="{
      position: { lat: -30, lng: 138 },
      glyph: Marker2Png,
      title: 'Marker B',
      scale: 1.0,
      background: '#4285F4'
    }"
    @click="handleMarkerBClick"
  /&gt;
  &lt;gmaps-marker
    v-for="(m, i) in markers"
    :key="i"
    :options="m"
    @click="removeMarker(i)"
  /&gt;
&lt;/gmaps-map /&gt;
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

// Define marker options interface that matches AdvancedMarkerElement
interface MarkerOptions {
	position: GmapsPosition;
	title?: string;
	background?: string;
	scale?: number;
	visible?: boolean;
	glyph?: string;
}

const optionsB: Ref<MarkerOptions> = ref({
	position: { lat: -30, lng: 138 },
	glyph: Marker2Png,
	title: 'Marker B',
	scale: 1.0,
	background: '#4285F4',
});

const markers: Ref<MarkerOptions[]> = ref([]);

const handleMarkerBClick = () => {
	const scale = optionsB.value.scale || 1.0;
	const new_scale = Math.round((scale > 1.4 ? 0.7 : scale + 0.1) * 10) / 10;
	log(`Marker B scale changed to ${new_scale}`);
	optionsB.value = { ...optionsB.value, scale: new_scale };
};

const handleMarkerBMounted = (e: google.maps.marker.AdvancedMarkerElement) => console.log('Marker B Mounted', e);
const handleMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) => console.log('Marker mounted', e);
const handleMarkerUnmounted = (e: google.maps.marker.AdvancedMarkerElement) => console.log('Marker unmounted', e);

const addMarker = (e: GmapsPosition | null) => {
	if (e) {
		const newMarker: MarkerOptions = {
			position: e,
			glyph: MarkerPng,
			scale: 1.0,
			background: '#EA4335',
		};
		markers.value.push(newMarker);
	}
};

const removeMarker = (index: number) => {
	markers.value.splice(index, 1);
};
</script>
