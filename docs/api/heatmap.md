---
sidebarDepth: 2
---

# Heatmap (`gmaps-heatmap`)

<div class="v3-gmaps-screenshot">
  <img src="../img/heatmap.png">
  <p>The Heatmap is a great way to show fuzzy data in a colorful way.</p>
</div>

::: warning
`gmaps-heatmap` relies on the additional visualization library. You can see how to include that in **[Configuration](../guide/configuration.md#libraries)**.
:::

### Simple Use ([demo](https://vue-bujcvu.stackblitz.io/heatmap))

```html
<template>
  <div style="height: 500px">
    <gmaps-heatmap :data="data" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { gmapsMap, gmapsHeatmap } from 'v3-gmaps';

export default defineComponent({
  components: { gmapsMap, gmapsHeatmap },
  setup() {
    const data = {
      { lat: 37, lng: 56 },
      { lat: 15, lng: 108 },
      ...
    }
    return { data }
  }
});
</script>
```

### Props

| Props     |           Type            | Default | Description                                                |
| :-------- | :-----------------------: | :-----: | :--------------------------------------------------------- |
| options\* |   `GmapsHeatmapOptions`   |    -    | Object used to define the properties of a `gmaps-heatmap`. |
| data      | `GmapsWeightedPosition[]` |    -    | Sets the Heatmap data points.                              |

\* To see all of the possible options, have a look at the [Google Maps HeatmapLayerOptions interface](https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions).

### Events

*No events.*

### Notes

- While regular `GmapsPosition` (`{ lat, lng }`) data points can be used, the Heatmap can also use weighted points: `{ lat, lng, weight }` which can add an extra dimension to your data.
