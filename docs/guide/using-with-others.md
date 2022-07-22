# Using with Other Libraries

### [@googlemaps/markerclusterer](https://www.npmjs.com/package/@googlemaps/markerclusterer)
Example by [gerritvanaaken](https://github.com/gerritvanaaken):

```js
<template>
...
<gmaps-map
  :options="mapmodel"
  @mounted="initMap">

  <gmaps-marker
    v-for="station in filteredStations" // filteredStation is reactive and changes all the time
    :key="station.id"
    :position="{ lat: station.coordinates[1], lng: station.coordinates[0] }"
    @mounted="addMarker"
    @unmounted="removeMarker"
  />

</gmaps-map>
...
</template>

<script setup>
import {ref, toRaw, computed, inject, onMounted, onUpdated} from 'vue';
import {gmapsMap, gmapsMarker, gmapsPolygon} from 'v3-gmaps';
import MarkerClusterer from '@googlemaps/markerclustererplus';
...

const globalmap = ref(null);
let markerClusterer = null; // no reactivity, please!

const addMarker = (marker) => {
	markerClusterer.addMarker(marker);
};
const removeMarker = (marker) => {
	markerClusterer.removeMarker(marker);
};

const initMap = (map) => {
	globalmap.value = map;

	// init clusterer
	markerClusterer = new MarkerClusterer(toRaw(map), [], { // kill map reactivity for clusterer, it will crash otherwise
		gridSize: 20,
		maxZoom: 13,
		styles: [
			MarkerClusterer.withDefaultStyle({
				width: 30,
				height: 30,
				textColor: '#fff',
				textSize: 12,
				fontFamily: 'Castledown',
				fontWeight: 300
			})
		]
	});
};
```