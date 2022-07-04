module.exports = {
  content: [
    './templates/**/*.njk',
    './scripts/**/*.js',
    './img/**/*.svg',
    // './**/*.md',
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: '"Inter", sans-serif;',
      },
    },
  },
};
