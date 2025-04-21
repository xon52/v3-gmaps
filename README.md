# v3-gmaps

<div style="text-align: center">
  <img src="./demo/src/assets/v3-gmaps.png" height="150px" />
  <p>
    <a href="https://npmjs.com/package/v3-gmaps"><img src="https://img.shields.io/bundlephobia/minzip/v3-gmaps" alt="Bundle size"/></a>
    <a href="https://npmjs.com/package/v3-gmaps"><img src="https://img.shields.io/npm/dm/v3-gmaps.svg?style=flat" alt="NPM downloads"></a>
    <a href="https://npmjs.com/package/v3-gmaps"><img src="https://img.shields.io/npm/l/v3-gmaps.svg?style=flat" alt="License"></a>
  </p>
</div>

### This is a lightweight, fully typed library to simplify the use of [Google Maps](https://developers.google.com/maps/) in [Vue3](http://vuejs.org) 🤏🗺️🧩

### For the (original) Vue 2 version check out [x5-gmaps](https://xon52.github.io/x5-gmaps) 💪

<br/>

## Guide / Demo / Tutorials

- Docs: [v3-gmaps Docs](https://xon52.github.io/v3-gmaps/)
- Example: [StackBlitz](https://stackblitz.com/edit/vue-bujcvu)
- Demo: [StackBlitz](https://vue-bujcvu.stackblitz.io)

<br/>

## Installation

```bash
# npm
npm install v3-gmaps
# yarn
yarn add v3-gmaps
# pnpm
pnpm add v3-gmaps
```

## Setup

This plugin can be installed like any Vue plugin:

```js
import { createApp } from 'vue';
import App from './App.vue';
import gmaps from 'v3-gmaps';

// Optional stylesheet needed for showing errors and the Popup component
import 'v3-gmaps/dist/style.css';

const app = createApp(App);
app.use(gmaps, { key: 'YOUR_GOOGLE_MAPS_API_KEY' });
app.mount('#app');
```

## Usage

```vue
<template>
  <!-- The map component requires a container with a defined height -->
  <div style="height: 500px; width: 100%">
    <gm-map>
      <gm-marker :position="{ lat: -27, lng: 153 }" />
    </gm-map>
  </div>
</template>

<script setup>
import { gmMap, gmMarker } from 'v3-gmaps';
</script>
```

<br/>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Authors

- [Keagan Chisnall](https://github.com/xon52)

## Support

<a href="https://www.buymeacoffee.com/chisnallio" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 30px !important;width: 107px !important;" ></a>
