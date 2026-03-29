/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        over: ["overpass", "sans-serif"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "#071A31",
        secondary: "#FF7913",
        tertiory: "#31D2F2",
        "primary-red":"#DC2626",
        "URL-Blue":"#1E90FF",
        // Anime Section 
        'anime-bg':"#151F2E",
        'tabs-bg':"#0B1622",
      },
    },
  },
  plugins: [],
};
