/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
      fontFamily: {
        body: ["Open Sans", "sans-serif"],
        header: ["DM Sans", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
        "fade-in-delay": "fade-in 1s ease-out 0.2s",
        "fade-in-extra-delay": "fade-in 1s ease-out 0.3s",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
