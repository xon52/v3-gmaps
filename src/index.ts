import { App, defineAsyncComponent } from 'vue'
import init, { apiOptionsType } from './init'
import { getGoogleAPI as getAPI } from './api'

export const install = (_app: App, options: apiOptionsType): void => init(options)

export const gmapsMap = defineAsyncComponent(() => import('./components/V3GMap.vue'))
export const gmapsCircle = defineAsyncComponent(() => import('./components/Circle.vue'))
export const gmapsRectangle = defineAsyncComponent(() => import('./components/Rectangle.vue'))
export const gmapsMarker = defineAsyncComponent(() => import('./components/Marker.vue'))
// export const gmapsPolygon = defineAsyncComponent(
//   () => import('./components/Polygon.vue')
// )
// export const gmapsPolyline = defineAsyncComponent(
//   () => import('./components/Polyline.vue')
// )
// export const gmapsPopup = defineAsyncComponent(
//   () => import('./components/Popup.vue')
// )

export { getAPI }
export default install
