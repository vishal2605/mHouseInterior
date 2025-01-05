/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    backgroundImage:{
      logo:'url("https://raw.githubusercontent.com/dlnicoz/DhirajContractor/master/public/bg-images/bg-2.webp")',
    }
  },
  plugins: [],
}

