export default {
  plugins: {
    "@tailwindcss/postcss": {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        require("tailwindcss-animate"),
      ],
    },
  },
};
