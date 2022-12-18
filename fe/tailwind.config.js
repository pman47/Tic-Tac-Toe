/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Bilbo': ['Bilbo'],
        'WorkSans': ['"Work Sans"'],
        'Epilogue': ['Epilogue'],
      }
    },
  },
  plugins: [],
}