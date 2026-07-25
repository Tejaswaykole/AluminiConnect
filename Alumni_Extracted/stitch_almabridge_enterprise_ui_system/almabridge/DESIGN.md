---
name: AlmaBridge
colors:
  surface: '#f9faf7'
  surface-dim: '#d9dad8'
  surface-bright: '#f9faf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f1'
  surface-container: '#edeeec'
  surface-container-high: '#e7e8e6'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#404945'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#f0f1ee'
  outline: '#717975'
  outline-variant: '#c0c8c4'
  surface-tint: '#396759'
  primary: '#154539'
  on-primary: '#ffffff'
  primary-container: '#2f5d50'
  on-primary-container: '#a3d4c3'
  inverse-primary: '#a0d1c0'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#5d322a'
  on-tertiary: '#ffffff'
  tertiary-container: '#784840'
  on-tertiary-container: '#fbbaaf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bceddc'
  primary-fixed-dim: '#a0d1c0'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#204f42'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#f7b7ac'
  on-tertiary-fixed: '#33110b'
  on-tertiary-fixed-variant: '#683a33'
  background: '#f9faf7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h4:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  h1-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  container-max: 1280px
  sidebar-width: 260px
---

## Brand & Style
The design system is engineered for a high-utility, enterprise-grade AI environment. The brand personality is **sophisticated, authoritative, and precise**, mirroring the efficiency of modern developer tools while maintaining the warmth required for human networking. 

The aesthetic follows a **Modern Minimalist** movement, heavily influenced by the "utility-first" visual language of high-end SaaS platforms. It prioritizes clarity over decoration, using generous whitespace, crisp geometric alignment, and a strict adherence to a flat UI model. The emotional response should be one of "effortless intelligence"—where the UI recedes to let data and AI insights take center stage.

## Colors
The palette is rooted in a "Warm Industrial" spectrum. The background uses a slightly off-white stone tint to reduce eye strain during long-form data analysis. 

- **Primary:** Deep Forest Green serves as the anchor, used for high-importance actions and active states.
- **Neutrals:** A tight range of grays manages the information hierarchy. Primary text is a soft black (#222222) to avoid the harshness of pure black while maintaining maximum contrast.
- **Semantic Accents:** Success, Warning, and Error colors are desaturated and "muted" to ensure they integrate seamlessly into the professional environment without feeling loud or alarming.

## Typography
This design system utilizes **Inter** exclusively to leverage its exceptional legibility and systematic feel. 

- **Headings:** Use SemiBold (600) weight with slight negative letter-spacing for a dense, high-end editorial feel.
- **Body:** Use Regular (400) for standard reading. The 16px base ensures accessibility, while the 14px size is the workhorse for dense UI data.
- **Micro-copy:** Labels and captions (13px/12px) use Medium (500) weight to maintain clarity at smaller scales.

## Layout & Spacing
The system follows a strict **8px linear grid**. All dimensions, padding, and margins must be multiples of 8 (or 4 for micro-adjustments).

- **Grid Model:** A 12-column fixed-width grid is used for primary content areas on desktop, centered within the viewport. 
- **Sidebar:** A fixed 260px sidebar persists on the left for navigation, utilizing a "Surface-to-Background" contrast rather than heavy borders.
- **Adaptivity:** 
    - **Desktop (>1024px):** 12 columns, 24px gutters, 40px outer margins.
    - **Tablet (768px - 1023px):** 8 columns, 16px gutters, 24px margins. Sidebar collapses to an icon-only rail or drawer.
    - **Mobile (<767px):** 4 columns, 16px gutters, 16px margins. Headlines scale down as defined in the typography tokens.

## Elevation & Depth
This design system rejects heavy drop shadows in favor of **Tonal Layering** and **Structural Borders**. 

- **Level 0 (Background):** #F8F8F7. Used for the main canvas.
- **Level 1 (Surface):** #FFFFFF. Used for cards, tables, and the primary sidebar. Separation is achieved via a 1px solid border (#E4E4E4).
- **Level 2 (Overlays):** Modals and dropdowns use a very subtle, highly diffused "Ambient Shadow" (0px 4px 20px rgba(0,0,0,0.04)) to provide just enough lift to signify priority without breaking the flat aesthetic.
- **Interactive States:** On hover, interactive surfaces may transition to a slightly darker border or a 1px inner glow, but should never "rise" physically.

## Shapes
The shape language is **Soft (0.25rem)**. This provides a professional "precision-milled" look. 

- **Small elements:** Buttons, inputs, and chips use a 4px (0.25rem) radius.
- **Large elements:** Cards and containers use an 8px (0.5rem) radius to feel substantial but modern.
- **Exceptions:** Search bars and specific AI-action badges may use a "Pill" (999px) radius to differentiate them from standard form inputs.

## Components

### Buttons
- **Primary:** Solid #2F5D50 background, White text. No gradients. Subtle brightness shift on hover.
- **Secondary:** White background, 1px #E4E4E4 border, #222222 text.
- **Ghost:** No border or background, #666666 text. Background appears as #F8F8F7 on hover.

### Form Inputs & Dropdowns
- Inputs feature a 1px #E4E4E4 border with a 12px horizontal padding.
- Focus state: Border color changes to #2F5D50 with a 1px solid ring.
- Dropdowns use a simple chevron-down icon; the menu inherits the "Level 2" elevation (subtle shadow).

### Sidebar & Top Navigation
- **Sidebar:** Uses #FFFFFF background with a right-hand border separating it from the content. Active items use a #F8F8F7 background and a 2px vertical "Forest Green" indicator on the left edge.
- **Top Nav:** Glass-like blur (10px) but keeping the background hex opaque to maintain the flat aesthetic.

### AI-Specific UI
- **AI Shimmer:** Used for loading states in AI generation—a subtle, slow-moving diagonal gradient of #F8F8F7 to #FFFFFF.
- **AI Branding:** Use a small spark icon next to AI-generated insights. AI-generated text containers use a very subtle #F0F4F3 background tint to differentiate from human data.

### Data Tables & Cards
- **Tables:** No vertical borders. 1px #E4E4E4 horizontal dividers only. Header row uses a #F8F8F7 background and Label-SM typography.
- **Stats Cards:** Minimalist. Large H2 weight for the metric, Label-SM for the title, and a small sparkline or percentage chip for trend data.

### Status Chips
- Small, uppercase, and Medium weight. 
- Backgrounds are tinted at 10% opacity of the semantic color (e.g., Success #5D8A7E at 10% BG with solid #5D8A7E text).