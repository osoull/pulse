/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1B5D', // Osoul's deep navy blue
          light: '#2D2E7F',
          dark: '#12124A'
        },
        secondary: {
          DEFAULT: '#FFFFFF', // White for contrast
          light: '#F8F9FA',
          dark: '#E9ECEF'
        },
        accent: {
          DEFAULT: '#F8F9FA', // Light background
          dark: '#E9ECEF'
        },
        gold: {
          DEFAULT: '#C5A572', // Osoul's gold accent
          light: '#D4B989',
          dark: '#B69260'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      },
      boxShadow: {
        'osoul': '0 4px 6px -1px rgba(26, 27, 93, 0.1), 0 2px 4px -1px rgba(26, 27, 93, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};