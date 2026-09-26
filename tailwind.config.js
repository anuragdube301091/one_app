/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          DEFAULT: '#C41247',
          dark: '#8B0C33',
          light: '#FCE7EF',
          muted: '#F9D5E5',
        },
        coral: {
          DEFAULT: '#F4613C',
          light: '#FFF0EB',
        },
        ivory: '#FFF8F5',
        cream: '#F5EDE7',
        'text-primary': '#1A0A12',
        'text-mid': '#5C3246',
        'text-muted': '#9B7488',
        'border-rose': '#EDCFD9',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        one: {
          primary: '#C41247',
          'primary-content': '#ffffff',
          secondary: '#F4613C',
          'secondary-content': '#ffffff',
          accent: '#8B0C33',
          'accent-content': '#ffffff',
          neutral: '#1A0A12',
          'neutral-content': '#ffffff',
          'base-100': '#FFF8F5',
          'base-200': '#F5EDE7',
          'base-300': '#EDCFD9',
          'base-content': '#1A0A12',
          info: '#3B82F6',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
    ],
    darkTheme: 'one',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}
