/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"poppins"', "serif"],
      },
    },
  },
  daisyui: {
    themes: ["business", "cupcake"],
  },
  plugins: [require("daisyui")],
};
