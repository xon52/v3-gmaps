/**
 * https://developers.google.com/maps/documentation/javascript/reference/coordinates#Point
 */
export type GmapsPoint = {
  x: number
  y: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng
 */
export type GmapsPosition = {
  lat: number
  lng: number
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/coordinates#Size
 */
export type GmapsSize = {
  width: number
  height: number
  widthUnit?: string
  heightUnit?: string
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/marker#Animation
 */
export enum GmapsAnimation {
  'BOUNCE',
  'DROP',
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/marker#CollisionBehavior
 */
export type GmapsCollisionBehavior = 'OPTIONAL_AND_HIDES_LOWER_PRIORITY' | 'REQUIRED' | 'REQUIRED_AND_HIDES_OPTIONAL'

/**
 * https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath
 */
export type GmapsSymbolPath =
  | 'BACKWARD_CLOSED_ARROW'
  | 'BACKWARD_OPEN_ARROW'
  | 'CIRCLE'
  | 'FORWARD_CLOSED_ARROW'
  | 'FORWARD_OPEN_ARROW'

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
  path: string | GmapsSymbolPath
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
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#StrokePosition
 */
export type GmapsStrokePosition = 'CENTER' | 'INSIDE' | 'OUTSIDE'

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
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#IconSequence
 */
export type GmapsIconSequence = {
  fixedRotation?: boolean
  icon?: GmapsSymbol
  offset?: string
  repeat?: boolean
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
 */
export type GmapsMarkerOptions = {
  anchorPoint?: GmapsPoint | null
  animation?: GmapsAnimation | null
  clickable?: boolean
  collisionBehavior?: number | GmapsCollisionBehavior | null
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
  fullscreenControlOptions?: GmapsFullscreenControlOptions
  gestureHandling?: GmapsGestureHandling
  heading?: string | number
  isFractionalZoomEnabled?: boolean
  keyboardShortcuts?: boolean
  mapId?: string
  mapTypeControl?: boolean
  mapTypeControlOptions?: GmapsMapTypeControlOptions
  mapTypeId?: string | GmapsMapTypeId
  maxZoom?: number
  minZoom?: number
  noClear?: boolean
  restriction?: GmapsMapRestriction
  rotateControl?: boolean
  scaleControl?: boolean
  scaleControlOptions?: GmapsScaleControlOptions
  scrollwheel?: boolean
  // streetView?: StreetViewPanorama,
  streetViewControl?: boolean
  streetViewControlOptions?: GmapsStreetViewControlOptions
  styles?: GmapsMapTypeStyle[]
  tilt?: string | number
  zoom?: string | number
  zoomControl?: boolean
  zoomControlOptions?: GmapsZoomControlOptions
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#ControlPosition
 */
export type GmapsGestureHandling = 'cooperative' | 'greedy' | 'none' | 'auto'

/**
 * https://developers.google.com/maps/documentation/javascript/reference/map#MapTypeId
 */
export type GmapsMapTypeId = 'hybrid' | 'roadmap' | 'satellite' | 'terrain'

/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#MapTypeControlStyle
 */
export type GmapsMapTypeControlStyle = 'DEFAULT' | 'DROPDOWN_MENU' | 'HORIZONTAL_BAR'

/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#ControlPosition
 */
export type GmapsControlPosition =
  | 'BOTTOM_CENTER'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'LEFT_BOTTOM'
  | 'LEFT_CENTER'
  | 'LEFT_TOP'
  | 'RIGHT_BOTTOM'
  | 'RIGHT_CENTER'
  | 'RIGHT_TOP'
  | 'TOP_CENTER'
  | 'TOP_LEFT'
  | 'TOP_RIGHT'

/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#FullscreenControlOptions
 */
export type GmapsFullscreenControlOptions = {
  position: GmapsControlPosition
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#MapTypeControlOptions
 */
export type GmapsMapTypeControlOptions = {
  mapTypeIds?: GmapsMapTypeId[] | string[]
  position?: GmapsControlPosition
  style?: GmapsMapTypeControlStyle
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/map#MapRestriction
 */
export type GmapsMapRestriction = {
  latLngBounds: GmapsBounds
  strictBounds?: boolean
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#RotateControlOptions
 */
export type GmapsRotateControlOptions = {
  position: GmapsControlPosition
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#ScaleControlStyle
 */
export type GmapsScaleControlStyle = 'DEFAULT'

//
/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#ScaleControlOptions
 */
export type GmapsScaleControlOptions = {
  style: GmapsScaleControlStyle
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#StreetViewControlOptions
 */
export type GmapsStreetViewControlOptions = {
  position: GmapsControlPosition
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/control#ZoomControlOptions
 */
export type GmapsZoomControlOptions = {
  position: GmapsControlPosition
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/map#MapTypeStyle
 */
export type GmapsMapTypeStyle = {
  stylers: any[]
  elementType?: string
  featureType?: string
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/map#MapMouseEvent
 */
type GmapsDomEvent = MouseEvent | TouchEvent | PointerEvent | KeyboardEvent | Event
export type GmapsMouseEvent = {
  domEvent?: GmapsDomEvent
  latLng: GmapsPosition
  stop?: () => void
}

/**
 * https://developers.google.com/maps/documentation/javascript/reference/polygon#PolyMouseEvent
 */
export type GmapsPolyMouseEvent = {
  edge?: number
  path?: number
  vertex?: number
} & GmapsMouseEvent

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
