/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ud-navy': '#1D2439',
        'ud-navy-light': '#2C3550',
        'ud-navy-dark': '#151A2B',
        'ud-blue': '#134FE6',
        'ud-blue-bright': '#2F7EFF',
        'ud-blue-light': '#4A90FF',
        'ud-text': '#E8ECF4',
        'ud-text-muted': '#A6B0C3',
        'ud-border': '#3D4A66',
        'ud-share': '#6B7894',
      },
      fontFamily: {
        'sans': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
