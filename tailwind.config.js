import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#38B2AC", // Teal color from the logo
        secondary: "#2D3748", // Dark gray for secondary elements
        accent: "#68D391", // Lighter green for accents
        background: "#1A202C", // Background color
        text: "#FFFFFF", // White for text on dark backgrounds
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  variants: {},
  plugins: [flowbite.plugin()],
};
