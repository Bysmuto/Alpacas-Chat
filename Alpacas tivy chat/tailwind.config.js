/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#206585',
        secondary: '#466877',
        white: 'white',
      },
    },
  },
  plugins: [],
};
