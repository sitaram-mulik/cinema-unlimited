/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF", // primary text color
        secondary: "#000000",
        muted: "#A1A1AA",
        background: "#000000", // main background color
        backgroundSecondary: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
