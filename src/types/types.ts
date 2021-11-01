import { Ref } from 'vue'

// https://developers.google.com/maps/documentation/javascript/reference/coordinates#Point
export interface GmapsPoint {
  x: number
  y: number
}

// https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLng
export interface GmapsPosition {
  lat: number
  lng: number
}

// https://developers.google.com/maps/documentation/javascript/reference/coordinates#Size
export interface GmapsSize {
  width: number
  height: number
  widthUnit?: string
  heightUnit?: string
}

// https://developers.google.com/maps/documentation/javascript/reference/marker#Animation
export type GmapsAnimation = 'BOUNCE' | 'DROP'

// https://developers.google.com/maps/documentation/javascript/reference/marker#CollisionBehavior
export type GmapsCollisionBehavior = 'OPTIONAL_AND_HIDES_LOWER_PRIORITY' | 'REQUIRED' | 'REQUIRED_AND_HIDES_OPTIONAL'

// https://developers.google.com/maps/documentation/javascript/reference/marker#SymbolPath
export type GmapsSymbolPath =
  | 'BACKWARD_CLOSED_ARROW'
  | 'BACKWARD_OPEN_ARROW'
  | 'CIRCLE'
  | 'FORWARD_CLOSED_ARROW'
  | 'FORWARD_OPEN_ARROW'

// https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
export interface GmapsIcon {
  url: string
  anchor?: GmapsPoint
  labelOrigin?: GmapsPoint
  origin?: GmapsPoint
  scaledSize?: GmapsSize
  size?: GmapsSize
}

// https://developers.google.com/maps/documentation/javascript/reference/marker#Symbol
export interface GmapsSymbol {
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

// https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
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

// https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBoundsLiteral
export type GmapsBounds = {
  east: number
  north: number
  south: number
  west: number
}

// https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerShape
export interface GmapsMarkerShape {
  coords: number[]
  type: 'circle' | 'poly' | 'rect'
}

// https://developers.google.com/maps/documentation/javascript/reference/polygon#StrokePosition
export type GmapsStrokePosition = 'CENTER' | 'INSIDE' | 'OUTSIDE'

// https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions
export interface GmapsMarkerOptions {
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
