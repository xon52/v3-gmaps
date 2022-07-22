---
sidebarDepth: 2
---

# Polyline (`gmaps-polyline`)

<div class="v3-gmaps-screenshot">
  <img src="../img/polyline.png">
  <p>In addition to <a href="./rectangle">rectangles</a>, <a href="./polygon">polygons</a>, and <a href="./circle">circles</a> you can also create polylines on a map.</p>
</div>

### Simple Use ([demo](https://vue-bujcvu.stackblitz.io/polylines))

```html
<template>
  <div style="height: 500px">
    <gmaps-map>
      <gmaps-polyline :path="[{ lat: -28, lng: 125 }, { lat: -25, lng: 130 }, { lat: -32, lng: 120 }]" />
    </gmaps-map>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { gmapsMap, gmapsPolyline } from 'v3-gmaps';

export default defineComponent({
  components: { gmapsMap, gmapsPolyline },
});
</script>
```

### Props

| Props     |          Type          | Default | Description                                                                                                        |
| :-------- | :--------------------: | :-----: | :----------------------------------------------------------------------------------------------------------------- |
| options\* | `GmapsPolylineOptions` |    -    | Object used to define the properties of a `gmaps-polyline`.                                                        |
| draggable |       `boolean`        | `false` | Whether this Circle can be dragged over the map.                                                                   |
| editable  |       `boolean`        | `false` | Whether this Circle can be edited by dragging the control points shown at the center and around the circumference. |
| path      |   `GmapsPosition[]`    |    -    | The ordered sequence of coordinates of the Polyline.                                                               |
| visible   |       `boolean`        | `true`  | Whether this Circle is visible on the map.                                                                         |

\* To see all of the possible options, have a look at the [Google Maps PolylineOptions interface](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions).

### Events

| Event        |          Type          | Description                                                                  |
| :----------- | :--------------------: | :--------------------------------------------------------------------------- |
| click        |    `GmapsPosition`     | This event is fired when the DOM click event is fired on the Polyline.       |
| contextmenu  |    `GmapsPosition`     | This event is fired when the DOM contextmenu event is fired on the Polyline. |
| dblclick     |    `GmapsPosition`     | This event is fired when the DOM dblclick event is fired on the Polyline.    |
| drag         |    `GmapsPosition`     | This event is repeatedly fired while the user drags the Polyline.            |
| dragend      |    `GmapsPosition`     | This event is fired when the user stops dragging the Polyline.               |
| dragstart    |    `GmapsPosition`     | This event is fired when the user starts dragging the Polyline.              |
| mounted      | `google.maps.Polyline` | On mounted the component will emit the Google Maps object it represents.     |
| mousedown    |    `GmapsPosition`     | This event is fired for a mousedown on the Polyline.                         |
| mousemove    |    `GmapsPosition`     | This event is fired for a mousemove on the Polyline.                         |
| mouseout     |    `GmapsPosition`     | This event is fired for a mouseout on the Polylinee.                         |
| mouseover    |    `GmapsPosition`     | This event is fired for a mouseover on the Polyline.                         |
| mouseup      |    `GmapsPosition`     | This event is fired for a mouseup on the Polyline.                           |
| path_changed |   `GmapsPosition[]`    | This event is fired when the Polyline's path is changed.                     |
| rightclick   |    `GmapsPosition`     | This event is fired for a rightclick on the Polyline.                        |
| unmounted    | `google.maps.Polyline` | On unmounted the component will emit the Google Maps object it represents.   |

### Notes

- `gmaps-polyline` has most of the [properties and events Google Maps' Polyline](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline) has.
