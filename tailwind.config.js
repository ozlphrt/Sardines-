/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg0': '#0B0B0C',
        'bg1': '#121214',
        'bg2': '#18181B',
        'hairline': '#2A2A2E',
        'text': '#E5E7EB',
        'muted': '#9CA3AF',
        'accent': '#7DD3FC',
        'danger': '#F87171',
        'success': '#34D399',
        'warning': '#F59E0B',
        'water-deep': '#0B1426',
        'water-surface': '#1E3A8A',
        'water-light': '#3B82F6'
      },
      fontFamily: {
        'sans': ['Inter', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
