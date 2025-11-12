/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#071A31",
        secondary: "#FF7913",
        tertiory: "#31D2F2",
        "primary-red":"#DC2626",
      },
    },
  },
  plugins: [],
};
