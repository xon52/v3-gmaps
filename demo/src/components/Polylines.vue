<template>
	<wrapper-vue ref="wrapper">
		<!-- Code -->
		<template v-slot:map>
			<gmaps-map :options="mapOptions">
				<gmaps-polygon
					v-if="polygon"
					:options="polygonOptions"
					:paths="[items]"
					:draggable="draggable"
					:editable="editable"
					@paths_changed="handlePathsChanged"
					@mounted="handlePolygonMounted" />
				<gmaps-polyline
					v-else
					:options="polylineOptions"
					:path="items"
					:draggable="draggable"
					:editable="editable"
					@path_changed="handlePathChanged"
					@mounted="handlePolylineMounted" />
			</gmaps-map>
		</template>
		<!-- Description -->
		<template v-slot:description>
			<pre>
&lt;gmaps-map&gt;
  &lt;gmaps-polygon
    v-if="polygon"
    :options="polygonOptions"
    :paths="[items]"
    :draggable="draggable"
    :editable="editable"
    @paths_changed="handlePathsChanged"
  /&gt;
  &lt;gmaps-polyline
    v-else
    :options="polylineOptions"
    :path="items"
    :draggable="draggable"
    :editable="editable"
    @path_changed="handlePathChanged"
  /&gt;
&lt;/gmaps-map&gt;
      </pre>
		</template>
		<!-- Controls -->
		<template v-slot:controls>
			<div>
				<label class="control-label">Reset Points</label>
				<button @click="generateItems">Reset</button>
			</div>
			<div>
				<label class="control-label">Polygon</label>
				<toggle-vue v-model="polygon" />
			</div>
			<div>
				<label class="control-label">Draggable</label>
				<toggle-vue v-model="draggable" />
			</div>
			<div>
				<label class="control-label">Editable</label>
				<toggle-vue v-model="editable" />
			</div>
		</template>
	</wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue';
import { gmapsMap, gmapsPolyline, gmapsPolygon, GmapsPosition } from 'v3-gmaps';
import { mapOptions, icons } from './helpers';
import { onMounted, Ref, ref, watch } from 'vue';
import { log } from '../store';
import ToggleVue from '../assets/Toggle.vue';

const editable = ref(false);
const draggable = ref(true);
const polygon = ref(false);
const items: Ref<GmapsPosition[]> = ref([]);

const generateItems = () => {
	const temp: GmapsPosition[] = [];
	for (let i = 0; i < 5; i++)
		temp.push({
			lat: -40 + Math.random() * 30,
			lng: 110 + Math.random() * 50,
		});
	items.value = temp;
};
generateItems();

const polylineOptions: Ref<google.maps.PolylineOptions> = ref({
	strokeColor: '#0000FF',
	strokeOpacity: 0.8,
	strokeWeight: 10,
});
const polygonOptions: Ref<google.maps.PolygonOptions> = ref({
	icons,
	fillColor: '#0000FF',
	fillOpacity: 0.35,
	strokeColor: '#0000FF',
	strokeOpacity: 0.8,
	strokeWeight: 2,
});

const handlePolygonMounted = (e: google.maps.Polygon) => console.log('Polygon mounted', e);
const handlePolylineMounted = (e: google.maps.Polyline) => console.log('Polyline mounted', e);
const handlePathChanged = (e: GmapsPosition[]) => {
	items.value = e;
	log(`@path_changed`);
};
const handlePathsChanged = (e: any) => {
	items.value = e[0];
	log(`@paths_changed`);
};

watch(
	() => polygon.value,
	(v) => log(`Switched to ${v ? 'polygon' : 'polyline'}`)
);
watch(
	() => draggable.value,
	(v) => log(`Shapes are ${v ? 'now draggable' : 'no longer draggable'}`)
);
watch(
	() => editable.value,
	(v) => log(`Shapes are ${v ? 'now editable' : 'no longer editable'}`)
);
</script>
