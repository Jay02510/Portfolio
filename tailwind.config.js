/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.tsx', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'Pretendard Variable', 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', 'serif'],
        sans: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
        display: ['Pretendard Variable', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
      },
      colors: {
        alpine: {
          950: '#14171d',
          900: '#181c24',
          800: '#232834',
          200: '#e5e7eb',
          100: '#f3f4f6',
          50: '#faf9f6'
        },
        text: {
          sec: '#a3acb9',
          tert: '#848e9c',
        },
        accent: {
          gold: 'rgb(var(--rgb-gold) / <alpha-value>)', // text, borders and tints; follows the theme
          fill: '#e2b87d', // button fill, same in both themes (dark text on it)
          clay: '#8c6239'
        },
        ink: { DEFAULT: 'rgb(var(--rgb-ink) / <alpha-value>)', 2: 'rgb(var(--rgb-ink-2) / <alpha-value>)', 3: 'rgb(var(--rgb-ink-3) / <alpha-value>)' },
        canvas: 'rgb(var(--rgb-canvas) / <alpha-value>)',
        card: 'rgb(var(--rgb-card) / <alpha-value>)',
        inset: 'rgb(var(--rgb-inset) / <alpha-value>)'
      },
    },
  },
};
