# Marker (`gm-marker`)

<br />

<div class="v3-gmaps-screenshot">
  <img src="../img/marker.png">
  <p>The Marker is the most used component of the library (and Google Maps).</p>
</div>

## Simple Use ([demo](https://vue-bujcvu.stackblitz.io/marker))

```html
<template>
  <div style="height: 500px">
    <gm-map>
      <gm-marker :position="{ lat: 0, lng: 0 }" />
    </gm-map>
  </div>
</template>

<script setup lang="ts">
import { gmMap, gmMarker } from 'v3-gmaps';
</script>
```

## Props

| Props     |                        Type                        | Default | Description                                                                                                                                                               |
| :-------- | :------------------------------------------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| clickable |                     `boolean`                      |    -    | Whether the marker receives mouse and touch events.                                                                                                                       |
| draggable |                     `boolean`                      |    -    | Whether the marker can be dragged.                                                                                                                                        |
| position  |                    `GmPosition`                    |    -    | Sets the marker position.                                                                                                                                                 |
| title     |                      `string`                      |    -    | Rollover text.                                                                                                                                                            |
| visible   |                     `boolean`                      |    -    | Whether the marker is visible.                                                                                                                                            |
| zIndex    |                      `number`                      |    -    | Vertical layer to use for this marker.                                                                                                                                    |
| pin       |                      `GmPin`                       |    -    | Customizes the marker appearance with the pin style.                                                                                                                      |
| options   | `google.maps.marker. AdvancedMarkerElementOptions` |    -    | [Google Maps AdvancedMarkerElementOptions interface](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions) |

### Pin Customization

The `pin` property allows fully customizing the marker appearance:

```html
<!-- Basic text glyph -->
<gm-marker
  :position="position"
  :pin="{
    background: '#4285F4',
    borderColor: '#000000',
    glyphColor: '#FFFFFF',
    scale: 1.5,
    glyph: 'A'
  }"
/>

<!-- Image glyph -->
<gm-marker
  :position="position"
  :pin="{
    background: '#FBBC04',
    scale: 1.5,
    glyph: imageUrl
  }"
/>

<!-- SVG glyph -->
<gm-marker
  :position="position"
  :pin="{
    background: '#34A853',
    scale: 1.5,
    glyph: '<svg viewBox="0 0 24 24"><path fill="#FFFFFF" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>'
  }"
/>
```

## Slots

You can create completely custom markers using the default slot:

```html
<gm-marker :position="{ lat: -33.9, lng: 151.1 }">
  <div class="custom-marker-container">
    <img src="/path/to/image.png" alt="Custom marker" />
    <div class="marker-label">My Label</div>
  </div>
</gm-marker>
```

## Events

| Event            |          Type           | Description                                                                |
| :--------------- | :---------------------: | :------------------------------------------------------------------------- |
| click            |      `GmPosition`       | This event is fired when the Marker is clicked.                            |
| contextmenu      |      `GmPosition`       | This event is fired when the DOM contextmenu event is fired on the Marker. |
| dblclick         |      `GmPosition`       | This event is fired when the Marker is double clicked.                     |
| drag             |      `GmPosition`       | This event is repeatedly fired while the user drags the Marker.            |
| dragend          |      `GmPosition`       | This event is fired when the user stops dragging the Marker.               |
| dragstart        |      `GmPosition`       | This event is fired when the user starts dragging the Marker.              |
| mounted          | `AdvancedMarkerElement` | On mounted the component will emit the Google Maps object it represents.   |
| mousedown        |      `GmPosition`       | This event is fired for a mousedown on the Marker.                         |
| mouseout         |      `GmPosition`       | This event is fired when the mouse leaves the area of the Marker.          |
| mouseover        |      `GmPosition`       | This event is fired when the mouse enters the area of the Marker.          |
| mouseup          |      `GmPosition`       | This event is fired for a mouseup on the Marker.                           |
| position_changed |      `GmPosition`       | This event is fired when the Marker position property changes.             |
| rightclick       |      `GmPosition`       | This event is fired for a rightclick on the Marker.                        |
| unmounted        | `AdvancedMarkerElement` | On unmounted the component will emit the Google Maps object it represents. |

## Notes

- `gm-marker` is based on the [Google Maps AdvancedMarkerElement](https://developers.google.com/maps/documentation/javascript/reference/advanced-markers) which requires your map to have a valid `mapId`.
- The `mounted` and `unmounted` events return the Google Maps AdvancedMarkerElement object. If you use the `@types/google.maps` package, it will be typed as `google.maps.marker.AdvancedMarkerElement`.
