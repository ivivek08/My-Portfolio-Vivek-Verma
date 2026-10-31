# Smooth Scroll-Based Frame Animation

A high-performance, silky-smooth scroll-driven canvas animation powered by 239 high-definition frames (1080p @ 24fps).

## Features

- **HTML5 Canvas 2D Rendering**: Zero alpha blending overhead (`alpha: false`) for maximum GPU blitting performance.
- **Buttery LERP Momentum**: Linear interpolation (`LERP = 0.08`) smooths out stepped mousewheel ticks and trackpad scrolls into a fluid, filmic scrubbing motion.
- **Progressive Multi-Stage Preloading**:
  1. Priority-loads Frame 1 and immediately renders to screen (zero blank wait).
  2. Staggered keyframe loading across the timeline for instant scrub coverage.
  3. Controlled concurrency pool (8 parallel workers) to avoid network congestion.
  4. Bidirectional fallback search to ensure no blank frames or white flashes occur even during aggressive scrubbing.
- **Retina / HiDPI Crispness**: Automatically detects and adapts to `devicePixelRatio` (capped at 2x for optimal mobile/desktop GPU memory balance).
- **Responsive Aspect Ratio Math**: `object-fit: cover` algorithm dynamically computes scale and offsets, keeping the subject perfectly framed on mobile, desktop, and ultrawide screens.
- **Pure & Clean**: No external component clutter — strictly focused on the video frame scroll animation.

## How to Run

### Option 1: Quick Launch with Node.js
```bash
node server.js
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

Or with npm:
```bash
npm start
```

### Option 2: Python HTTP Server
```bash
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Direct File Open
You can also directly double-click or drag `index.html` into modern web browsers (Chrome, Edge, Firefox, Brave, Safari).

