# Migration Guide

Also these are depreciated from the plugin options api:

| `version`   | `string`               | `undefined` | **Depreciated**: Use `v`                                                                                          |
| `libraries` | `string` or `string[]` | `undefined` | **Deprecated**: Libraries are now automatically loaded based on used components                                   |



This guide helps you migrate from the legacy v3-gmaps components to the new components. The library maintains backward compatibility, so you can migrate at your own pace.

## Component Name Changes

The new components use a shorter naming convention with the `gm` prefix instead of `gmaps`:

| Legacy Component  | New Component               |
| ----------------- | --------------------------- |
| `gmapsMap`        | `gmMap`                     |
| `gmapsMarker`     | `gmMarker`                  |
| `gmapsCircle`     | `gmCircle`                  |
| `gmapsRectangle`  | `gmRectangle`               |
| `gmapsPolygon`    | `gmPolygon`                 |
| `gmapsPolyline`   | `gmPolyline`                |
| `gmapsInfoWindow` | `gmInfoWindow`              |
| `gmapsCluster`    | `gmCluster`                 |
| `gmapsHeatmap`    | `gmHeatmap`                 |
| `gmapsPopup`      | `Popup` (remains unchanged) |

## Import Changes

### Legacy Imports

```js
import { 
  gmapsMap, 
  gmapsMarker, 
  gmapsCircle, 
  // ... other components
} from 'v3-gmaps'
```

### New Imports

```js
import { 
  gmMap, 
  gmMarker, 
  gmCircle, 
  // ... other components
} from 'v3-gmaps'
```

## Template Changes

### Legacy Template

```vue
<template>
  <div style="height: 500px">
    <gmaps-map :center="center" :zoom="12">
      <gmaps-marker :position="center" />
    </gmaps-map>
  </div>
</template>
```

### New Template

```vue
<template>
  <div style="height: 500px">
    <gm-map :center="center" :zoom="12">
      <gm-marker :position="center" />
    </gm-map>
  </div>
</template>
```

## Prop Changes

Most props remain the same, but there are a few changes to be aware of:

### Map Component

| Legacy Prop | New Prop           | Notes                                                                |
| ----------- | ------------------ | -------------------------------------------------------------------- |
| `options`   | `options`          | Unchanged, but some common options are now available as direct props |
| N/A         | `mapTypeId`        | New direct prop (previously only in options)                         |
| N/A         | `mapId`            | New prop for cloud-based styling                                     |
| N/A         | `disableDefaultUI` | New direct prop (previously only in options)                         |
| N/A         | `clickableIcons`   | New direct prop (previously only in options)                         |
| N/A         | `restriction`      | New direct prop for map boundaries                                   |

### Marker Component

| Legacy Prop | New Prop    | Notes                                  |
| ----------- | ----------- | -------------------------------------- |
| `title`     | `title`     | Unchanged                              |
| `clickable` | `clickable` | Unchanged                              |
| `draggable` | `draggable` | Unchanged                              |
| `opacity`   | `opacity`   | Unchanged                              |
| `options`   | `options`   | Unchanged                              |
| `icon`      | `icon`      | Enhanced support for SVG and HTML pins |
| N/A         | `animation` | New prop for marker animations         |
| N/A         | `label`     | New prop for marker labels             |

## Event Changes

Most events remain the same, but the new components provide more consistent event naming and payload types:

### Legacy Event Format

```vue
<gmaps-map @bounds-changed="onBoundsChanged" />
```

### New Event Format

```vue
<gm-map @bounds_changed="onBoundsChanged" />
```

Note the change from kebab-case to snake_case for event names, which matches the Google Maps API event names.

## Composition API Support

The new components provide better support for the Composition API:

```vue
<script setup>
import { useMapContext } from 'v3-gmaps'

// Access the parent map instance from any child component
const { getMap } = useMapContext()

// Use the map instance for advanced customization
const customizeMap = () => {
  const map = getMap()
  // Customize the map...
}
</script>
```

## Gradual Migration

You can gradually migrate your application from legacy to new components:

1. Both component sets can be used side by side
2. Start by migrating the map component first, then child components
3. Update imports and component names one at a time
4. Test thoroughly after each migration step

Example of mixed usage:

```vue
<template>
  <div style="height: 500px">
    <!-- New map component -->
    <gm-map :center="center" :zoom="12">
      <!-- Legacy child components still work -->
      <gmaps-marker :position="markerPosition1" />
      <!-- New child components -->
      <gm-marker :position="markerPosition2" />
    </gm-map>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { gmMap, gmMarker, gmapsMarker } from 'v3-gmaps'

const center = ref({ lat: 37.7749, lng: -122.4194 })
const markerPosition1 = ref({ lat: 37.77, lng: -122.42 })
const markerPosition2 = ref({ lat: 37.78, lng: -122.41 })
</script>
```

## New Features

The new components include several new features that weren't available in the legacy components:

### Pin API

Create custom marker pins with the Pin API:

```vue
<template>
  <gm-map :center="center" :zoom="12">
    <gm-marker :position="center" :icon="customPin" />
  </gm-map>
</template>

<script setup>
import { ref } from 'vue'
import { gmMap, gmMarker, createPinElement } from 'v3-gmaps'

const center = ref({ lat: 37.7749, lng: -122.4194 })

// Create a custom pin element
const customPin = createPinElement({
  background: '#4285F4',
  borderColor: '#FFF',
  text: 'A',
  textColor: '#FFF',
  scale: 1.2
})
</script>
```

### Map Restrictions

Restrict the map to a specific area:

```vue
<template>
  <gm-map :center="center" :zoom="12" :restriction="restriction" />
</template>

<script setup>
import { ref } from 'vue'
import { gmMap } from 'v3-gmaps'

const center = ref({ lat: 37.7749, lng: -122.4194 })
const restriction = ref({
  latLngBounds: {
    north: 37.85,
    south: 37.70,
    east: -122.35,
    west: -122.50
  },
  strictBounds: true
})
</script>
```

### Better TypeScript Support

The new components provide enhanced TypeScript support:

```ts
import type { MapProps, MarkerProps, GmPosition } from 'v3-gmaps'

// TypeScript interfaces for component props and events
const mapOptions: MapProps = {
  center: { lat: 37.7749, lng: -122.4194 },
  zoom: 12,
  mapTypeId: 'roadmap'
}

const markerOptions: MarkerProps = {
  position: { lat: 37.7749, lng: -122.4194 },
  draggable: true
}
```

## Common Migration Scenarios

### Using Advanced Markers

If you were using a custom marker with HTML content, migrate to the new pin API:

```vue
<!-- Legacy -->
<gmaps-marker :position="position" :options="{ content: customHtmlElement }" />

<!-- New -->
<gm-marker :position="position" :icon="createPinElement(pinOptions)" />
```

### Using InfoWindows

The InfoWindow component has a more intuitive API:

```vue
<!-- Legacy -->
<gmaps-info-window :position="position" :opened="isOpen">
  <div>InfoWindow content</div>
</gmaps-info-window>

<!-- New -->
<gm-info-window :position="position" :open="isOpen">
  <div>InfoWindow content</div>
</gm-info-window>
```

Note the prop name change from `opened` to `open`. 
