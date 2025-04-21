# Typescript

Google Maps provides type definitions via [@types/google.maps](https://www.npmjs.com/package/@types/google.maps).

While `v3-gmaps` was built using these types, we created our own simplified types that are more Vue-friendly and reduce overhead when passing objects as component props.

## Type Imports

v3-gmaps exports all the types you need for working with the library:

```ts
import { 
  // Common types
  GmPosition,
  GmBounds,
  
  // Pin/Marker styling
  GmPin,
  GmPinStyle,

  // Special types
  GmMapTypeId,
  GmClusterItem,
  GmClusterGroup,
  GmInfoWindowOpenOptions,
  GmWeightedPosition,
  GmStrokePosition,
  
  // Component prop types
  GmMapProps,
  GmMarkerProps,
  GmCircleProps,
  GmRectangleProps,
  GmPolygonProps,
  GmPolylineProps,
  GmInfoWindowProps,
  GmClusterProps,
  GmHeatmapProps,
  
  // Component event types
  GmMapEvents,
  GmMarkerEvents,
  GmCircleEvents,
  GmRectangleEvents,
  GmPolygonEvents,
  GmPolylineEvents,
  GmInfoWindowEvents,
  GmClusterEvents,
  GmHeatmapEvents,
  
  // API options
  GmApiOptions
} from 'v3-gmaps'
```

## Using Component Props and Events

You can import component prop and event types for use in your own components:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { gmMap } from 'v3-gmaps'
import type { GmPosition } from 'v3-gmaps'

// Typed refs
const center = ref<GmPosition>({ lat: 37.7749, lng: -122.4194 })
const zoom = ref(12)

// Typed event handler
const onMapClick = (position: GmPosition | null) => {
  if (position) {
    console.log(`Map clicked at: ${position.lat}, ${position.lng}`)
  }
}
</script>
```

<!-- TODO: Add explanation for how to use google.maps types
## Type Definitions for Google Maps API

v3-gmaps uses the official `@types/google.maps` type definitions for the Google Maps JavaScript API. These types are **not** automatically included as a dependency when you install v3-gmaps.

When working with raw Google Maps objects, you can use these types directly *if you install the dependency*:

```ts
import { getAPI, waitForReady } from 'v3-gmaps'

// Function that takes a Google Maps object with proper typing
const createCustomControl = (map: google.maps.Map) => {
  const controlDiv = document.createElement('div')
  // ... custom control implementation
  return controlDiv
}

// Using the Google Maps API with proper typing
const initCustomControl = async () => {
  await waitForReady()
  const mapsApi = await getAPI()
  
  const mapOptions: google.maps.MapOptions = {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 12
  }
  
  const mapElement = document.getElementById('map') as HTMLElement
  const map = new mapsApi.maps.Map(mapElement, mapOptions)
  
  const customControl = createCustomControl(map)
  map.controls[mapsApi.maps.ControlPosition.TOP_RIGHT].push(customControl)
}
``` -->
