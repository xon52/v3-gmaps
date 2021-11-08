import { GmapsMouseEvent, GmapsPolyMouseEvent } from './types/types'

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
