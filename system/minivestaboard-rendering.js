import { MATRIX_PRESETS, mountVestaboardRenderer } from './vestaboard-rendering.js'

export function mountMiniVestaboard(target, {
  preset = 'reopening',
  presentation = 'mini',
  boardProduct,
  autoPlay = false,
} = {}) {
  return mountVestaboardRenderer(target, {
    matrix: MATRIX_PRESETS[preset] ?? MATRIX_PRESETS.reopening,
    presentation,
    boardProduct,
    showToolbar: false,
    autoPlay,
    statusText: 'Embedded board preview',
  })
}

export function mountMiniVestaboardSlots(root = document) {
  root.querySelectorAll('[data-component="mini-vestaboard"]').forEach((slot) => {
    const preset = slot.getAttribute('data-preset') ?? 'reopening'
    const autoPlay = slot.getAttribute('data-autoplay') === 'true'
    mountMiniVestaboard(slot, {
      preset,
      presentation: slot.getAttribute('data-presentation') ?? 'mini',
      boardProduct: slot.getAttribute('data-board-product') ?? undefined,
      autoPlay,
    })
  })
}
