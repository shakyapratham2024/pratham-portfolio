# Pratham Shakya — Portfolio Website

Award-winning music artist portfolio built with **React 18 + Vite + Tailwind CSS**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy your photo
# Place pratham.jpg inside the /public folder

# 3. Start dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build      # Outputs to /dist
npm run preview    # Preview the production build locally
```

---

## 📁 Project Structure

```
pratham-react/
├── public/
│   └── pratham.jpg          ← Your photo goes here
├── src/
│   ├── components/
│   │   ├── Loader.jsx       ← Falling leaf intro animation
│   │   ├── Cursor.jsx       ← Custom gold cursor
│   │   ├── NightSky.jsx     ← Parallax star background
│   │   ├── ScrollProgress.jsx ← Gold progress bar
│   │   ├── SideIndicator.jsx  ← Section dot nav (desktop)
│   │   ├── AudioVibes.jsx   ← Animated equalizer bars
│   │   ├── Nav.jsx          ← Fixed navigation + mobile menu
│   │   ├── Hero.jsx         ← Artist profile / bio section
│   │   ├── Press.jsx        ← Stats + press quotes
│   │   ├── Music.jsx        ← YouTube videos (live API)
│   │   ├── Connect.jsx      ← Social links + Spotify CTA
│   │   ├── Divider.jsx      ← SVG wave dividers
│   │   └── Footer.jsx       ← Footer
│   ├── hooks/
│   │   └── useImageLoad.js  ← Smooth image fade-in
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

---

## 🎨 Design System

| Token     | Value      | Use              |
|-----------|------------|------------------|
| `--black` | `#000000`  | Page background  |
| `--ink`   | `#06060a`  | Section bg       |
| `--surface`| `#0e0e14` | Card bg          |
| `--gold`  | `#c9a84c`  | Accent / brand   |
| `--cream` | `#f0ede8`  | Primary text     |

**Fonts:** Playfair Display · DM Sans · Space Mono

---

## 🔑 YouTube API

The music section uses your real YouTube channel.

- **API Key:**     `AIzaSyDkbFII_58IoAi2ptWMkn4Uu1cNoQrFcm0`
- **Channel ID:**  `UC2LDB6xxpBH9qKs7m7U9e8A`
- **Max results:** 3 latest videos

To update, edit `src/components/Music.jsx` lines 5–7.

---

## 🌐 Deploy

### Vercel (Recommended — free)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the /dist folder to netlify.com/drop
```

### GitHub Pages
```bash
# Add to vite.config.js: base: '/your-repo-name/'
npm run build
# Push /dist to gh-pages branch
```

---

## ✅ Features

- 🍂 Falling leaf loader with "Hi" written on it
- ⭐ Interactive night sky parallax (mouse + scroll)
- 🎯 Custom gold cursor with spring lag
- 📊 Animated scroll progress bar
- 🔢 Live YouTube API integration
- 📱 Fully responsive (mobile splash hero)
- ♿ Accessible (focus styles, reduced motion)
- 🎞️ Film grain texture overlay
- 🔠 Side section indicator (desktop)
- 🎵 Animated equalizer bars in nav
- 📰 Press quotes + stats section
- 🔗 Connect section with platform cards

---

Made with ♥ for Pratham Shakya · Kathmandu, Nepal
