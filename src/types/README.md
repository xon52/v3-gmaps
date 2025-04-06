# Vue Google Maps Type Definitions

This directory contains TypeScript interfaces and types used throughout the Vue Google Maps library.

## Component Type Definitions

The library provides local type definitions that satisfy Google Maps API requirements while making them more accessible for library users.

### Basic Types

- `GmPosition`: `{ lat: number; lng: number }` - Replaces `google.maps.LatLngLiteral`
- `GmBounds`: `{ north, east, south, west }` - Replaces `google.maps.LatLngBoundsLiteral`
- `GmSize`: `{ width, height }` - For pixel dimensions
- `GmMouseEvent`: For map/shape interaction events
- `GmCollisionBehavior`: For marker collision settings
- `GmStrokePosition`: Enum for stroke positioning (`'CENTER'`, `'INSIDE'`, `'OUTSIDE'`)
- `GmMapTypeId`: Map type values (`'roadmap'`, `'satellite'`, `'hybrid'`, `'terrain'`)

### Component Props Interfaces

Each component has its own Props interface:

- `MapProps`: For the Map component
- `MarkerProps`: For the Marker component
- `InfoWindowProps`: For the InfoWindow component 
- `CircleProps`: For Circle shapes
- `RectangleProps`: For Rectangle shapes
- `PolygonProps`: For Polygon shapes
- `PolylineProps`: For Polyline shapes
- `HeatmapProps`: For Heatmap visualizations
- `ClusterProps`: For marker clustering

### Component Events Interfaces

Each component also has its corresponding Events interface:

- `MapEvents`: Map events
- `MarkerEvents`: Marker events
- `InfoWindowEvents`: InfoWindow events
- `CircleEvents`: Circle shape events
- `RectangleEvents`: Rectangle shape events
- `PolygonEvents`: Polygon shape events 
- `PolylineEvents`: Polyline shape events
- `HeatmapEvents`: Heatmap events
- `ClusterEvents`: Cluster events

## Usage

Import the types you need directly from the library:

```typescript
import { GmPosition, MapProps, MarkerProps } from 'vue3-google-maps'

// Use in your component
const position: GmPosition = { lat: 37.7749, lng: -122.4194 }
```

All component Props interfaces match the available properties on the corresponding components. 
