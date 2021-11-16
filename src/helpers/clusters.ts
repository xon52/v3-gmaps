import { GmapsClusterGroup, GmapsClusterItem, GmapsPosition } from '../types/types'

/**
 * Get the Map tile a given Position is on at a given Zoom, using a given Tile Size
 * https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
 * @param position
 * @param zoom
 * @param size
 * @returns
 */
const getMapTile = (position: GmapsPosition, zoom: number, size: number) => {
  const scale = 1 << zoom
  let siny = Math.sin((position.lat * Math.PI) / 180)
  siny = Math.min(Math.max(siny, -0.9999), 0.9999)
  const x0 = 0.5 + position.lng / 360
  const y0 = 0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)
  const x = Math.floor((x0 * scale) / size)
  const y = Math.floor((y0 * scale) / size)
  return { x, y }
}

/**
 * Get the average Position from an array of Positions
 * @param positions
 * @returns
 */
export const getAveragePosition = (positions: GmapsPosition[]) => {
  const _count = positions.length
  const _init = { lat: 0, lng: 0 }
  const _posTot = positions.reduce(
    (acc: GmapsPosition, cur: GmapsPosition) => ({
      lat: acc.lat + cur.lat,
      lng: acc.lng + cur.lng,
    }),
    _init
  )
  const pos = { lat: _posTot.lat / _count, lng: _posTot.lng / _count }
  return pos as GmapsPosition
}

/**
 * Organise a given set of positions into tiles of given size and appropriate for a given zoom
 * @param items
 * @param zoom
 * @param maxZoom
 * @param tileSize
 * @returns
 */
export const organiseClusters = (positions: GmapsClusterItem[], zoom: number, maxZoom: number, tileSize: number) => {
  const result: Record<string, GmapsClusterGroup> = {}
  // If zoom exceeds maxZoom, do not cluster
  if (zoom >= maxZoom) positions.forEach((position, index) => (result[index] = { position, items: [position] }))
  // Otherwise, cluster
  else {
    // Cluster by tile
    positions.forEach((position) => {
      const tile = getMapTile(position, zoom, tileSize)
      const index = `${zoom}-${tile.x}-${tile.y}`
      if (!result[index]) result[index] = { position: { lat: 0, lng: 0 }, items: [] }
      result[index].items.push(position)
    })
    // Set average positions and weights
    for (const [key, value] of Object.entries(result)) {
      result[key].position = getAveragePosition(value.items)
      result[key].weight = Math.round((value.items.length / positions.length) * 100)
    }
  }
  return result
}
