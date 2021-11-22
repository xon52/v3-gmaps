/**
 * https://developers.google.com/maps/documentation/javascript/reference/coordinates#Point
 */
type GmapsPoint = {
  x: number
  y: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/coordinates#Size
 */
type GmapsSize = {
  width: number
  height: number
  widthUnit?: string
  heightUnit?: string
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#StrokePosition
 */
type GmapsStrokePosition = 'CENTER' | 'INSIDE' | 'OUTSIDE'

/**
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#IconSequence
 */
type GmapsIconSequence = {
  fixedRotation?: boolean
  icon?: GmapsSymbol
  offset?: string
  repeat?: boolean
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/map#MapRestriction
 */
type GmapsMapRestriction = {
  latLngBounds: GmapsBounds
  strictBounds?: boolean
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/map#MapTypeStyle
 */
type GmapsMapTypeStyle = {
  stylers: any[]
  elementType?: string
  featureType?: string
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng
 */
export type GmapsPosition = {
  lat: number
  lng: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
 */
export type GmapsIcon = {
  url: string
  anchor?: GmapsPoint
  labelOrigin?: GmapsPoint
  origin?: GmapsPoint
  scaledSize?: GmapsSize
  size?: GmapsSize
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/marker#Symbol
 */
export type GmapsSymbol = {
  path:
    | string
    | 'BACKWARD_CLOSED_ARROW'
    | 'BACKWARD_OPEN_ARROW'
    | 'CIRCLE'
    | 'FORWARD_CLOSED_ARROW'
    | 'FORWARD_OPEN_ARROW'
  anchor?: GmapsPoint
  fillColor?: string
  fillOpacity?: number
  labelOrigin?: GmapsPoint
  rotation?: number
  scale?: number
  strokeColor?: string
  strokeOpacity?: number
  strokeWeight?: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
 */
export type GmapsMarkerLabel =
  | string
  | {
      text: string
      className?: string
      color?: string
      fontFamily?: string
      fontSize?: string
      fontWeight?: string
    }
  | null

/**
 * https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral
 */
export type GmapsBounds = {
  east: number
  north: number
  south: number
  west: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerShape
 */
export type GmapsMarkerShape = {
  coords: number[]
  type: 'circle' | 'poly' | 'rect'
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions
 */
export type GmapsCircleOptions = {
  center?: GmapsPosition
  clickable?: boolean
  draggable?: boolean
  editable?: boolean
  fillColor?: string
  fillOpacity?: number
  radius?: number
  strokeColor?: string
  strokeOpacity?: number
  strokePosition?: GmapsStrokePosition
  strokeWeight?: number
  visible?: boolean
  zIndex?: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions
 */
export type GmapsRectangleOptions = {
  bounds?: GmapsBounds
  clickable?: boolean
  draggable?: boolean
  editable?: boolean
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeOpacity?: number
  strokePosition?: GmapsStrokePosition
  strokeWeight?: number
  visible?: boolean
  zIndex?: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions
 */
export type GmapsPolylineOptions = {
  clickable?: boolean
  draggable?: boolean
  editable?: boolean
  geodesic?: boolean
  icons?: GmapsIconSequence[]
  path?: GmapsPosition[]
  strokeColor?: string
  strokeOpacity?: number
  strokeWeight?: number
  visible?: boolean
  zIndex?: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions
 */
export type GmapsPolygonOptions = {
  clickable?: boolean
  draggable?: boolean
  editable?: boolean
  fillColor?: string
  fillOpacity?: number
  geodesic?: boolean
  icons?: GmapsIconSequence[]
  paths?: GmapsPosition[] | GmapsPosition[][]
  strokeColor?: string
  strokeOpacity?: number
  strokePosition?: GmapsStrokePosition
  strokeWeight?: number
  visible?: boolean
  zIndex?: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
 */
export type GmapsMarkerOptions = {
  anchorPoint?: GmapsPoint | null
  animation?: 'BOUNCE' | 'DROP' | null
  clickable?: boolean
  collisionBehavior?: number | 'OPTIONAL_AND_HIDES_LOWER_PRIORITY' | 'REQUIRED' | 'REQUIRED_AND_HIDES_OPTIONAL' | null
  crossOnDrag?: boolean
  cursor?: string
  draggable?: boolean
  icon?: string | GmapsIcon | GmapsSymbol | null
  label?: string | GmapsMarkerLabel | null
  opacity?: number
  optimized?: boolean
  position?: GmapsPosition
  shape?: GmapsMarkerShape
  title?: string
  visible?: boolean
  zIndex?: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
 */
export type GmapsMapOptions = {
  backgroundColor?: string
  center?: GmapsPosition
  clickableIcons?: boolean
  controlSize?: number
  disableDefaultUI?: boolean
  disableDoubleClickZoom?: boolean
  draggingCursor?: string
  fullscreenControl?: boolean
  gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto'
  heading?: string | number
  isFractionalZoomEnabled?: boolean
  keyboardShortcuts?: boolean
  mapId?: string
  mapTypeControl?: boolean
  mapTypeId?: string | GmapsMapTypeId
  maxZoom?: number
  minZoom?: number
  noClear?: boolean
  restriction?: GmapsMapRestriction
  rotateControl?: boolean
  scaleControl?: boolean
  scrollwheel?: boolean
  // streetView?: StreetViewPanorama,
  streetViewControl?: boolean
  styles?: GmapsMapTypeStyle[]
  tilt?: string | number
  zoom?: string | number
  zoomControl?: boolean
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/map#MapTypeId
 */
export type GmapsMapTypeId = 'hybrid' | 'roadmap' | 'satellite' | 'terrain'

/**
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent
 */
export type GmapsPolyMouseEvent = {
  latLng: GmapsPosition
  edge?: number
  path?: number
  vertex?: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/3.44/image-overlay?hl=en#Projection
 */
export type GmapsProjection = {
  fromLatLngToPoint: (latLng: GmapsPosition, point?: GmapsPoint) => GmapsPoint | null
  fromPointToLatLng: (pixel: GmapsPoint, noWrap?: boolean) => GmapsPosition | null
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions
 */
export type GmapsInfoWindowOptions = {
  content: any
  disableAutoPan: boolean
  maxWidth: number
  minWidth: number
  pixelOffset: GmapsSize
  position: GmapsPosition
  zIndex: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/visualization#WeightedLocation
 */
export type GmapsWeightedPosition = {
  lat: number
  lng: number
  weight?: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/visualization#HeatmapLayerOptions
 */
export type GmapsHeatmapOptions = {
  data?: GmapsPosition[] | GmapsWeightedPosition[]
  dissipating?: boolean
  gradient?: string[]
  maxIntensity?: number
  opacity?: number
  radius?: number
}

export type GmapsClusterItem = {
  lat: number
  lng: number
  options?: google.maps.MarkerOptions
  id?: string
  title?: string
  visible?: boolean
  icon?: string | google.maps.Icon
  label?: string | google.maps.MarkerLabel
  opacity?: string | number
  zIndex?: string | number
}

export type GmapsClusterGroup = {
  position: GmapsPosition
  items: GmapsClusterItem[]
  weight?: number
}

export type GmapsClusterOptions = {
  minZoom?: number
  maxZoom?: number
  tileSize?: number
  highPercentage?: number
  lowPercentage?: number
}
