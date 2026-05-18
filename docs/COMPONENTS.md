# Component Reference

## Layout Components

### `Navbar` (`src/components/Navbar.tsx`)
Fixed top navigation bar using the `.glass` utility class. Manages mobile menu toggle state internally. Links are defined in the `NAV_LINKS` constant.

### `Footer` (`src/components/Footer.tsx`)
Site footer with navigation links, service links, contact info, and social links. Uses `NAV_LINKS` and `SERVICE_LINKS` constants.

### `ChatBot` (`src/components/ChatBot.tsx`)
Rule-based FAQ widget (not AI). Matches user input keywords against predefined `QA` patterns and returns answers with optional navigation links. Appears on all pages via `layout.tsx`.

## Project Visuals

These components are rendered inside the Featured Projects carousel on the home page. They are self-contained Framer Motion animations with no props.

### `BeforeAfterSlider` (`src/components/BeforeAfterSlider.tsx`)
Visual for the PLM Data Lake Migration project. Shows a "before/after" concept with animated Excel rows transforming into a bar chart.

### `DataStreamVisual` (`src/components/DataStreamVisual.tsx`)
Visual for the Global Logistics Lakehouse project. Animated streaming data packets flowing from sources into a lakehouse.

### `AnomalyDetectionVisual` (`src/components/AnomalyDetectionVisual.tsx`)
Visual for the Fintech Fraud Detection project. Animated data nodes passing through an ML scanner, with a red anomaly node triggering a target lock.

## Styling

Custom utility classes are defined in `src/app/globals.css`:

| Class          | Effect                                      |
|----------------|---------------------------------------------|
| `.glass`       | Frosted glass with backdrop blur            |
| `.glass-panel` | Gradient glass panel with cyan border       |
| `.glow-text`   | Cyan text shadow                            |
| `.glow-border` | Animated hover border with glow + lift    |

Theme tokens are declared via Tailwind CSS v4 `@theme inline` in `globals.css`:
- `--color-background: #070b18`
- `--color-primary: #00f0ff`
- `--color-secondary: #7000ff`
- `--color-surface: #111111`
