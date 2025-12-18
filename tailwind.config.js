/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // blue-500
        secondary: '#64748b', // slate-500
        accent: '#f97316', // orange-500
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'player-bounce': 'player-bounce 1s infinite',
      },
      keyframes: {
        'player-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
    },
  },
  plugins: [],
}
