# Design System & Style Guide

> Master Pro-Level Portfolio Design Documentation

## Color Palette

### Primary Colors
```css
--accent-cyan: #00d4ff;        /* Bright, energetic cyan */
--accent-purple: #7c3aed;      /* Deep, sophisticated purple */
--accent-emerald: #10b981;     /* Success/positive green */
```

### Background & Surface
```css
--bg-primary: #0a0a0f;         /* Pure black background */
--bg-secondary: #12121a;       /* Slightly lighter backgrounds */
--bg-card: rgba(255,255,255,0.03);      /* Card surfaces */
--bg-glass: rgba(255,255,255,0.05);     /* Glass-morphism layers */
```

### Text Hierarchy
```css
--text-primary: #e4e4e7;       /* Headlines, primary text */
--text-secondary: #a1a1aa;     /* Body text, descriptions */
--text-muted: #71717a;         /* Secondary labels, hints */
```

### Accents & Effects
```css
--border-glass: rgba(255,255,255,0.08);
--gradient-main: linear-gradient(135deg, #00d4ff, #7c3aed);
--gradient-bg: linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%);
--glow-cyan: 0 0 20px rgba(0,212,255,0.15);
--glow-purple: 0 0 20px rgba(124,58,237,0.15);
```

## Typography

### Font Families
```css
--ff-main: 'Inter', system-ui, -apple-system, sans-serif;
--ff-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Scale
```
h1: clamp(2.5rem, 6vw, 4.5rem)     /* Responsive hero title */
h2: clamp(2rem, 5vw, 3.2rem)       /* Section headers */
h3: 1.2rem                         /* Card titles */
body: 1rem (16px)                  /* Base text */
small: 0.85rem                     /* Secondary text */
```

### Font Weights
```
--fw-300: Light       (headings, accents)
--fw-400: Regular     (body text)
--fw-500: Medium      (emphasis)
--fw-600: Semibold    (labels, CTAs)
--fw-700: Bold        (headings)
--fw-800: Extrabold   (hero, section titles)
--fw-900: Black       (eye-catching text)
```

## Spacing & Layout

### Unit System (8px base)
- `4px`  = basis (borders, small gaps)
- `8px`  = base spacing
- `12px` = tertiary
- `16px` = padding/margin
- `24px` = large gaps
- `32px` = section spacing
- `48px` = major section padding
- `64px` = section padding
- `120px` = full section padding

### Breakpoints
```css
Mobile:    < 480px
Tablet:    480px - 768px
Desktop:   768px - 1200px
Wide:      > 1200px
```

## Components

### Buttons

#### Primary Button (CTA)
```
Background:  Gradient (cyan → purple)
Color:       White
Padding:     14px 32px
Border:      None
Radius:      9999px (full)
Hover:       translateY(-2px), enhanced shadow
State:       Loading spinner, disabled opacity
```

#### Ghost Button (Secondary)
```
Background:  Transparent
Border:      1px solid, rgba(255,255,255,0.08)
Color:       Text primary
Hover:       Cyan border, cyan text, slight background
```

### Cards

#### Glass Card
```
Background:  rgba(255,255,255,0.05)
Border:      1px solid rgba(255,255,255,0.08)
Backdrop:    blur(12px)
Radius:      16px
Padding:     24-32px
Hover:       Border glow, box-shadow
```

### Form Elements

#### Input Field
```
Background:  rgba(255,255,255,0.03)
Border:      1.5px solid var(--border-glass)
Radius:      8px
Focus:       Cyan border, glow shadow
Invalid:     Red border with error state
```

#### Label
```
Position:    Floating (animated upward on focus)
Color:       Text secondary → cyan (on focus)
Animation:   0.3s cubic-bezier(.16,1,.3,1)
```

## Animations

### Easing Functions
```css
--transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0.33, 0.85, 0.4, 0.96);
--ease-in-out: cubic-bezier(0.16, 1, 0.3, 1);
```

### Key Animations
- **Reveal:** fadeIn + slideUp (80ms stagger)
- **Pulse:** opacity + glow (2s infinite)
- **Float:** translateY oscillation (6s)
- **Glow:** scale + opacity pulse (4s)
- **Scroll-down:** scaleY animation (2s)
- **Typing:** smooth character insertion (60ms)

### Motion Preferences
```css
@media(prefers-reduced-motion: reduce) {
  * { animation-duration: 0.3s !important; }
  transitions remain, but fast
}
```

## Accessibility

### Color Contrast
- **WCAG AA:** 4.5:1 minimum for normal text
- **WCAG AAA:** 7:1 for enhanced contrast
- Text on cyan: 12.5:1 ✓
- Text on purple: 8.3:1 ✓

### Interactive Elements
- **Focus Outline:** 2px solid cyan
- **Focus Offset:** 4px
- **Tab Order:** Logical, respects source order
- **Keyboard:** All features accessible via keyboard

### ARIA
- Proper `role` attributes
- `aria-label` for icon buttons
- `aria-expanded` for toggles
- `aria-hidden` for decorative elements
- `aria-live` for dynamic updates

## Shadows & Depth

```css
/* Elevation 1 (subtle) */
box-shadow: 0 2px 8px rgba(0,0,0,0.12);

/* Elevation 2 (button hover) */
box-shadow: 0 4px 16px rgba(0,212,255,0.2);

/* Elevation 3 (modal) */
box-shadow: 0 8px 32px rgba(0,212,255,0.35);

/* Glow effects */
box-shadow: 0 0 20px rgba(0,212,255,0.15);
```

## Responsive Design

### Mobile First
- Base styles for 320px+
- Tablets: 768px+ (2-column layouts)
- Desktop: 1200px+ (3-column layouts)

### Flexible Layouts
- `clamp()` for responsive sizing
- CSS Grid with `auto-fit`/`auto-fill`
- Flexbox for component layouts
- Aspect ratio preservation

### Touch Targets
- Minimum 44px × 44px (buttons)
- 8px+ padding around interactive elements
- No hover requirements

## Data Attributes

```html
<!-- Animated counter -->
<span class="stat-number" data-count="5">0</span>

<!-- Skill level bars -->
<div class="skill-chip" data-level="95">Java</div>

<!-- Navigation links -->
<a href="#section" data-nav>Link</a>
```

## Usage Examples

### Creating a New Component
```css
.component {
  padding: 24px;
  background: var(--bg-glass);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius);
  transition: var(--transition);
}

.component:hover {
  border-color: var(--accent-cyan);
  box-shadow: var(--glow-cyan);
}

.component:focus-visible {
  outline: 2px solid var(--accent-cyan);
  outline-offset: 4px;
}
```

### Animation Pattern
```css
.element {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(.16,1,.3,1),
              transform 0.8s cubic-bezier(.16,1,.3,1);
}

.element.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

## Browser Support

- Modern CSS: `custom properties`, `grid`, `flex`, `backdrop-filter`
- JavaScript: `ES6+`, `fetch`, `IntersectionObserver`
- Fallbacks: Progressive enhancement for older browsers

## Performance Notes

- CSS: ~15KB minified (no preprocessor needed)
- JavaScript: ~8KB minified (vanilla, zero dependencies)
- Images: WebP with PNG fallback
- Fonts: System fonts + Google Fonts (optimized loading)

---

**Last Updated:** March 23, 2026  
**Version:** 2.0 (Master Pro Level)
