export const BUTTON_SPECS = Object.freeze({
  primary: {
    label: 'Primary',
    description: 'Commit action with the strongest visual priority.',
  },
  secondary: {
    label: 'Secondary',
    description: 'Support action with clear but quieter emphasis.',
  },
  ghost: {
    label: 'Ghost',
    description: 'Low-emphasis action for secondary exploration.',
  },
  danger: {
    label: 'Danger',
    description: 'Destructive action that stays contained.',
  },
})

const BUTTON_STYLE_ID = 'matrix-ds-buttons'

function ensureButtonStyles(doc = document) {
  if (doc.getElementById(BUTTON_STYLE_ID)) return
  const style = doc.createElement('style')
  style.id = BUTTON_STYLE_ID
  style.textContent = `
    .button[data-ui-button] {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      appearance: none;
      border: 1px solid transparent;
      border-radius: var(--radius-control);
      padding: 14px 18px;
      min-height: 48px;
      font: inherit;
      font-weight: 800;
      letter-spacing: -0.01em;
      transition:
        transform var(--speed-fast) var(--ease-standard),
        border-color var(--speed-base) var(--ease-standard),
        box-shadow var(--speed-base) var(--ease-standard),
        background var(--speed-base) var(--ease-standard),
        color var(--speed-base) var(--ease-standard);
    }

    .button[data-ui-button]::before {
      content: "";
      position: absolute;
      inset: 1px;
      border-radius: calc(var(--radius-control) - 1px);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.11), transparent 42%);
      opacity: 0.9;
      pointer-events: none;
      z-index: -1;
    }

    .button[data-ui-button]::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: -32%;
      width: 32%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
      transform: skewX(-18deg);
      opacity: 0;
      transition:
        left var(--speed-slow) var(--ease-standard),
        opacity var(--speed-base) var(--ease-standard);
      pointer-events: none;
      z-index: 0;
    }

    .button[data-ui-button] > span {
      position: relative;
      z-index: 1;
    }

    .button[data-ui-button]:hover {
      transform: translateY(-1px);
    }

    .button[data-ui-button]:hover::after,
    .button[data-ui-button]:focus-visible::after {
      left: 116%;
      opacity: 1;
    }

    .button[data-ui-button]:focus-visible {
      outline: none;
      box-shadow: 0 0 0 4px rgba(90, 120, 255, 0.16);
    }

    .button[data-ui-button="primary"] {
      color: var(--button-primary-ink);
      background: linear-gradient(180deg, var(--button-primary-from), var(--button-primary-to));
      box-shadow: 0 14px 28px var(--button-primary-shadow);
    }

    .button[data-ui-button="secondary"] {
      color: var(--text-strong);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
        rgba(255, 255, 255, 0.03);
      border-color: var(--line-medium);
      box-shadow: var(--shadow-inset);
    }

    .button[data-ui-button="ghost"] {
      color: var(--text-body);
      background: transparent;
      border-color: rgba(255, 255, 255, 0.02);
    }

    .button[data-ui-button="ghost"]::before {
      opacity: 0.3;
    }

    .button[data-ui-button="danger"] {
      color: #fff0ed;
      background:
        linear-gradient(180deg, rgba(221, 114, 101, 0.2), rgba(213, 97, 86, 0.12)),
        rgba(213, 97, 86, 0.08);
      border-color: rgba(213, 97, 86, 0.34);
    }
  `
  doc.head.append(style)
}

function inferVariant(button) {
  if (button.dataset.uiButton) return button.dataset.uiButton
  if (button.classList.contains('primary')) return 'primary'
  if (button.classList.contains('danger')) return 'danger'
  if (button.classList.contains('ghost')) return 'ghost'
  return 'secondary'
}

export function createButton({ label, variant = 'secondary', attrs = {} }, doc = document) {
  ensureButtonStyles(doc)
  const button = doc.createElement('button')
  button.type = 'button'
  button.className = 'button'
  button.dataset.uiButton = variant
  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) button.setAttribute(key, String(value))
  })
  button.innerHTML = `<span>${label}</span>`
  return button
}

export function hydrateButtons(root = document) {
  ensureButtonStyles(root.ownerDocument ?? document)
  root.querySelectorAll('button.button, button[data-ui-button]').forEach((button) => {
    const variant = inferVariant(button)
    button.dataset.uiButton = variant
    if (!button.querySelector('span')) {
      const label = button.textContent ?? ''
      button.textContent = ''
      const span = (root.ownerDocument ?? document).createElement('span')
      span.textContent = label.trim()
      button.append(span)
    }
  })
}
