# Vestaboard Renderer Kit

The hero component of MATRIX-DS. The split-flap board renderer is imported directly from `system/vestaboard-rendering.js` — do not re-implement.

## Files
- `index.html` — flagship render + glyph character study

## Mount slots

```html
<!-- Flagship hero render -->
<div data-component="vestaboard-demo"
     data-preset="reopening"
     data-board-product="flagship"></div>

<!-- Compact board for chat artifact / cards -->
<div data-component="mini-vestaboard"
     data-preset="brunch"
     data-board-product="console"
     data-autoplay="true"></div>

<!-- Interactive glyph study -->
<div data-component="vestaboard-showcase"
     data-initial-showcase="letters"
     data-board-product="flagship"></div>
```

Boot the page with `import { bootDesignSystemPage } from '../system/registry.js'; bootDesignSystemPage(document)`.

## Products
- `flagship` — hero wallboard proportions
- `console` — chat artifact / rail previews
- `tile` — compact card boards

## Presets
`reopening · brunch · weather · dinner` — plus showcase presets `letters · numbers · punctuation · tiles`.
