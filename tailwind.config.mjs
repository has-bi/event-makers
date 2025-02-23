const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/button.js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui({ addCommonColors: true })],
};
