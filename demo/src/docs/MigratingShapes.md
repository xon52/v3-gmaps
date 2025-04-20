# Migrating from Legacy Shape Components to v3-gmaps

This guide helps you migrate from the legacy `gmapsCircle` and `gmapsRectangle` components to the new `gmCircle` and `gmRectangle` components.

## Import Changes

First, update your imports from:

```js
import { gmapsCircle, gmapsRectangle } from 'v3-gmaps';
```

to:

```js
import { gmCircle, gmRectangle } from 'v3-gmaps';
```

## Component Name Changes

Update your template to use the new component names:

- Replace `<gmaps-circle>` with `<gm-circle>`
- Replace `<gmaps-rectangle>` with `<gm-rectangle>`

## Props Compatibility

The new components maintain the same core functionality but with a more consistent API.

### Circle Component

#### Legacy:
```vue
<gmaps-circle
  :options="circleOptions"
  :draggable="draggable"
  :editable="editable"
  @center_changed="handleCircleChange"
  @radius_changed="handleRadiusChange" />
```

#### New:
```vue
<gm-circle
  :center="circleCenter"
  :radius="circleRadius"
  :draggable="draggable"
  :editable="editable"
  :options="circleOptions"
  @center_changed="handleCircleCenterChanged"
  @radius_changed="handleCircleRadiusChanged" />
```

### Rectangle Component

#### Legacy:
```vue
<gmaps-rectangle
  :options="rectangleOptions"
  :draggable="draggable"
  :editable="editable"
  @bounds_changed="handleRectangleChange" />
```

#### New:
```vue
<gm-rectangle
  :bounds="rectangleBounds"
  :draggable="draggable"
  :editable="editable"
  :options="rectangleOptions"
  @bounds_changed="handleRectangleBoundsChanged" />
```

## Key Changes

1. **Direct Property Access**: Instead of nesting all configuration in the `options` object, core properties like `center`, `radius`, and `bounds` are now top-level props.

2. **Options Object**: The `options` prop now contains only styling properties like colors, opacity, and stroke weight.

3. **Event Names**: Event names remain the same, but consider updating your event handler names for clarity.

## Example Migration: Circle

### Before:
```vue
<template>
  <gmaps-circle
    :options="{
      center: { lat: -28, lng: 125 },
      fillColor: '#0000FF',
      fillOpacity: 0.35,
      radius: 500000,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2
    }"
    :draggable="true"
    :editable="false" />
</template>

<script setup>
import { gmapsCircle } from 'v3-gmaps';
</script>
```

### After:
```vue
<template>
  <gm-circle
    :center="{ lat: -28, lng: 125 }"
    :radius="500000"
    :draggable="true"
    :editable="false"
    :options="{
      fillColor: '#0000FF',
      fillOpacity: 0.35,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2
    }" />
</template>

<script setup>
import { gmCircle } from 'v3-gmaps';
</script>
```

## Example Migration: Rectangle

### Before:
```vue
<template>
  <gmaps-rectangle
    :options="{
      bounds: {
        east: 145,
        north: -20,
        west: 132,
        south: -27
      },
      fillColor: '#34A853',
      fillOpacity: 0.35,
      strokeColor: '#34A853',
      strokeOpacity: 0.8,
      strokeWeight: 2
    }"
    :draggable="true"
    :editable="false" />
</template>

<script setup>
import { gmapsRectangle } from 'v3-gmaps';
</script>
```

### After:
```vue
<template>
  <gm-rectangle
    :bounds="{
      east: 145,
      north: -20,
      west: 132,
      south: -27
    }"
    :draggable="true"
    :editable="false"
    :options="{
      fillColor: '#34A853',
      fillOpacity: 0.35,
      strokeColor: '#34A853',
      strokeOpacity: 0.8,
      strokeWeight: 2
    }" />
</template>

<script setup>
import { gmRectangle } from 'v3-gmaps';
</script>
```

## Compatibility Layer

If you're gradually migrating a large application, our legacy components will continue to work by mapping to the new components internally. However, we recommend migrating to the new components for better performance and future compatibility. 
