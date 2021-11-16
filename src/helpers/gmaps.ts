import { GmapsBounds, GmapsMouseEvent, GmapsPolyMouseEvent, GmapsPosition, GmapsWeightedPosition } from '../types/types'

/**
 * Checks whether a GmapsPosition is the same as a google.maps.LatLng
 * @param a GmapsPosition
 * @param b google.maps.LatLng
 * @returns boolean
 */
export const GmapsPositionIsEqual = (a?: GmapsPosition, b?: google.maps.LatLng) =>
  a?.lat === b?.lat() && a?.lng === b?.lng()

/**
 * Checks whether a GmapsBounds is the same as a google.maps.LatLngBounds
 * @param a GmapsBounds
 * @param b google.maps.LatLngBounds
 * @returns boolean
 */
export const GmapsBoundsIsEqual = (a?: GmapsBounds, b?: google.maps.LatLngBounds) => {
  const _b = b?.toJSON()
  return a?.north === _b?.north && a?.east === _b?.east && a?.south === _b?.south && a?.west === _b?.west
}

export const GmapsMouseEventConverter: (e: google.maps.MapMouseEvent) => GmapsMouseEvent = (e) => ({
  domEvent: e.domEvent,
  latLng: e.latLng.toJSON(),
  stop: e.stop,
})

export const GmapsPolyMouseEventConverter: (e: google.maps.PolyMouseEvent) => GmapsPolyMouseEvent = (e) => ({
  domEvent: e.domEvent,
  latLng: e.latLng.toJSON(),
  stop: e.stop,
  edge: e.edge,
  path: e.path,
  vertex: e.vertex,
})

/**
 * Converts a Google Maps Polyline into an array of GmapsPosition's
 * @param e: google.maps.Polyline
 * @returns GmapsPosition[]
 */
export const GmapsPolylineConverter: (e: google.maps.Polyline) => GmapsPosition[] = (e) =>
  e
    .getPath()
    .getArray()
    .map((f) => f.toJSON())

/**
 * Converts a Google Maps Polygon into an array of GmapsPosition arrays
 * @param e: google.maps.Polygon
 * @returns GmapsPosition[]
 */
export const GmapsPolygonConverter: (e: google.maps.Polygon) => GmapsPosition[][] = (e) =>
  e
    .getPaths()
    .getArray()
    .map((f) => f.getArray().map((g) => g.toJSON()))
