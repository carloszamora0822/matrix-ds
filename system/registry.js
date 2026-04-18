import { hydrateButtons, BUTTON_SPECS } from './button-system.js'
import { MATRIX_THEMES, applyTheme, attachThemeSwitches } from './themes.js'
import {
  BOARD_RENDER_PRODUCTS,
  MATRIX_PRESETS,
  MATRIX_SHOWCASE_PRESETS,
  mountVestaboardSlots,
  mountVestaboardShowcaseSlots,
  createVestaboardRenderer,
  mountVestaboardRenderer,
} from './vestaboard-rendering.js'
import {
  mountMiniVestaboard,
  mountMiniVestaboardSlots,
} from './minivestaboard-rendering.js'

export const MATRIX_DESIGN_SYSTEM = Object.freeze({
  themes: MATRIX_THEMES,
  components: Object.freeze({
    buttons: BUTTON_SPECS,
    vestaboard: Object.freeze({
      products: BOARD_RENDER_PRODUCTS,
      presets: MATRIX_PRESETS,
      showcases: MATRIX_SHOWCASE_PRESETS,
      createVestaboardRenderer,
      mountVestaboardRenderer,
      mountMiniVestaboard,
    }),
  }),
})

export function bootDesignSystemPage(root = document) {
  applyTheme('editorialControlRoom', root.ownerDocument ?? document)
  hydrateButtons(root)
  attachThemeSwitches(root, () => {
    hydrateButtons(root)
  })
  mountVestaboardSlots(root)
  mountVestaboardShowcaseSlots(root)
  mountMiniVestaboardSlots(root)
  return MATRIX_DESIGN_SYSTEM
}
