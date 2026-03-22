/** @type {import('tailwindcss').Config} */
export default {
  //Include index.html so Tailwind keeps any classes added directly in the HTML outside React components.
  content: [
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
