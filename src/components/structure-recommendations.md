# Component Structure Recommendations

This document outlines recommendations for improving consistency across component structure in the `v3-gmaps` library.

## Current Structure Analysis

After analyzing the component folders, several inconsistencies were identified:

### 1. Index Files
- Only Shape and Legacy components have `index.ts` files for unified exports
- Other components lack a standardized export pattern
- Pin folder has types.ts but no actual Vue component or index.ts

### 2. File Organization
- **Map**: Contains additional UI components (MapSpinner.vue, MapError.vue)
- **Cluster**: Has multiple utility files split by functionality (clusterUtils.ts, markerUtils.ts, mapUtils.ts, gridUtils.ts)
- **Shape**: Has multiple Vue components (Circle.vue, Polygon.vue, etc.) with a shared index.ts
- **Pin**: Appears incomplete with only utility and type files
- Naming conventions vary across components

### 3. Documentation
- Map.vue and InfoWindow.vue have detailed JSDoc comments
- Other files have varying levels of documentation
- No standardized approach to documenting props, events, and methods

## Recommendations

### 1. Standardize Directory Structure

Each component folder should follow this structure:

```
ComponentName/
├── ComponentName.vue         # Main component
├── types.ts                  # Type definitions
├── useComponentEvents.ts     # Event handling composable
├── useComponentWatchers.ts   # Prop watchers composable
├── componentUtils.ts         # Utility functions (single file where possible)
├── index.ts                  # Exports
└── [subcomponents/]          # If needed (should follow same pattern)
```

### 2. Create Consistent Index Files

Each component should have an `index.ts` file that exports:
- The main Vue component(s)
- Type definitions (for advanced usage)
- Utility functions (for advanced usage)

Example template:
```typescript
// Export main component
export { default as GmapsComponentName } from './ComponentName.vue';

// Export types and utilities for advanced usage
export * from './types';
export * from './componentUtils';
```

### 3. Documentation Standards

Standardize JSDoc comments across components:
- Main components should have a brief description and link to Google Maps API docs
- Keep comments concise but descriptive
- Document props, events, and methods consistently
- Focus on explaining unique or complex aspects

Example template:
```typescript
/**
 * Google Maps ComponentName Component
 *
 * A Vue 3 component that wraps the Google Maps JavaScript API ComponentName object.
 * It provides a reactive interface to control the component and emits events.
 *
 * @see https://developers.google.com/maps/documentation/javascript/reference/component-name
 */
```

### 4. Utility Organization

- Consolidate utility functions into single files when possible
- Only split utility files when they exceed 200+ lines or have distinctly different concerns
- Use consistent naming: `componentUtils.ts` vs multiple specialized files

### 5. Specific Component Fixes

#### Pin Component
- Complete the Pin component with a Vue file (Pin.vue)
- Follow the same patterns as other components
- Add an index.ts file for exports

#### Cluster Component
- Consider consolidating utility files or clearly documenting their separation
- Add index.ts file for exports

#### Map Component
- Consider moving MapSpinner.vue and MapError.vue to a subcomponents folder
- Ensure they're properly exported if needed by other components

### 6. Naming Conventions

- Use consistent prefixing in exports (e.g., `Gmaps` prefix for all or none)
- Follow Vue 3 conventions for composables (useXxx.ts)
- Use consistent casing (camelCase for files, PascalCase for components)

## Implementation Priority

1. Add missing index.ts files to all components
2. Standardize documentation across main component files
3. Complete the Pin component
4. Consolidate utility files where appropriate
5. Organize subcomponents consistently
6. Apply consistent naming conventions

These changes will significantly improve maintainability by making the codebase structure more predictable, enabling easier navigation and understanding for developers. 
