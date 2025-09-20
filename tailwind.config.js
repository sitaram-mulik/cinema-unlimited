/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF', // primary text color
        secondary: '#33373d',
        tertiary: '#351b26',
        heading: '#dfa214',
        muted: '#292929',
        // background: '#0d0d0d', // main background color
        background: '#00050d', // main background color
        backgroundSecondary: '#33373d'
      },
      fontFamily: {
        sans: ['Inter_400Regular']
      },
      placeholderColor: {
        primary: '#FFFFFF'
      }
    }
  },
  plugins: []
};
