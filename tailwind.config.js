/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.tsx', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
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
          tert: '#788290',
        },
        accent: {
          gold: '#e2b87d',
          clay: '#8c6239'
        }
      },
    },
  },
};
