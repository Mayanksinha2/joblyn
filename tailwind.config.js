/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'naukri-blue': '#2857A4',
        'naukri-light-blue': '#F3F6FB',
        'naukri-orange': '#FF7555',
        'naukri-green': '#4CAF50',
      }
    },
  },
  plugins: [],
}
