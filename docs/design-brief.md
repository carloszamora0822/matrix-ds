# Matrix Design Brief

## Design Thesis

Matrix should feel like an editorial control room.

Not a generic SaaS dashboard.
Not a crypto terminal.
Not a pastel AI playground.

The app is about craft and operational confidence: making a board look excellent, then trusting it to run on time. The UI should combine those two ideas:

- editorial restraint
- tactile control
- premium calm
- visible system state

## Visual Direction

### 1. Dark shell, warm paper inserts

The app frame should use warm dark surfaces, not flat black. Key moments should break that shell with paper-toned cards and artifact panels so the product feels designed, not merely themed.

Why:

- Dark chrome makes preview artifacts and board states feel stage-lit.
- Warm paper panels keep the product from feeling cold or developer-only.
- The contrast gives Matrix a recognizable silhouette.

### 2. Serif for identity, sans for operation

Display moments should use a high-contrast serif voice. Interface copy should use a sharp, modern sans. Instrument labels and small metadata can use mono selectively.

Why:

- Serif gives the product taste and memory.
- Sans keeps interaction clear and contemporary.
- Mono creates "control surface" energy without taking over the UI.

## Personality Constraints

- Premium, not luxury-for-luxury's-sake
- Confident, not loud
- Distinctive, not novelty-driven
- Designed, not "startup polished"

## Core UI Decisions

### Shape system

- Primary cards: large radii
- Controls: slightly tighter radii
- Use crisp strokes and inset definition before heavy shadows
- Panels should feel stacked and intentional

### Color strategy

Base:

- carbon shell
- moss-tinted dark panels
- warm ivory paper
- muted mineral text

Signal accents:

- ember for primary action
- cobalt for focused information
- citron for live/active states
- rust/red for destructive or failure states

No purple.
No neon gradients as the main identity.
No full grayscale minimalism.

### Typography strategy

- Large serif moments should be rare and deliberate
- Body and controls should feel dense, elegant, and highly readable
- Metadata should look operational without turning the product into a terminal

## Interaction Patterns To Establish Early

### Auth

The sign-in experience should feel premium and immediate. It is the first proof that Matrix is a product with taste, not a utility form.

Needed:

- split-layout or layered-auth composition
- one clear email action
- strong primary CTA
- calm supporting copy

### Chat

The chat surface is the product. It needs more than bubbles.

Needed:

- user and assistant message groups
- artifact previews inside conversation
- suggestion chips
- composer with strong submit affordance
- side preview panel

### Boards and schedules

Operational views should feel trustworthy at a glance.

Needed:

- board status cards
- schedule timeline / rail
- live-state emphasis
- system health and next-action affordances

## Build Order

### Phase A: Foundations

- color tokens
- type scale
- radii
- spacing system
- shadows and strokes
- button styles
- field styles

### Phase B: Surface primitives

- page shell
- panel
- section header
- status pill
- nav item
- action row

### Phase C: Domain modules

- auth card
- chat message
- artifact card
- board card
- schedule item
- preview canvas frame

### Phase D: Mock pages

- sign in
- chat workspace
- boards overview

## Repeatability Rules

When we convert this into production components, every component should be described by:

- `purpose`
- `slots`
- `variants`
- `states`
- `dos / do nots`

Example:

- `Button`
- purpose: initiate actions with clear visual hierarchy
- variants: primary, secondary, ghost, danger
- states: idle, hover, active, disabled, loading

That keeps the design system from becoming a pile of pretty screenshots.
