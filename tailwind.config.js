/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "secondary-1": "#EBECF0",
        "secondary-2": "#757575",
        "accent": "#4253F0"
      }
    },
  },
  plugins: [],
}

