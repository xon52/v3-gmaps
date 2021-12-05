---
sidebarDepth: 2
---

# Info Window (`gmaps-info-window`)

<div class="v3-gmaps-screenshot">
  <img src="../img/info-window.png">
  <p>The Info Window is a really simple way to display some custom HTML on the map.</p>
</div>

### Simple Use ([demo](https://vue-bujcvu.stackblitz.io/info-window))

```html
<template>
  <div style="height: 500px">
    <gmaps-info-window>
      <p>Any HTML can go here.</p>
    </gmaps-info-window>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { gmapsMap, gmapsInfoWindow } from 'v3-gmaps';

export default defineComponent({
  components: { gmapsMap, gmapsInfoWindow },
});
</script>
```

### Props

| Props     |           Type           | Default | Description                                               |
| :-------- | :----------------------: | :-----: | :-------------------------------------------------------- |
| options\* | `GmapsInfoWindowOptions` |    -    | Object used to define the properties of a `gmaps-marker`. |
| position  |     `GmapsPosition`      |    -    | Sets the info window position.                            |
| zIndex    |         `number`         |    -    | Vertical layer to use for this component.                 |

\* To see all of the possible options, have a look at the [Google Maps InfoWindowOptions interface](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions).

### Events

| Event            |      Type       | Description                                                                                       |
| :--------------- | :-------------: | :------------------------------------------------------------------------------------------------ |
| closeclick       |        -        | This event is fired when the close button was clicked.                                            |
| content_changed  | `GmapsPosition` | This event is fired when the content property changes.                                            |
| domready         |    `boolean`    | This event is fired when the &lt;div> containing the InfoWindow's content is attached to the DOM. |
| position_changed | `GmapsPosition` | This event is fired when the position property changes.                                           |
| zindex_changed   |    `number`     | This event is fired when the InfoWindow's zIndex changes.                                         |

### Notes

- `gmaps-info-window` has most of the [properties and events Google Maps' Info Window](https://developers.google.com/maps/documentation/javascript/reference/info-window) has.
- The Info Window's white boarder and close button cannot be removed. If this is what you want check out the custom component <a href="./popup">gmaps-popup</a>.
