/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#01E0FF',
      secondary: '#00acc1',
      primary_bg: '#252522',
      primaryDark: '#007D8E',
      secondaryDark: '#007D8E',
      white: '#FFFFFF',
      gray: '#65655C',
      light_gray: '#9A9A8C',
      input_gray: '#373949',
    },
  },
  plugins: [],
};
