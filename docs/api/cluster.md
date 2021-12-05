---
sidebarDepth: 2
---

# Cluster (`gmaps-cluster`)

<div class="v3-gmaps-screenshot">
  <img src="../img/cluster.png">
  <p>The Cluster is an alternative to the <a href="./heatmap">heatmap</a> when showing lots of data efficiently.</p>
</div>

### Simple Use ([demo](https://vue-bujcvu.stackblitz.io/cluster))

```html
<template>
  <div style="height: 500px">
    <gmaps-cluster :data="data" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { gmapsMap, gmapsCluster } from 'v3-gmaps';

export default defineComponent({
  components: { gmapsMap, gmapsCluster },
  setup() {
    const items = {
      { lat: 37, lng: 56 },
      { lat: 15, lng: 108 },
      ...
    }
    return { items }
  }
});
</script>
```

### Props

| Props     |         Type          | Default | Description                                                |
| :-------- | :-------------------: | :-----: | :--------------------------------------------------------- |
| options\* | `GmapsClusterOptions` |    -    | Object used to define the properties of a `gmaps-cluster`. |
| items     | `GmapsClusterItem[]`  |    -    | Sets the Cluster data points.                              |

### Events

| Event |      Type       | Description                                   |
| :---- | :-------------: | :-------------------------------------------- |
| click | `GmapsPosition` | This event is fired a Marker icon is clicked. |

### Notes

- This is a custom component and not available using only the Google Maps API.
- The way it works is completely custom, and uses the Google Map Tiles to cluster points rather than more complex algorithms others have used.
- Google has an additional [package which it recommends for doing this](https://developers.google.com/maps/documentation/javascript/marker-clustering). This package has improved a lot and may be added into an alternative clustering component in the future.
