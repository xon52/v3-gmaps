<template>
	<wrapper-vue>
		<!-- Code -->
		<template v-slot:map>
			<gmaps-map
				:options="mapOptions"
				@click="addMarker">
				<gmaps-marker
					:options="optionsB"
					@click="handleMarkerBClick" />
				<gmaps-marker
					v-for="(m, i) in markers"
					:key="`m${i}`"
					:options="m"
					@click="removeMarker(i)" />
			</gmaps-map>
		</template>
	</wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue';
import { gmapsMap, gmapsMarker, GmPosition } from 'v3-gmaps';
import { mapOptions } from './helpers';
import { log } from '../store';
import { Ref, ref, watch } from 'vue';

const optionsB = ref({
	position: { lat: -30, lng: 138 },
	icon: 'https://github.com/xon52/v3-gmaps/blob/main/demo/src/assets/marker2.png?raw=true',
	title: 'Marker B',
	opacity: 0.7,
} as any);
const markers: Ref<any[]> = ref([]);

const handleMarkerBClick = () => {
	const op = optionsB.value.opacity || 1;
	const new_op = Math.round((op > 0.9 ? 0.5 : op + 0.1) * 10) / 10;
	log(`Marker B opacity changed to ${new_op}`);
	optionsB.value = { opacity: new_op };
};
const addMarker = (e: any) => {
	markers.value.push({
		position: e,
		animation: 'DROP',
		icon: 'https://github.com/xon52/v3-gmaps/blob/main/demo/src/assets/marker.png?raw=true',
	});
};
const removeMarker = (index: number) => {
	markers.value.splice(index, 1);
};
</script>
