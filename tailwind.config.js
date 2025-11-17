/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#161A20',
        card: '#212936',
        'card-secondary': '#2A3143',
        primary: '#134FE6',
        'primary-hover': '#2F5FFF',
        link: '#469BDF',
        text: '#E8ECF4',
        'text-muted': '#8997AB',
        border: '#353D50',
        highlight: '#4DAFFF',
        navbar: '#212936',
      },
      fontFamily: {
        'sans': ['Source Sans 3', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Lora', 'Georgia', 'serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
}
