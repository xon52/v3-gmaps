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
		<!-- Controls -->
		<template v-slot:controls> </template>
	</wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue';
import { gmapsMap, gmapsMarker, GmPosition } from 'v3-gmaps';
import { mapOptions } from './helpers';
import { Ref, ref } from 'vue';
import { log } from '../store';
import MarkerPng from '../assets/marker.png';
import Marker2Png from '../assets/marker2.png';

// Define marker options interface that matches AdvancedMarkerElement
interface MarkerOptions {
	position: GmPosition;
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
	const op = optionsB.value.opacity || 1;
	const new_op = Math.round((op > 0.9 ? 0.5 : op + 0.1) * 10) / 10;
	log(`Marker B opacity changed to ${new_op}`);
	optionsB.value = { opacity: new_op };
};

const handleMarkerBMounted = (e: google.maps.marker.AdvancedMarkerElement) => console.log('Marker B Mounted', e);
const handleMarkerMounted = (e: google.maps.marker.AdvancedMarkerElement) => console.log('Marker mounted', e);
const handleMarkerUnmounted = (e: google.maps.marker.AdvancedMarkerElement) => console.log('Marker unmounted', e);

const addMarker = (e: GmPosition | null) => {
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
