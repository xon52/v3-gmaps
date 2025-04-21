# Migration Guide

This guide helps you migrate from the v0.1.9 v3-gmaps components to v1.0.0. The library **mostly** maintains backward compatibility, so you may not need to change anything now.

## Plugin Configuration Changes

The plugin configuration has changed with some options being renamed or deprecated:

| Legacy Option | New Option | Notes                                                                           |
| ------------- | ---------- | ------------------------------------------------------------------------------- |
| `version`     | `v`        | **Deprecated**: Use `v` instead of `version`                                    |
| `libraries`   | -          | **Deprecated**: Libraries are now automatically loaded based on used components |

## Component Name Changes

The new components use a shorter naming convention with the `gm` prefix instead of `gmaps`:

| Legacy Component  | New Component                             | Documentation                                   |
| ----------------- | ----------------------------------------- | ----------------------------------------------- |
| `gmapsMap`        | `gmMap`                                   | [Map](/api/map.md)                              |
| `gmapsMarker`     | `gmMarker`                                | [Marker](/api/marker.md)                        |
| `gmapsCircle`     | `gmCircle`                                | [Circle](/api/circle.md)                        |
| `gmapsRectangle`  | `gmRectangle`                             | [Rectangle](/api/rectangle.md)                  |
| `gmapsPolygon`    | `gmPolygon`                               | [Polygon](/api/polygon.md)                      |
| `gmapsPolyline`   | `gmPolyline`                              | [Polyline](/api/polyline.md)                    |
| `gmapsInfoWindow` | `gmInfoWindow`                            | [InfoWindow](/api/info-window.md)               |
| `gmapsCluster`    | `gmCluster`                               | [Cluster](/api/cluster.md)                      |
| `gmapsHeatmap`    | `gmHeatmap`                               | [Heatmap](/api/heatmap.md)                      |
| `gmapsPopup`      | **Removed** - Use `gmMarker` slot instead | See [Marker](/api/marker.md) for custom content |

*Legacy components are still available. They now use the new components under the hood, but a handful of component features are not available in the new API.*

## Type Changes

The type system has been simplified, with types using the `Gm` prefix instead of `Gmaps`:

| Legacy Type      | New Type      |
| ---------------- | ------------- |
| `GmapsPosition`  | `GmPosition`  |
| `GmapsMapTypeId` | `GmMapTypeId` |
| `GmapsBounds`    | `GmBounds`    |
| And others...    |               |

## Prop Changes

#### Map Component

| Legacy Prop | New Prop           | Notes                                                         |
| ----------- | ------------------ | ------------------------------------------------------------- |
| N/A         | `mapTypeId`        | New direct prop (previously only in options)                  |
| N/A         | `mapId`            | New prop for cloud-based styling and Advanced Markers support |
| N/A         | `disableDefaultUI` | New direct prop (previously only in options)                  |
| N/A         | `clickableIcons`   | New direct prop (previously only in options)                  |
| N/A         | `restriction`      | New direct prop for map boundaries                            |
| `throttle`  | `throttle`         | Default changed from `100` to `200` milliseconds              |

#### Marker Component

The marker component has undergone significant changes, switching from the legacy Marker API to the new Advanced Markers API:

| Legacy Prop | New Prop  | Notes                                                    |
| ----------- | --------- | -------------------------------------------------------- |
| `opacity`   | Removed   | Advanced Markers don't support opacity                   |
| `options`   | `options` | Now uses AdvancedMarkerElement options instead of Marker |
| `icon`      | Removed   | Replaced by `pin` and slot content                       |
| `animation` | Removed   | Advanced Markers don't support built-in animations       |
| `label`     | Removed   | Use slot content for custom labels                       |
| N/A         | `pin`     | New prop for customizing marker appearance               |

## Advanced Markers API

The new version uses Google Maps Platform's Advanced Markers API requires a valid `mapId`. For convenience this has been defaulted to `DEMO_MAP_ID` to make it optional ([read more](https://developers.google.com/maps/documentation/get-map-id)).

```vue
<gm-map mapId="YOUR_MAP_ID">
  <gm-marker :position="position" />
</gm-map>
```

### Pin API

Advanced Markers support custom styling through the Pin API:

```vue
<gm-marker 
  :position="position" 
  :pin="{
    background: '#4285F4',
    borderColor: '#FFF',
    glyphColor: '#FFF',
    glyph: 'A',
    scale: 1.2
  }" 
/>
```

### Custom Marker Content

You can create fully custom markers using the default slot:

```vue
<gm-marker :position="position">
  <div class="custom-marker">
    <img src="/logo.png" alt="Custom marker" />
    <div class="marker-label">Custom Marker</div>
  </div>
</gm-marker>
```

## CSS Import Changes

The new version no longer requires a CSS import from the package. You should remove any CSS imports from v3-gmaps:

```js
// Remove this line
import "v3-gmaps/dist/style.css";
```

This import is no longer needed as the library now handles styles internally.

## Gradual Migration

You can migrate your application gradually:

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

<br />

::: tip
If you have any issues or questions, please raise them on the [GitHub issues page](https://github.com/xon52/v3-gmaps/issues).
:::
