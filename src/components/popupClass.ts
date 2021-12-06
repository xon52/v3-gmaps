import { GmapsPosition } from '../types/types'

export interface PopupType extends google.maps.OverlayView {
  position: GmapsPosition
  content: HTMLElement
  setPosition: (position: GmapsPosition) => void
}

export class PopupClass extends globalThis.google.maps.OverlayView {
  position
  content
  constructor(position: GmapsPosition, content: HTMLElement, api: typeof google.maps) {
    super()
    this.position = position
    this.content = content
    api.OverlayView.preventMapHitsAndGesturesFrom(content)
  }
  // Called when the popup is added to the map
  onAdd = () => {
    const panes = this.getPanes()
    if (!panes) throw new Error('Popup Class panes not found.')
    panes.floatPane.appendChild(this.content)
  }
  // Called when the popup is removed from the map
  onRemove = () => (this.content.parentElement ? this.content.parentElement.removeChild(this.content) : null)
  // Called each frame when the popup needs to draw itself
  draw = () => {
    const divPosition = this.getProjection().fromLatLngToDivPixel(new globalThis.google.maps.LatLng(this.position))
    if (!divPosition) throw new Error('Popup Class divPosition not found.')
    this.content.style.left = divPosition.x + 'px'
    this.content.style.top = divPosition.y + 'px'
  }
  setPosition = (position: GmapsPosition) => {
    this.position = { ...position }
    this.draw()
  }
}
