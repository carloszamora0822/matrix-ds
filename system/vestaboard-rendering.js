import { createButton } from './button-system.js'
import {
  BOARD_GLYPH_VIEWBOX,
  getBoardGlyphPath,
  getOpticalCenteredStart,
} from './vestaboard-glyphs.js'

export const GRID_ROWS = 6
export const GRID_COLS = 22
const CELL_COUNT = GRID_ROWS * GRID_COLS
const FULL_CONTENT_START = 0
const FULL_CONTENT_COLS = GRID_COLS
const BORDER_CONTENT_START = 2
const BORDER_CONTENT_COLS = 18
const DEMO_STYLE_ID = 'matrix-ds-vestaboard'
const PREFILL_HOLD_MS = 96
const STREAM_INTERVAL_MS = 14
const FLIP_RESET_MS = 460

export const BOARD_RENDER_PRODUCTS = Object.freeze({
  flagship: Object.freeze({
    key: 'flagship',
    label: 'Flagship Wallboard',
    description: 'Full-size hero renderer with room-readable proportions.',
    shellPaddingPx: 8,
    facePaddingPx: 8,
    gridGapPx: 2,
    cellRadiusPx: 2,
    discRadiusPx: 1,
    discWidthPct: 86,
    discHeightPct: 82,
    glyphRatio: 0.62,
    minFontPx: 12,
    maxFontPx: 20,
    fontWeight: 770,
    glyphScaleX: 1.01,
    glyphBoxWidthPct: 90,
    glyphBoxHeightPct: 94,
    glyphShiftYPct: 3.8,
  }),
  console: Object.freeze({
    key: 'console',
    label: 'Console Preview',
    description: 'Mid-size board for chat previews and rail surfaces.',
    shellPaddingPx: 1,
    facePaddingPx: 1,
    gridGapPx: 0.5,
    cellRadiusPx: 2,
    discRadiusPx: 1,
    discWidthPct: 97,
    discHeightPct: 94,
    glyphRatio: 1.08,
    minFontPx: 13,
    maxFontPx: 20,
    fontWeight: 785,
    glyphScaleX: 1.03,
    glyphBoxWidthPct: 99,
    glyphBoxHeightPct: 100,
    glyphShiftYPct: 2.2,
  }),
  tile: Object.freeze({
    key: 'tile',
    label: 'Signal Tile',
    description: 'Compact card board with a larger glyph-to-flap ratio.',
    shellPaddingPx: 1,
    facePaddingPx: 1,
    gridGapPx: 0,
    cellRadiusPx: 1,
    discRadiusPx: 1,
    discWidthPct: 99,
    discHeightPct: 96,
    glyphRatio: 1.18,
    minFontPx: 14,
    maxFontPx: 19,
    fontWeight: 800,
    glyphScaleX: 1.05,
    glyphBoxWidthPct: 100,
    glyphBoxHeightPct: 100,
    glyphShiftYPct: 2,
  }),
})

const CHAR_TO_CODE = Object.freeze({
  ' ': 0,
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9, J: 10,
  K: 11, L: 12, M: 13, N: 14, O: 15, P: 16, Q: 17, R: 18, S: 19, T: 20,
  U: 21, V: 22, W: 23, X: 24, Y: 25, Z: 26,
  1: 27, 2: 28, 3: 29, 4: 30, 5: 31, 6: 32, 7: 33, 8: 34, 9: 35, 0: 36,
  '!': 37, '@': 38, '#': 39, '$': 40, '(': 41, ')': 42,
  '-': 44, '+': 46, '&': 47, '=': 48, ';': 49, ':': 50,
  "'": 52, '"': 53, '%': 54, ',': 55, '.': 56, '/': 59, '?': 60, '°': 62,
})

const CODE_TO_CHAR = Object.freeze(
  Object.fromEntries(Object.entries(CHAR_TO_CODE).map(([key, value]) => [value, key])),
)

const TILE_CODE_TO_COLOR = Object.freeze({
  63: '#d56156',
  64: '#ff6a2a',
  65: '#d7c24e',
  66: '#7eb56d',
  67: '#5a78ff',
  68: '#8e7dff',
  69: '#f7efd9',
})

function createEmptyMatrix() {
  return Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(0))
}

function cloneMatrix(matrix) {
  return matrix.map((row) => [...row])
}

function encodeText(text, maxLength) {
  return Array.from(
    text
      .normalize('NFC')
      .toLocaleUpperCase('en-US')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, '-')
      .slice(0, maxLength),
  )
}

function writeCenteredLine(matrix, row, lineSpec, {
  contentStart = FULL_CONTENT_START,
  contentCols = FULL_CONTENT_COLS,
} = {}) {
  const rawText = typeof lineSpec === 'string' ? lineSpec : lineSpec?.text ?? ''
  const offsetCols = typeof lineSpec === 'string' ? 0 : lineSpec?.offsetCols ?? 0
  const chars = encodeText(rawText, contentCols)
  const baseStart = getOpticalCenteredStart(chars, {
    contentStart,
    contentCols,
  })
  const start = Math.min(
    contentStart + contentCols - chars.length,
    Math.max(contentStart, baseStart + offsetCols),
  )
  chars.forEach((char, index) => {
    matrix[row][start + index] = CHAR_TO_CODE[char] ?? 0
  })
}

function writeCenteredCodes(matrix, row, codes, {
  contentStart = FULL_CONTENT_START,
  contentCols = FULL_CONTENT_COLS,
} = {}) {
  const safeCodes = codes.slice(0, contentCols)
  const start = contentStart + Math.max(0, Math.floor((contentCols - safeCodes.length) / 2))
  safeCodes.forEach((code, index) => {
    matrix[row][start + index] = code ?? 0
  })
}

function resolveLineRows(lineCount, borderStyle) {
  const clampedCount = Math.min(lineCount, borderStyle === 'none' ? GRID_ROWS : 4)
  if (borderStyle !== 'none') return [1, 2, 3, 4].slice(0, clampedCount)
  const startRow = Math.floor((GRID_ROWS - clampedCount) / 2)
  return Array.from({ length: clampedCount }, (_, index) => startRow + index)
}

function perimeterCells() {
  const cells = []
  for (let c = 0; c < GRID_COLS; c++) cells.push([0, c])
  for (let r = 1; r < GRID_ROWS - 1; r++) cells.push([r, GRID_COLS - 1])
  for (let c = GRID_COLS - 1; c >= 0; c--) cells.push([GRID_ROWS - 1, c])
  for (let r = GRID_ROWS - 2; r >= 1; r--) cells.push([r, 0])
  return cells
}

function applyBorder(matrix, colors = [64, 69], style = 'alternating') {
  if (style === 'none') return matrix
  const cells = perimeterCells()
  if (style === 'solid') {
    const code = colors[0] ?? 64
    cells.forEach(([r, c]) => {
      matrix[r][c] = code
    })
    return matrix
  }
  cells.forEach(([r, c], index) => {
    matrix[r][c] = colors[index % colors.length] ?? colors[0] ?? 64
  })
  return matrix
}

export function buildPresetMatrix({
  lines,
  borderStyle = 'none',
  borderCodes = [],
  contentStart = borderStyle === 'none' ? FULL_CONTENT_START : BORDER_CONTENT_START,
  contentCols = borderStyle === 'none' ? FULL_CONTENT_COLS : BORDER_CONTENT_COLS,
}) {
  const matrix = createEmptyMatrix()
  if (borderStyle !== 'none' && borderCodes.length > 0) {
    applyBorder(matrix, borderCodes, borderStyle)
  }
  const lineRows = resolveLineRows(lines.length, borderStyle)
  lines.slice(0, lineRows.length).forEach((line, index) => {
    writeCenteredLine(matrix, lineRows[index], line, { contentStart, contentCols })
  })
  return matrix
}

function buildColorShowcaseMatrix() {
  const matrix = createEmptyMatrix()
  writeCenteredCodes(matrix, 0, [63, 63, 64, 64, 65, 65, 66, 66, 67, 67, 68, 68, 69, 69])
  writeCenteredLine(matrix, 1, 'RED ORANGE GOLD')
  writeCenteredCodes(matrix, 2, [69, 68, 67, 66, 65, 64, 63])
  writeCenteredLine(matrix, 3, 'GREEN BLUE VIOLET')
  writeCenteredCodes(matrix, 4, [69, 69, 69, 69, 69])
  writeCenteredLine(matrix, 5, 'CREAM')
  return matrix
}

export const MATRIX_PRESETS = Object.freeze({
  reopening: buildPresetMatrix({
    lines: ['REOPENING', 'SATURDAY 8 AM', 'CAFE + MARKET'],
  }),
  brunch: buildPresetMatrix({
    lines: ['BRUNCH', 'SATURDAY 8-2', 'NOW POURING'],
  }),
  weather: buildPresetMatrix({
    lines: ['AUSTIN 72°', 'SUNNY + CLEAR', 'SUNSET 7:58'],
  }),
  dinner: buildPresetMatrix({
    lines: ['NOW SERVING', 'DINNER', 'UNTIL LATE'],
  }),
})

export const MATRIX_SHOWCASE_PRESETS = Object.freeze({
  letters: Object.freeze({
    key: 'letters',
    label: 'Letters',
    matrix: buildPresetMatrix({
      lines: [
        'A B C D E F',
        'G H I J K L',
        'M N O P Q R',
        'S T U V W X',
        'Y Z',
      ],
    }),
  }),
  numbers: Object.freeze({
    key: 'numbers',
    label: 'Numbers',
    matrix: buildPresetMatrix({
      lines: [
        '0 1 2 3 4',
        '5 6 7 8 9',
        '72° 7:58 8-2',
        '24/7 50% +1',
      ],
    }),
  }),
  punctuation: Object.freeze({
    key: 'punctuation',
    label: 'Punctuation',
    matrix: buildPresetMatrix({
      lines: [
        '! ? : ; , .',
        '@ # $ % & +',
        '( ) - = / "',
        "' °",
      ],
    }),
  }),
  tiles: Object.freeze({
    key: 'tiles',
    label: 'Color Tiles',
    matrix: buildColorShowcaseMatrix(),
  }),
})

function resolveBoardProduct(productKey, presentation = 'demo') {
  if (productKey && BOARD_RENDER_PRODUCTS[productKey]) return BOARD_RENDER_PRODUCTS[productKey]
  if (presentation === 'mini') return BOARD_RENDER_PRODUCTS.tile
  if (presentation === 'embedded') return BOARD_RENDER_PRODUCTS.console
  return BOARD_RENDER_PRODUCTS.flagship
}

function applyBoardProductVars(root, product) {
  root.style.setProperty('--vb-shell-padding', `${product.shellPaddingPx}px`)
  root.style.setProperty('--vb-face-padding', `${product.facePaddingPx}px`)
  root.style.setProperty('--vb-grid-gap', `${product.gridGapPx}px`)
  root.style.setProperty('--vb-cell-radius', `${product.cellRadiusPx}px`)
  root.style.setProperty('--vb-disc-radius', `${product.discRadiusPx}px`)
  root.style.setProperty('--vb-disc-width', `${product.discWidthPct}%`)
  root.style.setProperty('--vb-disc-height', `${product.discHeightPct}%`)
  root.style.setProperty('--vb-disc-font-weight', String(product.fontWeight))
  root.style.setProperty('--vb-glyph-scale-x', String(product.glyphScaleX))
  root.style.setProperty('--vb-glyph-box-width', `${product.glyphBoxWidthPct}%`)
  root.style.setProperty('--vb-glyph-box-height', `${product.glyphBoxHeightPct}%`)
  root.style.setProperty('--vb-glyph-shift-y', `${product.glyphShiftYPct}%`)
}

function ensureVestaboardStyles(doc = document) {
  if (doc.getElementById(DEMO_STYLE_ID)) return
  const style = doc.createElement('style')
  style.id = DEMO_STYLE_ID
  style.textContent = `
    .vb-module {
      display: grid;
      gap: var(--space-4);
    }

    .vb-module[data-presentation="demo"] {
      padding: var(--space-6);
      border-radius: var(--radius-card);
      border: 1px solid var(--line-soft);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0)),
        var(--bg-shell);
      box-shadow: var(--shadow-1), var(--shadow-inset);
    }

    .vb-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: var(--space-4);
    }

    .vb-kicker {
      margin: 0 0 8px;
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent-citron);
    }

    .vb-title {
      margin: 0;
      font-family: var(--font-display);
      font-weight: 400;
      font-size: clamp(30px, 4vw, 46px);
      line-height: var(--leading-tight);
    }

    .vb-subtitle {
      margin: 10px 0 0;
      max-width: 56ch;
      color: var(--text-muted);
      line-height: 1.65;
    }

    .vb-shell {
      position: relative;
      width: 100%;
      max-width: 100%;
      border-radius: 8px;
      padding: var(--vb-shell-padding, 8px);
      background: var(--board-shell);
      border: 1px solid rgba(255, 255, 255, 0.06);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.02),
        0 8px 16px rgba(0, 0, 0, 0.2);
      overflow: hidden;
    }

    .vb-shell::before,
    .vb-shell::after {
      content: "";
      position: absolute;
      pointer-events: none;
    }

    .vb-shell::before {
      inset: 0;
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: inherit;
      background: transparent;
    }

    .vb-shell::after {
      inset: auto 0 0 0;
      height: 0;
      background: transparent;
    }

    .vb-face {
      position: relative;
      border-radius: 4px;
      padding: var(--vb-face-padding, 8px);
      background: var(--board-face);
      border: 1px solid rgba(255, 255, 255, 0.04);
      overflow: hidden;
    }

    .vb-face::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);
      transform: translateX(-130%);
      opacity: 0;
      pointer-events: none;
    }

    .vb-module[data-busy="true"] .vb-face::before {
      opacity: 1;
      animation: vb-sheen 1.15s var(--ease-standard) infinite;
    }

    .vb-grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(${GRID_COLS}, minmax(0, 1fr));
      gap: var(--vb-grid-gap, 2px);
      width: 100%;
    }

    .vb-cell {
      aspect-ratio: 1 / 1.87;
      border-radius: var(--vb-cell-radius, 2px);
      background: var(--board-cell-shell);
      border: 1px solid var(--board-cell-edge);
      display: grid;
      place-items: center;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.008),
        inset 0 -1px 0 rgba(0, 0, 0, 0.18);
    }

    .vb-disc {
      position: relative;
      width: var(--vb-disc-width, 86%);
      height: var(--vb-disc-height, 82%);
      border-radius: var(--vb-disc-radius, 1px);
      display: grid;
      place-items: center;
      background: var(--board-disc-empty);
      color: transparent;
      font-family: var(--font-mono);
      font-size: var(--vb-disc-font-size, 11px);
      line-height: 1;
      font-weight: var(--vb-disc-font-weight, 800);
      letter-spacing: 0;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.015),
        inset 0 -1px 0 rgba(0, 0, 0, 0.4);
      transition:
        background var(--speed-base) var(--ease-standard),
        color var(--speed-base) var(--ease-standard),
        transform var(--speed-fast) var(--ease-standard),
        opacity var(--speed-base) var(--ease-standard);
      transform-style: preserve-3d;
      -webkit-font-smoothing: antialiased;
      text-rendering: geometricPrecision;
    }

    .vb-disc::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 1px;
      background: var(--board-seam);
      opacity: 0.52;
      transform: translateY(-0.5px);
      pointer-events: none;
    }

    .vb-disc[data-state="ghost"] {
      background: var(--board-disc-ghost);
      color: transparent;
      opacity: 0.96;
    }

    .vb-disc[data-state="live-text"] {
      background: var(--board-disc-text);
      color: var(--board-glyph);
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.02),
        inset 0 -1px 0 rgba(0, 0, 0, 0.46);
    }

    .vb-disc[data-state="live-tile"] {
      color: transparent;
    }

    .vb-disc[data-state="empty"] {
      opacity: 0.96;
    }

    .vb-disc[data-flipping="true"] {
      animation: vb-flip 460ms var(--ease-standard);
    }

    .vb-glyph {
      display: grid;
      place-items: center;
      width: var(--vb-glyph-box-width, 90%);
      height: var(--vb-glyph-box-height, 94%);
      line-height: 0;
      color: inherit;
      transform: translateY(var(--vb-glyph-shift-y, 0%)) scaleX(var(--vb-glyph-scale-x, 1));
      transform-origin: center;
      text-shadow: 0 0 0.06px rgba(255, 253, 247, 0.22);
    }

    .vb-glyph-svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
      shape-rendering: crispEdges;
    }

    .vb-glyph-path {
      fill: currentColor;
    }

    .vb-glyph-fallback {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: var(--vb-disc-font-size, 11px);
      line-height: 1;
      font-weight: var(--vb-disc-font-weight, 800);
      letter-spacing: 0;
    }

    .vb-meta {
      display: flex;
      justify-content: space-between;
      gap: var(--space-4);
      align-items: center;
      flex-wrap: wrap;
    }

    .vb-status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--line-medium);
      background: rgba(255, 255, 255, 0.03);
      color: var(--text-body);
      font-size: var(--text-sm);
    }

    .vb-toolbar {
      display: flex;
      gap: var(--space-3);
      flex-wrap: wrap;
    }

    .vb-showcase {
      display: grid;
      gap: var(--space-4);
    }

    .vb-showcase-actions {
      display: flex;
      gap: var(--space-3);
      flex-wrap: wrap;
    }

    .vb-showcase-actions [data-showcase-active="true"] {
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06) inset;
    }

    .vb-showcase-render {
      display: grid;
    }

    .vb-slot-fill {
      width: 100%;
      height: 100%;
    }

    .vb-module[data-board-product="console"] .vb-shell,
    .vb-module[data-board-product="tile"] .vb-shell {
      border-radius: 6px;
      border-color: rgba(255, 255, 255, 0.025);
      box-shadow: none;
    }

    .vb-module[data-board-product="console"] .vb-face,
    .vb-module[data-board-product="tile"] .vb-face {
      border-radius: 3px;
      border-color: rgba(255, 255, 255, 0.02);
    }

    .vb-module[data-board-product="console"] .vb-cell,
    .vb-module[data-board-product="tile"] .vb-cell {
      border-color: rgba(255, 255, 255, 0.009);
      box-shadow: none;
    }

    .vb-module[data-board-product="console"] .vb-disc[data-state="live-text"],
    .vb-module[data-board-product="tile"] .vb-disc[data-state="live-text"] {
      background: #0f0d0a;
    }

    .vb-module[data-board-product="console"] .vb-disc::after {
      opacity: 0.18;
    }

    .vb-module[data-board-product="tile"] .vb-disc::after {
      opacity: 0.12;
    }

    @keyframes vb-sheen {
      from { transform: translateX(-130%); }
      to { transform: translateX(140%); }
    }

    @keyframes vb-flip {
      0% {
        transform: rotateX(0deg) scaleY(1);
        filter: brightness(0.85);
      }
      45% {
        transform: rotateX(-86deg) scaleY(0.85);
        filter: brightness(1.18);
      }
      100% {
        transform: rotateX(0deg) scaleY(1);
        filter: brightness(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .vb-module[data-busy="true"] .vb-face::before,
      .vb-disc[data-flipping="true"] {
        animation: none;
      }
    }
  `
  doc.head.append(style)
}

function isValidMatrix(matrix) {
  return (
    Array.isArray(matrix) &&
    matrix.length === GRID_ROWS &&
    matrix.every((row) => Array.isArray(row) && row.length === GRID_COLS)
  )
}

function flattenMatrix(matrix) {
  const flat = new Uint16Array(CELL_COUNT)
  let cursor = 0
  for (let rowIndex = 0; rowIndex < GRID_ROWS; rowIndex++) {
    const row = matrix[rowIndex] ?? []
    for (let colIndex = 0; colIndex < GRID_COLS; colIndex++) {
      flat[cursor++] = row[colIndex] ?? 0
    }
  }
  return flat
}

function createStreamOrder(flatCodes) {
  const border = []
  const text = []

  for (let index = 0; index < flatCodes.length; index++) {
    const code = flatCodes[index]
    if (!code) continue
    if (code >= 63) border.push(index)
    else text.push(index)
  }

  text.sort((a, b) => {
    const rowA = Math.floor(a / GRID_COLS)
    const rowB = Math.floor(b / GRID_COLS)
    if (rowA !== rowB) return rowA - rowB
    const colA = a % GRID_COLS
    const colB = b % GRID_COLS
    const distanceA = Math.abs(colA - GRID_COLS / 2)
    const distanceB = Math.abs(colB - GRID_COLS / 2)
    return distanceA - distanceB
  })

  return [...border, ...text]
}

function reduceMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function signatureForState(code, revealed) {
  if (!code) return 0
  if (!revealed) return code * 4 + 1
  if (code >= 63) return code * 4 + 2
  return code * 4 + 3
}

function patchDisc(disc, glyphPathNode, glyphSvgNode, glyphFallbackNode, code, revealed, signatures, index) {
  const nextSignature = signatureForState(code, revealed)
  if (signatures[index] === nextSignature) return
  signatures[index] = nextSignature

  if (!code) {
    if (disc.dataset.state !== 'empty') disc.dataset.state = 'empty'
    if (glyphPathNode.getAttribute('d') !== '') glyphPathNode.setAttribute('d', '')
    if (glyphFallbackNode.textContent !== '') glyphFallbackNode.textContent = ''
    glyphSvgNode.hidden = true
    glyphFallbackNode.hidden = true
    if (disc.style.backgroundColor !== '') disc.style.backgroundColor = ''
    if (disc.style.color !== '') disc.style.color = ''
    return
  }

  if (!revealed) {
    if (disc.dataset.state !== 'ghost') disc.dataset.state = 'ghost'
    if (glyphPathNode.getAttribute('d') !== '') glyphPathNode.setAttribute('d', '')
    if (glyphFallbackNode.textContent !== '') glyphFallbackNode.textContent = ''
    glyphSvgNode.hidden = true
    glyphFallbackNode.hidden = true
    if (disc.style.backgroundColor !== '') disc.style.backgroundColor = ''
    if (disc.style.color !== '') disc.style.color = ''
    return
  }

  if (code >= 63) {
    if (disc.dataset.state !== 'live-tile') disc.dataset.state = 'live-tile'
    if (glyphPathNode.getAttribute('d') !== '') glyphPathNode.setAttribute('d', '')
    if (glyphFallbackNode.textContent !== '') glyphFallbackNode.textContent = ''
    glyphSvgNode.hidden = true
    glyphFallbackNode.hidden = true
    const nextColor = TILE_CODE_TO_COLOR[code] ?? '#fff'
    if (disc.style.backgroundColor !== nextColor) disc.style.backgroundColor = nextColor
    if (disc.style.color !== '') disc.style.color = ''
    return
  }

  if (disc.dataset.state !== 'live-text') disc.dataset.state = 'live-text'
  const nextLabel = CODE_TO_CHAR[code] ?? ''
  const nextPath = getBoardGlyphPath(nextLabel)
  if (nextPath) {
    if (glyphPathNode.getAttribute('d') !== nextPath) glyphPathNode.setAttribute('d', nextPath)
    glyphSvgNode.hidden = false
    if (glyphFallbackNode.textContent !== '') glyphFallbackNode.textContent = ''
    glyphFallbackNode.hidden = true
  } else {
    if (glyphPathNode.getAttribute('d') !== '') glyphPathNode.setAttribute('d', '')
    glyphSvgNode.hidden = true
    if (glyphFallbackNode.textContent !== nextLabel) glyphFallbackNode.textContent = nextLabel
    glyphFallbackNode.hidden = false
  }
  if (disc.style.backgroundColor !== '') disc.style.backgroundColor = ''
  if (disc.style.color !== '') disc.style.color = ''
}

export function createVestaboardRenderer({
  matrix = MATRIX_PRESETS.reopening,
  title = 'Vestaboard render module',
  subtitle = 'Same-shape prefill first, then a border-first live flip stream.',
  kicker = 'Render lab',
  presentation = 'demo',
  boardProduct,
  showToolbar = presentation === 'demo',
  autoPlay = presentation === 'demo',
  statusText = 'Prefill skeleton ready',
} = {}) {
  if (!isValidMatrix(matrix)) throw new Error('createVestaboardRenderer: invalid matrix')

  ensureVestaboardStyles(document)
  const doc = document
  const product = resolveBoardProduct(boardProduct, presentation)

  const root = doc.createElement('section')
  root.className = 'vb-module'
  root.dataset.presentation = presentation
  root.dataset.boardProduct = product.key
  root.dataset.busy = 'false'
  applyBoardProductVars(root, product)

  if (presentation === 'demo') {
    const header = doc.createElement('div')
    header.className = 'vb-header'
    header.innerHTML = `
      <div>
        <p class="vb-kicker">${kicker}</p>
        <h3 class="vb-title">${title}</h3>
        <p class="vb-subtitle">${subtitle}</p>
      </div>
    `
    root.append(header)
  }

  const shell = doc.createElement('div')
  shell.className = 'vb-shell'
  const face = doc.createElement('div')
  face.className = 'vb-face'
  const grid = doc.createElement('div')
  grid.className = 'vb-grid'

  const discNodes = new Array(CELL_COUNT)
  const glyphPathNodes = new Array(CELL_COUNT)
  const glyphSvgNodes = new Array(CELL_COUNT)
  const glyphFallbackNodes = new Array(CELL_COUNT)
  const fragment = doc.createDocumentFragment()
  for (let i = 0; i < CELL_COUNT; i++) {
    const cell = doc.createElement('div')
    cell.className = 'vb-cell'
    const disc = doc.createElement('div')
    disc.className = 'vb-disc'
    disc.dataset.state = 'empty'
    const glyph = doc.createElement('span')
    glyph.className = 'vb-glyph'
    const glyphSvg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg')
    glyphSvg.classList.add('vb-glyph-svg')
    glyphSvg.setAttribute('viewBox', BOARD_GLYPH_VIEWBOX)
    glyphSvg.setAttribute('aria-hidden', 'true')
    glyphSvg.setAttribute('focusable', 'false')
    glyphSvg.hidden = true
    const glyphPath = doc.createElementNS('http://www.w3.org/2000/svg', 'path')
    glyphPath.classList.add('vb-glyph-path')
    glyphSvg.append(glyphPath)
    const glyphFallback = doc.createElement('span')
    glyphFallback.className = 'vb-glyph-fallback'
    glyphFallback.hidden = true
    glyph.append(glyphSvg, glyphFallback)
    disc.append(glyph)
    cell.append(disc)
    discNodes[i] = disc
    glyphPathNodes[i] = glyphPath
    glyphSvgNodes[i] = glyphSvg
    glyphFallbackNodes[i] = glyphFallback
    fragment.append(cell)
  }
  grid.append(fragment)

  face.append(grid)
  shell.append(face)
  root.append(shell)

  const meta = doc.createElement('div')
  meta.className = 'vb-meta'
  const statusNode = doc.createElement('div')
  statusNode.className = 'vb-status'
  statusNode.dataset.role = 'vestaboard-status'
  statusNode.textContent = statusText
  meta.append(statusNode)

  if (showToolbar) {
    const toolbar = doc.createElement('div')
    toolbar.className = 'vb-toolbar'
    const prefillButton = createButton({ label: 'Show prefill', variant: 'secondary' })
    const replayButton = createButton({ label: 'Replay flips', variant: 'primary' })
    const settleButton = createButton({ label: 'Settle instantly', variant: 'ghost' })
    toolbar.append(prefillButton, replayButton, settleButton)
    meta.append(toolbar)
    prefillButton.dataset.action = 'prefill'
    replayButton.dataset.action = 'replay'
    settleButton.dataset.action = 'settle'
  }

  if (presentation === 'demo') root.append(meta)

  let liveMatrix = cloneMatrix(matrix)
  let flatCodes = flattenMatrix(liveMatrix)
  let streamOrder = createStreamOrder(flatCodes)
  const revealMask = new Uint8Array(CELL_COUNT)
  const appliedSignatures = new Int32Array(CELL_COUNT)
  appliedSignatures.fill(-1)
  const flipDeadlines = new Float64Array(CELL_COUNT)
  let activeFlipIndices = []
  let animationFrame = 0
  let resizeObserver = null

  // Hot-path strategy:
  // - cache a flat 132-cell code array
  // - track revealed cells in a Uint8Array
  // - diff each cell via a compact integer signature
  // - stream via ONE requestAnimationFrame loop instead of N setTimeouts
  //
  // Result: each frame patches only newly changed cells. The old path
  // re-rendered all 132 cells for every reveal step, which was O(n^2) over
  // a full stream. This path is O(n) for the stream plus cheap flip cleanup.

  function updateStatus(text) {
    if (statusNode.textContent !== text) statusNode.textContent = text
  }

  function refreshScale() {
    if (!grid.isConnected) return
    const gridWidth = grid.clientWidth
    if (!gridWidth) return

    const computed = getComputedStyle(grid)
    const gap = parseFloat(computed.columnGap || computed.gap || `${product.gridGapPx}`) || product.gridGapPx
    const cellWidth = Math.max(0, (gridWidth - gap * (GRID_COLS - 1)) / GRID_COLS)
    const nextFontPx = Math.max(
      product.minFontPx,
      Math.min(product.maxFontPx, cellWidth * product.glyphRatio),
    )
    const nextFontValue = `${nextFontPx.toFixed(2)}px`
    if (root.style.getPropertyValue('--vb-disc-font-size') !== nextFontValue) {
      root.style.setProperty('--vb-disc-font-size', nextFontValue)
    }
  }

  function attachScaleObserver() {
    if (resizeObserver || typeof ResizeObserver === 'undefined') return
    resizeObserver = new ResizeObserver(() => {
      refreshScale()
    })
    resizeObserver.observe(shell)
  }

  function disconnectScaleObserver() {
    resizeObserver?.disconnect()
    resizeObserver = null
  }

  function stopFlips() {
    for (let i = 0; i < activeFlipIndices.length; i++) {
      const index = activeFlipIndices[i]
      const disc = discNodes[index]
      if (disc?.dataset.flipping === 'true') disc.dataset.flipping = 'false'
      flipDeadlines[index] = 0
    }
    activeFlipIndices = []
  }

  function cancelLoop() {
    if (animationFrame !== 0) {
      cancelAnimationFrame(animationFrame)
      animationFrame = 0
    }
  }

  function stopAnimation() {
    cancelLoop()
    stopFlips()
  }

  function patchIndex(index, revealed) {
    patchDisc(
      discNodes[index],
      glyphPathNodes[index],
      glyphSvgNodes[index],
      glyphFallbackNodes[index],
      flatCodes[index],
      revealed,
      appliedSignatures,
      index,
    )
  }

  function patchAll(revealed) {
    for (let index = 0; index < CELL_COUNT; index++) {
      const isRevealed = revealed === true ? true : revealed === false ? false : revealMask[index] === 1
      patchIndex(index, isRevealed)
    }
  }

  function markFlipping(index, now) {
    const disc = discNodes[index]
    if (!disc) return
    disc.dataset.flipping = 'true'
    flipDeadlines[index] = now + FLIP_RESET_MS
    activeFlipIndices.push(index)
  }

  function settleExpiredFlips(now) {
    if (activeFlipIndices.length === 0) return
    const remaining = []
    for (let i = 0; i < activeFlipIndices.length; i++) {
      const index = activeFlipIndices[i]
      if (flipDeadlines[index] > now) {
        remaining.push(index)
        continue
      }
      const disc = discNodes[index]
      if (disc?.dataset.flipping === 'true') disc.dataset.flipping = 'false'
      flipDeadlines[index] = 0
    }
    activeFlipIndices = remaining
  }

  function paintPrefill() {
    stopAnimation()
    root.dataset.busy = 'true'
    revealMask.fill(0)
    patchAll(false)
    updateStatus('Prefill skeleton: exact future footprint')
  }

  function paintReady() {
    stopAnimation()
    root.dataset.busy = 'false'
    revealMask.fill(1)
    patchAll(true)
    updateStatus('Settled render: full matrix live')
  }

  function replay() {
    paintPrefill()
    if (reduceMotion()) {
      paintReady()
      return
    }

    const startAt = performance.now() + PREFILL_HOLD_MS
    let revealedCount = 0
    let startedStreaming = false

    const tick = (now) => {
      if (now >= startAt) {
        if (!startedStreaming) {
          startedStreaming = true
          updateStatus('Streaming render: border first, then content')
        }

        const targetCount = Math.min(
          streamOrder.length,
          Math.floor((now - startAt) / STREAM_INTERVAL_MS) + 1,
        )

        while (revealedCount < targetCount) {
          const index = streamOrder[revealedCount]
          revealMask[index] = 1
          patchIndex(index, true)
          markFlipping(index, now)
          revealedCount++
        }
      }

      settleExpiredFlips(now)

      if (revealedCount < streamOrder.length || activeFlipIndices.length > 0) {
        animationFrame = requestAnimationFrame(tick)
        return
      }

      animationFrame = 0
      root.dataset.busy = 'false'
      updateStatus('Live render complete')
    }

    animationFrame = requestAnimationFrame(tick)
  }

  function setMatrix(nextMatrix) {
    if (!isValidMatrix(nextMatrix)) return
    liveMatrix = cloneMatrix(nextMatrix)
    flatCodes = flattenMatrix(liveMatrix)
    streamOrder = createStreamOrder(flatCodes)
    revealMask.fill(0)
    appliedSignatures.fill(-1)
    replay()
  }

  root.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-action')
      if (action === 'prefill') paintPrefill()
      else if (action === 'settle') paintReady()
      else replay()
    })
  })

  patchAll(false)
  if (autoPlay) replay()
  else paintReady()

  return {
    element: root,
    boardProduct: product,
    replay,
    paintPrefill,
    paintReady,
    refreshScale,
    attachScaleObserver,
    disconnectScaleObserver,
    setMatrix,
  }
}

export function mountVestaboardRenderer(target, options = {}) {
  const renderer = createVestaboardRenderer(options)
  target.replaceChildren(renderer.element)
  renderer.attachScaleObserver()
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      renderer.refreshScale()
    })
  } else {
    renderer.refreshScale()
  }
  return renderer
}

export function mountVestaboardSlots(root = document) {
  root.querySelectorAll('[data-component="vestaboard-demo"]').forEach((slot) => {
    const preset = slot.getAttribute('data-preset') ?? 'reopening'
    mountVestaboardRenderer(slot, {
      matrix: MATRIX_PRESETS[preset] ?? MATRIX_PRESETS.reopening,
      title: slot.getAttribute('data-title') ?? 'Vestaboard render module',
      subtitle:
        slot.getAttribute('data-subtitle') ??
        'Same-shape prefill first, then a border-first live flip stream.',
      presentation: 'demo',
      boardProduct: slot.getAttribute('data-board-product') ?? 'flagship',
      autoPlay: true,
    })
  })
}

export function mountVestaboardShowcaseSlots(root = document) {
  root.querySelectorAll('[data-component="vestaboard-showcase"]').forEach((slot) => {
    ensureVestaboardStyles(slot.ownerDocument ?? document)

    const initialKey = slot.getAttribute('data-initial-showcase') ?? 'letters'
    const boardProduct = slot.getAttribute('data-board-product') ?? 'flagship'
    const showcase = slot.ownerDocument.createElement('section')
    showcase.className = 'vb-showcase'

    const actions = slot.ownerDocument.createElement('div')
    actions.className = 'vb-showcase-actions'
    const renderSurface = slot.ownerDocument.createElement('div')
    renderSurface.className = 'vb-showcase-render'

    const renderer = mountVestaboardRenderer(renderSurface, {
      matrix: MATRIX_SHOWCASE_PRESETS[initialKey]?.matrix ?? MATRIX_SHOWCASE_PRESETS.letters.matrix,
      title: 'Vestaboard character study',
      subtitle:
        'Click a code family and the board will prefill, flip, and settle so you can inspect the forms.',
      kicker: 'Glyph lab',
      presentation: 'demo',
      boardProduct,
      showToolbar: false,
      autoPlay: true,
      statusText: 'Character study live',
    })

    function setActive(nextKey) {
      Object.values(MATRIX_SHOWCASE_PRESETS).forEach((entry) => {
        const button = actions.querySelector(`[data-showcase-key="${entry.key}"]`)
        if (!button) return
        button.dataset.showcaseActive = entry.key === nextKey ? 'true' : 'false'
      })
    }

    Object.values(MATRIX_SHOWCASE_PRESETS).forEach((entry, index) => {
      const button = createButton({
        label: entry.label,
        variant: index === 0 ? 'primary' : 'secondary',
      })
      button.dataset.showcaseKey = entry.key
      button.dataset.showcaseActive = entry.key === initialKey ? 'true' : 'false'
      button.addEventListener('click', () => {
        setActive(entry.key)
        renderer.setMatrix(entry.matrix)
      })
      actions.append(button)
    })

    showcase.append(actions, renderSurface)
    slot.replaceChildren(showcase)
  })
}
