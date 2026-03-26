/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black:   '#000000',
        ink:     '#06060a',
        surface: '#0e0e14',
        panel:   '#13131a',
        cream:   '#f0ede8',
        gold:    '#c9a84c',
        'gold-light': '#e8c96a',
        'gold-dim':   'rgba(201,168,76,0.15)',
        muted:   'rgba(240,237,232,0.45)',
        dim:     'rgba(240,237,232,0.18)',
        red:     '#e8291c',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
        script:  ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
