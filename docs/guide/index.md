# What is v3-gmaps?

v3-gmaps is a lightweight [Vue](https://v3.vuejs.org) component library for integrating Google Maps into your applications. It provides a set of fully typed components that wrap the [Google Maps JavascriptAPI](https://developers.google.com/maps/documentation/javascript/overview), making it easy to add maps, markers, shapes, and other map elements to your Vue application.

### Example

```vue
<template>
  <gm-map>
    <gm-marker :position="{ lat: 38, lng: -122 }" />
  </gm-map>
</template>
```
