/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ud-navy': '#2C3550',
        'ud-navy-light': '#353E56',
        'ud-navy-dark': '#1C2333',
        'ud-blue': '#1D7FEE',
        'ud-blue-bright': '#2F8FFF',
        'ud-blue-light': '#5DADE2',
        'ud-text': '#E8ECF4',
        'ud-text-muted': '#8997AB',
        'ud-border': '#2E3A52',
        'ud-share': '#6B7894',
      },
      fontFamily: {
        'sans': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
