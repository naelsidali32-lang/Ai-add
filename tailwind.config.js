/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunflower:      '#F5C518',
        'electric-blue':'#2D5BFF',
        'rose-fluo':    '#FF00BB',
        'coral-hot':    '#FF4D4D',
        night:          '#0A0A0A',
        cream:          '#FFF8E7',
        accent:         '#FF00BB',
      },
      fontFamily: {
        league: ['"League Spartan"', '"Helvetica Neue"', 'Arial Black', 'sans-serif'],
        body:   ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
