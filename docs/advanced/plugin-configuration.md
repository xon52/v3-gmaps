# Advanced Plugin Configuration

The Vue3 Google Maps plugin offers several configuration options to customize its behavior. This guide explains the available options in detail.

## Configuration Options

| Option     | Type         | Default     | Description                                                                                                       |
| ---------- | ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `key`      | `string`     | Required    | Your Google Maps API key                                                                                          |
| `v`        | `string`     | `undefined` | API [version](https://developers.google.com/maps/documentation/javascript/versions) to use                        |
| `language` | `string`     | `undefined` | [Language](https://developers.google.com/maps/documentation/javascript/localization) for map controls and labels  |
| `region`   | `string`     | `undefined` | [Region](https://developers.google.com/maps/documentation/javascript/localization#Region) code (e.g., 'US', 'GB') |
| `timeout`  | `number`     | `5000`      | Timeout in milliseconds for loading the API                                                                       |
| `callback` | `() => void` | `undefined` | Custom callback function                                                                                          |

## Usage Examples

### Basic Configuration

```js
import { createApp } from 'vue'
import App from './App.vue'
import GoogleMapsPlugin from 'vue3-google-maps'

const app = createApp(App)
app.use(GoogleMapsPlugin, {
  key: 'YOUR_API_KEY'
})
app.mount('#app')
```

### Advanced Configuration

```js
import { createApp } from 'vue'
import App from './App.vue'
import GoogleMapsPlugin from 'vue3-google-maps'

const app = createApp(App)
app.use(GoogleMapsPlugin, {
  key: 'YOUR_API_KEY',
  v: 'weekly',
  language: 'fr',
  region: 'FR',
  timeout: 10000
})
app.mount('#app')
```

## Loading Behavior

The plugin handles API loading automatically with the following process:

1. It validates that the Google Maps API isn't already loaded or in the process of loading
2. It creates a script element with your configuration options
3. It injects this script into the document head
4. It sets up a global callback function that will be called when the API is loaded
5. It applies a timeout (configurable via the `timeout` option) to avoid hanging indefinitely

If the API fails to load within the specified timeout, an error will be thrown with a descriptive message.

## Error Handling

The plugin will throw descriptive errors in the following scenarios:

- If no API key is provided
- If the Google Maps API is already initialized
- If initialization is already in progress
- If the API script fails to load (network issues or invalid API key)
- If the API fails to initialize after loading
- If the loading timeout is exceeded

## Deprecated Options

The `libraries` option is deprecated. In modern versions of the Google Maps JavaScript API, libraries are loaded automatically based on the components you use.
The `version` option is deprecated. To match the Google Maps Javascript API this has been replaced by `v`.
