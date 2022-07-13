import { App, defineAsyncComponent } from 'vue'
import init, { apiOptionsType } from './install/init'
import { getGoogleAPI as getAPI } from './install/api'

export const install = (_app: App, options: apiOptionsType): void => init(options)

export const gmapsMap = defineAsyncComponent(() => import('./components/Map.vue'))
export const gmapsCircle = defineAsyncComponent(() => import('./components/Circle.vue'))
export const gmapsCluster = defineAsyncComponent(() => import('./components/Cluster.vue'))
export const gmapsRectangle = defineAsyncComponent(() => import('./components/Rectangle.vue'))
export const gmapsMarker = defineAsyncComponent(() => import('./components/Marker.vue'))
export const gmapsPolyline = defineAsyncComponent(() => import('./components/Polyline.vue'))
export const gmapsPolygon = defineAsyncComponent(() => import('./components/Polygon.vue'))
export const gmapsPopup = defineAsyncComponent(() => import('./components/Popup.vue'))
export const gmapsInfoWindow = defineAsyncComponent(() => import('./components/InfoWindow.vue'))
export const gmapsHeatmap = defineAsyncComponent(() => import('./components/Heatmap.vue'))

export { getAPI }
export default install

export { GmapsControlPosition, GmapsStrokePosition } from './types/enums'

export type {
  GmapsPosition,
  GmapsBounds,
  GmapsCircleOptions,
  GmapsClusterGroup,
  GmapsClusterItem,
  GmapsClusterOptions,
  GmapsHeatmapOptions,
  GmapsIcon,
  GmapsInfoWindowOptions,
  GmapsMapOptions,
  GmapsMapTypeId,
  GmapsMarkerLabel,
  GmapsMarkerOptions,
  GmapsMarkerShape,
  GmapsPolyMouseEvent,
  GmapsPolygonOptions,
  GmapsPolylineOptions,
  GmapsProjection,
  GmapsRectangleOptions,
  GmapsSymbol,
  GmapsWeightedPosition,
} from './types/types'
