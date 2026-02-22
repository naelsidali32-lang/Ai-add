/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunset: {
          orange: '#FF8C42',
          amber:  '#FFB347',
          rose:   '#E8497A',
          gold:   '#F5A623',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          muted:   '#6B6B6B',
          light:   '#9A9A9A',
          faint:   '#C8C8C8',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}