# Map (`gm-map`)

<br />

<div class="v3-gmaps-screenshot">
  <img src="../img/map.png">
  <p>The Map is the core component of the library (and Google Maps). All the other components are created by placing them inside the Map component.</p>
</div>

## Simple Use ([demo](https://vue-bujcvu.stackblitz.io/map))

```html
<template>
  <div style="height: 500px; width: 100%">
    <gm-map />
  </div>
</template>

<script setup>
import { gmMap } from 'v3-gmaps';
</script>
```

## Props

| Props            |           Type           |        Default        | Description                                                                                                              |
| :--------------- | :----------------------: | :-------------------: | :----------------------------------------------------------------------------------------------------------------------- |
| center           |       `GmPosition`       | `{ lat: 20, lng: 0 }` | The initial Map center.                                                                                                  |
| zoom             |         `number`         |          `2`          | The initial Map zoom level.                                                                                              |
| mapId            |         `string`         |     `DEMO_MAP_ID`     | [Map ID](https://developers.google.com/maps/documentation/get-map-id) for Advanced Markers support.                      |
| clickableIcons   |        `boolean`         |      `undefined`      | Whether map points of interest are clickable.                                                                            |
| disableDefaultUI |        `boolean`         |      `undefined`      | Whether to disable all default UI controls.                                                                              |
| mapTypeId        |      `GmMapTypeId`       |           -           | The initial Map mapTypeId.                                                                                               |
| restriction      |    `GmMapRestriction`    |           -           | Bounds and strictness constraints for the map view.                                                                      |
| throttle         |         `number`         |         `200`         | The event throttle value in milliseconds.                                                                                |
| options          | `google.maps.MapOptions` |         `{}`          | [Google Maps MapOptions interface](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) |

## Events

| Event                  |            Type             | Description                                                                                    |
| :--------------------- | :-------------------------: | :--------------------------------------------------------------------------------------------- |
| bounds_changed         |         `GmBounds`          | This event is fired when the viewport bounds have changed.                                     |
| center_changed         |        `GmPosition`         | This event is fired when the map center property changes.                                      |
| click                  |        `GmPosition`         | This event is fired when the user clicks on the map.                                           |
| contextmenu            |        `GmPosition`         | This event is fired when the DOM contextmenu event is fired on the map container.              |
| dblclick               |        `GmPosition`         | This event is fired when the user double-clicks on the map.                                    |
| drag                   |              -              | This event is repeatedly fired while the user drags the map.                                   |
| dragend                |              -              | This event is fired when the user stops dragging the map.                                      |
| dragstart              |              -              | This event is fired when the user starts dragging the map.                                     |
| error                  |          `string`           | Special event if a the Map encountered an error. It returns the error message if there is one. |
| heading_changed        |          `number`           | This event is fired when the map heading property changes.                                     |
| idle                   |              -              | This event is fired when the map becomes idle after panning or zooming.                        |
| maptypeid_changed      |          `string`           | This event is fired when the mapTypeId property changes.                                       |
| mounted                |      `google.maps.Map`      | On mounted the component will emit the Google Maps object it represents.                       |
| mousemove              |        `GmPosition`         | This event is fired whenever the user's mouse moves over the map container.                    |
| mouseout               |        `GmPosition`         | This event is fired when the user's mouse exits the map container.                             |
| mouseover              |        `GmPosition`         | This event is fired when the user's mouse enters the map container.                            |
| projection_changed     |              -              | This event is fired when the projection has changed.                                           |
| rightclick             |        `GmPosition`         | This event is fired when the user right-clicks on the map.                                     |
| tilesloaded            |              -              | This event is fired when the visible tiles have finished loading.                              |
| tilt_changed           |          `number`           | This event is fired when the map tilt property changes.                                        |
| unmounted              |      `google.maps.Map`      | On unmounted the component will emit the Google Maps object it represents.                     |
| visible_region_changed | `google.maps.VisibleRegion` | This event is fired when the visible region on the map changes.                                |
| zoom_changed           |          `number`           | This event is fired when the map zoom property changes.                                        |

## Notes

- `gm-map` has most of the [properties and events Google Maps' Map](https://developers.google.com/maps/documentation/javascript/reference/map) has.
- The element that contains `<gm-map />` should have a `height` and `width` style defined so that it can grow into it. *If you can't see the map, that may be your problem*.
- Double clicking will result in both `click` and `dblclick` events firing (in that order).
- The `contextmenu` even should be used instead of `rightclick` as it will accommodate Mac and mobile devices' methods of right clicking too.
- To make demo's and tests simpler, `zoom` is defaulted to `2` and `center` is defaulted to `{ lat: 20, lng: 0 }` to simplify demo's and tests.
- The `error` event does not capture Google Maps errors - only those coming from Vue and/or the implementation. Things like invalid referrer errors are not able to be captured through this event.

