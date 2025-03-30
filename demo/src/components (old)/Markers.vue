<template>
	<wrapper-vue>
		<!-- Code -->
		<template v-slot:map>
			<gmaps-map :options="mapOptionsBase">
				<gmaps-marker
					v-for="marker in markers"
					:key="marker.id"
					:position="marker.position"
					:title="`${title} ${marker.id}`"
					:draggable="draggable"
					:visible="visible"
					@click="handleClick(`${title} ${marker.id}`)"
					@dragend="(e:any) => handleDrag(`${title} ${marker.id}`, e)" />
			</gmaps-map>
		</template>
		<!-- Description -->
		<template v-slot:description>
			<pre>
&lt;gmaps-map&gt;
  &lt;gmaps-marker
    v-for="marker in markers"
    :key="marker.id"
    :position="marker.position"
    :title="`${title} ${marker.id}`"
    :draggable="draggable"
    :visible="visible"
    @click="() => handleClick(`${title} ${marker.id}`)"
    @dragend="(e) => handleDrag(`${title} ${marker.id}`, e.latLng)"
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
					min="1"
					max="200"
					@change="handleCountChange" />
			</div>
			<div>
				<label class="control-label">Draggable</label>
				<toggle-vue v-model="draggable" />
			</div>
			<div>
				<label class="control-label">Visible</label>
				<toggle-vue v-model="visible" />
			</div>
			<div>
				<label class="control-label">Title</label>
				<input
					type="text"
					v-model="title"
					style="width: 80px" />
			</div>
		</template>
	</wrapper-vue>
</template>

<script setup lang="ts">
import WrapperVue from './Wrapper.vue';
import { gmapsMap, gmapsMarker, GmapsPosition } from 'v3-gmaps';
import { mapOptionsBase } from './helpers';
import { Ref, ref, watch } from 'vue';
import { log } from '../store';
import ToggleVue from '../assets/Toggle.vue';

const count = ref(50);
const markers: Ref<{ id: string; position: GmapsPosition }[]> = ref([]);
const draggable = ref(true);
const visible = ref(true);
const title = ref('Marker');

const generate = async () => {
	markers.value.splice(0, markers.value.length);
	for (let i = 0; i < count.value; i++) {
		const lat: number = Math.random() * 170 - 85;
		const lng: number = Math.random() * 360 - 180;
		markers.value.push({
			id: `${i}`,
			position: { lat, lng },
		});
	}
};
generate();

const handleClick = (s: string) => {
	log(`Clicked "${s}"`);
};
const handleDrag = (s: string, e: GmapsPosition | null) => {
	if (e) log(`Dragged "${s}" to ${e.lat.toFixed(2)}, ${e.lng.toFixed(2)}`);
};
const handleCountChange = () => {
	generate();
	log(`Updated count to ${count.value}`);
};

watch(
	() => draggable.value,
	(v) => log(`Markers are ${v ? 'now draggable' : 'no longer draggable'}`)
);
watch(
	() => visible.value,
	(v) => log(`Markers are ${v ? 'now visible' : 'now hidden'}`)
);
watch(
	() => title.value,
	(v) => log(`Marker titles set to "${v} ##"`)
);
</script>
