---
sidebarDepth: 3
---

# Getting Started

## Installation

```bash
# npm
npm install v3-gmaps
```

## Usage

### Plugin installation (main.js / main.ts)

```js
import { createApp } from 'vue'
import v3gmaps from 'v3-gmaps'
import App from './App.vue'

// Optional stylesheet needed for showing errors and the Popup component
import 'v3-gmaps/dist/style.css'

createApp(App)
  .use(gmaps, { key: 'GOOGLE_API_KEY' })
  .mount('#app')

```

### Component use

```html
<template>
  <!-- gmaps-map requires a height to fill -->
  <div style="height: 500px">
    <gmaps-map>
      <gmaps-marker :position="{ lat: -27, lng: 153 }" />
    </gmaps-map>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { gmapsMap, gmapsMarker } from 'v3-gmaps';

export default defineComponent({
  components: { gmapsMap, gmapsMarker }
});
</script>
```

<div class="v3-gmaps-screenshot">
  <img src="/img/getting-started.png" />
  <p>Single marker at latitude 0 and longitude 0</p>
</div>
