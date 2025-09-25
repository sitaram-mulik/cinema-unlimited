/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF', // primary text color
        secondary: '#0c4e54cc',
        tertiary: '#f5c400',
        heading: '#dfa214',
        muted: '#33373d',
        buttonColor: '#0c4e54cc',
        background: '#08041fff', // main background color
        backgroundSecondary: '#0c4e54cc',
        backgroundOverlay: 'rgba(12, 78, 84, 0.9)'
      },
      fontFamily: {
        microgrammaMed: ['Microgramma-Medium'],
        microgrammaBold: ['Microgramma-Bold'],
        italic: ['Custom-Italic']
      },
      placeholderColor: {
        primary: '#FFFFFF'
      }
    }
  },
  plugins: []
};
