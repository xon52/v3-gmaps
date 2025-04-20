# API Access

The plugin exposes several utility functions for working directly with the Google Maps API:

```js
import { getAPI, waitForReady, getLibrary } from 'v3-gmaps'

// Get the Google Maps API instance
const mapsApi = getAPI()

// Wait for the API to be ready before using it
await waitForReady()

// Load and get a specific library
const placesLib = await getLibrary('places')
```
