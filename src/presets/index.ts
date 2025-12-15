// src/presets/index.ts
// Main Presets Export

export * from './layouts';
export * from './verticals';

// Re-export common presets
export { fashionDesignConfig, fashionGlobalComponents, fashionPages, generateFashionDSL } from './verticals/fashion/fashion.preset';
export { layoutPresets, getLayoutPreset, getLayoutsForVertical, selectRandomLayout } from './layouts';
