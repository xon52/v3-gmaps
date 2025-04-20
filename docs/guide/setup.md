# Setup

## Installation

```bash
# npm
npm install v3-gmaps
# yarn
yarn add v3-gmaps
# pnpm
pnpm add v3-gmaps
```

### Basic Plugin Installation

```js
import { createApp } from 'vue';
import App from './App.vue';
import gmaps from 'v3-gmaps';

const app = createApp(App);

app.use(gmaps, { key: 'YOUR_GOOGLE_MAPS_API_KEY' });
app.mount('#app');
```

::: tip
For more advanced configuration options, please see the [plugin configuration](/advanced/plugin-configuration.md) documentation.
:::

### Using the Map Component

```vue
<template>
  <!-- The map component requires a container with a defined height -->
  <div style="height: 500px; width: 100%">
    <gm-map :center="center" :zoom="12">
      <gm-marker :position="center" />
    </gm-map>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { gmMap, gmMarker } from 'v3-gmaps'

// Use a responsive center location
const center = ref({ lat: 37, lng: -122 })
</script>
```
