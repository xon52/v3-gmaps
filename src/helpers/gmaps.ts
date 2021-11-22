import { GmapsBounds, GmapsPolyMouseEvent, GmapsPosition } from '../types/types'

/**
 * Checks whether a GmapsPosition is the same as a google.maps.LatLng
 * @param a GmapsPosition
 * @param b google.maps.LatLng
 * @returns boolean
 */
export const GmapsPositionIsEqual = (a?: GmapsPosition, b?: google.maps.LatLng) =>
  a?.lat === b?.lat() && a?.lng === b?.lng()

export const GmapsPolyMouseEventConverter: (e: google.maps.PolyMouseEvent) => GmapsPolyMouseEvent = (e) => ({
  latLng: e.latLng.toJSON(),
  edge: e.edge,
  path: e.path,
  vertex: e.vertex,
})
