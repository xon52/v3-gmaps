---
sidebarDepth: 2
---

# Polyline (`gmaps-polyline`) & Polygon (`gmaps-polygon`)

<div class="v3-gmaps-screenshot">
  <img src="../img/polyline.png">
  <p>In addition to <a href="./shapes.md">circles and rectangles</a>, you can also create polylines and polygons on a map.</p>
</div>

### Simple Use ([demo](https://vue-bujcvu.stackblitz.io/polylines))

```html
<template>
  <div style="height: 500px">
    <gmaps-map>
      <gmaps-polyline :path="[{ lat: -28, lng: 125 }, { lat: -25, lng: 130 }, { lat: -32, lng: 120 }]" />
      <gmaps-polygon :paths="[[{ lat: -28, lng: 125 }, { lat: -25, lng: 130 }, { lat: -32, lng: 120 }]]" />
    </gmaps-map>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { gmapsMap, gmapsPolyline, gmapsPolygon } from 'v3-gmaps';

export default defineComponent({
  components: { gmapsMap, gmapsPolyline, gmapsPolygon },
});
</script>
```

# Polyline (`gmaps-polyline`)

::: tip
`gmaps-polyline` has most of the [properties and events Google Maps' Polyline](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline) has.
:::

### Props (all optional)

| Props     |         Type         | Default | Description                                                                                                        |
| :-------- | :------------------: | :-----: | :----------------------------------------------------------------------------------------------------------------- |
| options\* | `GmapsCircleOptions` |    -    | Object used to define the properties of a `gmaps-circle`.                                                          |
| center    |   `GmapsPosition`    |    -    | The center of the Circle.                                                                                          |
| draggable |      `boolean`       | `false` | Whether this Circle can be dragged over the map.                                                                   |
| editable  |      `boolean`       | `false` | Whether this Circle can be edited by dragging the control points shown at the center and around the circumference. |
| radius    |       `number`       |    -    | The radius in meters on the Earth's surface.                                                                       |
| visible   |      `boolean`       | `true`  | Whether this Circle is visible on the map.                                                                         |

\* To see all of the possible options, have a look at the [Google Maps MarkerOptions interface](https://developers.google.com/maps/documentation/javascript/reference/map#MarkerOptions).

### Events

| Event          |      Type       | Description                                                             |
| :------------- | :-------------: | :---------------------------------------------------------------------- |
| center_changed | `GmapsPosition` | This event is fired when the circle's center is changed.                |
| click          | `GmapsPosition` | This event is fired when the DOM click event is fired on the Circle.    |
| dblclick       | `GmapsPosition` | This event is fired when the DOM dblclick event is fired on the Circle. |
| drag           | `GmapsPosition` | This event is repeatedly fired while the user drags the Circle.         |
| dragend        | `GmapsPosition` | This event is fired when the user stops dragging the Circle.            |
| dragstart      | `GmapsPosition` | This event is fired when the user starts dragging the Circle.           |
| mousedown      | `GmapsPosition` | This event is fired for a mousedown on the Circle.                      |
| mousemove      | `GmapsPosition` | This event is fired for a mousedown on the Circle.                      |
| mouseout       | `GmapsPosition` | This event is fired when the mouse leaves the area of the Circle.       |
| mouseover      | `GmapsPosition` | This event is fired when the mouse enters the area of the Circle.       |
| mouseup        | `GmapsPosition` | This event is fired for a mouseup on the Circle.                        |
| radius_changed |    `number`     | This event is fired when the circle's radius is changed.                |
| rightclick     | `GmapsPosition` | This event is fired for a rightclick on the Circle.                     |

### Notes

- There is no `contextmenu` event for the circle 😢
- The circle is geodesic which means it projects itself on the map as if it is on a globe. You can see these effects by dragging a circle far North or South.


# Rectangle (`gmaps-rectangle`)

::: tip
`gmaps-rectangle` has most of the [properties and events Google Maps' Rectangle](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle) has.
:::

### Props (all optional)

| Props     |          Type           | Default | Description                                                                                                |
| :-------- | :---------------------: | :-----: | :--------------------------------------------------------------------------------------------------------- |
| options\* | `GmapsRectangleOptions` |    -    | Object used to define the properties of a `gmaps-rectangle`.                                               |
| bounds    |      `GmapsBounds`      |    -    | The bounds.                                                                                                |
| draggable |        `boolean`        | `false` | Whether this Rectangle can be dragged over the map.                                                        |
| editable  |        `boolean`        | `false` | Whether this Rectangle can be edited by dragging the control points shown at the corners and on each edge. |
| visible   |        `boolean`        | `true`  | Whether this rectangle is visible on the map.                                                              |

\* To see all of the possible options, have a look at the [Google Maps MarkerOptions interface](https://developers.google.com/maps/documentation/javascript/reference/map#MarkerOptions).

### Events

| Event          |      Type       | Description                                                                   |
| :------------- | :-------------: | :---------------------------------------------------------------------------- |
| bounds_changed |  `GmapsBounds`  | This event is fired when the rectangle's bounds are changed.                  |
| click          | `GmapsPosition` | This event is fired when the DOM click event is fired on the rectangle.       |
| contextmenu    | `GmapsPosition` | This event is fired when the DOM contextmenu event is fired on the rectangle. |
| dblclick       | `GmapsPosition` | This event is fired when the DOM dblclick event is fired on the rectangle.    |
| drag           | `GmapsPosition` | This event is repeatedly fired while the user drags the Rectangle.            |
| dragend        | `GmapsPosition` | This event is fired when the user stops dragging the Rectangle.               |
| dragstart      | `GmapsPosition` | This event is fired when the user starts dragging the Rectangle.              |
| mousedown      | `GmapsPosition` | This event is fired for a mousedown on the Rectangle.                         |
| mousemove      | `GmapsPosition` | This event is fired for a mousedown on the Rectangle.                         |
| mouseout       | `GmapsPosition` | This event is fired when the mouse leaves the area of the Rectangle.          |
| mouseover      | `GmapsPosition` | This event is fired when the mouse enters the area of the Rectangle.          |
| mouseup        | `GmapsPosition` | This event is fired for a mouseup on the Rectangle.                           |
| rightclick     | `GmapsPosition` | This event is fired for a rightclick on the Rectangle.                        |

<!-- ### Notes -->
