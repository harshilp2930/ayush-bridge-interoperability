/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        teal: {
          50: '#f0fdfa',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
        },
        slate: {
          50: '#f8fafc',
          600: '#475569',
          900: '#0f172a',
        },
        emerald: {
          600: '#059669',
        },
        amber: {
          500: '#f59e0b',
        },
        rose: {
          600: '#e11d48',
        },
      }
    },
  },
  plugins: [],
}
