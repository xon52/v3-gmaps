---
sidebarDepth: 3
---

# Configuration

v3-gmaps was made to be as light as possible, while also able to include some parts and packages that may be needed by some.

## Libraries

Some Google Maps features/components/tools are only available when additional code libraries are included when the Google Maps API is downloaded.

These include:
- [drawing](https://developers.google.com/maps/documentation/javascript/drawinglayer) provides a graphical interface for users to draw polygons, rectangles, polylines, circles, and markers on the map.
- [geometry](https://developers.google.com/maps/documentation/javascript/geometry) includes utility functions for calculating scalar geometric values (such as distance and area) on the surface of the earth. Consult the Geometry library documentation for more information.
- [localContext](https://developers.google.com/maps/documentation/javascript/local-context) shows users key places of interest near a location that you specify. Consult the Local Context library documentation for more information.
- [places](https://developers.google.com/maps/documentation/javascript/places) enables your application to search for places such as establishments, geographic locations, or prominent points of interest, within a defined area. Consult the Places library documentation for more information.
- [visualization](https://developers.google.com/maps/documentation/javascript/visualization) provides heatmaps for visual representation of data. Consult the Visualization library documentation for more information.

To include a library, you can provide a `libraries` array of strings with your Google API key when you install the plugin:

```js
createApp(App)
  .use(gmaps, { key: 'GOOGLE_API_KEY', libraries: ['visualization'] })
  .mount('#app')
```

::: info
The `visualization` plugin is needed for the [heatmap component](../api/heatmap.md).
:::


## Versions

Google Maps also allows for you to [include a version number](https://developers.google.com/maps/documentation/javascript/versions#choosing-a-version-number) of the API you want to use. This can be helpful if you don't want things to change (break) and aren't worried about improvements and fixes that come with always using the latest version.

Another use is to use their [beta version](https://developers.google.com/maps/documentation/javascript/versions#choosing-the-beta-channel) (`v=beta`).

To include a version, you can provide a `version` string with your Google API key when you install the plugin:

```js
createApp(App)
  .use(gmaps, { key: 'GOOGLE_API_KEY', version: '3.48' })
  .mount('#app')
```

## Language Localization

Google Maps defaults its language and region settings to whatever your browser is using, but these can be overridden using [additional language localization parameters](https://developers.google.com/maps/documentation/javascript/localization#Language).

While changing the language only changes the map interface, region settings will both apply any local requirements to the map interface *and* bias search results if the map is used with Google Places.

Browse the supported [list of languages](https://developers.google.com/maps/faq#languagesupport) and [list of regions](http://www.unicode.org/reports/tr35/#Unicode_Language_and_Locale_Identifiers) to see what's possible.

To include these settings, you can provide a `language` code (string) and `region` code (string) with your Google API key when you install the plugin:

```js
createApp(App)
  .use(gmaps, { key: 'GOOGLE_API_KEY', language: 'ja', region: 'JP' })
  .mount('#app')
```

## Callback

If you would like to include a callback for *after* the Google Maps script has been inserted and been fully loaded, you can provide a `callback` function (`() => any`) with your Google API key when you install the plugin:

```js
Vue.use(x5GMaps, {
  key: 'GOOGLE_API_KEY',
  libraries: ['visualization'],
  callback: () => alert('Callback working!')
});
```


## Events Throttle

One fo the requests from `x5-gmaps` (the previous version of `v3-gmaps`) was to reduce the number of events firing. While Google Maps doesn't offer this ability, the `throttle` prop has been added to the [map component](../api/map.md) to do this. By default it is set to `100` which means it will not fire the same event within 100ms. Setting it to 0 will disable this.

```html
<gmaps-map :throttle="150" />
```

You can have a play around on the [throttle component demo](https://vue-bujcvu.stackblitz.io/throttle).
