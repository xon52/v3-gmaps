---
sidebarDepth: 2
---

# Polygon (`gm-polygon`)

<div class="v3-gmaps-screenshot">
  <img src="../img/polygon.png">
  <p>In addition to <a href="./rectangle">rectangles</a>, <a href="./polyline">polylines</a>, and <a href="./circle">circles</a> you can also create polygons on a map.</p>
</div>

### Simple Use ([demo](https://vue-bujcvu.stackblitz.io/polylines))

```html
<template>
  <div style="height: 500px">
    <gm-map>
      <gm-polygon :paths="[{ lat: -28, lng: 125 }, { lat: -25, lng: 130 }, { lat: -32, lng: 120 }]" />
    </gm-map>
  </div>
</template>

<script setup lang="ts">
import { gmMap, gmPolygon } from 'v3-gmaps';
</script>
```

### Props

| Props     |               Type               | Default | Description                                                                                               |
| :-------- | :------------------------------: | :-----: | :-------------------------------------------------------------------------------------------------------- |
| options\* |        `GmPolygonOptions`        |    -    | Object used to define the properties of a `gm-polygon`.                                                   |
| draggable |            `boolean`             | `false` | Whether this Polygon can be dragged over the map.                                                         |
| editable  |            `boolean`             | `false` | Whether this Polygon can be edited by dragging the control points shown at the vertices and on each edge. |
| paths     | `GmPosition[] \| GmPosition[][]` |    -    | The ordered sequence of coordinates that designates a closed loop.                                        |
| visible   |            `boolean`             | `true`  | Whether this Polygon is visible on the map.                                                               |

\* To see all of the possible options, have a look at the [Google Maps PolygonOptions interface](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions).

### Events

| Event         |               Type               | Description                                                                 |
| :------------ | :------------------------------: | :-------------------------------------------------------------------------- |
| click         |           `GmPosition`           | This event is fired when the DOM click event is fired on the Polygon.       |
| contextmenu   |           `GmPosition`           | This event is fired when the DOM contextmenu event is fired on the Polygon. |
| dblclick      |           `GmPosition`           | This event is fired when the DOM dblclick event is fired on the Polygon.    |
| drag          |           `GmPosition`           | This event is repeatedly fired while the user drags the Polygon.            |
| dragend       |           `GmPosition`           | This event is fired when the user stops dragging the Polygon.               |
| dragstart     |           `GmPosition`           | This event is fired when the user starts dragging the Polygon.              |
| mounted       |      `google.maps.Polygon`       | On mounted the component will emit the Google Maps object it represents.    |
| mousedown     |           `GmPosition`           | This event is fired for a mousedown on the Polygon.                         |
| mousemove     |           `GmPosition`           | This event is fired for a mousemove on the Polygon.                         |
| mouseout      |           `GmPosition`           | This event is fired for a mouseout on the Polygon.                          |
| mouseover     |           `GmPosition`           | This event is fired for a mouseover on the Polygon.                         |
| mouseup       |           `GmPosition`           | This event is fired for a mouseup on the Polygon.                           |
| paths_changed | `GmPosition[] \| GmPosition[][]` | This event is fired when any of the Polygon's paths are changed.            |
| rightclick    |           `GmPosition`           | This event is fired for a rightclick on the Polygon.                        |
| unmounted     |      `google.maps.Polygon`       | On unmounted the component will emit the Google Maps object it represents.  |

### Notes

- `gm-polygon` is based on the [Google Maps Polygon interface](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon).
- Unlike polylines, a polygon may consist of one or more paths. As a result, the paths property may specify one or more arrays of LatLng (`GmPosition`) coordinates.
- If you define the coordinates clockwise, the polygon will be shaded in. If you define the coordinates anti-clockwise, the polygon will remove shading. An example of this can be seen the in the [Polylines demo](https://vue-bujcvu.stackblitz.io/polylines).
