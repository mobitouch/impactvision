/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#FFFFFF',
        accent: '#d4e0ed',
        navy: '#23203e',
        navyLight: '#302d4d',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        mono: ['monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease both',
        'pulse-slow': 'pulse 2s ease infinite',
        'scroll-x': 'scrollX 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'rotate-slow': 'rotate 8s linear infinite',
        'rotate-slower-reverse': 'rotate 12s linear infinite reverse',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollX: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '30%': { transform: 'translate(3%, 2%)' },
          '50%': { transform: 'translate(-1%, 3%)' },
          '70%': { transform: 'translate(2%, -2%)' },
          '90%': { transform: 'translate(-3%, 1%)' },
        }
      }
    },
  },
  plugins: [],
}
