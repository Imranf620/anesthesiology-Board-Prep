/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d1d7d6",
          200: "#aae5b8",
          300: "#758884",
          400: "#47605b",
          500: "#193832",
          600: "#142d28",
          700: "#0f221e",
          800: "#0a1614",
          900: "#050b0a",
        },
      },
    },
  },
  plugins: [],
};
