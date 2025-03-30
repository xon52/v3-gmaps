/**
 * Represents the position of a stroke on a polygon
 * @see https://developers.google.com/maps/documentation/javascript/reference/polygon#StrokePosition
 */
export enum GmapsStrokePosition {
	CENTER = 'CENTER',
	INSIDE = 'INSIDE',
	OUTSIDE = 'OUTSIDE',
}

/**
 * Represents the position of controls on the map.
 * @see https://developers.google.com/maps/documentation/javascript/reference/control#ControlPosition
 */
export enum GmapsControlPosition {
	BOTTOM_CENTER = 'BOTTOM_CENTER',
	BOTTOM_LEFT = 'BOTTOM_LEFT',
	BOTTOM_RIGHT = 'BOTTOM_RIGHT',
	LEFT_BOTTOM = 'LEFT_BOTTOM',
	LEFT_CENTER = 'LEFT_CENTER',
	LEFT_TOP = 'LEFT_TOP',
	RIGHT_BOTTOM = 'RIGHT_BOTTOM',
	RIGHT_CENTER = 'RIGHT_CENTER',
	RIGHT_TOP = 'RIGHT_TOP',
	TOP_CENTER = 'TOP_CENTER',
	TOP_LEFT = 'TOP_LEFT',
	TOP_RIGHT = 'TOP_RIGHT',
}
