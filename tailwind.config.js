/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Status colors for dynamic classes
    'text-red-400',
    'text-red-500',
    'text-yellow-400',
    'text-yellow-500',
    'text-green-400',
    'text-green-500',
    'text-blue-400',
    'text-blue-500',
    'bg-red-400',
    'bg-red-500',
    'bg-yellow-400',
    'bg-yellow-500',
    'bg-green-400',
    'bg-green-500',
    'bg-blue-400',
    'bg-blue-500',
    'border-red-400',
    'border-yellow-400',
    'border-green-400',
    'border-blue-400',
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