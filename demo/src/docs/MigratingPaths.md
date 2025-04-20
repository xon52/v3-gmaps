# Migrating from Legacy Path Components to v3-gmaps

This guide helps you migrate from the legacy `gmapsPolyline` and `gmapsPolygon` components to the new `gmPolyline` and `gmPolygon` components.

## Import Changes

First, update your imports from:

```js
import { gmapsPolyline, gmapsPolygon } from 'v3-gmaps';
```

to:

```js
import { gmPolyline, gmPolygon } from 'v3-gmaps';
```

## Component Name Changes

Update your template to use the new component names:

- Replace `<gmaps-polyline>` with `<gm-polyline>`
- Replace `<gmaps-polygon>` with `<gm-polygon>`

## Props Compatibility

The new components maintain the same core functionality but with a more consistent API.

### Polyline Component

#### Legacy:
```vue
<gmaps-polyline
  :options="polylineOptions"
  :path="path"
  :draggable="draggable"
  :editable="editable"
  @path_changed="handlePathChanged" />
```

#### New:
```vue
<gm-polyline
  :path="path"
  :draggable="draggable"
  :editable="editable"
  :options="polylineOptions"
  @path_changed="handlePathChanged" />
```

### Polygon Component

#### Legacy:
```vue
<gmaps-polygon
  :options="polygonOptions"
  :paths="paths"
  :draggable="draggable"
  :editable="editable"
  @paths_changed="handlePathsChanged" />
```

#### New:
```vue
<gm-polygon
  :paths="paths"
  :draggable="draggable"
  :editable="editable"
  :options="polygonOptions"
  @paths_changed="handlePathsChanged" />
```

## Key Changes

1. **Direct Property Access**: Similar to other shape components, the core properties like `path` and `paths` are top-level props, separate from the style options.

2. **Options Object**: The `options` prop now contains only styling properties like colors, opacity, and stroke weight.

3. **Event Consistency**: All events are consistent with Google Maps JavaScript API naming conventions.

4. **Path vs Paths**: Remember that `gmPolyline` uses a single `path` property (array of positions), while `gmPolygon` uses a `paths` property (which can be either an array of positions for a single polygon or an array of arrays for multiple rings).

## Example Migration: Polyline

### Before:
```vue
<template>
  <gmaps-polyline
    :options="{
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      path: [
        { lat: -34.397, lng: 150.644 },
        { lat: -34.38, lng: 150.67 },
        { lat: -34.36, lng: 150.645 }
      ]
    }"
    :draggable="true"
    :editable="true" />
</template>

<script setup>
import { gmapsPolyline } from 'v3-gmaps';
</script>
```

### After:
```vue
<template>
  <gm-polyline
    :path="[
      { lat: -34.397, lng: 150.644 },
      { lat: -34.38, lng: 150.67 },
      { lat: -34.36, lng: 150.645 }
    ]"
    :draggable="true"
    :editable="true"
    :options="{
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    }" />
</template>

<script setup>
import { gmPolyline } from 'v3-gmaps';
</script>
```

## Example Migration: Polygon

### Before:
```vue
<template>
  <gmaps-polygon
    :options="{
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.35,
      paths: [
        { lat: -34.41, lng: 150.63 },
        { lat: -34.4, lng: 150.67 },
        { lat: -34.38, lng: 150.65 },
        { lat: -34.39, lng: 150.62 }
      ]
    }"
    :draggable="true"
    :editable="false" />
</template>

<script setup>
import { gmapsPolygon } from 'v3-gmaps';
</script>
```

### After:
```vue
<template>
  <gm-polygon
    :paths="[
      { lat: -34.41, lng: 150.63 },
      { lat: -34.4, lng: 150.67 },
      { lat: -34.38, lng: 150.65 },
      { lat: -34.39, lng: 150.62 }
    ]"
    :draggable="true"
    :editable="false"
    :options="{
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.35
    }" />
</template>

<script setup>
import { gmPolygon } from 'v3-gmaps';
</script>
```

## Complex Polygon with Multiple Paths

The `gmPolygon` component supports complex polygons with holes or multiple polygons. Here's an example of migrating a complex polygon:

### Before:
```vue
<template>
  <gmaps-polygon
    :options="polygonOptions"
    :paths="[outerRing, innerHole]"
    :editable="true" />
</template>

<script setup>
import { gmapsPolygon } from 'v3-gmaps';
import { ref } from 'vue';

const outerRing = ref([
  { lat: -34.41, lng: 150.63 },
  { lat: -34.4, lng: 150.67 },
  { lat: -34.38, lng: 150.65 },
  { lat: -34.39, lng: 150.62 }
]);

const innerHole = ref([
  { lat: -34.395, lng: 150.64 },
  { lat: -34.395, lng: 150.65 },
  { lat: -34.39, lng: 150.645 }
]);

const polygonOptions = ref({
  strokeColor: '#0000FF',
  fillColor: '#0000FF',
  fillOpacity: 0.35
});
</script>
```

### After:
```vue
<template>
  <gm-polygon
    :paths="[outerRing, innerHole]"
    :editable="true"
    :options="polygonOptions" />
</template>

<script setup>
import { gmPolygon } from 'v3-gmaps';
import { ref } from 'vue';

const outerRing = ref([
  { lat: -34.41, lng: 150.63 },
  { lat: -34.4, lng: 150.67 },
  { lat: -34.38, lng: 150.65 },
  { lat: -34.39, lng: 150.62 }
]);

const innerHole = ref([
  { lat: -34.395, lng: 150.64 },
  { lat: -34.395, lng: 150.65 },
  { lat: -34.39, lng: 150.645 }
]);

const polygonOptions = ref({
  strokeColor: '#0000FF',
  fillColor: '#0000FF',
  fillOpacity: 0.35
});
</script>
```

## Working with Editable Paths

When working with editable paths, you can handle vertex changes and other interactions:

```vue
<template>
  <gm-polygon
    :paths="polygonPaths"
    :editable="true"
    @paths_changed="handlePathsChanged"
    @click="handleClick" />
</template>

<script setup>
import { gmPolygon } from 'v3-gmaps';
import { ref } from 'vue';

const polygonPaths = ref([ /* ... your paths ... */ ]);

// Handle path changes when a vertex is dragged
const handlePathsChanged = (newPaths) => {
  polygonPaths.value = newPaths;
  console.log('Paths updated with new coordinates');
};

// Handle clicks on the polygon
const handleClick = (event) => {
  console.log('Polygon clicked:', event);
};
</script>
```

## Compatibility Layer

If you're gradually migrating a large application, the legacy components will continue to work as they map to the new components internally. However, we recommend migrating to the new components for better performance and future compatibility. 
