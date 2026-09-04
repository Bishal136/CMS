import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF1493',
          hover: '#D90072',
        },
        secondary: {
          DEFAULT: '#0D0D0D',
          light: '#1A1A1A',
        },
        'accent-bg': '#FFF1F7',
        'hover-pink': '#D90072',
        'border-gray': '#E8E8E8',
        'text-muted': '#6B6B6B',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      maxWidth: {
        container: '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;
