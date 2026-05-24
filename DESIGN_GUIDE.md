# DOOMester.hu Design Guide

Ez a dokumentum tartalmazza a DOOMester.hu landing page teljes design rendszerét, amely a foglalom.eu stílusát adaptálja az okos otthon tematikához.

## 1. Design elemzés - foglalom.eu

### Színek és kontrasztok
- **Háttér**: Lila-kék gradient (soft purple-blue)
- **Kártyák**: Fehér háttér, lekerekített sarkok
- **Akcentek**: Neon pink/magenta és cyan/blue effektek
- **Szöveg**: Sötétszürke, jó kontraszt

### Tipográfia
- **Font**: Sans-serif (Inter)
- **Hierarchia**: Nagy, félkövér címek, közepes body szöveg
- **3D/Emboss effektek**: Főcímeknél

### Kártyák stílusa
- **Border radius**: 1.5-2rem (nagy lekerekítés)
- **Árnyékok**: Subtle drop shadow, floating effect
- **Hover**: Scale és shadow változás

### Gombok és CTA-k
- **Forma**: Lekerekített, közepes padding
- **Színek**: Gradient háttér (primary to cyan)
- **Hover**: Scale up, glow effect

### Layout
- **Hero**: Nagy, középre igazított kártya
- **Szekciók**: Max-width konténerek, jó whitespace
- **Reszponzív**: Mobile-first approach

## 2. DOOMester.hu Adaptáció

### Színpaletta

```css
Primary (Kék):
- 50: #e6f1ff (legvilágosabb)
- 500: #0079e6 (fő szín)
- 900: #00191a (legsötétebb)

Cyan:
- 50: #e0f7fa
- 500: #00bcd4
- 900: #006064

Accent (Okos otthon):
- Light: #f0f4ff
- Default: #a8b8ff
- Dark: #6c7ae0
```

### Tipográfia hierarchia

1. **H1** (Hero mottó): `text-3xl md:text-4xl`, `font-light`
2. **H2** (Szekció címek): `text-3xl md:text-4xl`, `font-bold`, `gradient-text`
3. **H3** (Kártya címek): `text-xl`, `font-bold`
4. **Body**: `text-lg`, `leading-relaxed`

### Spacing rendszer

```css
Container padding:
- Mobile: px-4 (1rem)
- Tablet: sm:px-6 (1.5rem)
- Desktop: lg:px-8 (2rem)

Szekció padding:
- py-12 (3rem) - kisebb szekciók
- py-16 (4rem) - közepes szekciók
- py-24 (6rem) - hero szekciók

Gap (grid/flex):
- gap-6 (1.5rem) - mobile
- gap-8 (2rem) - desktop
```

### Border radius

```css
- rounded-xl: 1rem (kisebb elemek)
- rounded-2xl: 1.5rem (gombok, kisebb kártyák)
- rounded-3xl: 2rem (nagy kártyák, modalok)
```

### Shadow presetek

```css
shadow-soft: 
  0 4px 6px -1px rgba(0, 0, 0, 0.1), 
  0 2px 4px -1px rgba(0, 0, 0, 0.06)

shadow-medium:
  0 10px 15px -3px rgba(0, 0, 0, 0.1), 
  0 4px 6px -2px rgba(0, 0, 0, 0.05)

shadow-large:
  0 20px 25px -5px rgba(0, 0, 0, 0.1), 
  0 10px 10px -5px rgba(0, 0, 0, 0.04)

shadow-glow:
  0 0 20px rgba(100, 181, 246, 0.5)
```

### Max-width konténerek

```css
- container-custom: max-w-7xl (1280px)
- Content max-width: max-w-4xl (896px)
- Grid columns: 
  - Mobile: 1
  - Tablet: 2 (md:grid-cols-2)
  - Desktop: 3 (lg:grid-cols-3)
```

### Responsiveness breakpoints

```css
Tailwind default breakpoints:
- sm: 640px (tablet)
- md: 768px (tablet landscape)
- lg: 1024px (desktop)
- xl: 1280px (large desktop)
```

### Animációs elvek

**Finom, nem tolakodó animációk:**

1. **Fade in**: `opacity: 0 → 1`, `duration: 0.5-0.6s`
2. **Slide up**: `translateY(20px) → 0`, `opacity: 0 → 1`
3. **Scale**: `scale(0.95) → 1` (modaloknál)
4. **Hover**: `scale(1.05)`, `y: -5px`, `duration: 300ms`

**Framer Motion használata:**
- `initial`: Kezdeti állapot
- `animate`: Animált állapot
- `whileInView`: Scroll-triggered animációk
- `whileHover`: Hover effektek
- `transition`: Spring vagy ease timing

### Komponens specifikációk

#### Header
- **Háttér**: Gradient (accent-light to primary-50)
- **Backdrop blur**: `backdrop-blur-md`
- **Sticky**: `sticky top-0 z-50`
- **Logo**: 64x64px, rounded-2xl, hover: scale + rotate

#### Hero
- **Padding**: `py-16 md:py-24`
- **Max width**: `max-w-4xl`
- **Szöveg**: Nagy, light font weight
- **Gradient text**: Fő kifejezéseknél

#### Kártyák (Examples)
- **Háttér**: Fehér
- **Border radius**: `rounded-3xl`
- **Árnyék**: `shadow-medium`
- **Hover**: `scale(1.05)`, `y: -5px`, `shadow-large`
- **Kép**: `h-48`, `object-cover`, hover: `scale(1.1)`

#### Modal
- **Háttér overlay**: `bg-black/60`, `backdrop-blur-sm`
- **Modal**: Fehér, `rounded-3xl`, `max-w-4xl`
- **Animáció**: Spring, `damping: 25`, `stiffness: 300`
- **Kép**: `h-64 md:h-96`

#### Gombok (CTA)
- **Primary**: Gradient (primary-600 to cyan-600)
- **Secondary**: Fehér háttér, primary-600 szöveg
- **Padding**: `px-8 py-4`
- **Border radius**: `rounded-2xl`
- **Hover**: `scale(1.05)`, `shadow-glow`

#### Footer
- **Háttér**: Gradient (gray-800 to gray-900)
- **Szöveg**: Fehér, gray-300 linkek
- **Hover**: `x: 5px` (slide right)

## 3. UI szabályok

### Általános elvek

1. **Whitespace**: Bőven használj whitespace-t a tiszta megjelenésért
2. **Kontraszt**: Minimum 4.5:1 szöveg/háttér kontraszt
3. **Konszisztencia**: Ugyanazok a stílusok hasonló elemeknél
4. **Hierarchia**: Világos vizuális hierarchia a fontokkal és színekkel

### Kódolási konvenciók

```tsx
// Komponensek: PascalCase
export default function ComponentName() {}

// Props: TypeScript interface
interface ComponentProps {
  prop: string;
}

// Styling: Tailwind utility classes
className="bg-white rounded-3xl p-8 shadow-medium"

// Animációk: Framer Motion
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
```

### Best practices

1. **Mobile-first**: Mindig mobile-ról kezdj, majd desktop
2. **Accessibility**: Semantic HTML, ARIA labels
3. **Performance**: Lazy loading képeknél, code splitting
4. **SEO**: Meta tags, semantic HTML

## 4. Komponenskönyvtár javaslat

### Tailwind komponensek

```css
/* Custom utilities */
.container-custom
.card-hover
.gradient-text
```

### Reusable komponensek

- `Button` - CTA gombok
- `Card` - Általános kártya
- `Modal` - Modal wrapper
- `Section` - Szekció wrapper

## 5. Képek és asset-ek

### Kép követelmények

- **Format**: JPG vagy WebP
- **Kártya képek**: 800x600px (4:3 arány)
- **Modal képek**: 1200x600px (2:1 arány)
- **Logo**: 256x256px, GIF vagy PNG

### Optimalizálás

- Next.js Image komponens használata
- Lazy loading
- Responsive images (srcset)

## 6. Karbantartás

### Színek módosítása
`tailwind.config.ts` - `colors` szekció

### Spacing módosítása
`tailwind.config.ts` - `extend.spacing` vagy `app/globals.css`

### Animációk módosítása
`tailwind.config.ts` - `keyframes` és `animation` szekciók

---

**Utolsó frissítés**: 2025. január
**Verzió**: 1.0.0

