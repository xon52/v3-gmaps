export interface PopupType extends google.maps.OverlayView {
  position: google.maps.LatLngLiteral
  content: HTMLElement
  setPosition: (position: google.maps.LatLngLiteral) => void
}

export class PopupClass extends google.maps.OverlayView {
  position
  content
  constructor(position: google.maps.LatLngLiteral, content: HTMLElement) {
    super()
    this.position = position
    this.content = content
    // TODO: This should be a property for the constructor
    window.google.maps.OverlayView.preventMapHitsAndGesturesFrom(content)
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
  setPosition = (position: google.maps.LatLngLiteral) => {
    this.position = { ...position }
    this.draw()
  }
}
