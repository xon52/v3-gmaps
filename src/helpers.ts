import { GmapsBounds, GmapsMouseEvent, GmapsPolyMouseEvent, GmapsPosition, GmapsWeightedPosition } from './types/types'

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

/**
 * Throttle a given function over a given period
 * @param func
 * @param timeout (milliseconds)
 * @returns void
 */
export const throttle = (func: Function, timeout: number | undefined = 500) => {
  let ready = true
  return (...args: any) => {
    if (!ready) return
    ready = false
    func(...args)
    setTimeout(() => {
      ready = true
    }, timeout)
  }
}

/**
 * Debounce a given function to only return if stable for a given time, but always called within a max time
 * @param func
 * @param wait (milliseconds before considered stable)
 * @param maxWait (milliseconds before called regardless if stable)
 * @returns void
 */
export const debounce = (func: Function, wait = 300, maxWait = 1000) => {
  let timer: number | null
  let maxTimer: number | null
  return (...args: any) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (maxTimer) clearTimeout(maxTimer)
      maxTimer = null
      func(...args)
    }, wait)
    if (maxWait && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (timer) clearTimeout(timer)
        maxTimer = null
        func(...args)
      }, maxWait)
    }
  }
}

/**
 * Check if two objects/primitives are equal
 * https://jsben.ch/D9Hoj
 * @param a (Object)
 * @param b (Object)
 * @returns boolean
 */
export const isEqual = (a: any, b: any) => {
  // Get type
  const getType = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  // Compare Arrays
  const isArraysEqual = (arr1: Array<any>, arr2: Array<any>) => {
    if (arr1.length !== arr2.length) return false
    let i = arr1.length
    while (i--) {
      if (typeof arr1[i] !== typeof arr2[i]) return false
      if (typeof arr1[i] === 'object' && !isEqual(arr1[i], arr2[i])) return false
      if (arr1[i] !== arr2[i]) return false
    }
    return true
  }
  // Compare Objects
  const isObjectsEqual = (obj1: Record<string, any>, obj2: Record<string, any>) => {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false
    for (let k in obj1) {
      if (!Object.prototype.hasOwnProperty.call(obj2, k)) return false
      if (typeof obj1[k] !== typeof obj2[k]) return false
      if (typeof obj1[k] === 'object' && !isEqual(obj1[k], obj2[k])) return false
      if (obj1[k] !== obj2[k]) return false
    }
    return true
  }
  // Compare Functions
  const isFunctionsEqual = (fn1: Function, fn2: Function) => fn1.toString() === fn2.toString()
  // Test
  let type = getType(a)
  if (type !== getType(b)) return false
  if (type === 'array') return isArraysEqual(a, b)
  if (type === 'object') return isObjectsEqual(a, b)
  if (type === 'function') return isFunctionsEqual(a, b)
  return a === b
}
