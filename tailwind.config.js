const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      manelTitle: ["Chilanka", "cursive"],
    },
    colors: {
      manelColor: "#10103C",
      blue: colors.blue,
      red: colors.red,
      indigo: colors.indigo,
      purple: colors.purple,
      white: colors.white,
    },
    extend: {},
  },
  plugins: [],
};
