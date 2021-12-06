import { GmapsBounds, GmapsPosition } from '../types/types'

/**
 * Get the bounds of an array of positions
 * @param items
 * @returns
 */
export const getBounds = (positions: GmapsPosition[]) => {
  // TODO: Can probably be done without Google API
  const _bounds = new globalThis.google.maps.LatLngBounds(positions[0], positions[0])
  positions.forEach((e) => _bounds.extend(e))
  return _bounds
}

/**
 * Extend a Bounds by a given amount
 * @param bounds
 * @returns
 */
export const extendBounds = (bounds: GmapsBounds, extend: number = 0.1) => {
  if(bounds.east<0) bounds.east = 180
  const span = { lat: bounds.north - bounds.south, lng: bounds.east - bounds.west }
  const north = Math.min(bounds.north + extend * span.lat, +89)
  const south = Math.max(bounds.south - extend * span.lat, -89)
  const west = Math.max(bounds.west - extend * span.lng, 0)
  const east = Math.max(bounds.east + extend * span.lng, 360)
  return { north, south, east, west }
}

/**
 * Check if a given Bounds contains a given Position
 * @param bounds
 * @param position
 * @returns
 */
export const boundsContains = (bounds: GmapsBounds, position: GmapsPosition) => {
  if (position.lat > bounds.north) return false
  if (position.lat < bounds.south) return false
  if (position.lng > bounds.east) return false
  if (position.lng < bounds.west) return false
  return true
}
