const BASE_THEME_VARS = Object.freeze({
  '--font-display':
    '"Instrument Serif", "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
  '--font-sans':
    '"Manrope", "Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
  '--font-mono':
    '"IBM Plex Mono", "SFMono-Regular", "SF Mono", Consolas, "Liberation Mono", monospace',
  '--radius-card': '28px',
  '--radius-panel': '22px',
  '--radius-control': '16px',
  '--radius-pill': '999px',
  '--space-1': '4px',
  '--space-2': '8px',
  '--space-3': '12px',
  '--space-4': '16px',
  '--space-5': '20px',
  '--space-6': '24px',
  '--space-7': '32px',
  '--space-8': '40px',
  '--space-9': '56px',
  '--space-10': '72px',
  '--text-xs': '12px',
  '--text-sm': '14px',
  '--text-md': '16px',
  '--text-lg': '18px',
  '--text-xl': '24px',
  '--text-2xl': '34px',
  '--text-3xl': '52px',
  '--leading-tight': '1.05',
  '--leading-snug': '1.2',
  '--leading-normal': '1.5',
  '--ease-standard': 'cubic-bezier(0.22, 1, 0.36, 1)',
  '--speed-fast': '140ms',
  '--speed-base': '220ms',
  '--speed-slow': '520ms',
  '--shadow-1': '0 18px 40px rgba(0, 0, 0, 0.22)',
  '--shadow-2': '0 24px 72px rgba(0, 0, 0, 0.34)',
  '--shadow-inset': 'inset 0 1px 0 rgba(255, 255, 255, 0.03)',
  '--board-shell': '#1f1f1d',
  '--board-rim': '#2d2d29',
  '--board-face': '#080808',
  '--board-grid-line': 'rgba(255, 248, 231, 0.03)',
  '--board-cell-shell': '#101010',
  '--board-cell-edge': 'rgba(255, 255, 255, 0.018)',
  '--board-disc-empty': '#050505',
  '--board-disc-ghost': '#151515',
  '--board-disc-text': '#0b0b0b',
  '--board-disc-shadow': 'rgba(0, 0, 0, 0.35)',
  '--board-sheen': 'rgba(255, 255, 255, 0.09)',
  '--swoosh-strong': 'rgba(255, 255, 255, 0.03)',
  '--swoosh-soft': 'rgba(255, 255, 255, 0.015)',
  '--board-glyph': '#fffdf7',
  '--board-seam': 'rgba(255, 255, 255, 0.075)',
  '--line-soft': 'rgba(244, 234, 211, 0.08)',
  '--line-medium': 'rgba(244, 234, 211, 0.16)',
  '--line-strong': 'rgba(25, 31, 26, 0.12)',
})

export const MATRIX_THEMES = Object.freeze({
  editorialControlRoom: {
    key: 'editorial-control-room',
    label: 'Editorial Control Room',
    description: 'Warm dark shell, paper inserts, ember signals, restrained serif.',
    cssVars: {
      ...BASE_THEME_VARS,
      '--bg-app': '#0e110e',
      '--bg-shell': '#131813',
      '--bg-panel': '#1b211b',
      '--bg-panel-2': '#202821',
      '--bg-panel-3': '#252f27',
      '--bg-paper': '#f2ead7',
      '--bg-paper-2': '#e5dbc1',
      '--text-strong': '#f7efd9',
      '--text-body': '#ddd3bb',
      '--text-muted': '#a89f8d',
      '--text-dark': '#241f16',
      '--text-dark-muted': '#655b48',
      '--accent-ember': '#ff6a2a',
      '--accent-ember-strong': '#ff4d00',
      '--accent-cobalt': '#5a78ff',
      '--accent-citron': '#c7d654',
      '--accent-sand': '#d6b970',
      '--accent-danger': '#d56156',
      '--accent-success': '#6eb081',
      '--button-primary-ink': '#180f0a',
      '--button-primary-from': '#ff8b55',
      '--button-primary-to': '#ff6a2a',
      '--button-primary-shadow': 'rgba(255, 106, 42, 0.2)',
    },
  },
  signalAtelier: {
    key: 'signal-atelier',
    label: 'Signal Atelier',
    description: 'Cooler steel shell, sharper cobalt motion, clearer instrument feel.',
    cssVars: {
      ...BASE_THEME_VARS,
      '--bg-app': '#0d1016',
      '--bg-shell': '#121824',
      '--bg-panel': '#182030',
      '--bg-panel-2': '#1d2940',
      '--bg-panel-3': '#253251',
      '--bg-paper': '#e9e5dd',
      '--bg-paper-2': '#dad5ca',
      '--text-strong': '#edf2ff',
      '--text-body': '#ced7ed',
      '--text-muted': '#8f9bb7',
      '--text-dark': '#1f2430',
      '--text-dark-muted': '#5d6679',
      '--accent-ember': '#ff7b43',
      '--accent-ember-strong': '#f55419',
      '--accent-cobalt': '#6c8cff',
      '--accent-citron': '#b8d95c',
      '--accent-sand': '#d8c493',
      '--accent-danger': '#dc6d66',
      '--accent-success': '#74bb98',
      '--button-primary-ink': '#11131a',
      '--button-primary-from': '#83a1ff',
      '--button-primary-to': '#5a78ff',
      '--button-primary-shadow': 'rgba(90, 120, 255, 0.24)',
      '--board-shell': '#1d1f22',
      '--board-rim': '#2b2f35',
      '--board-face': '#080808',
      '--board-cell-shell': '#101113',
    },
  },
  amberBroadcast: {
    key: 'amber-broadcast',
    label: 'Amber Broadcast',
    description: 'Warmer brass shell, broadcast-like contrast, richer highlights.',
    cssVars: {
      ...BASE_THEME_VARS,
      '--bg-app': '#15110d',
      '--bg-shell': '#1b1511',
      '--bg-panel': '#261d18',
      '--bg-panel-2': '#30241d',
      '--bg-panel-3': '#3a2d24',
      '--bg-paper': '#f0e2ca',
      '--bg-paper-2': '#e2d0b2',
      '--text-strong': '#fff1dd',
      '--text-body': '#e5cfb7',
      '--text-muted': '#b3977f',
      '--text-dark': '#281d14',
      '--text-dark-muted': '#6f5644',
      '--accent-ember': '#ff7a30',
      '--accent-ember-strong': '#ff5f12',
      '--accent-cobalt': '#6484ff',
      '--accent-citron': '#d4cf67',
      '--accent-sand': '#e0b56c',
      '--accent-danger': '#dd7265',
      '--accent-success': '#82b374',
      '--button-primary-ink': '#1f1209',
      '--button-primary-from': '#ff9a58',
      '--button-primary-to': '#ff6b1f',
      '--button-primary-shadow': 'rgba(255, 122, 48, 0.24)',
      '--board-shell': '#2a221a',
      '--board-rim': '#3d3124',
      '--board-face': '#080808',
      '--board-cell-shell': '#100e0d',
    },
  },
})

const THEME_STYLE_ID = 'matrix-ds-theme-vars'

function getThemeStyleTag(doc) {
  let tag = doc.getElementById(THEME_STYLE_ID)
  if (!tag) {
    tag = doc.createElement('style')
    tag.id = THEME_STYLE_ID
    doc.head.append(tag)
  }
  return tag
}

export function getTheme(themeKey = 'editorialControlRoom') {
  return MATRIX_THEMES[themeKey] ?? MATRIX_THEMES.editorialControlRoom
}

export function applyTheme(themeKey = 'editorialControlRoom', doc = document) {
  const theme = getTheme(themeKey)
  const tag = getThemeStyleTag(doc)
  const vars = Object.entries(theme.cssVars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')
  tag.textContent = `:root {\n${vars}\n}`
  doc.documentElement.dataset.matrixTheme = theme.key
  return theme
}

export function attachThemeSwitches(root = document, onChange) {
  root.querySelectorAll('[data-theme-switch]').forEach((button) => {
    button.addEventListener('click', () => {
      const themeKey = button.getAttribute('data-theme-switch') ?? 'editorialControlRoom'
      const theme = applyTheme(themeKey, root.ownerDocument ?? document)
      if (typeof onChange === 'function') onChange(theme)
    })
  })
}
