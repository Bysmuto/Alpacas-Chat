/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#5377a0',
        secondary: '#466877',
        op:'#465b774d',
        white: 'white',
      },
    },
  },
  plugins: [],
};
