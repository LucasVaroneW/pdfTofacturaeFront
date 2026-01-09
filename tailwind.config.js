/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Swiss Design Palette
        background: '#FFFFFF',
        surface: '#FFFFFF',
        text: '#1F2937', // Gray-900 (High contrast)
        primary: {
          DEFAULT: '#059669', // Emerald 600
          hover: '#047857',   // Emerald 700
        },
        muted: '#9CA3AF', // Gray-400
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
