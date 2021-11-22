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
  onAdd = () => this.getPanes().floatPane.appendChild(this.content)
  // Called when the popup is removed from the map
  onRemove = () => (this.content.parentElement ? this.content.parentElement.removeChild(this.content) : null)
  // Called each frame when the popup needs to draw itself
  draw = () => {
    const divPosition = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(this.position))
    this.content.style.left = divPosition.x + 'px'
    this.content.style.top = divPosition.y + 'px'
  }
  setPosition = (position: GmapsPosition) => {
    this.position = { ...position }
    this.draw()
  }
}
