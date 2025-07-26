/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'pulse-soft': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20px)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      colors: {
        earth: {
          blue: '#0ea5e9',
          green: '#059669',
          brown: '#a3a3a3'
        }
      }
    },
  },
  plugins: [],
}