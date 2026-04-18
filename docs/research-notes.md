# Design Research Notes

These notes capture the current references behind the loading and motion choices in the Matrix design-system lab.

## What We Changed

- Replaced generic loading text with a same-shape prefill state for the Vestaboard module.
- Added progressive reveal instead of a blank wait state.
- Kept motion purposeful and localized to the board render rather than animating every control endlessly.
- Added theme-driven typography, color, and motion so the system can evolve without hardcoded drift.

## Why

### 1. Placeholder content should appear immediately

Apple’s loading guidance says to show something as soon as possible and consider placeholder text, graphics, or animations while content loads.

Source:

- https://developer.apple.com/design/human-interface-guidelines/loading

### 2. Skeletons should preview the real shape of incoming content

Material UI’s Skeleton guidance frames skeletons as placeholder previews of the content before it loads, improving perceived responsiveness and reducing load-time frustration.

Sources:

- https://mui.com/material-ui/react-skeleton/
- https://mui.com/material-ui/api/skeleton/

### 3. Use skeleton states on structured containers, not everything

Carbon’s loading pattern says skeleton states work best on container-based or data-based components, and that action components like buttons and inputs usually do not need skeleton states. That is why the Vestaboard gets a shaped prefill state, while buttons remain stable.

Sources:

- https://carbondesignsystem.com/patterns/loading-pattern
- https://v10.carbondesignsystem.com/patterns/loading-pattern/

### 4. Motion should be brief, precise, and purposeful

Apple’s motion guidance says not to add motion for its own sake, to keep feedback brief and precise, and to avoid making people repeatedly pay attention to unnecessary animation. That is why the board flips during render, but the rest of the page stays relatively calm.

Source:

- https://developer.apple.com/design/human-interface-guidelines/motion

### 5. Skeletons are a recognized design-system primitive

Atlassian’s design system defines skeletons as placeholders for content while it loads. We are using that pattern, but adapting it to Matrix’s domain instead of defaulting to generic card bars.

Source:

- https://atlassian.design/components/skeleton/

## Matrix-Specific Interpretation

For Matrix, the best loading pattern is not a page-level spinner and not a generic gray rectangle.

The most premium version is:

1. show the board frame immediately
2. show the exact future occupied cells as ghost placeholders
3. flip border and content into place in a deliberate render order
4. settle into the final board without extra motion noise

That gives the product a more real, intentional feel than a typical AI app “thinking” state.
