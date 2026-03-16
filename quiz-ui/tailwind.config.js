/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        slate: {
          950: '#0f172a',
        },
      },
      boxShadow: {
        soft: '0 12px 32px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
