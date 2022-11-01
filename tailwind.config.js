/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#193751',
        grayPrimary: '#F5F5F5'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
