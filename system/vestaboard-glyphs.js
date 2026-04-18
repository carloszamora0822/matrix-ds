const GLYPH_COLS = 7
const GLYPH_ROWS = 8
const CELL_SIZE = 10
const GLYPH_INSET_X = 0.6
const GLYPH_INSET_Y = 0.58
const GLYPH_VIEWBOX_WIDTH = GLYPH_COLS * CELL_SIZE
const GLYPH_VIEWBOX_HEIGHT = GLYPH_ROWS * CELL_SIZE
const DEFAULT_EDGE_METRIC = Object.freeze({ left: 0.14, right: 0.14 })

function defineGlyph(rows) {
  return rows.map((row) => row.replace(/[^01]/g, '0').padEnd(GLYPH_COLS, '0').slice(0, GLYPH_COLS))
}

const GLYPH_BITMAPS = Object.freeze({
  A: defineGlyph([
    '0011100',
    '0100010',
    '1000001',
    '1111111',
    '1000001',
    '1000001',
    '1000001',
    '0000000',
  ]),
  B: defineGlyph([
    '1111100',
    '1000010',
    '1000010',
    '1111100',
    '1000010',
    '1000010',
    '1111100',
    '0000000',
  ]),
  C: defineGlyph([
    '0011110',
    '0100001',
    '1000000',
    '1000000',
    '1000000',
    '0100001',
    '0011110',
    '0000000',
  ]),
  D: defineGlyph([
    '1111100',
    '1000010',
    '1000001',
    '1000001',
    '1000001',
    '1000010',
    '1111100',
    '0000000',
  ]),
  E: defineGlyph([
    '1111111',
    '1000000',
    '1000000',
    '1111100',
    '1000000',
    '1000000',
    '1111111',
    '0000000',
  ]),
  F: defineGlyph([
    '1111111',
    '1000000',
    '1000000',
    '1111100',
    '1000000',
    '1000000',
    '1000000',
    '0000000',
  ]),
  G: defineGlyph([
    '0011110',
    '0100001',
    '1000000',
    '1001111',
    '1000001',
    '0100001',
    '0011110',
    '0000000',
  ]),
  H: defineGlyph([
    '1000001',
    '1000001',
    '1000001',
    '1111111',
    '1000001',
    '1000001',
    '1000001',
    '0000000',
  ]),
  I: defineGlyph([
    '0111110',
    '0001000',
    '0001000',
    '0001000',
    '0001000',
    '0001000',
    '0111110',
    '0000000',
  ]),
  J: defineGlyph([
    '0001111',
    '0000010',
    '0000010',
    '0000010',
    '0000010',
    '1000010',
    '0111100',
    '0000000',
  ]),
  K: defineGlyph([
    '1000001',
    '1000010',
    '1000100',
    '1111000',
    '1000100',
    '1000010',
    '1000001',
    '0000000',
  ]),
  L: defineGlyph([
    '1000000',
    '1000000',
    '1000000',
    '1000000',
    '1000000',
    '1000000',
    '1111111',
    '0000000',
  ]),
  M: defineGlyph([
    '1000001',
    '1100011',
    '1010101',
    '1001001',
    '1000001',
    '1000001',
    '1000001',
    '0000000',
  ]),
  N: defineGlyph([
    '1000001',
    '1100001',
    '1010001',
    '1001001',
    '1000101',
    '1000011',
    '1000001',
    '0000000',
  ]),
  O: defineGlyph([
    '0011100',
    '0100010',
    '1000001',
    '1000001',
    '1000001',
    '0100010',
    '0011100',
    '0000000',
  ]),
  P: defineGlyph([
    '1111100',
    '1000010',
    '1000001',
    '1111110',
    '1000000',
    '1000000',
    '1000000',
    '0000000',
  ]),
  Q: defineGlyph([
    '0011100',
    '0100010',
    '1000001',
    '1000001',
    '1001001',
    '0100010',
    '0011101',
    '0000000',
  ]),
  R: defineGlyph([
    '1111100',
    '1000010',
    '1000001',
    '1111110',
    '1000100',
    '1000010',
    '1000001',
    '0000000',
  ]),
  S: defineGlyph([
    '0111110',
    '1000001',
    '1000000',
    '0111110',
    '0000001',
    '1000001',
    '0111110',
    '0000000',
  ]),
  T: defineGlyph([
    '1111111',
    '0001000',
    '0001000',
    '0001000',
    '0001000',
    '0001000',
    '0001000',
    '0000000',
  ]),
  U: defineGlyph([
    '1000001',
    '1000001',
    '1000001',
    '1000001',
    '1000001',
    '0100010',
    '0011100',
    '0000000',
  ]),
  V: defineGlyph([
    '1000001',
    '1000001',
    '1000001',
    '1000001',
    '0100010',
    '0010100',
    '0001000',
    '0000000',
  ]),
  W: defineGlyph([
    '1000001',
    '1000001',
    '1000001',
    '1001001',
    '1001001',
    '1010101',
    '0100010',
    '0000000',
  ]),
  X: defineGlyph([
    '1000001',
    '0100010',
    '0010100',
    '0001000',
    '0010100',
    '0100010',
    '1000001',
    '0000000',
  ]),
  Y: defineGlyph([
    '1000001',
    '0100010',
    '0010100',
    '0001000',
    '0001000',
    '0001000',
    '0001000',
    '0000000',
  ]),
  Z: defineGlyph([
    '1111111',
    '0000010',
    '0000100',
    '0001000',
    '0010000',
    '0100000',
    '1111111',
    '0000000',
  ]),
  0: defineGlyph([
    '0011100',
    '0100010',
    '1000011',
    '1001001',
    '1010001',
    '0100010',
    '0011100',
    '0000000',
  ]),
  1: defineGlyph([
    '0001000',
    '0011000',
    '0101000',
    '0001000',
    '0001000',
    '0001000',
    '0111110',
    '0000000',
  ]),
  2: defineGlyph([
    '0011110',
    '0100001',
    '0000001',
    '0000110',
    '0011000',
    '0100000',
    '1111111',
    '0000000',
  ]),
  3: defineGlyph([
    '0111110',
    '1000001',
    '0000001',
    '0001110',
    '0000001',
    '1000001',
    '0111110',
    '0000000',
  ]),
  4: defineGlyph([
    '0000110',
    '0001010',
    '0010010',
    '0100010',
    '1111111',
    '0000010',
    '0000010',
    '0000000',
  ]),
  5: defineGlyph([
    '1111111',
    '1000000',
    '1111110',
    '0000001',
    '0000001',
    '1000001',
    '0111110',
    '0000000',
  ]),
  6: defineGlyph([
    '0011110',
    '0100000',
    '1000000',
    '1111110',
    '1000001',
    '0100001',
    '0011110',
    '0000000',
  ]),
  7: defineGlyph([
    '1111111',
    '0000001',
    '0000010',
    '0000100',
    '0001000',
    '0010000',
    '0010000',
    '0000000',
  ]),
  8: defineGlyph([
    '0011110',
    '0100001',
    '0100001',
    '0011110',
    '0100001',
    '0100001',
    '0011110',
    '0000000',
  ]),
  9: defineGlyph([
    '0011110',
    '0100001',
    '1000001',
    '0111111',
    '0000001',
    '0000010',
    '0111100',
    '0000000',
  ]),
  '!': defineGlyph([
    '0001000',
    '0001000',
    '0001000',
    '0001000',
    '0001000',
    '0000000',
    '0001000',
    '0000000',
  ]),
  '"': defineGlyph([
    '0101010',
    '0101010',
    '0010100',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
  ]),
  '%': defineGlyph([
    '1100001',
    '1100010',
    '0000100',
    '0001000',
    '0010000',
    '0100011',
    '1000011',
    '0000000',
  ]),
  '&': defineGlyph([
    '0011000',
    '0100100',
    '0010000',
    '0110100',
    '1001000',
    '1001010',
    '0110101',
    '0000000',
  ]),
  "'": defineGlyph([
    '0001000',
    '0001000',
    '0010000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
  ]),
  '(': defineGlyph([
    '0000110',
    '0001000',
    '0010000',
    '0010000',
    '0010000',
    '0001000',
    '0000110',
    '0000000',
  ]),
  ')': defineGlyph([
    '0110000',
    '0001000',
    '0000100',
    '0000100',
    '0000100',
    '0001000',
    '0110000',
    '0000000',
  ]),
  '+': defineGlyph([
    '0000000',
    '0001000',
    '0001000',
    '1111111',
    '0001000',
    '0001000',
    '0000000',
    '0000000',
  ]),
  ',': defineGlyph([
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0001000',
    '0001000',
    '0010000',
  ]),
  '-': defineGlyph([
    '0000000',
    '0000000',
    '0000000',
    '1111111',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
  ]),
  '.': defineGlyph([
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
    '0001000',
    '0001000',
  ]),
  '/': defineGlyph([
    '0000001',
    '0000010',
    '0000100',
    '0001000',
    '0010000',
    '0100000',
    '1000000',
    '0000000',
  ]),
  ':': defineGlyph([
    '0000000',
    '0001000',
    '0001000',
    '0000000',
    '0000000',
    '0001000',
    '0001000',
    '0000000',
  ]),
  ';': defineGlyph([
    '0000000',
    '0001000',
    '0001000',
    '0000000',
    '0000000',
    '0001000',
    '0001000',
    '0010000',
  ]),
  '?': defineGlyph([
    '0011110',
    '0100001',
    '0000001',
    '0000110',
    '0001000',
    '0000000',
    '0001000',
    '0000000',
  ]),
  '@': defineGlyph([
    '0011110',
    '0100001',
    '1001111',
    '1010101',
    '1011101',
    '1000000',
    '0111110',
    '0000000',
  ]),
  '#': defineGlyph([
    '0101010',
    '1111111',
    '0101010',
    '0101010',
    '1111111',
    '0101010',
    '0101010',
    '0000000',
  ]),
  '$': defineGlyph([
    '0001000',
    '0111110',
    '1001000',
    '0111110',
    '0001001',
    '0111110',
    '0001000',
    '0000000',
  ]),
  '=': defineGlyph([
    '0000000',
    '1111111',
    '0000000',
    '0000000',
    '1111111',
    '0000000',
    '0000000',
    '0000000',
  ]),
  '°': defineGlyph([
    '0011000',
    '0100100',
    '0100100',
    '0011000',
    '0000000',
    '0000000',
    '0000000',
    '0000000',
  ]),
})

function rectPath(x, y, width, height) {
  const x2 = x + width
  const y2 = y + height
  return `M${x} ${y}H${x2}V${y2}H${x}Z`
}

function bitmapToPath(rows) {
  let path = ''

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex]
    let runStart = -1

    for (let colIndex = 0; colIndex <= row.length; colIndex++) {
      const isFilled = colIndex < row.length && row[colIndex] === '1'
      if (isFilled && runStart === -1) {
        runStart = colIndex
        continue
      }
      if (isFilled || runStart === -1) continue

      const x = runStart * CELL_SIZE + GLYPH_INSET_X
      const y = rowIndex * CELL_SIZE + GLYPH_INSET_Y
      const width = (colIndex - runStart) * CELL_SIZE - GLYPH_INSET_X * 2
      const height = CELL_SIZE - GLYPH_INSET_Y * 2
      path += rectPath(x, y, width, height)
      runStart = -1
    }
  }

  return path
}

function computeEdgeMetric(rows) {
  let first = GLYPH_COLS
  let last = -1

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex]
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      if (row[colIndex] !== '1') continue
      first = Math.min(first, colIndex)
      last = Math.max(last, colIndex)
    }
  }

  if (last === -1) return DEFAULT_EDGE_METRIC
  return Object.freeze({
    left: first / GLYPH_COLS,
    right: (GLYPH_COLS - 1 - last) / GLYPH_COLS,
  })
}

export const BOARD_GLYPH_VIEWBOX = `0 0 ${GLYPH_VIEWBOX_WIDTH} ${GLYPH_VIEWBOX_HEIGHT}`

export const BOARD_GLYPH_PATHS = Object.freeze(
  Object.fromEntries(
    Object.entries(GLYPH_BITMAPS).map(([char, rows]) => [char, bitmapToPath(rows)]),
  ),
)

const BOARD_GLYPH_EDGE_METRICS = Object.freeze(
  Object.fromEntries(
    Object.entries(GLYPH_BITMAPS).map(([char, rows]) => [char, computeEdgeMetric(rows)]),
  ),
)

export function getBoardGlyphPath(char) {
  return BOARD_GLYPH_PATHS[char] ?? ''
}

export function getBoardGlyphEdgeMetric(char) {
  return BOARD_GLYPH_EDGE_METRICS[char] ?? DEFAULT_EDGE_METRIC
}

export function getOpticalCenteredStart(chars, {
  contentStart = 2,
  contentCols = 18,
} = {}) {
  if (chars.length === 0) return contentStart + Math.floor(contentCols / 2)
  const first = getBoardGlyphEdgeMetric(chars[0])
  const last = getBoardGlyphEdgeMetric(chars[chars.length - 1])
  const visualWidth = Math.max(1, chars.length - first.left - last.right)
  const centeredStart = contentStart + (contentCols - visualWidth) / 2 - first.left
  return Math.round(centeredStart)
}
