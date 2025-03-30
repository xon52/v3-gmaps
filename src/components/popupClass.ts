import { GmapsPosition } from '../types';
import { loadMapsLibrary } from '../install/api';

export interface PopupType extends google.maps.OverlayView {
	position: GmapsPosition;
	content: HTMLElement;
	setPosition: (position: GmapsPosition) => void;
}

// Factory function to create a PopupClass
export async function createPopup(position: GmapsPosition, content: HTMLElement): Promise<PopupType> {
	// Request the OverlayView from the maps library
	const { OverlayView } = await loadMapsLibrary();

	// Create a class that properly extends OverlayView
	class PopupOverlay extends OverlayView implements PopupType {
		position: GmapsPosition;
		content: HTMLElement;

		constructor(pos: GmapsPosition, el: HTMLElement) {
			super();
			this.position = pos;
			this.content = el;
			OverlayView.preventMapHitsAndGesturesFrom(this.content);
		}

		onAdd(): void {
			const panes = this.getPanes();
			if (!panes) throw new Error('Popup Class panes not found.');
			panes.floatPane.appendChild(this.content);
		}

		onRemove(): void {
			if (this.content.parentElement) {
				this.content.parentElement.removeChild(this.content);
			}
		}

		draw(): void {
			const projection = this.getProjection();
			const latLng = new google.maps.LatLng(this.position);
			const divPosition = projection.fromLatLngToDivPixel(latLng);

			if (!divPosition) throw new Error('Popup Class divPosition not found.');

			this.content.style.left = divPosition.x + 'px';
			this.content.style.top = divPosition.y + 'px';
		}

		setPosition(position: GmapsPosition): void {
			this.position = { ...position };
			this.draw();
		}
	}

	// Create and return an instance
	return new PopupOverlay(position, content);
}

// Backward compatibility class
export class PopupClass extends globalThis.google.maps.OverlayView {
	position: GmapsPosition;
	content: HTMLElement;

	constructor(position: GmapsPosition, content: HTMLElement, api?: typeof google.maps) {
		super();
		this.position = position;
		this.content = content;
		if (api) {
			api.OverlayView.preventMapHitsAndGesturesFrom(content);
		} else {
			// If no API provided, use the global google.maps
			globalThis.google.maps.OverlayView.preventMapHitsAndGesturesFrom(content);
		}
	}

	// Called when the popup is added to the map
	onAdd = () => {
		const panes = this.getPanes();
		if (!panes) throw new Error('Popup Class panes not found.');
		panes.floatPane.appendChild(this.content);
	};

	// Called when the popup is removed from the map
	onRemove = () => (this.content.parentElement ? this.content.parentElement.removeChild(this.content) : null);

	// Called each frame when the popup needs to draw itself
	draw = () => {
		const divPosition = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(this.position));
		if (!divPosition) throw new Error('Popup Class divPosition not found.');
		this.content.style.left = divPosition.x + 'px';
		this.content.style.top = divPosition.y + 'px';
	};

	setPosition = (position: GmapsPosition) => {
		this.position = { ...position };
		this.draw();
	};

	// Static factory method for modern usage
	static async create(position: GmapsPosition, content: HTMLElement): Promise<PopupType> {
		return createPopup(position, content);
	}
}
