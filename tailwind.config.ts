import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0D11',
        foreground: '#F3F4F6',
        muted: '#A6B0BF',
        panel: '#0F141B',
        line: 'rgba(154, 172, 196, 0.16)',
        primary: '#7BA4FF',
        accent: '#CBB89D',
        success: '#8BD0AA',
        warning: '#E7C07D',
        danger: '#F08B8B'
      },
      boxShadow: {
        glow: '0 0 80px rgba(123, 164, 255, 0.12)',
        panel: '0 18px 80px rgba(3, 8, 20, 0.34)'
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top, rgba(123,164,255,0.18), transparent 42%), radial-gradient(circle at 80% 10%, rgba(203,184,157,0.12), transparent 24%)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
};

export default config;
