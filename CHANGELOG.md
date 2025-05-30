# Change Log

## [1.0.1] - Reverted Heatmaps collection name change back to data to maintain backward compatability

## [1.0.0] - Major API Update
- Complete rewrite of logic to add Google Maps (with tests)
- Rewrote each component and broke into multiple composable files for readability/maintainability
- Rewrote all custom types
- Changed the way the maps instance is passed down from provide to composable context
- Replaced deprecated Marker API with new Advanced Markers API
- Shortened component names from `gmaps-` prefix to `gm-` prefix
- Added support for Pin API and custom marker content
- Legacy components still available for backward compatibility

## [0.1.9] - Fixed a bug where clusters didn't display negative longitudes

## [0.1.8] - Package/security updates, changed entry from .es.js to just .js

## [0.1.7] - Added additional plugin option of `callback`

## [0.1.6] - Added mounted and unmounted events for all components

## [0.1.5] - Added Google Control Position Type and Marker Mounted/Unmounted events

## [0.1.4] - Added @babel/types
