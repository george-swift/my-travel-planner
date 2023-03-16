/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flex: {
        default: '0 0 auto'
      },
      fontFamily: {
        sans: ['var(--font-inter)']
      },
      screens: {
        tablet: '600px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
