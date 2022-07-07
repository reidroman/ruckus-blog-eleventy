const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./templates/**/*.njk",
    "./scripts/**/*.js",
    "./img/**/*.svg",
    // './**/*.md',
  ],
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      primary: "#454973",
      secondary: "#995348",
      gray: colors.slate,
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Roboto Serif", "serif"],
      // mono: ['ui-monospace', 'SFMono-Regular'],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            fontFamily: "Inter, sans-serif",
            "h1, h2, h3, h4, h5, h6": {
              "font-family": "Roboto Serif, serif",
            },
          },
        },
      },
    },
  },
};
