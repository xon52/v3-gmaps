import { App, defineAsyncComponent } from 'vue'
import init, { apiOptionsType } from './init'
import { getGoogleAPI as getAPI } from './api'

const install = (_app: App, options: apiOptionsType): void => init(options)

const gmapsMap = defineAsyncComponent(() => import('./components/V3GMap.vue'))
const gmapsCircle = defineAsyncComponent(() => import('./components/Circle.vue'))
const gmapsMarker = defineAsyncComponent(() => import('./components/Marker.vue'))
// export const gmapsPolygon = defineAsyncComponent(
//   () => import('./components/Polygon.vue')
// )
// export const gmapsPolyline = defineAsyncComponent(
//   () => import('./components/Polyline.vue')
// )
// export const gmapsPopup = defineAsyncComponent(
//   () => import('./components/Popup.vue')
// )
const gmapsRectangle = defineAsyncComponent(() => import('./components/Rectangle.vue'))

export { getAPI, gmapsMap, gmapsMarker, gmapsCircle, gmapsRectangle }
export default install
